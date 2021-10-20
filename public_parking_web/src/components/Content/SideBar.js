import React from 'react';
import styled from 'styled-components';

const Sidebar = styled.div`
    width: 400px;
    height: calc(100vh - 81px);
    text-align: center;
`;
const Search = styled.input`
    width: 80%;
    heigth: 30vh;
    margin: 10px 20px;
    text-align: center;
    font-size : 1.2rem;
`;
const SearchButton = styled.div`
    display: inline-block;
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

function SideBar(){
    return (
        <Sidebar>
            <Search placeholder= '주차장 검색!'></Search>
            <SearchButton>검색하기</SearchButton>
        </Sidebar>    
    )
}

export default SideBar;