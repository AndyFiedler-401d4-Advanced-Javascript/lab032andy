
import React from 'react';

export const SettingsContext = React.createContext();

//i trying to figure out what parts of demo and which parts to get alter but i stuck.

class SettingsProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
    
    };
  }

  setTitle = (title) => {
    this.setState({ title });
  }


  render() {
    return (
      <SettingsContext.Provider value={this.state}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}

export default SettingsProvider;