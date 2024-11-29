import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../app/Dashboard';
import Order from '../app/Order';

export type StackPramsList = {
    Dashboard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
}

//rotas privadas
const Stack = createNativeStackNavigator<StackPramsList>();

function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Dashboard' component={Dashboard} options={{headerShown: false}} />
            <Stack.Screen name='Order' component={Order} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default AppRoutes;