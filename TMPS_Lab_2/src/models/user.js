const db = require('../factory/dbSingleton');
const UserBuilder = require('./builderMethod');

class User {
    static table = 'users_tmps';

    static async all() {
        const dbConn = db.getInstance();
        const userBuilder = new UserBuilder();

        let query = `SELECT * FROM ${User.table}`;

        return new Promise((resolve, reject) => {
            dbConn.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users = [];
                    results.forEach(result => {
                        const user = userBuilder
                            .setName(result.name)
                            .setEmail(result.email)
                            .build();
                        users.push(user);
                    });
                    resolve(users);
                }
            });
        });
    }
}

module.exports = User;
