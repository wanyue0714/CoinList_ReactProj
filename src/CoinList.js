/*
just for test

import React from 'react';

export default function() {
    return <div>
        {Object.keys(this.state.coinList).length}
    </div>
}
*/
import React from 'react';
import styled, {css} from "styled-components";
import {subtleBoxShadow, lightBlueBackground, greenBoxShadow, redBoxShadow} from "./style";

const CoinGrid = styled.div`
    display: grid;
    
    // grid 分成五个 cols
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    
    // 格子和格子之间会产生一个空隙
    grid-gap: 15px;
    
    // confirm favorites 和 coinlist 之间有一个空隙
    margin-top: 40px;
`;

const CoinTitle = styled.div`
    ${subtleBoxShadow}
    ${lightBlueBackground}
    // 如果不 comment border， boxshadow 就不会 work
    // border: 1px solid blue;
    // 格子里头的字有行间距
    padding: 10px;
    &:hover {
       cursor: pointer;
       ${greenBoxShadow}
    }
    ${props => 
     // 这里 favorite 如果改成 favorites 就会是绿色，变不了红色
      props.favorite && css`
       &:hover{
         cursor: pointer;
         ${redBoxShadow};
       }
    
    `}
`;



const CoinHeaderGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const CoinSymbol = styled.div`
    justify-self: right;
`;

export default function(favorites = false){
    console.log('CoinSample', this.state.coinList['BTC']);
    let coinKeys = favorites ? this.state.favorites : Object.keys(this.state.coinList).slice(0,100);
    return <CoinGrid>
        {/*{Object.keys(this.state.coinList).map(coin =>*/}
        {coinKeys.map(coinKey =>
            <CoinTitle
                favorite= {favorites}
                onClick={
                    favorites ? () => {this.removeCoinFromFavorites(coinKey)} : () => { this.addCoinToFavorites(coinKey); }}
            >
                <CoinHeaderGrid>
                    <div> {this.state.coinList[coinKey].CoinName} </div>
                    <CoinSymbol> {this.state.coinList[coinKey].Symbol} </CoinSymbol>
                </CoinHeaderGrid>
                <img
                    style = {{ height: '50px' }}
                    src = {`http://cryptocompare.com/${
                        this.state.coinList[coinKey].ImageUrl
                    }`}
                />
            </CoinTitle>
        )}
    </CoinGrid>
}

