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
        console.log("SET QUERY: " + query)
        console.log("SET RESULT: " + result)
        await this.memcached.set(query, result, 100, function (err) { console.log("error in getting")/* stuff */ });
    }

    getQueryResult = async(query)=>  {
        let result = await this.memcached.get(query)

        console.log("GET QUERY: " + query)
        console.log("GET RESULT: " + result)
        return result
    }   
}

module.exports = Memcached

