import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 300px;
  height: calc(80vh - 61px);
  padding: 20px;
  border-top: 1px solid #3399ff;
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const Button = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #3399ff;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
  `}
`;
//아디 비번 값 받기
//값없으면 disabled
function Board(location) {
  console.log(location);
  return (
    <Container>
    <Button>게시판</Button>
    </Container>
  );
}

export default Board;