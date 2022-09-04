require('dotenv').config()
import * as nodemailer from "nodemailer";
import EmailHTML from "./EmailHTML";

export default class SendEmail{
    constructor(){
    }

    sendEmail = (code:string, expirationDate: string) =>{
        let mailOptions = {
            from: "portalband@band.com.br",
            to: "lukas27@ethereal.email",
            subject: "Recuperação de Senha",
            html: EmailHTML(code, expirationDate)
        };

        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 2525,
            auth: {
              user: process.env.USER,
              pass: process.env.PASSWORD,
            },
        });

        transporter.verify(function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
        });

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return error;
            } else {
                return "E-mail enviado com sucesso!";
            }
        })
    }      
}