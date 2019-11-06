var Memcachedd = require('memcached');
const util = require('util');


class Memcached{
    constructor(){
        this.memcached = new Memcachedd();
        this.memcached.connect( 'localhost:11211', function( err, conn ){
            if( err ) {
               console.log( conn.server );
            }
        });
    }

    async cacheQueryResult(query, result) {
        console.log(query)
        console.log(result)
        await memcached.set(query, result, 1000, function (err) { /* stuff */ });
    }

    async getQueryResult(query) {
        let get = util.promisify(this.memcached.set)
        let result = await get(query)
        console.log(result)
        return result
    }   
}

module.exports = Memcached

