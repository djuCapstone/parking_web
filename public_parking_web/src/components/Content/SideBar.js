import {React, useState} from 'react';
import styled from 'styled-components';
import { BrowserRouter, BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import login from '../Screen/LoginForm';
import board from '../Screen/Board';
import { useLocation } from 'react-router-dom';   

const Sidebar = styled.div`
    width: 400px;
    height: calc(100vh - 81px);
`;
const Search = styled.input`
    width: 80%;
    margin-top: 10px;
    padding: 20px 0;
    text-align: center;
    font-size : 1.2rem;
    border: 1px solid gray;
    border-radius : 10px
    border-right : 0px;
`;
const SearchButton = styled.div`
    display: inline-block;
    text-align: center;
    width: calc(400px - 82%);
    font-size : 1.2rem;
    padding: 20px 0;
    background-color: #3399ff;
    color: white;
    &:hover {
        background-color: red;
    }
`;
const ButtonContainer = styled.div`
    width: 400px;
    text-align: center;
    position: absolute;
    bottom: 0;
`;

const Button = styled.div`
    display: inline-block;
    text-decoration: none;
    width: 80%;
    heigth: 30vh;
    margin: 10px 20px;
    font-size : 1.2rem;
    background-color: #3399ff;
    border-radius: 10px;
    color: white;
    &:hover {
        background-color: red;
    }
`;
const StyledLink = styled(Link)`
    display: inline-block;
    text-decoration: none;
    color: white;
    width: 100%;
    padding: 15px 0;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Logout = () =>{
    sessionStorage.removeItem('user_id');
    alert('로그아웃 되었습니다.');
    document.location.href = '/';
}


function SideBar(){
    let isLogin = false;
    if(sessionStorage.getItem('user_id') !== null){
        isLogin = true;
    }

    return (
        <BrowserRouter>
        <Sidebar>
            <Search placeholder= '주차장 검색!'></Search>
            <SearchButton>검색</SearchButton>
            <ButtonContainer>
                {isLogin ?
                <Button onClick={Logout}><StyledLink to= '/logout'>로그아웃</StyledLink></Button>
                :<Button><StyledLink to= '/login' >로그인</StyledLink></Button>
                }
                <Button><StyledLink to= '/board'>커뮤니티</StyledLink></Button>
                <Switch>
                    <Route path='/login' component={login}/>
                    <Route path='/board' component={board}/>
                </Switch>
            </ButtonContainer>
        </Sidebar>    
        </BrowserRouter>
    )
}

export default SideBar;