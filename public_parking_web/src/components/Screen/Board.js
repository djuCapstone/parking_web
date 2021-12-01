import {React, useEffect, useState} from 'react';
import styled from "styled-components";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import domToReact from 'html-react-parser';
import axios from "axios";

const App = styled.div`
  text-align: center;
  margin-top: 300px;
  height: calc(80vh - 61px);
  padding: 20px;
  border-top: 1px solid #3399ff;
`;

const ReviewContainer = styled.div`
  margin: 0 auto;
  height: 30vh;
  width: 80%;
  border: 1px solid #333;
  padding: 10px 0 30px 0;
  border-radius: 5px;
  margin-bottom : 50px; 
  overflow: auto;
`

const FormWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`

const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid #3399ff;
  border-radius: 5px;
`
const ParkingInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid #3399ff;
  border-radius: 5px;
`

const SubmitButton = styled.button`
  margin-top: 10px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  border: none;
  background: #3399ff;
  border-radius: 5px;
  color: white;
    &:hover {
        background-color: red;
        cursor: pointer;
    }
`
  
function Board() {
  let isLogin = false;
  if(sessionStorage.getItem('user_id') !== null){
      isLogin = true;
  }

  const [reviewContent, setReviewContent] = useState({
    title: '',
    parkingTitle: '',
    nick: sessionStorage.getItem("user_nick"),
    content: ''
  });

  const [viewContent, setViewContent] = useState([]);
  const getValue = e => {
    const { name, value } = e.target;
    setReviewContent({
      ...reviewContent,
      [name]: value
    })
  };

  const submitReview = ()=>{
    axios.post('/api/BoardInsert', null, {
      params : {
        "title": reviewContent.title,
        "parkingTitle": reviewContent.parkingTitle,
        "nick": reviewContent.nick,
        "content": reviewContent.content
      }
    }).then(res =>{
      if(res.data === "success"){
        alert('등록 완료!');
      }
    })
  };

  useEffect(() => {
    axios.get('/api/BoardLoad').then((res)=>{
      setViewContent(res.data);
    })
  })

  return (
    <App>
      <h1>후기 공유 커뮤니티</h1>
      <ReviewContainer>
      {viewContent.slice(0).reverse().map(element =>
        <div class="review">
          <h2>{element.title}</h2>
          <h4>주차장명:{element.parkingTitle}</h4>
          <h4>작성자:{element.nick}</h4>
          <div>
            {domToReact(element.content)}
          </div>
        </div>
      )}
      </ReviewContainer>
      {isLogin ? <FormWrapper>
        <TitleInput name="title" placeholder="제목" onChange={getValue}></TitleInput>
        <ParkingInput name="parkingTitle" placeholder="주차장 이름" onChange={getValue}></ParkingInput>
        <CKEditor
          editor={ClassicEditor}
          data="<p>후기를 입력해주세요!</p>"
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setReviewContent({
              ...reviewContent,
              content: data
            })
            console.log(reviewContent);
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
        <SubmitButton onClick={submitReview}>작성완료</SubmitButton>
      </FormWrapper>: <></>
      }
    </App>
  );
}

export default Board;