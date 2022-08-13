import ejs from 'ejs';
import dotenv from 'dotenv'
import sendMail from '../Helpers/SendEmail';

dotenv.config()

const sendEmail = async (fullname:string,project:string,email:string)=> {


    ejs.renderFile('templates/completeproject.ejs',{name:fullname,task:project}, async (err,data) =>{


        let messageoption = {

            from:email,
            to:process.env.ADMIN_EMAIL,
            subject:'I have completed project',
            html:data,
            attachments:[{

                filename:'project.txt',
                content:'I have completed project successfully'
            }]
        }


        try {
            
            sendMail(messageoption);

        } catch (error) {

            console.log(err)
            
        }


    }) 

}


export default sendEmail;