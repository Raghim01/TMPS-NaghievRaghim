const db = require('../factory/dbSingleton');
const UserBuilder = require('../models/builderMethod');

class UserFactory {
    static async createUser(type, data) {
        const dbConn = db.getInstance();
        const userBuilder = new UserBuilder();

        switch(type) {
            case 'user':
                const user = userBuilder
                    .setName(data.name)
                    .setEmail(data.email)
                    .build();
                const query = `INSERT INTO users_tmps ( name, email) VALUES ('${user.name}', '${user.email}')`;
                return new Promise((resolve, reject) => {
                    dbConn.query(query, (error, results) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(user);
                        }
                    });
                });
            case 'admin':
                const adminUser = userBuilder
                    .setName(data.name)
                    .setEmail(data.email)
                    .build();
                const adminQuery = `INSERT INTO admin_users ( name, email) VALUES ('${adminUser.name}', '${adminUser.email}')`;
                return new Promise((resolve, reject) => {
                    dbConn.query(adminQuery, (error, results) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(adminUser);
                        }
                    });
                });
            default:
                throw new Error('Invalid user type specified');
        }
    }
}

module.exports = UserFactory;
