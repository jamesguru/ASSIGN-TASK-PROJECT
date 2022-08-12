import express, { Request, RequestHandler, Response } from 'express';
import  {ExtendendedTask} from '../interface/Task';
import {connectDB} from '../Helpers/connect_db';

import mssql from 'mssql';


export const getAllTasks = async (req:Request,res:Response) => {

    try{

        const pool = await connectDB();

        const tasks = await pool?.request().execute('getAllTasks');

        res.status(200).json({

            tasks:tasks?.recordset

            
        })


        


    }catch(error){


        res.status(500).json('something went wrong');
    }
   

}

export const getTasksForDeveloper:RequestHandler<{id:string}> = async (req:ExtendendedTask, res:Response) => {

    const id = req.params.id;

    console.log(id)

    try {

        const pool = await connectDB();

        const task = await pool?.request().input('id',mssql.Int,id).execute('getTaskAssignedToDeveloper');


        res.status(200).json({task:task?.recordset});
        
    } catch (error) {
        
    }


}


export const updateTask:RequestHandler<{id:string}> = async (req:ExtendendedTask, res:Response) => {


    const task_id = req.params.id;

    const {completed} = req.body;

    console.log(completed)


    console.log('update')





    try {
        
        const pool = await connectDB();

        const  task = await pool?.request().input('id',mssql.Int,task_id).input('assigned',mssql.NVarChar,completed).execute('updateTask');


        res.status(201).json({task})

    } catch (error) {
        
    }



}

export const assignTask:RequestHandler<{id:string}> = async (req:ExtendendedTask, res:Response) => {

   

    const task_id = req.params.id;

    const {developer_id,assigned} = req.body;

    console.log(developer_id)

    console.log(task_id)

    console.log(assigned)

    try {
        
        const pool = await connectDB();

        const  task = await pool?.request().input('id',mssql.Int,task_id).input('dev_id',mssql.Int,developer_id).input('assigned',mssql.NVarChar,assigned).execute('assignTask');


        res.status(201).json({task})

    } catch (error) {
        
    }



}


export const deleteTask:RequestHandler<{id:string}> = async (req:Request,res:Response) => {


    const task_id = req.params.id;

    try {

        const pool = await connectDB();

         await pool?.request().input("id",mssql.Int,task_id).execute('deleteTask');

         
        
    } catch (error) {


        res.status(201).json({message:'task was not deleted successfully'});

        
        
    }

    
}

export const addTask = async (req:ExtendendedTask,res:Response) =>{


    const {title,description,date} = req.body;

   


    try {


        const pool = await connectDB();

        const task = await pool?.request().input('title',mssql.VarChar,title).input('description',mssql.VarChar,description).input('date',mssql.VarChar,date).execute('addTask');

        res.status(201).json({task:task?.recordset});


        
    } catch (error) {


        res.status(500).json({message:'something went wrong'});
        
    }


}