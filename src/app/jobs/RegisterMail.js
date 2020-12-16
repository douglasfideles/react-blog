import Mail from '../../lib/Mail';

class RegisterMail{

    get key(){
        return 'CancellationMail';
    }

    async handle({data}){

        const {user_email} = data;

        await Mail.sendMail({
            to: `${user_email}`,
            subject: 'Cadastro feito',
            template: 'welcome',
            context: {
                user_login: user_login,
            }
            
        });

    }

}

export default new RegisterMail();