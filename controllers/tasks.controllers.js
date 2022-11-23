const {response} = require("express");
const Task = require("../models/task");
const User = require("../models/user");
const TaskRegister = require("../models/taskRegister");


const registerTask = async (req, res = response) => {

    try {
      
     

            const newRegister = new TaskRegister(req.body);

            await newRegister.save();
          
            res.status(201).json({
                status: true,
                message: 'Tarea registrada con éxito',
                newRegister
            })
        

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Hable con el administrador'
        })
    }
   

}


const create = async (req, res = response) => {

    try {
      
     

            const newTask = new Task(req.body);

            await newTask.save();
          
            res.status(201).json({
                status: true,
                message: 'Tarea registrada con éxito',
                newTask
            })
        

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Hable con el administrador'
        })
    }
   

}

const assign = async (req, res = response) => {

    try {
      

        const task = await Task.findById(req.body.task);
        const user = await Task.findById(req.body.user);
        const time = req.body.time;


            if(task){
                //task.
                if(User){

                    task.asignments.push({
                        assignedTo: req.body.user,
                        time: time
                    });

                    await task.save();


                    res.status(201).json({
                        status: true,
                        message: 'Tarea asignada con éxito',
                        task
                    })
    

                }else{
                    res.status(404).json({
                        status: false,
                        message: 'El usuario con el id ' + user.id + ' no existe',
                        task
                    })
                }


            
            }else{
                res.status(404).json({
                    status: false,
                    message: 'La tarea no especificada no existe',
                    task
                })
            }

            //  const newTask = new Task(req.body);

            //  await newTask.save();
          


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Hable con el administrador'
        })
    }
   

}


const getAll = async (req, res = response) => {

    const page = Number(req.query.page) || 1;

    try {
    

        const [tasks, totalResults] = await Promise.all([
            Task.find()
                .populate('asignments.assignedTo', 'name image')
            
                .skip((page - 1 )*20)
                .limit(20),  
                Task.countDocuments()
        ]);


        res.status(200).json({
            status: true,
            tasks,
            totalResults
        })

    

    
} catch (error) {
    console.log(error);
    res.status(500).json({
        status: false,
        message: 'Hable con el administrador'
    })
}

   

} 
const getAllRegistered = async (req, res = response) => {

    const page = Number(req.query.page) || 1;

    try {
    

        const [registros, totalResults] = await Promise.all([
            TaskRegister.find()
            .populate({path: 'task', 
            select: 'name',
            })
            .populate({path: 'user', 
            select: 'name',
            })
                .skip((page - 1 )*20)
                .limit(20),  
                Task.countDocuments()
        ]);


        res.status(200).json({
            status: true,
            registros,
            totalResults
        })

    

    
} catch (error) {
    console.log(error);
    res.status(500).json({
        status: false,
        message: 'Hable con el administrador'
    })
}

   

} 



module.exports = {
    create,
    getAll,
    registerTask,
    assign,
    getAllRegistered
}