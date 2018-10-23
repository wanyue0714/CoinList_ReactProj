import React, { Component } from 'react';
import './App.css';
import styled, {css} from "styled-components";

const GreenElement = styled.div`
  color: yellow;
  font-size: 1.3em;
  font-family: 'Mali', cursive;
`;
// extend the green element
const BlueElement = styled(GreenElement)`
  color: grey;
`;

const Logo = styled.div`
  font-size: 1.3em;
`;

const ControlButton = styled.div`
  cursor: pointer;
  font-size: 1.3em;
  ${props => props.active && css`
     text-shadow: 0px 0px 30px #03ff03
     font-size: 1.3em;
  `}
  
`;

const AppLayout = styled.div`
  padding: 40px;
`;

const Bar = styled.div`
  margin-down: 40px;
  display: grid;
  grid-template-columns: 400px auto 150px 100px;
`;

const Content = styled.div`
 
`;



class App extends Component {
    state = {
        page: 'dashboard'
    }
    displayingDashboard = () => this.state.page === 'dashboard';
    displayingSettings = () => this.state.page === 'settings';
  render() {
    return (
     <AppLayout>
      <Bar>
        <Logo>
           Home page
        </Logo>
        <div>
        </div>
        <ControlButton onClick={()=>{this.setState({page: 'dashboard'})}} active = {this.displayingDashboard()}>
              Dashboard
        </ControlButton>
        <ControlButton onClick={()=>{this.setState({page: 'settings'})}} active = {this.displayingSettings()}>
              Settings
        </ControlButton>
      <GreenElement>
        Hello, I'm little piggy
      </GreenElement>
      <BlueElement>
       Love you !
      </BlueElement>
      </Bar>
      <Content>
          Hello, I'm {this.state.page}

      </Content>
     </AppLayout>
    );
  }
}

export default App;
