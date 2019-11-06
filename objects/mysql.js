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
        let connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'password',
            database : 'hw8'
          });
        let query1 = "SELECT Player, A from test WHERE Club='" + club + "' AND POS='" + pos + "' ORDER BY A DESC, GS DESC, PLAYER DESC"
        let query2 = "SELECT AVG(A) from test WHERE Club='" + club + "' AND POS='" + pos +"'"

        let player= await connection.query(query1)
        let avg_assists = await connection.query(query2)

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