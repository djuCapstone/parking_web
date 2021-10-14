import * as express from "express";
const cors = require("cors")();
const connection =  require("../config/mongodb");
const http = require("http");
const router = require("./router");

const app: express.Application = express();

app.use(cors);
app.use(express.urlencoded({limit : 50000, extended: true}));
app.use(express.json({limit : 50000}));

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Methods", ["GET,PUT,POST,DELETE"]);
  res.header("Access-Control-Allow-Headers", ["Content-Type"]);
  next();
});

router(app);
const httpServer = http.createServer(app);
httpServer.listen(8080);

app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("hello typescript express!");

    console.log(connection.name);
    
  }
);
app.get(
  "/test",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("hello typescript express for test!");

    console.log(connection.name);
    
  }
);

export default app; 