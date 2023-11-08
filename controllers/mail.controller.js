import nodemailer from 'nodemailer';
import { __dirname} from '../utils.js';

const transport= nodemailer.createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:process.env.MAILING_USER,
        pass:process.env.MAILING_PASSWORD
    }
})

export class MailController {

    sendMail = async (req, res) => {
        const user = req
        try {
            let result = await transport.sendMail({
                from:`Coder Test <${process.env.MAILING_USER}>`,
                to:`${user.email}`,
                subject:'Bienvenido a tu Coder E-commerce',
                html:`
                <!DOCTYPE html>
                <html>
                    <head>
                    <meta charset="utf-8">
                    <meta http-equiv="x-ua-compatible" content="ie=edge">
                        </head>
                        <body>
                            <h2>¡Hola ${user.firstName}!</h2>
                            <p>Estamos encantados de tenerte a bordo en nuestro Coder E-Commerce. </p>
                        </body>
                </html>
                `,
                attachments:[{ 
                    filename: "Onomichio.jpg", 
                    path:'./public/imgMail/Onomichio.jpg',
                    cid:'Ono' 
                }]
            })
        } catch (e) {
            console.log(e, 'Error intentando enviar mail de bienvenida');
        }
    }

}