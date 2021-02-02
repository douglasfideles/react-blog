import Sequelize, {Model} from 'sequelize';

class UserInfos extends Model{
    static init(sequelize){

        super.init({

            user_description: Sequelize.TEXT,
            user_github: Sequelize.STRING,
            user_linkedin: Sequelize.STRING,
            user_site: Sequelize.STRING

        },
        {
            sequelize,
        }
        );
        
        return this;

    }
}

export default UserInfos;