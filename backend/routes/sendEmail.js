const nodemailer = require("nodemailer");

module.exports = async (email,subject, text)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: proccess.env.SERVICE,
            port:Number(process.env.EMAIL_PORT),
            secure:Boolean(process.env.SECURE), 
            auth:{
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });
        console.log("Email SENT")

    } catch (error){
        console.log("Email NOT Sent")
        console.log(error)

    }
}