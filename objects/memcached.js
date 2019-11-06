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

    cacheQueryResult = async(query, result) => {
        console.log(query)
        console.log(result)
        await this.memcached.set(query, result, 1000, function (err) { console.log(err)/* stuff */ });
    }

    getQueryResult = async(query)=>  {
        let result = await this.memcached.get(query)

        console.log("MEMCACHE: " + result)
        return result
    }   
}

module.exports = Memcached

