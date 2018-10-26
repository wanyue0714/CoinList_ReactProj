import React, { Component } from 'react';
import './App.css';
import styled, {css} from "styled-components";
import AppBar from './AppBar';
const cc = require('cryptocompare');

//page 最外层，加 padding
const AppLayout = styled.div`
  padding: 40px;
`;

// define a green text div
const GreenElement = styled.div`
  color: green;
  font-size: 1.3em;
  font-family: 'Mali', cursive;
`;
// extend the green element to blue
const BlueElement = styled(GreenElement)`
  color: blue;
`;

// define the content style in the page
const Content = styled.div`
 
`;


const checkFirstVisit = () =>{
    let cryptoDashData = localStorage.getItem('cryptoDash');
    if(!cryptoDashData){
        return{
            firstVisit: true,
            page: 'settings'
        }
    }
    return {};
}


class App extends Component {
    state = {
        page: 'dashboard',
        ...checkFirstVisit()
    };

    componentDidMount = () => {
        this.fetchCoins();
    }
    fetchCoins = async () => {
        let coinsList = (await cc .coinList()).Data;
        //console.log('Fetching coins....');
        this.setState({coinsList});
    }
    // set the page state as dashboard
    displayingDashboard = () => this.state.page === 'dashboard';
    // set the page state as settings
    displayingSettings = () => this.state.page === 'settings';
    // print the first visit message: "Welcome to xxxxx"
    firstVisitMessage = () => {
        if(this.state.firstVisit){
            return <div> Welcome to this page !</div>
        }
    };
    // confirm the first visit, jump to dashboard
    confirmFavorites = () =>{
        localStorage.setItem('cryptoDash','test');
        this.setState({
            firstVisit: false,
            page: 'dashboard',
        })
    };
    // add settings confirm content
    settingsContent = () =>{
        return <div>
             {this.firstVisitMessage()}
             <div onClick = {this.confirmFavorites}>
                 Confirm Favorites
             </div>
         </div>
    };

    loadingContent = () => {
        if(!this.state.coinList){
            return <div> Loading Coins </div>
        }
    }

  render() {
    return (
      <AppLayout>
         {AppBar.call(this)}
         {/* menu bar , cut and copy to the AppBar.js*/}

         {/* always display content */}
         <GreenElement>
            Hello, I'm little piggy
         </GreenElement>
         <BlueElement>
            Love you !
         </BlueElement>
            {this.loadingContent() || <Content>
               Hello, I'm {this.state.page}
               {this.displayingSettings() && this.settingsContent()}
             </Content>}


     </AppLayout>
    );
  }
}

export default App;
