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
    }

    async getInformation(club, pos) {
        let query1 = "SELECT Player, A from test WHERE Club='" + club + "' AND POS='" + pos + "' ORDER BY A DESC, GS DESC, PLAYER DESC"
        let query2 = "SELECT AVG(A) from test WHERE Club='" + club + "' AND POS='" + pos +"'"


  


        await this.connection.connect()

        let query = util.promisify(this.connection.query).bind(this.connection);
        
        let items = await (async () => {
            try {
              const rows = await query(query1);
              console.log(rows);
              return rows
            } finally {
              this.connection.end();
            }
        })()

        let items2 = await (async () => {
            try {
              const rows = await query(query2);
              console.log("items 2" + rows);
              return rows
            } finally {
              this.connection.end();
            }
        })()

        let result = {
                player: items[0].player,
                max_assists: items[0].A,
                avg_assists: items2[0]
            }  

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