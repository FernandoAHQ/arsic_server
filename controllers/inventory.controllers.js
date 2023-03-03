const {response} = require("express");
const Department = require("../models/department");
const Computer = require("../models/computer");
const Switch = require("../models/switch");
const Vlan = require("../models/vlan");
const Camera = require("../models/camera");
const AP = require("../models/ap");
const OperatingSystem = require("../models/os")
const Processor = require("../models/processor")
const RAM = require("../models/ram")
const Motherboard = require("../models/motherboard")


const create = async (req, res = response) => {

    var category = req.params.category;

    console.log(req.body);

        switch(category){
            case 'computers':{


                                    try {
                                        const {department} = req.body;

                                        const depdb = await Department.findById(department);
                                        const pcdb = await Computer.findOne({folio: req.body.folio})



                                        if(!depdb){
                                            console.log("NO DEPARTMENT IDENTIFIED");

                                            return res.status(400).json({
                                                status: false,
                                                message: `El departamento  ${ department } no existe.`,
                                            })
                                        }

                                        if(pcdb){
                                            return res.status(400).json({
                                                status: false,
                                                message: `Ya existe una computadora con el folio: ${ req.body.folio }.`,
                                            })
                                        }
                                            const newComputer = new Computer(req.body);

                                            await newComputer.save();
                                          
                                            res.status(201).json({
                                                status: true,
                                                message: 'Computadora registrada con éxito',
                                                newComputer
                                            })
                                        

                                        
                                    } catch (error) {
                                        console.log(error);
                                        res.status(500).json({
                                            status: false,
                                            message: 'Hable con el administrador'
                                        })
                                    }

                break;
            }

            case 'switches':{

                
                try {
                     

                     const swdb = await Switch.findOne({name: req.body.name})
 

                    if(swdb){
                        return res.status(400).json({
                            status: false,
                            message: `Ya existe el switch con el id: ${ req.body.name }.`,
                        })
                    }

                        const newSwitch = new Switch(req.body);
                        
                        await newSwitch.save();
                      
                        res.status(201).json({
                            status: true,
                            message: 'Switch registrada con éxito',
                            newSwitch
                        })
                    

                    
                } catch (error) {
                    console.log(error);
                    res.status(500).json({
                        status: false,
                        message: 'Hable con el administrador'
                    })
                }

            break;
            }

            case 'vlans':{

                
                try {

                     const vlandb = await Vlan.findOne({vlan: req.body.vlan})


                     if(vlandb){
                        return res.status(400).json({
                            status: false,
                            message: `Ya existe la VLAN con el id: ${ req.body.name }.`,
                        })
                    }
 

                        const newVlan = new Vlan(req.body);
                    
                        await newVlan.save();
                      
                        res.status(201).json({
                            status: true,
                            message: 'VLAN registrada con éxito',
                            newVlan
                        })
                    

                    
                } catch (error) {
                    console.log(error);
                    res.status(500).json({
                        status: false,
                        message: 'Hable con el administrador'
                    })
                }

            break;
            }
            
            case 'cameras':{

                
                try {

                     const camdb = await Camera.findOne({tag: req.body.tag})


                     if(camdb){
                        return res.status(400).json({
                            status: false,
                            message: `Ya existe la camara con la etiqueta: ${ req.body.tag }.`,
                        })
                    }
 

                        const newCam = new Camera(req.body);
                    
                        await newCam.save();
                      
                        res.status(201).json({
                            status: true,
                            message: 'Camara registrada con éxito',
                            newCam
                        })
                    

                    
                } catch (error) {
                    console.log(error);
                    res.status(500).json({
                        status: false,
                        message: 'Hable con el administrador'
                    })
                }

            break;
            }
            case 'aps':{

                
                try {
                    
                    const apdb = await AP.findOne({serie: req.body.serie})


                    if(apdb){
                        return res.status(400).json({
                            status: false,
                            message: `Ya existe un AP con el numero de serie: ${ req.body.serie }.`,
                        })
                    }

                        const newAp = new AP(req.body);
                       
                        await newAp.save();
                      
                        res.status(201).json({
                            status: true,
                            message: 'Access Point registrada con éxito',
                            newAp
                        })
                    

                    
                } catch (error) {
                    console.log(error);
                    res.status(500).json({
                        status: false,
                        message: 'Hable con el administrador'
                    })
                }

            break;
            }

            default:{
                return res.status(400).json({
                    status: false,
                    message: `${ category } no es una categoría valida.`,
                })
            }
        }

   

}

