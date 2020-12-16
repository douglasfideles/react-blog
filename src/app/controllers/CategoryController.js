import * as Yup from 'yup';

import BlogCategory from '../models/BlogCategories';


class CategoryController{

    async store(req, res){

        const schema = Yup.object().shape({

            category_name: Yup.string().required(),

        });

        if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({error: 'Validation fails!'});

        }

        const categoryExist = await BlogCategory.findOne({where: {category_name: req.body.category_name}}).catch(error => { throw error});
        
        if(categoryExist){

            return res.status(400).json({error: 'Category already exists!'});

        }

        const {id, category_name} = await BlogCategory.create(req.body);
 
        return res.json({id, category_name});

    }

    async update(req, res){

        const schema = Yup.object().shape({

            category_name: Yup.string(),


        });

        if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({error: 'Validation fails!'});

        }

        const {category_name} = req.body;
        const category = await BlogCategory.findByPk(req.userId);

        const {id} = await category.update(req.body);
        
        return res.json({id, category_name});

    }

    async index(req, res){

        const category = await BlogCategory.findAll();

        res.json(category);

    }

}

export default new CategoryController();