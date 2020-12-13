import BlogUser from '../models/BlogUser';


class BlogUserControlle{

    async store(req, res){

        const userLogin = await BlogUser.findOne({where: {user_login: req.body.user_login}}).catch(error => { throw error});
        const displayName = await BlogUser.findOne({where: {display_name: req.body.display_name}}).catch(error => { throw error});
        const userEmail = await BlogUser.findOne({where: {user_email: req.body.user_email}}).catch(error => { throw error});

        if(userLogin || displayName || userEmail){

            return res.status(400).json({error: 'Some data of the register already exists'});

        }

        const {id, user_login, display_name, user_email, user_status} = await BlogUser.create(req.body);
 
        return res.json({id, user_login, display_name, user_email, user_status});

    }

    async update(req, res){

        const {user_login, oldPass, display_name, user_email} = req.body;

        const bloguser = await BlogUser.findByPk(req.userId);
        

        if(user_login != bloguser.user_login){

            const userExist = await BlogUser.findOne({where: {user_login}});
            const displayNameExist = await BlogUser.findOne({where: {display_name}}).catch(error => { throw error});
            const userEmailExist = await BlogUser.findOne({where: {user_email}}).catch(error => { throw error});

            if(userExist || displayNameExist || userEmailExist){
    
                return res.status(400).json({error: 'Some data of the register already exists'});
    
            }
            
        }

        if(oldPass && !(await bloguser.checkPassword(oldPass))){

            return res.status(401).json({error: 'Password does not matrch'});
        }
        
        const {id} = await bloguser.update(req.body);

        return res.json({id, user_login, display_name, user_email});


    }
}

export default new BlogUserControlle();