const getAll = async (req, res = response) => {

    var category = req.params.category;


        switch(category){


            case 'computers':{
                            
                const page = Number(req.query.page) || 1;

                try {
            
            
                    const [computers, totalResults] = await Promise.all([
                        Computer.find({ isActive: true })
                            .skip((page - 1 )*20)
                            .limit(20)
                            .populate('department')
                            .populate({
                                path: 'department',
                                populate: {
                                    path: 'user'
                                }
                            })
                            .populate('specs.motherboard')
                            .populate('specs.os')
                            .populate('specs.ram')
                            .populate('specs.processor'),  
                            Computer.countDocuments()
                    ]);
            
            
                    res.status(200).json({
                        status: true,
                        computers,
                        totalResults
                    })
            
                

                
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    status: false,
                    message: 'Hable con el administrador'
                })
            }

        break;
        }

        case 'switches':{
                            
            const page = Number(req.query.page) || 1;

            try {
        
        
                const [switches, totalResults] = await Promise.all([
                    Switch.find({ isActive: true })
                        .skip((page - 1 )*20)
                        .limit(20),
                        Switch.countDocuments()
                ]);
        
        
                res.status(200).json({
                    status: true,
                    switches,
                    totalResults
                })
        
            

            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: 'Hable con el administrador'
            })
        }

        break;
        }

        case 'vlans':{
                            
            const page = Number(req.query.page) || 1;

            try {
        
        
                const [vlans, totalResults] = await Promise.all([
                    Vlan.find()
                        .skip((page - 1 )*20)
                        .limit(20),
                        Vlan.countDocuments()
                ]);
        
        
                res.status(200).json({
                    status: true,
                    vlans,
                    totalResults
                })
        
            

            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: 'Hable con el administrador'
            })
        }

        break;
        }

        case 'cameras':{
                            
            const page = Number(req.query.page) || 1;

            try {
        
        
                const [camaras, totalResults] = await Promise.all([
                    Camera.find()
                        .skip((page - 1 )*20)
                        .limit(20),
                        Camera.countDocuments()
                ]);
        
        
                res.status(200).json({
                    status: true,
                    camaras,
                    totalResults
                })
        
            

            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: 'Hable con el administrador'
            })
        }

        break;
        }
        case 'aps':{

                
                                
            const page = Number(req.query.page) || 1;


            try {
        
        
                const [aps, totalResults] = await Promise.all([
                    AP.find()
                        .skip((page - 1 )*20)
                        .limit(20),  
                        AP.countDocuments()
                ]);
        
        
                res.status(200).json({
                    status: true,
                    aps,
                    totalResults
                })
        
            

            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: 'Hable con el administrador'
            })
        }

        break;
        }


            default:{
                return res.status(400).json({
                    status: false,
                    message: `${ category } no es una categoría valida.`,
                })
            }
        }

   

}

const edit = async (req, res = response) => {


    var category = req.params.category;


    switch(category){
        case 'computers':{
            try {


                if(Computer.findById(req.body.id)){
                    const pcdb = await Computer.findByIdAndUpdate(req.body.id, req.body, {new: true});//({serie: req.body.id})
                    console.log(pcdb);
                    /// await pcdb.save();
    
                    res.status(201).json({
                        status: true,
                        message: 'Computadora actualizada con éxito',
                        computadora: pcdb
                    })
                }else{
                    return res.status(400).json({
                        status: false,
                        message: `No existe la computadora con id: ${ req.body.id }.`,
                    })
                }
        
                  

                
        
                
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    status: false,
                    message: 'Hable con el administrador'
                })
            }
            break;
        }        case 'vlans':{
            try {


                if(Vlan.findById(req.body.id)){
                    const pcdb = await Vlan.findByIdAndUpdate(req.body.id, req.body, {new: true});//({serie: req.body.id})
                    console.log(pcdb);
                    /// await pcdb.save();
    
                    res.status(201).json({
                        status: true,
                        message: 'VLAN actualizada con éxito',
                        vlan: pcdb
                    })
                }else{
                    return res.status(400).json({
                        status: false,
                        message: `No existe la VLAN con id: ${ req.body.id }.`,
                    })
                }
        
                  

                
        
                
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    status: false,
                    message: 'Hable con el administrador'
                })
            }
            break;

        }        case 'switches':{
            try {


                if(Switch.findById(req.body.id)){
                    const pcdb = await Switch.findByIdAndUpdate(req.body.id, req.body, {new: true}); //({serie: req.body.id})
                    console.log(pcdb);
                    /// await pcdb.save();
    
                    res.status(201).json({
                        status: true,
                        message: 'Switch actualizada con éxito',
                        switch: pcdb
                    })
                }else{
                    return res.status(400).json({
                        status: false,
                        message: `No existe el Switch con id: ${ req.body.id }.`,
                    })
                }
        
                  

                
        
                
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    status: false,
                    message: 'Hable con el administrador'
                })
            }
            break;

        }        case 'aps':{
            try {


                if(AP.findById(req.body.id)){
                    const pcdb = await AP.findByIdAndUpdate(req.body.id, req.body, {new: true});//({serie: req.body.id})
                    console.log(pcdb);
                    /// await pcdb.save();
    
                    res.status(201).json({
                        status: true,
                        message: 'Access Point actualizada con éxito',
                        ap: pcdb
                    })
                }else{
                    return res.status(400).json({
                        status: false,
                        message: `No existe el AP con id: ${ req.body.id }.`,
                    })
                }
        
                  

                
        
                
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    status: false,
                    message: 'Hable con el administrador'
                })
            }
            break;
        }

    }

   


}


