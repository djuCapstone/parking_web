import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from 'axios';

const Container = styled.div`
  margin-top: 20px;
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
function LoginForm(location) {
  const [inputId, setInputId] = useState('')
  const [inputPw, setInputPw] = useState('')

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value)
  }

  const handleInputPw = (e) => {
    setInputPw(e.target.value)
  }

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    axios.post('/user_inform/onLogin', null, {
        params: {
        'user_id': inputId,
        'user_pw': inputPw
        }
    })
    .then(res => console.log(res))
    .catch()
  }

  // 회원가입 버튼 클릭 이벤트
  const onJoin = () => {
    console.log('click join')
}

  // 페이지 렌더링 후 가장 처음 호출되는 함수
  useEffect(() => {
      axios.get('/user_inform/login')
      .then(res => console.log(res))
      .catch()
  },
  // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
  [])
  console.log(location);
  return (
    <Container>
      <Input id="id" name="id" placeholder="아이디를 입력해주세요" value={inputId} onChange={handleInputId}/>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={inputPw}
        onChange={handleInputPw}
      />
      <Button onClick={onClickLogin}>로그인</Button>
      <Button onClick={onJoin}>회원가입</Button>
    </Container>
  );
}

export default LoginForm;