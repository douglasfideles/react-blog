import jwt from 'jsonwebtoken'

import authConfig from '../../config/auth';
import BlogUser from '../models/BlogUser';

class SessionController{

    async store(req, res){

        const {user_login, pass} = req.body;
        
        const bloguser = await BlogUser.findOne({where: {user_login}});

        if(!bloguser){

            return res.status(401).json({error: 'User not found!'});

        }

        if(!(await bloguser.checkPassword(pass))){

            return res.status(401).json({error: 'Password does not match'});

        }

        const {id, display_name, user_email} = bloguser;

        return res.json({
            bloguser: {
                id,
                display_name,
                user_email
            },

            token: jwt.sign({id}, authConfig.secret, {

                expiresIn: authConfig.expiresIn,

            }),
        });

    }

}

export default new SessionController();