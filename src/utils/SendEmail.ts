require('dotenv').config()
import * as nodemailer from "nodemailer";
import EmailHTML from "./EmailHTML";

export default class SendEmail{
    constructor(){
    }

    sendEmail = (code:string, expirationDate: String, email: string) =>{
        let mailOptions = {
            from: process.env.APPMAIL,
            to: email,
            subject: "Recuperação de Senha",
            html: EmailHTML(code, expirationDate)
        };

        const transporter = nodemailer.createTransport({
            pool: true,
            host: process.env.HOST,
            port: Number(process.env.MAILPORT),
            secure: true,
            auth: {
              user: process.env.USER,
              pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
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
                console.log(error)
                return error;
            } else {
                return "E-mail enviado com sucesso!";
            }
        })
    }      
}