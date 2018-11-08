import React from 'react';
import { CoinGrid, CoinTile, CoinHeaderGrid, CoinSymbol } from './CoinList';
import styled, { css } from 'styled-components';
import {
    fontSizeBig,
    fontSize3,
    subtleBoxShadow,
    lightBlueBackground,
    fontSize2,
    backgroundColor2
} from './style';
import highchartsConfig from './HighchartsConfig';
import theme from './HighchartsTheme';
const ReactHighcharts = require('react-highcharts');
ReactHighcharts.Highcharts.setOptions(theme);

const numberFormat = number => {
    return +(number + '').slice(0, 7);
};

const ChartSelect = styled.select`
  ${backgroundColor2} 
  color: #1163c9;
  border: 1px solid;
  ${fontSize2} 
  margin: 5px;
  height: 25px;
  float: right;
`;

const ChangePct = styled.div`
  color: green;
  ${props =>
    props.red &&
    css`
      color: red;
    `};
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const CoinTileCompact = styled(CoinTile)`
  ${fontSize2} 
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(3, 1fr);
  justify-items: right; 
`;

const PaddingBlue = styled.div`
  ${subtleBoxShadow} 
  ${lightBlueBackground}
	padding: 10px;
`;

const ChartGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;
  // image chart is 1:3 cols
  grid-template-columns: 1fr 3fr;
`;

export default function() {
    return [<CoinGrid>
        {this.state.prices.map((price , index) => {
            let sym = Object.keys(price)[0];
            let data = price[sym]['USD'];
            let tileProps = {
               dashboardFavorite: sym === this.state.currentFavorite,
                // 点击的时候改变 currentfavorite 的值，更新 img
                onClick: () => {
                    this.setState(
                        { currentFavorite: sym, historical: null },
                        this.fetchHistorical
                    );
                    localStorage.setItem(
                        'cryptoDash',
                        JSON.stringify({
                            ...JSON.parse(localStorage.getItem('cryptoDash')),
                            currentFavorite: sym
                        })
                    );
                }
            };
            return index < 5 ? <CoinTile {...tileProps}>
                <CoinHeaderGrid>
                    {/*display coin symbol*/}
                    <div>{sym}</div>
                    <CoinSymbol>
                        {/*if the price is increasing, display in green, otherwise, display in red*/}
                       <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                          {numberFormat(data.CHANGEPCT24HOUR)}%
                        </ChangePct>
                    </CoinSymbol>
                </CoinHeaderGrid>
                {/*display the price in bigger font*/}
                <TickerPrice>${numberFormat(data.PRICE)} </TickerPrice>
            </CoinTile> :
            <CoinTileCompact {...tileProps}>
                <div>{sym}</div>
                <CoinSymbol>
                {/*if the price is increasing, display in green, otherwise, display in red*/}
                 <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                    {numberFormat(data.CHANGEPCT24HOUR)}%
                 </ChangePct>
                </CoinSymbol>
                {/*display the price in bigger font*/}
                <div>${numberFormat(data.PRICE)} </div>
            </CoinTileCompact>
        })
        }</CoinGrid>,

        // this is the coin image part
        <ChartGrid key={'chartgrid'}>
           <PaddingBlue>
               <h2 style={{textAlign: 'center'}}>{this.state.coinList[this.state.currentFavorite].CoinName}</h2>
               <img
                   alt={this.state.currentFavorite}
                   style={{ height: '200px', display: 'block', margin: 'auto' }}
                   src={`http://cryptocompare.com/${
                       this.state.coinList[this.state.currentFavorite].ImageUrl
                       }`}
               />
           </PaddingBlue>
           <PaddingBlue>

                    {/*this is the react highcharts config call*/}
                   <ReactHighcharts config={highchartsConfig.call(this)} />

           </PaddingBlue>
        </ChartGrid>]
}

