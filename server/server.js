const express = require("express");
const connection =  require("./config/mongodb");
const http = require("http");
const router = require("./router");
const bodyParser = require("body-parser");
const port = 3001;
const api = require('./routes/index')
const cors = require('cors');


const app = express();

app.use(cors());

app.use('/api', api);

// 정적 리소스를 관리하는 폴더를 static()으로 지정하면 해당 폴더 경로가 라우터로 인식되지 않고 리소스 파일에 접근할 수 있다. 
app.use(express.static("public"));

// request객체의 body 데이터를 중첩된 json 객체 형식으로 사용하기 위한 설정
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () =>{
    console.log("connected, port : ", port);
}).on('error', err => console.log(err));

// 모듈화된 router를 호출하면서 Express app을 주입시킨다. 
router(app);