const express = require('express');
const router2 = express.Router();
const mongoose = require("mongoose");
const connection =  require("../config/mongodb");
const fs = require('fs');
const { Console } = require('console');

// MongoDB 스키마 생성
const UserSchema = new mongoose.Schema({
  id: String, // 아이디
  passwd: String, // 비밀번호
  nick: String, // 닉네임
  car_size: String, // 차 크기 
  car_spec: String, // 차 유형
  live_state: String // 거주지
});

const BoardSchema = new mongoose.Schema({
  title: String, 
  parkingTitle: String, 
  nick: String, 
  content: String
});

const Users = connection.model("User", UserSchema);
const Boards = connection.model("Board", BoardSchema);

// 주차장 정보 json 읽어서 클러스터러화
let clusterMakers = []
fs.readFile('./전국공영주차장.json', 'utf8', (error, jsonFile) => {
    if (error) return console.log(error);

    const jsonData = JSON.parse(jsonFile);

    const position = jsonData.positions;
    for(let i = 0; i < position.length; i++){
        if(position[i].위도 !== undefined && position[i].경도 !== undefined && position[i].위도 !== '' && position[i].경도 !== ''){
          clusterMakers.push({
                lat: position[i].위도,
                lng: position[i].경도,
                name: position[i].주차장명,
                addr: position[i].소재지도로명주소 !== undefined && position[i].소재지도로명주소 !== '-' && position[i].소재지도로명주소 !== '' ? '(도로명) '+position[i].소재지도로명주소 : '(지번) '+position[i].소재지지번주소,
                lot : position[i].주차구획수 !== undefined && position[i].주차구획수 !== '' ? position[i].주차구획수+'대' : '정보 없음',
                isFree : position[i].요금정보 !== undefined && position[i].요금정보 !== '' ? position[i].요금정보 : '정보 없음',
                time :  position[i].주차기본시간 !== undefined && position[i].주차기본시간 !== '' ? position[i].주차기본시간+'분' : '정보 없음',
                fee :  position[i].주차기본요금 !== undefined && position[i].주차기본요금 !== '' ? position[i].주차기본요금+'원' : '정보 없음',
                addtime :  position[i].추가단위시간 !== undefined && position[i].추가단위시간 !== '' ? position[i].추가단위시간+'분' : '정보 없음',
                addfee :  position[i].추가단위요금 !== undefined && position[i].추가단위요금 !== '' ? position[i].추가단위요금+'원' : '정보 없음',
                pay :  position[i].결제방법 !== undefined && position[i].결제방법 !== '' ? position[i].결제방법 : '정보 없음',
                monthfee :  position[i].월정기권요금 !== undefined && position[i].월정기권요금 !== '' ? position[i].월정기권요금+'원' : '정보 없음'
            });
        }
    }
});

// 라우팅
router2.get('/getClusterMarkers', (req, res) => {
  res.send(clusterMakers);
});

router2.get('/', (req, res) => {
    console.log('3001');
    res.send("hello");
});

router2.post('/user_inform/onLogin', function(req, res){
  console.log("req ", req);
  const user_id = req.query.user_id;
  const user_pw = req.query.user_pw;
  connection.db.collection("users").findOne({id : user_id, passwd: user_pw}, function(err, data){
    if(data !== null){
      if(data.id === user_id && data.passwd === user_pw){
        console.log("로그인 성공");
        res.send(data);
      }
    }
    else{
      console.log("로그인 실패");
      res.send("login failed");
    }
  })
});

router2.post('/user_join', function(req, res){
  const user_id = req.query.user_id;
  const user_pw = req.query.user_pw;
  const user_nick = req.query.user_nick;
  const user_carsize = req.query.user_carsize;
  const user_carspec = req.query.user_carspec;
  const user_livestate = req.query.user_livestate;
  const setUser = new Users({
    id: user_id, // 아이디
    passwd: user_pw, // 비밀번호
    nick: user_nick, // 닉네임
    car_size: user_carsize, // 차 크기 
    car_spec: user_carspec, // 차 유형
    live_state: user_livestate // 거주지
  });
  setUser.save();
});

router2.post('/BoardInsert', function(req, res){
  console.log(req.query);
  const title = req.query.title;
  const parkingTitle = req.query.parkingTitle;
  const nick = req.query.nick;
  const content = req.query.content;

  const setBoard = new Boards({
    title: title, 
    parkingTitle: parkingTitle, 
    nick: nick, 
    content: content
  });
  console.log(setBoard);
  setBoard.save();
  res.send("success");
});

router2.get('/BoardLoad', function(req, res){
  connection.db.collection("boards").find({}).toArray(function(err, data){
    res.send(data);
  });

})


module.exports = router2
