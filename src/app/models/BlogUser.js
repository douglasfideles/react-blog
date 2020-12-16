import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';

class BlogUser extends Model{
    
    static init(sequelize){

        super.init({

            user_login: Sequelize.STRING,
            pass: Sequelize.VIRTUAL,
            user_pass: Sequelize.STRING,
            display_name: Sequelize.STRING,
            user_email: Sequelize.STRING,
            user_status: Sequelize.BOOLEAN,

            },{
            
            sequelize,

            }
        );

        this.addHook('beforeSave', async (bloguser) => {
            
            if(bloguser.pass){

                bloguser.user_pass = await bcrypt.hash(bloguser.pass, 8);
                console.log(bloguser.user_pass);
            }

        });

        return this;

    }

    static associate(models){
        
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar'});
        
    }

    checkPassword(pass){

        return bcrypt.compare(pass, this.user_pass);

    }

}

export default BlogUser;