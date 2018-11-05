import {fontSize1, greenBoxShadow, color3 } from './style';
import styled from 'styled-components';

// this is the confirm button style
export const ConfirmButton = styled.div`
  margin: 20px;
  color: ${color3}
  ${fontSize1} 
  font-family: Exo 2, sans-serif;
  padding: 5px;
  &:hover {
    ${greenBoxShadow} 
    cursor: pointer;
  }
`;
