const db = require('../factory/dbSingleton');
const UserBuilder = require('./builderMethod');

class AdminUser {
    static table = 'admin_users';

    static async all() {
        const dbConn = db.getInstance();
        const userBuilder = new UserBuilder();

        let query = `SELECT * FROM ${AdminUser.table}`;

        return new Promise((resolve, reject) => {
            dbConn.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const adminUsers = [];
                    results.forEach(result => {
                        const adminUser = userBuilder
                            .setName(result.name)
                            .setEmail(result.email)
                            .build();
                        adminUsers.push(adminUser);
                    });
                    resolve(adminUsers);
                }
            });
        });
    }
}

module.exports = AdminUser;
