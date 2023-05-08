1.  Singleton este un pattern de proiectare utilizat pentru a se asigura că o clasă are o singură instanță și că aceasta poate fi accesată global. Scopul acestui pattern este de a limita numărul de instanțe ale unei clase la una singură și de a furniza un punct global de acces la acea instanță.

Un exemplu de utilizare a patternului singleton ar fi un obiect de conexiune la baza de date, deoarece nu este nevoie să se creeze mai multe obiecte de conexiune. În acest caz, utilizarea unui singleton poate ajuta la evitarea creării de obiecte inutile și poate optimiza performanța aplicației.

**********************

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
    }module.exports = DbSingleton;



**********************

2.Pattern-ul Builder este utilizat pentru a construi obiecte complexe cu ajutorul altor obiecte mai simple si independente de obiectul de tipul final pe care se doreste a fi creat. Scopul este de a separa procesul de creare a obiectului de reprezentarea acestuia, astfel incat acelasi proces de constructie sa poata fi folosit pentru a crea diferite reprezentari ale obiectului.


    class BuilderMethod {
    constructor() {
        this.user = {
            name:null,
            email: null
        };
    }
    setName(name){
        this.user.name = name;
        return this;
    }

    setEmail(email) {
        this.user.email = email;
        return this;
    }

    build() {
        return this.user;
    }}



În codul de mai sus este implimentat patternul Builder. Clasa din exemplu conține metode pentru a seta numele și adresa de email ale utilizatorului, folosind un obiect user gol ca șablon și actualizându-l cu informațiile specificate în fiecare metodă. După ce toate atributele necesare sunt setate, metoda build() returnează obiectul User completat.


3.Factory Method este utilizat pentru a crea obiecte de un anumit tip în mod dinamic, în funcție de nevoile aplicației. În loc să creeze obiecte direct, aplicația utilizează o metodă de fabrică (Factory Method) care se ocupă de crearea obiectelor, astfel încât aplicația să fie mai flexibilă și mai ușor de întreținut.


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
    }}
    

În codul de mai sus sunt implimentate 2 tipuri de design pattern: Builder şi Factory Method.
Builder pattern este folosit în UserBuilder, o clasă care construiește obiecte de tip User sau AdminUser prin intermediul metodelor setId(), setName() și setEmail(), și apoi se finalizează prin apelarea metodei build().
Factory method pattern este utilizat în UserFactory, o clasă care conține o metodă statică createUser() care primește două argumente: type, care specifică tipul de utilizator pe care dorim să îl creăm, și data, care conține informațiile utilizatorului (de exemplu, id, nume, email). În funcție de tipul utilizatorului specificat în argumentul type, createUser() va crea un utilizator de tipul respectiv folosind un obiect de tip UserBuilder și apoi va insera informațiile utilizatorului în baza de date. Metoda createUser() returnează obiectul utilizator creat.


Astfel, Builder pattern este utilizat pentru a construi obiecte de tip User și AdminUser, în timp ce Factory method pattern este utilizat pentru a crea aceste obiecte și a le salva în baza de date. 
 
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
	    
    
Acest cod crează, prin intermediul Factory Method, obiecte de tip User şi AdminUser definind două obiecte de date, userData și adminData, care conțin informații despre utilizatorii pe care vrem să îi creăm.
Apelând funcția createUser() a clasei UserFactory, putem să creăm obiecte de tip User și AdminUser în funcție de tipul specificat. În cazul de mai sus, se vor crea mai întâi un utilizator și apoi un utilizator cu rol de administrator. 

