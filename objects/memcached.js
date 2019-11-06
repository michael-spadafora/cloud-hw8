var Memcachedd = require('memcached');
const util = require('util');

var memjs = require('memjs')

class Memcached{
    constructor(){
        // this.memcached = new Memcachedd();
        // this.memcached.connect( 'localhost:11211', function( err, conn ){
        //     if( err ) {
        //        console.log( conn.server );
        //     }
        // });

        this.memcached = memjs.Client.create('localhost:11211')
    }

    async cacheQueryResult(query, result) {
        await this.memcached.set(query, result)   
    }

    async getQueryResult(query) {
        let result = this.memcached.get(query, function(err, value) {
            console.log(value.toString())
        }) 

        return result
    }   
}

module.exports = Memcached

