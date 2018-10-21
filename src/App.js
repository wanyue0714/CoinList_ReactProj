import React, { Component } from 'react';
import './App.css';
import styled from "styled-components";

const GreenElement = styled.div`
  color: yellow;
  font-size: 30px;
  font-family: 'Mali', cursive;
`;
const BlueElement = styled(GreenElement)`
  color: grey;
`;

// extend the green element



class App extends Component {
  render() {
    return (
      <div>
      <GreenElement>
        Hello, I'm little piggy
      </GreenElement>
      <BlueElement>
       Love you !
      </BlueElement>
      </div>
    );
  }
}

export default App;
