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
import _ from 'lodash';

export const CoinGrid = styled.div`
    display: grid;
    
    // grid 分成五个 cols
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    
    //put all the favorites in one row
    ${props => props.count && css`
         grid-template-columns: repeat(${props.count > 5 ? props.count : 5}, 1fr);
    `} 
    
    // 格子和格子之间会产生一个空隙
    grid-gap: 15px;
    
    // confirm favorites 和 coinlist 之间有一个空隙
    margin-top: 40px;
`;

export const CoinTile = styled.div`
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
    // mouse hover dashboard coin favorites show green box
    ${props =>
      props.dashboardFavorite &&css`
        &:hover {
          pointer-events: none;
          ${greenBoxShadow};
        }
    `}

    ${props =>
    // chosen 的就显示为透明不可选
    props.chosen && !props.favorite && css`
       // none就是不可选的意思
       pointer-events: none;
       opacity: 0.4;
    `}
`;



export const CoinHeaderGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

export const CoinSymbol = styled.div`
    justify-self: right;
`;

const DeleteIcon = styled.div`
    justify-self: right;
    display: none;
    ${CoinTile}:hover & {
       display: block;
       color : red;
    }
`;

export default function(favorites = false){
    console.log('CoinSample', this.state.coinList['BTC']);
    let coinKeys = favorites ?
        this.state.favorites
        // if we delete the input value in the search box, it would return all the coinlist
        : ((this.state.filteredCoins && Object.keys(this.state.filteredCoins)) || Object.keys(this.state.coinList).slice(0,100));
    return <CoinGrid count={favorites && this.state.favorites.length}>
        {/*{Object.keys(this.state.coinList).map(coin =>*/}
        {coinKeys.map(coinKey =>
            <CoinTile
                // 选之前先判断一下是否选过了
                chosen = {this.isInFavorites(coinKey)}
                favorite= {favorites}
                onClick={
                    favorites ? () => {this.removeCoinFromFavorites(coinKey)} : () => { this.addCoinToFavorites(coinKey); }}
            >
                <CoinHeaderGrid>
                    <div> {this.state.coinList[coinKey].CoinName} </div>
                    {favorites ? <DeleteIcon>delete</DeleteIcon> : <CoinSymbol> {this.state.coinList[coinKey].Symbol} </CoinSymbol>}
                </CoinHeaderGrid>
                <img
                    style = {{ height: '50px' }}
                    src = {`http://cryptocompare.com/${
                        this.state.coinList[coinKey].ImageUrl
                    }`}
                />
            </CoinTile>
        )}
    </CoinGrid>
}

