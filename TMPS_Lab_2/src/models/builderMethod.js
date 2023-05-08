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
    }
}

module.exports = BuilderMethod;
