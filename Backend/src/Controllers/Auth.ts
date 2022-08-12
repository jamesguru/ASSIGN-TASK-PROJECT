import {Response} from 'express';
import {connectDB} from '../Helpers/connect_db'
import { Developer } from '../interface/Developers';
import mssql from 'mssql';





export const registerDeveloper = async (req:Developer,res:Response) =>{



    const {fullname,email,password} =req.body;


try{


    const pool = await connectDB();

    const developer = await pool?.request().input('fullname',mssql.NVarChar,fullname).input('email',mssql.NVarChar,email).input('password',mssql.NVarChar,password).execute('addDevelopers');

    res.status(201).json({developer});


}catch(error){


    res.status(500).json('something went wrong');


}



}