import * as Yup from 'yup';

import BlogUser from '../models/BlogUser';
import File from '../models/File';
import RegisterMail from '../jobs/RegisterMail';
import Queue from '../../lib/Queue';
import UserInfos from '../models/UserInfos';


class BlogUserControlle{

    async store(req, res){

        const schema = Yup.object().shape({

            user_login: Yup.string().required(),
            pass: Yup.string().required().min(8),

        });

        if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({error: 'Validation fails!'});

        }

        const userLogin = await BlogUser.findOne({where: {user_login: req.body.user_login}}).catch(error => { throw error});
        const displayName = await BlogUser.findOne({where: {display_name: req.body.display_name}}).catch(error => { throw error});
        const userEmail = await BlogUser.findOne({where: {user_email: req.body.user_email}}).catch(error => { throw error});

        if(userLogin || displayName || userEmail){

            return res.status(400).json({error: 'Some data of the register already exists'});

        }

        const {id, user_login, display_name, user_email, user_status} = await BlogUser.create(req.body);
        
        /*await Mail.sendMail({
            to: `${user_email}`,
            subject: 'Cadastro feito',
            template: 'welcome',
            context: {
                user_login: user_login,
            }
            
        });*/

        await Queue.add(RegisterMail.key, {user_login});

        return res.json({id, user_login, display_name, user_email, user_status});

    }

    async update(req, res){

        const schema = Yup.object().shape({

            user_login: Yup.string(),
            oldPass: Yup.string(),
            pass: Yup.string().min(8).when('oldPass', (oldPass, field) => 
                oldPass ? field.required() : field
            ),

            confirmPass: Yup.string().when('pass', (pass, field) => 
                pass ? field.required().oneOf([Yup.ref('pass')]) : field
            ),

        });

        if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({error: 'Validation fails!'});

        }

        const {user_login, oldPass, display_name, user_email} = req.body;
        const bloguser = await BlogUser.findByPk(req.userId);

   
  

        if(oldPass && !(await bloguser.checkPassword(oldPass))){

            return res.status(401).json({error: 'Password does not matrch'});

        }
            
        await bloguser.update(req.body);

        const {id, avatar} = await BlogUser.findByPk(req.userId, {
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                }
            ]
        });
        
        return res.json({id, user_login, display_name, user_email, avatar});

    }

    async index(req, res){

        const bloguser = await BlogUser.findAll({
            attributes: ['id', 'user_login', 'display_name', 'user_email', 'user_status', 'avatar_id', 'user_infoid'],
            include: [{
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url'],
            },
            {
                model: UserInfos,
                as: 'userinfo',
                attributes: ['user_description', 'user_github','user_linkedin','user_site'],
            }]
        });

        res.json(bloguser);

    }

}

export default new BlogUserControlle();