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

const ChartGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
`;

export default function() {
    return <CoinGrid>
        {this.state.prices.map((price , index) => {
            let sym = Object.keys(price)[0];
            let data = price[sym]['USD'];
            return index < 5 ? <CoinTile>
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
            <CoinTileCompact>
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
        }</CoinGrid>
}

