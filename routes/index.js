var express = require('express');
var router = express.Router();
var mysql  = require('mysql');

const SERVER_HOST = 'localhost'; 
const MYSQL_PORT = 3306; // DB SERVER PORT 

var configuration = {
  host: SERVER_HOST,
  user: 'root',
  password: 'shsbsy70',
  port: MYSQL_PORT,
  database: 'tossup_prv'
};

class DB {
  constructor(config) {
      this.connection = mysql.createConnection(config);
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
  let loginQuery = "select count(mail) from provider where ?";
  let loginInfo = {
      id : id,
      password: pass
  };
  database.query(loginQuery, loginInfo).then(result =>{
    console.log(" result => ", result);
  }).catch(reject =>{
    console.log(" reject => ", reject);
  });
  

  
  // res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
    let database = new DB(configuration);
    console.log(" try sign up !!!!");
    // res.render('index', { title: 'Express' });
  });
 
module.exports = router;
