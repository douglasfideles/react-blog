import BlogUser from '../models/BlogUser';
import Notification from '../schemas/Notification';

class NotificationController{

    async index(req, res){

        const isAdmin = await BlogUser.findOne({
            where: {id: req.userId, user_status: true},
        });

        if(!isAdmin){
            return res.status(401).json({error: 'Only admins can load notifications'});
        }

        const notifications = await Notification.find({

            postAuthor: req.userId,

        }).sort({createAt: 'desc'}).limit(20);

        return res.json(notifications);

    }

    async update(req, res){

        //const notification = await Notification.findById(req.params.id);

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            {read: true},
            {new:true}
        );


        return res.json(notification);

    }

}


export default new NotificationController();