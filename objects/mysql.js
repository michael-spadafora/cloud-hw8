var mysql = require('mysql');

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

        await this.connection.query(query1, function(err, players, fields) {
            if (err) throw err;

            let result = {
                player: player[0].player,
                max_assists: player[0].A,
            }

            this.connection.query(query2, function(err, item, fields) {
                console.log(item)
            })
        })


        let player= await this.connection.query(query1 )

        let avg_assists = await this. connection.query(query2)

        console.log(player)

        let result = {
            player: player.player,
            max_assists: player.A,
            avg_assists: avg_assists
        }
        return result
        


    }
}

module.exports = MySQL