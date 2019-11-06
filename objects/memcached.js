var Memcachedd = require('memcached');

class Memcached{
    constructor(){
        this.memcached = new Memcachedd();
        memcached.connect( 'localhost:11211', function( err, conn ){
            if( err ) {
               console.log( conn.server );
            }
        });
    }

    async cacheQueryResult(query, result) {
        await this.memcached.set(query, result)   
    }

    async getQueryResult(query) {
        let result = await this.memcached.get(query)
        return result
    }   
}

module.exports = Memcached

