import * as Yup from 'yup';

import BlogUser from '../models/BlogUser';
import File from '../models/File';
import Mail from '../../lib/Mail';

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
        
        await Mail.sendMail({
            to: `${user_email}`,
            subject: 'Cadastro feito',
            text: 'Cadastro feito com sucesso',
            
        });

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
            
        const {id} = await bloguser.update(req.body);
        
        return res.json({id, user_login, display_name, user_email});

    }

    async index(req, res){

        const bloguser = await BlogUser.findAll({
            attributes: ['id', 'user_login', 'display_name', 'user_email', 'avatar_id'],
            include: [{
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url'],
            }]
        });

        res.json(bloguser);

    }

}

export default new BlogUserControlle();