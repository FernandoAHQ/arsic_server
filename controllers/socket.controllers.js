const moment = require('moment')
const User = require('../models/user');
const Department = require('../models/department');
const Report = require('../models/report');
const Services = require('../models/service');
const Period = require('../models/period');
const TaskRegister = require('../models/taskRegister');


const today = moment().startOf('day')

const mongoose = require('mongoose');

const userConnected = async( id ) => {

    const user = await User.findById(id);
    user.online = true;
    await user.save();
    return user;

}


const userDisconnected = async( id ) => {

    const user = await User.findById(id);
    user.online = false;
    await user.save();
    return user;

}


const getAllUsers = async( ) => {
    
    const users = await User.find().sort('-online');
    return users;

}




// REPORTES 

const getAllReportsByUserId = async( userId ) => {
    
    // const reports = await Report.find({ depto: userId, isAssigned: false }, '-isAssigned -department').sort({ createdAt: 'asc' });
    // return reports;
    const dep = await Department.findOne({user: userId});
    const services = await Services.find({user: userId, createdAt: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate()
    }}, '-user').populate('report').populate('assignedTo')


    return services;




}



const saveReport = async( payload ) => {

    /* 
        {
            from: '', usuario departamento
            to: '', usuario admin
            report: ''
        } 
    */

    try {


        
        // const doesExist = await Department.findById( payload.from );
        const department = await Department.findOne({ user: payload.from })

        const data = {
            ...payload.report,
            department: department.id
        }

        const report = new Report( data )
        await report.save();

        const period = await Period.findOne({isActive: true});

       

        const service = new Services( { report, user: payload.from, period: period.id } )
        await service.save();

        return service;

    } catch(error) {
        console.log(error);
        return false;
    }

}




const editReport = async( payload ) => {

    /* 
        {
            from: '', usuario departamento
            to: '', usuario admin
            report: ''
        } 
    */

    try {

        const { report } = payload;

        const doesExist = await Report.findById( report._id );

        if ( !doesExist) {
            return { message: `No existe un reporte con el ID ${ report._id  }` }
        }


        await Report.findByIdAndUpdate( report._id , payload.report, { new: true })

        const service = await Services.findOne({ report: report._id  })

        return service;
        

    } catch(error) {
        console.log(error);
        return false;
    }

}



const calificarReport = async( payload ) => {

    /* 
        {
            from: '', id usuario departamento
            to: '', id usuario admin
            service: id servicio
            grade: {
                score
                comment
            }
        } 
    */

    try {

        const { service, grade } = payload;

        const id = mongoose.Types.ObjectId(service);

        const servicedb = await Services.findById( id );

        if ( !servicedb) {
            return { message: `No existe un servicio con el ID ${ id }` }
        }

        servicedb.score = grade.score;
        servicedb.comment = grade.comment;

        await servicedb.save();

        return servicedb;
        

    } catch(error) {
        console.log(error);
        return false;
    }

}

const calificarService = async( payload ) => {

    /* 
        {
            from: '', id usuario departamento
            to: '', id usuario admin
            service: id servicio
            grade: {
                difficulty
                quality
            }
        } 
    */

    try {



        const { service, grade } = payload;
        console.log("grade: " + grade.dificulty + " / " + grade.quality)
        const points = grade.dificulty * grade.quality;
        
        const period = await Period.findOne({isActive: true});

       
        console.log("SERVICE FOUND");
        
  
     

        const id = mongoose.Types.ObjectId(service);

        const servicedb = await Services.findById( id );
        const reportdb = await Report.findById( servicedb.report );


        if(!reportdb){
            console.log("REPORT NOT FOUND");
        }



        if ( !servicedb) {
            return { message: `No existe un servicio con el ID ${ id }` }
        }

        if(!period){
            console.log("PERIOD NOT FOUND");
        }


        period.ranking.forEach(element => {
            if(element.user._id.equals(servicedb.assignedTo._id)){
     //       if(mongoose.Types.ObjectId(element.user._id) == mongoose.Types.ObjectId(servicedb.assignedTo._id)){
                element.points += points;
                console.log("Assigned " + points + " to user id: " + servicedb.assignedTo._id  );
                
            } 
        });
 

        servicedb.points = points;
        servicedb.isRanked = true;

        await servicedb.save();

        await period.save();

        return servicedb;
        

    } catch(error) {
        console.log(error);
        return false;
    }

}


