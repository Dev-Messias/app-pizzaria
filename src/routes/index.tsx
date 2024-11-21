import React, {useContext} from 'react';


import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';// rotas publicas
import { View, ActivityIndicator } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';


//controlar qual rota sera exibida
function Routes() {

    const {isAuthenticated, loading} = useContext(AuthContext)
   

    if(loading){
        return(
            <View className='flex-1 bg-[#F5f7fb] justify-center items-center' >

                <ActivityIndicator size={60} color="#1D1D2E" />

            </View>
        )
    }

    return (
        // usuario logado rota appRoutes
        
            isAuthenticated ? <AppRoutes /> : <AuthRoutes />
       
    )
}

export default Routes;