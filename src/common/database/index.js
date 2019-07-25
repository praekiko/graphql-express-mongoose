class Database {
	constructor() {
		this.dependencies = {};
	}

	setDB(value) {
		this.set('db', value);
	}

	getDB() {
		return this.get('db');
	}

	get(name) {
		return this.dependencies[name];
	}

	set(name, value) {
		this.dependencies[name] = value;
	}
}

export default new Database();
