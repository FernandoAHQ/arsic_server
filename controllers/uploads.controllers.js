
const { response } = require('express');
const User = require('../models/user');
const Service = require('../models/service');
var fs = require('fs')

const uploadImage = (req, res = response )=>{

    console.log("UPLOADS CONTROLLER");
    var coleccion = req.params.coleccion
    var id = req.params.id


    
    //Colecciones validas
    var coleccionesValidas = ['services', 'users' ]

    if( coleccionesValidas.indexOf( coleccion ) < 0 ){
        
        console.log("NOT A COLLECTION");

        return res.status(400).json({
            ok: false,
            mensaje: 'Coleccion no válida',
            errors: {
                message: 'Las colecciones validas son ' + coleccionesValidas.join(', ')
            }
        })

   }



    if( !req.files ){

        console.log("NOT A FILE");
        return res.status(400).json({
            ok: false,
            mensaje: 'No se selecciono un archivo',
            errors: {
                message: 'Debe de seleccionar una imagen'
            }
        })

    }

    var archivo = req.files.imagen
    /* El nombre del archivo seleccionado lo voy a cortar 
    cada que haya un punto.
    El split devuelve un arreglo con todas las palabras */
    var nombreCortado = archivo.name.split('.')
    /* La extension la optengo en la ultima posicion del arreglo */
    var extension = nombreCortado[ nombreCortado.length -1 ]


    // Extensiones validas
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']

    // Si la extension no corresponde a alguna posicion 
    // del arreglo de extensiones validas retorna un -1
    if( extensionesValidas.indexOf( extension ) < 0 ){

        console.log("NOT AN EXT");
        return res.status(400).json({
            ok: false,
            mensaje: 'Extensión no válida',
            errors: {
                message: 'Las extensiones validas son ' + extensionesValidas.join(', ')
            }
        })

    }

    // Nombrar la foto
    var nombreArchivo = `${ id }.${ extension }`

    // Mover la foto a la carpeta
    var path = `./uploads/${coleccion}/${ nombreArchivo }`

  //  moverArchivo(archivo, path);
    
  console.log("RECIEVED, SAVING: "+path);
    subirPorColeccion( coleccion, id, nombreArchivo, archivo, path, res )


}



// Mover la foto a la carpeta
function moverArchivo( archivo, path ){

    archivo.mv( path, ( err ) => {

        if( err ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al subir archivo',
                errors: err
            })
        }

    })

}



// Método que asigna la imagen
function subirPorColeccion( coleccion, id, nombreArchivo, archivo, path, res){

    if( coleccion === 'users' ){

        console.log("USER COLLECTION");
        User.findById( id, ( err, usuariodb ) => {


            if( err ){
                
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                })
            }
    
            if( !usuariodb ){
                
                console.log("NOT A USER");
                return res.status(404).json({
                    ok: false,
                    mensaje: `El usuario con el id ${id} no existe`,
                    errors:{
                        message: 'No existe un usuario con ese ID'
                    }
                })
            }
            
            // Si si existe muevo la foto a la carpeta
            moverArchivo(archivo, path )

            // Obtener el path viejo de la imagen antigua del usuario para borrarla
            var pathViejo = `./uploads/users/${ usuariodb.image }`
            
            // Usando el FileSystem de node
            // Verificar que el archivo exista
            if( fs.existsSync( pathViejo ) ){
                // Borrar el archivo
                fs.unlinkSync( pathViejo )
            }

            console.log("SAVING TO DB");
            usuariodb.image = nombreArchivo

            usuariodb.save( (err, usuarioActualizado ) => {

                if(err){
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al subir imagen del usuario',
                        errors: err
                    })
                }

                // Ocultar la contraseña antes de mostrarla
                usuarioActualizado.password = undefined;

                console.log("SAVED");
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                    
                })

            })
           

        })

    } 


    if (coleccion === 'services') {

        console.log("SERVICE");
        Service.findById( id, ( err, servicedb ) => {

            console.log("FOUND SERVICE");

            if( err ){
                
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                })
            }
    
            if( !servicedb ){
                
                console.log("NOT A SERVICE");
                return res.status(404).json({
                    ok: false,
                    mensaje: `El servicio con el id ${id} no existe`,
                    errors:{
                        message: 'No existe un servicio con ese ID'
                    }
                })
            }
            
            // Si si existe muevo la foto a la carpeta
            moverArchivo(archivo, path )

            // Obtener el path viejo de la imagen antigua del usuario para borrarla
            var pathViejo = `./uploads/services/${ servicedb.image }`
            
            // Usando el FileSystem de node
            // Verificar que el archivo exista
            if( fs.existsSync( pathViejo ) ){
                // Borrar el archivo
                fs.unlinkSync( pathViejo )
            }

            console.log("SAVING TO DB");
            servicedb.evidenceImage = nombreArchivo

            servicedb.save( (err, servicioActualizado ) => {

                if(err){
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al subir imagen del usuario',
                        errors: err
                    })
                }

                // Ocultar la contraseña antes de mostrarla
              //  usuarioActualizado.password = undefined;

                console.log("SAVED");
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    service: servicioActualizado
                    
                })

            })
           

        })    
    }

    if (coleccion === 'hospitales') {

        // Los mismo que usaurios solo que con hospitales
       
    }




    

    
   
   

}


module.exports = {uploadImage}