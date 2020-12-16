import Sequelize, {Model} from 'sequelize';

class BlogPosts extends Model{
    
    static init(sequelize){

        super.init({

            post_date: Sequelize.DATE,
            post_title: Sequelize.STRING,
            post_content: Sequelize.TEXT,
            deleted_at: Sequelize.DATE,
            
        },
        {
            
            sequelize,

        }
        );

       return this;

    }

    static associate(models){
        this.belongsTo(models.BlogUser, {foreignKey: 'post_author', as: 'author_id'});
        this.belongsTo(models.BlogCategories, {foreignKey: 'post_category', as: 'categories_id'});
    }

}

export default BlogPosts;