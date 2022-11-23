const getMenuFrontEnd = ( role = 'user_role' ) => {

    if ( role == 'SITE_ROLE' ) {
        return [
            { titulo: 'Inicio', icono: 'fas fa-user-alt mr-2', url: 'inicio' },
            { titulo: 'Mis servicios', icono: 'fas fa-user-alt mr-2', url: 'mis-servicios' },
            { titulo: 'Inventario',  icono: 'fas fa-newspaper mr-2', url: 'inventario' },
        ];
    }

    if ( role == 'USER_ROLE' ) {
        return [
            { titulo: 'Inicio', icono: 'fas fa-user-alt mr-2', url: 'inicio' },
            { titulo: 'Mis reportes', icono: 'fas fa-user-alt mr-2', url: 'mis-reportes' },
        ];
    }

    if ( role == 'ADMIN_ROLE' ) {
        return [
            { titulo: 'Tareas', icono: 'fas fa-user-alt mr-2', url: 'tareas' },
        //    { titulo: 'Periodos', icono: 'fas fa-user-alt mr-2', url: 'periodos' },
            { titulo: 'Servicios', icono: 'fas fa-user-alt mr-2', url: 'servicios' },
            { titulo: 'Bitacora', icono: 'fas fa-user-alt mr-2', url: 'bitacora' },
         //   { titulo: 'Ordenes',     icono: 'fas fa-newspaper mr-2', url: 'ordenes' },
            { titulo: 'Inventario',  icono: 'fas fa-newspaper mr-2', url: 'inventario' },
            { titulo: 'Usuarios', icono: 'fa-solid fa-users', url: 'usuarios' },
            { titulo: 'Departamentos', icono: 'fa-solid fa-users', url: 'departamentos' },
            { titulo: 'Ranking', icono: 'fa-solid fa-users', url: 'ranking' },
        ];
    }
      

}



const getCategoriesReport = () => {
    return [
        'Internet',
        'Teléfono',
        'Impresora',
        'Equipo de computo',
        'Otro'
    ]
}


module.exports = {
    getMenuFrontEnd,
    getCategoriesReport
}