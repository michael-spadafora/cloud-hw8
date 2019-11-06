var Memcached = require('memcached');

class Memcached{
    constructor(){
        this.memcached = new Memcached();
        memcached.connect( 'localhost:11211', function( err, conn ){
            if( err ) {
               console.log( conn.server );
            }
        });
    }

    cacheQueryResult(query, result) {
        this.memcached.set(query, result)   
    }

    getQueryResult(query) {
        let result = this.memcached.get(query)
        return result
    }   
}

export default Memcached

