// const User = require('./src/models/user');
// const AdminUser = require('./src/models/admin')
//
// async function main() {
//     try {
//         const users = await User.all();
//         console.log(users);
//         const admins = await AdminUser.all();
//         console.log(admins);
//     } catch (error) {
//         console.error(error);
//     }
// }
// main();
const UserFactory = require('./src/factory/factoryMethod');

// Create a regular user
const userData = { name: 'John', email: 'johndo@example.com' };
UserFactory.createUser('user', userData)
    .then(user => {
        console.log('Created user:', user);
    })
    .catch(error => {
        console.error('Error creating user:', error);
    });

// Create an admin user
const adminData = {name: 'Jane', email: 'janede@example.com'};
UserFactory.createUser('admin', adminData)
    .then(adminUser => {
        console.log('Created admin user:', adminUser);
    })
    .catch(error => {
        console.error('Error creating admin user:', error);
    });

