var mysql = require('mysql');
const util = require('util');

class MySQL {
    constructor(){
        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'password',
            database : 'hw8'
          });
        this.tablename = "test"
        this.connection.connect()
    }

    async getInformation(club, pos) {
        let query1 = "SELECT Player, A from test WHERE Club='" + club + "' AND POS='" + pos + "' ORDER BY A DESC, GS DESC, PLAYER DESC"
        let query2 = "SELECT AVG(A) from test WHERE Club='" + club + "' AND POS='" + pos +"'"

        let query = util.promisify(this.connection.query).bind(this.connection);
        
        let items = await (async () => {
              const rows = await query(query1);
              const rows2 = await query(query2);
              let result = {
                player: rows[0]['Player'],
                max_assists: rows[0].A,
                avg_assists: rows2[0]['AVG(A)']
                }  
              return result
        })()

        return items


        // let response = await this.connection.query(query1, function(err, rows, fields) {
        //     if (err) throw err;
         
        //     for (var i in rows) {
        //         console.log('Post Titles: ', rows[i]);
        //     }

        // });
        // let player= await this.connection.query(query1 )

        // let avg_assists = await this. connection.query(query2)

        // console.log(player)

        // let result = {
        //     player: player.player,
        //     max_assists: player.A,
        //     avg_assists: avg_assists
        // }
        // return result
        


    }
}

module.exports = MySQL