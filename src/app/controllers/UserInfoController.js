import UserInfos from '../models/UserInfos';

class UserInfoController{

    async store(req, res){

        const userinfo = await UserInfos.create(req.body);

        return res.json(userinfo);

    }

    async update(req, res){

        const update = req.body;
        const userinfo = await UserInfos.findByPk(req.params.id);

        await userinfo.update(update);

        return res.json(userinfo);

    }

}

export default new UserInfoController();