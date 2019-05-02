var express = require('express');
var router = express.Router();
var mariadb  = require('mariadb/callback');

const SERVER_HOST = 'localhost'; 
const MYSQL_PORT = 3306; // DB SERVER PORT
var provId = ""; 

var configuration = {
  host: SERVER_HOST,
  user: 'memeoo',
  password: 'shsbsy70',
  port: MYSQL_PORT,
  database: 'tossup_prov'
};

class DB {
  constructor(config) {
      this.connection = mariadb.createConnection(config);
  }

  query(sql, args) {
      return new Promise((resolve, reject) => {
          this.connection.query(sql, args, (err, rows) => {
              if (err)
                  return reject(err);
              resolve(rows);
          });
      });
  }

  getQuery() {
      return this.connection;
  }

  close() {
      return new Promise((resolve, reject) => {
          this.connection.end(err => {
              if (err)
                  return reject(err);
              resolve();
          });
      });
  }
}

/* GET home page. */
router.get('/login', function(req, res, next) {
  let database = new DB(configuration);
  console.log(" try login !!!!");
  let id = req.query.id;
  let pass = req.query.pass;
  let loginQuery = "select mail, name from provider where userId='"+id+"' and password='"+pass+"'";
  let loginInfo = {
      userId : id,
      password: pass
  };
  
  provId = loginInfo.userId;

  database.query(loginQuery).then(result =>{
    console.log(" result => ", result);
    if(result.length == 0){
      console.log(" 아이디와 비밀번호를 다시 확인해 주세요 ");
      res.sendStatus(403);
      
    }else{
      console.log(" @@@@@ ")
      res.send(200, result);
    }
  }).catch(reject =>{
    console.log(" reject => ", reject);
  });
  

  
  // res.render('index', { title: 'Express' });
});

router.post('/signup', function(req, res, next) {
    let database = new DB(configuration);
    console.log(" try sign up !!!!");
    console.log(" req => ", req.body);
    console.log(" req => ", req.body.id);
    console.log(" req => ", req.body.pass);

    let data = {
      'userId':req.body.id,
      'password': req.body.pass,
      'name': req.body.name,
      'mail': req.body.smail,
    };

    // let insertQuery = "INSERT INTO provider set ?";
    let insertQuery = "INSERT INTO provider (userId, password, name, mail) VALUES ('"+data.userId+"','"+data.password+"','"+data.name+"','"+data.mail+"')";
    database.query(insertQuery).then(rows =>{
      console.log(" rows => ", rows);
      res.send("Insert Succeed!");
    }, err =>{
      console.log(" err => ", err);
    });

  });

  router.post('/saveExam', function(req, res, next) {
    let database = new DB(configuration);

    console.log(" Save Exam !!");
    console.log(" req => ", req.body);


    let data = {
      'ques1':req.body.ques1,
      'ques2': req.body.ques2,
      'ques11': req.body.ques11,
      'provId': req.body.provId,
    };

    // let insertQuery = "INSERT INTO provider set ?";
    let insertQuery = "INSERT INTO exam (ques1, ques2, ques11, provId) VALUES ('"+data.userId+"','"+data.password+"','"+data.name+"','"+data.mail+"')";

    console.log(" try sign up !!!!");
    console.log(" req => ", req.body);
    // console.log(" req => ", req.body.id);
    // console.log(" req => ", req.body.pass);

    let data = {
      'q1':req.body.ques1Txt,
      'q2': req.body.ques2Txt,
      'q3img': req.body.ques3Img,
      'q4': req.body.ques4aud,
      'q5': req.body.ques5aud,
      'q6': req.body.ques6aud,
      'part4img': req.body.part4Img,
      'q7': req.body.ques7aud,
      'q8': req.body.ques8aud,
      'q9': req.body.ques9aud,
      'q10': req.body.ques10aud,
      'q11': req.body.ques11Txt,
      'provId': provId,
    };

    // let insertQuery = "INSERT INTO provider set ?";
    let insertQuery = "INSERT INTO exam (q1, q2, q3img, q4, q5, q6, part4img, q7, q8, q9, q10, q11, provId) VALUES "+ 
     "('"+data.q1+"','"+data.q2+"','"+data.q3img+"','"+data.q4+"','"+data.q5+"','"+data.q6+"','"+data.part4img+",'"+data.q7+"' "+
     ",'"+data.q8+"','"+data.q9+",'"+data.q10+"','"+data.q11+"','"+data.q4+"','"+data.provId+"')";

>>>>>>> f6de8dceae162c58808843c9f3482d2e152bd7dd
    database.query(insertQuery).then(rows =>{
      console.log(" rows => ", rows);
      res.send("Insert Succeed!");
    }, err =>{
      console.log(" err => ", err);
    });

  });
 
module.exports = router;
