import React from 'react';


import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';// rotas publicas


//controlar qual rota sera exibida
function Routes() {

    const isAuthenticated = false;
    const loading = false;

    return (
        // usuario logado rota appRoutes
        
            isAuthenticated ? <AppRoutes /> : <AuthRoutes />
       
    )
}

export default Routes;