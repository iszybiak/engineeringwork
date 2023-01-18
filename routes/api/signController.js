import {compare, hash} from "bcrypt";
const User = require('../../models/ListItem')

export class signController{
    jwt = require('jsonwebtoken')
    async getUser( req, res){
        const user = await this.User.findOne({login: req.body.login})

        if(user == null){
            return res.status(404).send("Adres e-mail lub hasło jest nieprawidłowe")
        }
        try{
            if(await compare(req.body.password, user.password)){
                const accessToken = this.jwt.sign({
                    login: req.body.login, _id: user._id
                },
                    process.env.ACCESS_TOKEN_SECRET);
                res.status(200).json({
                    accessToken: accessToken,
                    user_id : user._id,
                });
            }else{
                res.status(404).send("Adres e-mail lub hasło jest nieprawidłowe");
            }
        }catch {
            res.status(500).send();
        }
    }

    async saveUser(req, res){
        //check the e-mail
        try{
            const user = await User.findOne({email: req.body.email});
            if(user){
                return res.status(400).send("Użytkownik z podanym e-mailem już istnieje.");
            }

        }catch {
            return res.status(500).send();
        }
        // create user
        try{
            const password = await hash(req.body.password, 10);
            const user = new User( {
                name: req.body.firstName,
                surname: req.body.lastName,
                email: req.body.login,
                password: password,
                number : req.body.phoneNumber
            })
            console.log(user)
            await user.save();
            res.status(201).send()
        }catch {
            res.status(500).send()
        }
    }

}
