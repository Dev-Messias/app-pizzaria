import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../app/Dashboard';
import Order from '../app/Order';
import FinishOrder from '../app/FinishOrder';

export type StackPramsList = {
    Dashboard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
    FinishOrder: {
        number: number | string;
        order_id: string;
    };
}

//rotas privadas
const Stack = createNativeStackNavigator<StackPramsList>();

function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name='Order' component={Order} options={{ headerShown: false }} />
            <Stack.Screen name='FinishOrder' component={FinishOrder}
                options={{
                    title: 'Finalizando',
                    headerStyle:{
                        backgroundColor: '#e2e8f0'
                        
                        
                    }
                }}
            />
        </Stack.Navigator>
    )
}

export default AppRoutes;