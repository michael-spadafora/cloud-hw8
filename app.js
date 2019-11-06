var express    = require("express");
var Memcached = require('memcached');
var app = express();
var port = Number(process.env.PORT || 5000);
 
console.log("Listening on "+port+", Web URL: http://localhost:"+port);
app.listen(port);

var memcached = new Memcached();

memcached.connect( '127.0.0.1:11211', function( err, conn ){
    if( err ) {
       console.log( conn.server );
    }
});


var profile = {'name':'Rohit kumar', 
'location':'Delhi', 
'emailid':'iamrohitx@gmail.com' 
}
// create your profile key where user personal information will be store in json format.               
memcached.set('profile', profile, 10000, function (err) { 
    if(err) throw new err;
});

// get profile key data
memcached.get('profile', function (err, data) {
    console.log(data);
});

console.log("Listening on "+port+", Web URL: http://localhost:"+port);
app.listen(port);