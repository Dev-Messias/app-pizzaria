import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {StackPramsList} from '../../routes/app.routes';
import { api } from '@/src/services/api';

type RouteDetailParams = {
    FinishOrder:{
        number: string | number;
        order_id: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder() {

    const route = useRoute<FinishOrderRouteProp>()
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>()

    async function handleFinish(){
        try {

            await api.put('/order/send', {
                order_id: route.params?.order_id
            })

            navigation.popToTop(); //voltando para tela inicial
            
        } catch (err) {
            console.log("Erro ao finalizar, tente mais tarde")
        }
    }

    return (
        <View className='flex-1 bg-slate-200 py-[5%] px-[4%] items-center justify-center' >
            <Text className='text-xl font-bold mb-3' >Você deseja finalizar esse pedido?</Text>
            <Text className='text-3xl font-bold mb-3' >Mesa {route.params?.number}</Text>

            <Pressable className='bg-[#3fffa3] flex-row w-2/3 h-10 items-center justify-center rounded-md' onPress={handleFinish}>
                
                    <Text className='text-lg mr-2 font-bold' >Finalizar Pedido</Text>
                    <Feather name='shopping-cart' size={20} color={'#1d1d2e'} />
               
            </Pressable>
        </View>
    )
}