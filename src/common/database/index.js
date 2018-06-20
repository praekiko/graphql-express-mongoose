// import { IDb } from './definitions/db';

class DI {
  constructor() {
    this.dependencies = {};
  }

  setDb(value) {
    this.set('db', value);
  }

  getDb() {
    return this.get('db');
  }

  get(name) {
    return this.dependencies[name];
  }

  set(name, value) {
    this.dependencies[name] = value;
  }
}

export default new DI();
