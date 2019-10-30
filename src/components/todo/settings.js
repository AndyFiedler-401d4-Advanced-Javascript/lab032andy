import React from 'react';
import { TodoContext } from './todoContext'

function DisplayCount() {
  return (
    <TodoContext.Consumer>
      {/* {({theme, toggleTheme}) => (
        <button
          onClick={displayNext}
          style={{backgroundColor: theme.background}}>
          Next
        </button>
      )} */}
    </TodoContext.Consumer>
  );
}

function displayNext(){
  return 
}

export default DisplayCount;