// SERVICIOS


const getAllServicesByUserId = async( userId ) => {
    
    const services = await Services.find({ assignedTo: userId, createdAt: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate()
    } }, '-user -assignedTo')
    .sort({ createdAt: 'asc' })
    .populate('report')
    .populate({
        path: 'report',
        populate: { path: 'department'}
    })
    return services.reverse;

}





const getAllServices = async( ) => {
    
    const services = await Services.find({ createdAt: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate()
    } })
    .sort({ createdAt: 'desc' })
    .populate('report', 'title')
    .populate('assignedTo', 'name username')
    .populate('user', 'name username')
    .populate({
        path: 'report',
        populate: { path: 'department'}
    })
       // console.log(services[0].createdAt.toDateString())
    return services;

}




const assignService = async ( payload ) => {

    /* 
        {
            from: '', id admin
            to: '', id site
            service: id servicio,
            severity: low
        } 
    */

        const service = await Services.findById( payload.service._id );

        if ( !service ) {
            return { error: `No existe un servicio con el ID ${ payload.service._id }` }
        }

        service.status = 'assigned'; 
        service.assignedTo = payload.to; 
        service.severity = payload.severity; 

        const report = await Report.findById( service.report );

        if ( !report ) {
            return { error: `No existe un reporte con el ID ${ service.report }` }
        }

        report.isAssigned = true;

        await Promise.all([
            service.save() ,
            report.save() 
        ])

        return service;


}



const finalizedService = async( payload ) => {

    /*
    
        {
            to: id admin,
            from: id site,
            service: {}
        }
    
    */

        
        const exist = await Services.findById( payload.service._id );

        if ( !exist ) {
             return { error: `No existe un servicio con el ID: ${ payload.service._id }` }
        }

        const data = {
            ...payload.service,
            status: 'finalized'
        }

    
        const service = await Services.findByIdAndUpdate( payload.service._id, data, { new: true });

        return service;

}



const getAdminRole = async() => {
    
    const admin = await User.findOne({ role: 'ADMIN_ROLE'})

    return admin;

}



const initService = async ( payload ) => {
    /**
     *
     * 
     * from : id site
     * to: id user depto
     * service: id service
     */

    console.log('ESTE ES EL PAYLOAD')
    console.log({payload})
    const id = mongoose.Types.ObjectId( payload.service );

    const service = await Services.findById( id );

    service.status = 'in-progress';

    await service.save();


}



const finishTask = async ( payload ) => {
    /**
     *
     * 
     * from : id site
     * to: id user depto
     * service: id service
     */

    console.log('TASK FINISHED!!!')
    console.log({payload})



        const data = {
            task: payload.task._id,
            observation: payload.task.observation,
            solution: payload.task.solution,
            severity: payload.task.severity,
            user: payload.from
        }

    const task = new TaskRegister(data)

    await task.save();

    console.log(task)
 //   const id = mongoose.Types.ObjectId( payload.service );

   // const service = await Services.findById( id );

    //service.status = 'in-progress';

    //await service.save();


}

module.exports = {
    userConnected,
    userDisconnected,
    getAllUsers,
    saveReport,
    getAllReportsByUserId,
    getAllServicesByUserId,
    editReport,
    calificarReport,
    calificarService,
    getAllServices,
    assignService,
    finalizedService,
    getAdminRole,
    initService,
    finishTask
}