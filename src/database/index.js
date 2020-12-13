import Sequelize from 'sequelize';

//MODELS
import BlogUser from '../app/models/BlogUser';
//import Post from '../app/models/Post';
//import Category from '../app/models/Category


//CONFIG DATABASE
import databaseConig from '../config/database';

const models = [BlogUser];

class Database {

    constructor() {

        this.init();
    }

    init() {

        this.connection = new Sequelize(databaseConig);

        models.map(model => model.init(this.connection));

    }

}

export default new Database();