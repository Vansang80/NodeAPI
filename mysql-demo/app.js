const mysql = require('mysql')
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'pascal',
    database : 'nodejs'

})

db.connect((err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('Connected')

        db.query('SELECT * FROM menbers', (err, result) => {
            if (err) {
                console.log(err.message)
            } else {
                console.log(result[0].name)
            }
        })
    }

})