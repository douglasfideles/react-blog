import Sequelize from 'sequelize';
import mongoose from 'mongoose';
//MODELS
import BlogUser from '../app/models/BlogUser';
import File from '../app/models/File';
import BlogPosts from '../app/models/BlogPosts';
import BlogCategories from '../app/models/BlogCategories';
import UserInfos from '../app/models/UserInfos';


//CONFIG DATABASE
import databaseConfig from '../config/database';
const models = [BlogUser, File, BlogPosts, BlogCategories, UserInfos];


class Database {

    constructor() {

        this.init();
        this.mongo();
    }

    init(){
        
        this.connection = new Sequelize(databaseConfig);
        //console.log(this.connection.models);
        console.log(this.connection.models);
        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }

    mongo(){

        
        this.mongoConnection = mongoose.connect(
            'mongodb://192.168.99.100:27017/mongoblog',
            {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
        )

    }

}

export default new Database();