const getPieces = async (req, res = response) => {

    try {
            
            
        const [rams, motherboards, processors, systems] = await Promise.all([
            RAM.find(),
            Motherboard.find(),
            Processor.find(),
            OperatingSystem.find(),

        ]);


        res.status(200).json({
            status: true,
            rams,
            motherboards,
            processors,
            systems
        })

    

    
} catch (error) {
    console.log(error);
    res.status(500).json({
        status: false,
        message: 'Hable con el administrador'
    })
}


}

// const deactivateComputer = async(req, res = response ) => {

//     const { id } = req.params

//     try {

//         const doesExist = await Computer.findById( id );

//         if ( !doesExist) {
//             return res.status(400).json({
//                 status: false,
//                 message: `No existe una computadora con el ID ${ id }.`
//             })
//         }

//         const newName = `${doesExist.folio}-${doesExist._id}` 

//         const computer = await Computer.findByIdAndUpdate( id, {isActive: false, folio:newName})

//         res.status(201).json({
//             message: `Usuario eliminado con éxito`,
//             status: true,
//             computer
//         })


//     } catch( error ) {
//         console.log(error);
//         res.status(500).json({
//             status: false,
//             message: 'Hable con el administrador'
//         })
//     }

// }


const deactivate = async (req, res = response) => {

    var category = req.params.category;
    const  id  = req.params.id


    console.log(id);


        switch(category){
            case 'computers':{

                try {

                    const doesExist = await Computer.findById( id );
            
                    if ( !doesExist) {
                        return res.status(400).json({
                            status: false,
                            message: `No existe una computadora con el ID ${ id }.`
                        })
                    }
            
                    const newName = `${doesExist.folio}-${doesExist._id}` 
            
                    const computer = await Computer.findByIdAndUpdate( id, {isActive: false, folio:newName})
            
                    res.status(201).json({
                        message: `Computadora eliminada con éxito`,
                        status: true,
                        computer
                    })
            
            
                } catch( error ) {
                    console.log(error);
                    res.status(500).json({
                        status: false,
                        message: 'Hable con el administrador'
                    })
                }
            
    break;
            }
 
            case 'switches':{

                try {

                    const doesExist = await Switch.findById( id );
            
                    if ( !doesExist) {
                        return res.status(400).json({
                            status: false,
                            message: `No existe un switch con ese ID ${ id }.`
                        })
                    }
            
                    const newName = `${doesExist.folio}-${doesExist._id}` 
            
                    const switches = await Switch.findByIdAndUpdate( id, {isActive: false, folio:newName})
            
                    res.status(201).json({
                        message: `Switch eliminado con éxito`,
                        status: true,
                        switches
                    })
            
            
                } catch( error ) {
                    console.log(error);
                    res.status(500).json({
                        status: false,
                        message: 'Hable con el administrador'
                    })
                }
            
    break;
                
            }

            case 'vlans':{

                return res.status(400).json({
                    status: false,
                    message: `${ category } ${id}.`,
                })

            
            }
            
            case 'cameras':{

                return res.status(400).json({
                    status: false,
                    message: `${ category } ${id}.`,
                })

            
            }
            case 'aps':{

                return res.status(400).json({
                    status: false,
                    message: `${ category } ${id}.`,
                })
                
            
            }

            default:{
                return res.status(400).json({
                    status: false,
                    message: `${ category } no es una categoría valida.`,
                })
            }
        }

   

 }


module.exports = {
    create,
    getAll,
    edit,
    getPieces,
    deactivate
}