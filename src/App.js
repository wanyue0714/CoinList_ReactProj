import React, { Component } from 'react';
import './App.css';
import styled from "styled-components";

const GreenElement = styled.div`
  color: green;
  font-size: 30px;
`;
const BlueElement = styled(GreenElement)`
  color: blue;
`;

// extend the green element



class App extends Component {
  render() {
    return (
      <div>
      <GreenElement>
        hello
      </GreenElement>
      <BlueElement>
      hello
      </BlueElement>
      </div>
    );
  }
}

export default App;
