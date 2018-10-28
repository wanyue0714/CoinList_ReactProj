import React, { Component } from 'react';
import './App.css';
import styled, {css} from "styled-components";
import CoinList from './CoinList';
import AppBar from './AppBar';
import _ from 'lodash';

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

const MAX_FAVORITES = 10;

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
        page: 'settings',
        favorites: ['ETH', 'BTC', 'XMR', 'DOGE', 'EOS'],
        ...checkFirstVisit()
    };

    componentDidMount = () => {
        this.fetchCoins();
    };
    fetchCoins = async () => {
        //just test :  console.log('Fetching coins....');
        let coinList = (await cc.coinList()).Data;
        this.setState({ coinList });
    };
    // set the page state as dashboard
    displayingDashboard = () => this.state.page === 'dashboard';
    // set the page state as settings
    displayingSettings = () => this.state.page === 'settings';
    // print the first visit message: "Welcome to xxxxx"
    firstVisitMessage = () => {
        if(this.state.firstVisit){
            return (
                <div>
                    Welcome to this page !
                </div>
            );
        }
    };
    // confirm the first visit, jump to dashboard
    confirmFavorites = () =>{
        //localStorage.setItem('cryptoDash','test');
        this.setState({
            firstVisit: false,
            page: 'dashboard',
        })
    };
    // add settings confirm content
    settingsContent = () =>{
        return (
            <div>
              {this.firstVisitMessage()}
              <div onClick = {this.confirmFavorites}>
                 Confirm Favorites
              </div>
              <div>
                  {/* 显示 favorites 的这五个在最上面一行：
                  favorites: ['ETH', 'BTC', 'XMR', 'DOGE', 'EOS'],*/}
                  {CoinList.call(this, true)}
                  {CoinList.call(this)}
              </div>
            </div>
        );
    };

    loadingContent = () => {
        if(!this.state.coinList) {
            return <div> Loading Coins </div>;
        }
    };

    addCoinToFavorites = (key) => {
       let favorites = [...this.state.favorites];
       if (favorites.length < MAX_FAVORITES) {
           favorites.push(key);
           this.setState({favorites});
       }
    };

    removeCoinFromFavorites = (key) => {
        let favorites = [...this.state.favorites];
        this.setState({favorites:_.pull(favorites, key)});
    };

  render() {
    return (
      <AppLayout>
         {AppBar.call(this)}
         {/* menu bar , cut and copy to the AppBar.js*/}

         {/* always display content */}

          {/*
              <GreenElement>
                   Hello, I'm little piggy
              </GreenElement>
              <BlueElement>
                   Love you !
              </BlueElement>

          */}

           {this.loadingContent() || (
                <Content>
                   {/* I'm dashboard and I'm settings : Hello, I'm {this.state.page}*/}
                   { this.displayingSettings() && this.settingsContent() }
                </Content>
           )}



     </AppLayout>
    );
  }
}

export default App;
