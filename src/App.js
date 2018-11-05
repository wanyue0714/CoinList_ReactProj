import React, { Component } from 'react';
import './App.css';
import styled, {css} from "styled-components";
import CoinList from './CoinList';
import Search from './Search';
import AppBar from './AppBar';
import fuzzy from 'fuzzy';

import _ from 'lodash';
import {ConfirmButton} from "./Button";




const cc = require('cryptocompare');

//page 最外层，加 padding
const AppLayout = styled.div`
  padding: 40px;
`;

// put the confirm favorites in the center of the grid
export const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
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
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: this.state.favorites

        }));
    };
    // add settings confirm content
    settingsContent = () =>{
        return (
            <div>
              {this.firstVisitMessage()}

              <div>
                  {/* 显示 coinlist favorites 的这五个在最上面一行：
                  favorites: ['ETH', 'BTC', 'XMR', 'DOGE', 'EOS'],*/}
                  {CoinList.call(this, true)}
                  {/*confirm button*/}
                  <CenterDiv>
                      <ConfirmButton onClick = {this.confirmFavorites}>
                          Confirm Favorites
                      </ConfirmButton>
                  </CenterDiv>

                  {Search.call(this)}
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
        // pull 得到所有 favorites
        this.setState({favorites:_.pull(favorites, key)});
    };

    // avoid duplicates
    isInFavorites = (key) => _.includes(this.state.favorites, key);
    handleFilter = _.debounce((inputValue) => {
        // Get all the coin symbols
        let coinSymbols = Object.keys(this.state.coinList);
        // get all the coin names, maps symbol to name
        let coinNames = coinSymbols.map(sym => this.state.coinList[sym].CoinName);
        // concat these two string list
        let allStringsToSearch = coinSymbols.concat(coinNames);
        let fuzzyResults = fuzzy.filter(inputValue, allStringsToSearch, {}).map(result => result.string);
        // console.log(fuzzyResults);
        let filteredCoins = _.pickBy(this.state.coinList, (result, symKey) => {
            let coinName = result.CoinName;
            // if our fuzzy results contains this symbol or the coinName, return true
            return _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName);
        });
        this.setState({filteredCoins});
        // rerendering the list everytime, 500 means in 500s, do this concat string list once, skip the middle of them
    }, 500);
    filterCoins = (e) => {
        // console.log(e.target.value);
        let inputValue = _.get(e, 'target.value');
        this.handleFilter(inputValue);
        if(!inputValue){
            this.setState({
                filteredCoins: null
            });
            return;
        }
    }


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
