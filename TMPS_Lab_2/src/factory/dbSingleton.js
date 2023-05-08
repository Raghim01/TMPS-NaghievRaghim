const mysql = require('mysql');

class DbSingleton {
    static instance = null;

    static getInstance() {
        if (!DbSingleton.instance) {
            DbSingleton.instance = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'tokyo',
                database: 'users_database'
            });
            DbSingleton.instance.connect(function(err) {
                if (err) {
                    console.error('Error connecting to MySQL database:', err);
                    process.exit(1);
                }
                console.log('Connected to MySQL database!');
            });
        }
        return DbSingleton.instance;
    }
}

module.exports = DbSingleton;

