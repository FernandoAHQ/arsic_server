var path = require('path')
var fs = require('fs')


//app.get('/:coleccion/:img', 
const getImage = (req, res ) => {

    var coleccion = req.params.coleccion;
    var img = req.params.id

    // En __dirname obtengo la ruta en donde estoy en este momento
    // obtener la direccion de la imagen
    var pathImagen = path.resolve( __dirname, `../uploads/${ coleccion }/${ img }` )
    // Verificar si el path es valido
     
    if( fs.existsSync( pathImagen) ){
        res.sendFile( pathImagen )
    } // Caso contrario que la imagen no existe
      // Retornarle la noimage.png
    else {
        var pathNoImagen = path.resolve( __dirname, `../assets/images/no-image.jpg` )
        res.sendFile( pathNoImagen )
    }

    
}


module.exports = {getImage};