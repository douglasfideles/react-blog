import Sequelize, {Model} from 'sequelize';

class BlogCategories extends Model{
    
    static init(sequelize){

        super.init({

            category_name: Sequelize.STRING,

        },
        {
            
            sequelize,

        }
        );

       return this;

    }

}

export default BlogCategories;