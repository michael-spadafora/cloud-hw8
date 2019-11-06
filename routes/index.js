var express = require('express');
var router = express.Router();

var Memcached = require('../objects/memcached')
var Mysql = require('../objects/mysql')

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

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



  let cacheResult = myCache.get(query)

  if (cacheResult)
    console.log(cacheResult)


  if (!cacheResult) {
    let mysqlresult = await mysql.getInformation(club, pos)
    mysqlresult.club = club
    mysqlresult.pos = pos

    // await memcached.cacheQueryResult(query, mysqlresult)
    myCache.set(query, mysqlresult)
    console.log(mysqlresult)

    res.send(mysqlresult)
  }  
  else {
    res.send(cacheResult)
  }
})

module.exports = router;
