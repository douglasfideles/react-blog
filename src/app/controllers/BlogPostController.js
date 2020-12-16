import * as Yup from 'yup';
import mogoose from 'mongoose';

import {startOfHour, parseISO, isBefore, format, subHours} from 'date-fns';
import {pt} from 'date-fns/locale/pt';

import BlogPosts from '../models/BlogPosts';
import BlogUser from '../models/BlogUser';
import File from '../models/File';
import Notification from '../schemas/Notification';

class BlogPostController{

    async store(req, res){

        const schema = Yup.object().shape({

            post_author: Yup.number().required(),
            post_date: Yup.date(),
            post_title: Yup.string().required(),
            post_content: Yup.string().required(),
            post_category: Yup.number().required(),

        });

        if(!(await schema.isValid(req.body))){

            return res.status(400).json({error: 'Validation fails'});

        }

        const {post_author, post_date, post_title, post_content, post_category} = req.body;

        /*
        Check if is the admin posting
        */

        const isAdmin = await BlogUser.findOne({
            where: {id: post_author, user_status: true},
        });

        if(!isAdmin){
            return res.status(401).json({error: 'You can only create posts with ADMIN'});
        }
        

        const post = await BlogPosts.create({

            post_author,
            post_date,
            post_title,
            post_content,
            post_category,

        });

        const hourPostCreated = startOfHour(parseISO(post_date));

        /*
        Notifications
        */
        const postAuthor = await BlogUser.findByPk(req.userId);
        const formattedDate = format(
            hourPostCreated,
            "'dia' dd 'de' MMM', as' H:mm'h'",
            {localte: pt}
        );

        await Notification.create({

            content: `Novo post criado por ${postAuthor.display_name} no dia ${formattedDate}`,
            postAuthor: post_author,

        });

        return res.json(post);

    }

    async index(req, res){

        const {page = 1} = req.query;

        const post = await BlogPosts.findAll({
            where: {deleted_at: null},
            oder: ['post_date'],
            attributes: ['id', 'post_author', 'post_date', 'post_title', 'post_content', 'post_category'],
            limit: 10,
            offset: (page - 1) * 10,
            include: {
                model: BlogUser,
                as: 'author_id',
                attributes: ['display_name'],
                include: [
                    {
                        model: File,
                        as: 'avatar',
                        attributes: ['id','path','url']
                    }

                ],
            }

        });

        return res.json(post);
    }

    async delete(req, res){

        const post = await BlogPosts.findByPk(req.params.id);

        if(post.post_author != req.userId){

            return res.status(401).json({error: "You don`t have permission to delete this post!"});

        }
        
        post.deleted_at = new Date();

        await post.save();

        return res.json(post);


    }

}

export default new BlogPostController();