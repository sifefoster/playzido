import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GameBoard = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 16px;
`;

export const Button = styled.button`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  flex-grow: 0;
  background: none;
  transition: all 0.5s;

  &:nth-child(3n + 1) {
    border-left-color: transparent;
  }
  
  &:nth-child(3n) {
    border-right-color: transparent;
  }

  &:nth-child(1), &:nth-child(2), &:nth-child(3) {
    border-top-color: transparent;
  }

  &:nth-child(7), &:nth-child(8), &:nth-child(9) {
    border-bottom-color: transparent;
  }

  &:disabled {
    background: #cccccc20;
  }


  &:active {
    background: #CCCCCC50;
  }
`;

export const Results = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 24px;
`;

export const PlayerInfo = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 20px;
  font-size: 12px;
  font-weight: bold;

  border: 1px solid transparent;
  border-radius: 4px;
  padding: 4px 8px;
  transition: all 0.5s;

  ${props => props.active && css`
    border: 1px solid green;
    background-color: #3bb78f;
    background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
    color: white;
  `};

  ${props => props.winner && css`
    border: 1px solid red;
    background-color: red;
    background-image: none;
    color: white;
  `}

  span {
    display: flex;
    justify-content: center;
  }
`;

export const GameActionsWrapper = styled.div`
  ${Button} {
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    height: auto;
    width: auto;
    background: black;
    color: white;
    font-weight: bold;
    display: inline-flex;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
      opacity: 0.5;
    }
  }
`;

export const Matches = styled.div`
  font-size: 10px;
  font-weight: 500;
  display: flex;
  margin-top: 24px;
`;

export default Wrapper;