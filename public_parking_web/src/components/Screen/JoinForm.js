import React, {useState} from "react";
import styled from "styled-components";
import axios from 'axios';

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
// 회원가입 값 받기
//값없으면 disabled
function JoinForm(location) {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputNick, setInputNick] = useState('');
  const [inputCarsize, setInputCarsize] = useState('');
  const [inputCarspec, setInputCarspec] = useState('');
  const [inputLivestate, setInputLivestate] = useState('');

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  }

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  }
  const handleInputNick = (e) => {
    setInputNick(e.target.value);
  }
  const handleInputCarsize = (e) => {
    setInputCarsize(e.target.value);
  }
  const handleInputCarspec = (e) => {
    setInputCarspec(e.target.value);
  }
  const handleInputLivestate = (e) => {
    setInputLivestate(e.target.value);
  }

  // 회원가입 버튼 클릭 이벤트
  const onJoin = () => {
      if(inputId !== '' && inputPw !== '' && inputNick !== '' && inputCarsize !== '' && inputCarspec !== '' && inputLivestate !== '' ){
        axios.post('/api/user_join', null, {
            params: {
            'user_id': inputId,
            'user_pw': inputPw,
            'user_nick': inputNick,
            'user_carsize': inputCarsize,
            'user_carspec': inputCarspec,
            'user_livestate': inputLivestate
            }
        })
        .then(res => {
          console.log(res.data);
        })
        .catch()

        alert("가입을 환영합니다");
        document.location.href = '/';
      }
      else {
        alert('빈칸 없이 입력해주세요!');
      }
  }


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
      <Input id="nick" name="nick" placeholder="닉네임을 입력해주세요" value={inputNick} onChange={handleInputNick}/>
      <Input id="carSize" name="carSize" placeholder="차크기를 입력해주세요 (준중형, 중형 등)" value={inputCarsize} onChange={handleInputCarsize}/>
      <Input id="carSpec" name="carSpec" placeholder="차 형태를 입력해주세요 (세단, SUV 등)" value={inputCarspec} onChange={handleInputCarspec}/>
      <Input id="liveState" name="liveState" placeholder="거주지를 입력해주세요" value={inputLivestate} onChange={handleInputLivestate}/>
      <Button onClick={onJoin}>회원가입</Button>
    </Container>
  );
}

export default JoinForm;