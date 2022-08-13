import ejs from 'ejs';
import dotenv from 'dotenv'
import sendMail from '../Helpers/SendEmail';

dotenv.config()

const sendEmail = async (fullname:string,project:string,email:string)=> {


    console.log(email)


    ejs.renderFile('templates/assignproject.ejs',{name:fullname,task:project}, async(err,data) =>{


        let messageoption = {

            from:process.env.ADMIN_EMAIL,
            to:email,
            subject:'Here is your task',
            html:data,
            attachments:[{

                filename:'assignment.txt',
                content:`You have been assign the project ${project}`
            }]
        }


        try {
            
            sendMail(messageoption);

            console.log("sent first")

        } catch (error) {

            console.log(err)
            
        }


    }) 

}


export default sendEmail;