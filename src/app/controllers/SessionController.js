import jwt from 'jsonwebtoken'
import * as Yup from 'yup';

import File from '../models/File';
import authConfig from '../../config/auth';
import BlogUser from '../models/BlogUser';

class SessionController{

    async store(req, res){

        const {user_login, pass} = req.body;
        
        const schema = Yup.object().shape({

            user_login: Yup.string().required(),
            pass: Yup.string().required().min(8),

        });

        if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({error: 'Validation fails!'});

        }

        const bloguser = await BlogUser.findOne({

            where: {user_login},
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url']
                }
            ]
        
        });

        if(!bloguser){

            return res.status(401).json({error: 'User not found!'});

        }

        if(!(await bloguser.checkPassword(pass))){

            return res.status(401).json({error: 'Password does not match'});

        }

        const {id, display_name, user_email, avatar} = bloguser;

        return res.json({
            bloguser: {
                id,
                display_name,
                user_email,
                avatar
            },

            token: jwt.sign({id}, authConfig.secret, {

                expiresIn: authConfig.expiresIn,

            }),
        });

    }

}

export default new SessionController();