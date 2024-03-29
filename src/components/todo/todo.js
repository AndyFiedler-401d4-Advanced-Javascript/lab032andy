import React from 'react';
import uuid from 'uuid/v4';
import { When } from '../if';
import Modal from '../modal';
import Header from './header';
import Form from './form';

import './todo.scss';


const itemsPerPage = 10;
class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      item: {},
      showDetails: false,
      details: {},
      page: 1,
    };
  }

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState(state => ({
      item: {...state.item, [name]: value},
    }));
  };

  handleSubmit = (e) => {
    this.props.handleSubmit(this.state.item);
  };

  addItem = (e) => {

    e.preventDefault();
    e.target.reset();

    const defaults = { _id: uuid(), complete:false };
    const item = Object.assign({}, this.state.item, defaults);

    this.setState(state => ({
      todoList: [...state.todoList, item],
      item: {},
    }));

  };

  deleteItem = id => {

    this.setState(state => ({
      todoList: state.todoList.filter(item => item._id !== id),
    }));

  };

  saveItem = updatedItem => {

    this.setState(state => ({
      todoList: state.todoList.map(item =>
        item._id === updatedItem._id ? updatedItem : item
      ),
    }));

  };

  toggleComplete = id => {
    this.setState(state => ({
      todoList: state.todoList.map(item =>
        item._id === id ? {
          ...item,
          complete: !item.complete,
        } : item
      ),
    }));
  };

  toggleDetails = id => {
    this.setState(state => {
      let item = state.todoList.find(item => item._id === id);
      return {
        details: item || {},
        showDetails: !!item,
      };
    });
  }

  render() {

    return (
      <>
        <Header todoList={this.state.todoList}/>

        <section className="todo">

        <Form addTodo={this.addItem} handleInputChange={this.handleInputChange}/>

          <div>
            <ul>
              { this.state.todoList.map(item => (
                <li
                  className={`complete-${item.complete.toString()}`}
                  key={item._id}
                >
                  <span onClick={() => this.toggleComplete(item._id)}>
                    {item.text}
                  </span>
                  <button onClick={() => this.toggleDetails(item._id)}>
                    Details
                  </button>
                  <button onClick={() => this.deleteItem(item._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>


        <When condition={this.state.showDetails}>
          <Modal title="To Do Item" close={this.toggleDetails}>
            <div className="todo-details">
              <header>
                <span>Assigned To: {this.state.details.assignee}</span>
                <span>Due: {this.state.details.due}</span>
              </header>
              <div className="item">
                {this.state.details.text}
              </div>
            </div>
          </Modal>
        </When>
      </>
    );
  }
}

export default ToDo;
