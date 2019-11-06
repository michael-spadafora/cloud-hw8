var express = require('express');
var router = express.Router();

var Memcached = require('../objects/memcached')
var Mysql = require('../objects/mysql')

let memcached = new Memcached()
let mysql = new Mysql()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hw8', async function(req, res) {
  let pos = req.query.pos
  let club = req.query.club

  let query = "pos=" + pos + 'club=' + club

  console.log("NEW QUERY: " + query)

  let memcachedResult = await memcached.getQueryResult(query)

  if (!memcachedResult) {
    let mysqlresult = await mysql.getInformation(club, pos)
    mysqlresult.club = club
    mysqlresult.pos = pos
    res.send(mysqlresult)
    await memcached.cacheQueryResult(query, mysqlresult)
  }  
})

module.exports = router;
