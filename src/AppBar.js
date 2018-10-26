import React from "react";
import styled, {css} from "styled-components";

// define the menu bar margin and grid
const Bar = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: 400px auto 150px 100px;
`;
// define a larger font Logo text
const Logo = styled.div`
  font-size: 1.3em;
`;
// define the bar button
// cursor means hover 变手的形状
// props 中是点击 active 的时候的 css，会有荧光 shadow
const ControlButton = styled.div`
  cursor: pointer;
  font-size: 1.3em;
  ${props => props.active && css`
     text-shadow: 0px 0px 30px #03ff03
     font-size: 1.3em;
  `}
  
`;

export default function() {

    console.log('Hello', this.state);
    return <Bar>
        <Logo>
            Home page
        </Logo>
        <div>
        </div>
        {/* only allow the dashboard button show when it is not the first visit */}
        {!this.state.firstVisit && (
            <ControlButton onClick={()=>{this.setState({page: 'dashboard'})}} active = {this.displayingDashboard()}>
                Dashboard
            </ControlButton>)}
        {/* but the settings button can be seen all the time */}
        <ControlButton onClick={()=>{this.setState({page: 'settings'})}} active = {this.displayingSettings()}>
            Settings
        </ControlButton>
    </Bar>
}
