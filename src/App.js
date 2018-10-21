import React, { Component } from 'react';
import './App.css';
import styled from "styled-components";

const GreenElement = styled.div`
  color: yellow;
  font-size: 30px;
  font-family: 'Mali', cursive;
`;
// extend the green element
const BlueElement = styled(GreenElement)`
  color: grey;
`;

const Logo = styled.div`
  font-size: 1.5em;
`;

const ControlButton = styled.div`
  font-size: 1.5em;
`;

const AppLayout = styled.div`
  padding: 40px;
  display: grid;
  grid-template-columns: 400px auto 200px 100px;
`;



class App extends Component {
  render() {
    return (
      <AppLayout>
        <Logo>
           YueYue's home page
        </Logo>
        <div>
        </div>
        <ControlButton>
           Dashboard
        </ControlButton>
          <ControlButton>
              Settings
          </ControlButton>
      <GreenElement>
        Hello, I'm little piggy
      </GreenElement>
      <BlueElement>
       Love you !
      </BlueElement>
      </AppLayout>
    );
  }
}

export default App;
