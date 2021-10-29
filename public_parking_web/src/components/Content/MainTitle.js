import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
    padding: 20px 0 20px 0;
    font-size:32px;
    letter-spacing: 8px;
    text-align:center;
    background-color: #3399ff;
    border-bottom: 1px solid gray;
`;


function MainTitle({ title }){
    return (
        <Title>{title}</Title>    
    )
}

export default MainTitle;