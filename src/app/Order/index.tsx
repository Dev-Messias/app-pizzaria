import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Pressable, TextInput, Button } from "react-native";

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import {Feather} from '@expo/vector-icons';

import { api } from '../../services/api'


type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order(){
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation();

    async function handleCloseOrder(){

        try {

            await api.delete('/order', {
                params:{
                    order_id: route.params?.order_id
                }
            })

            navigation.goBack();
            
        } catch (err) {
            console.log(err)
        }
        
    }

    return(
        <View className="flex-1 bg-slate-200 py-14 px-4" >
            <View className="flex flex-row mt-6 mb-3 items-center gap-4" >
                <Text className="text-xl font-bold" >Mesa {route.params.number}</Text>
                <TouchableOpacity onPress={handleCloseOrder} >
                    <Feather name="trash-2" size={18} color="#FF3F4b" />
                </TouchableOpacity>
            </View>

            <Pressable className="w-full h-10 justify-center px-2 mb-3 bg-slate-50 rounded-md" >
                <Text>Pizzas</Text>
            </Pressable>

            <Pressable className="w-full h-10 justify-center px-2 mb-3 bg-slate-50 rounded-md" >
                <Text>Pizzas calabresa</Text>
            </Pressable>

            <View className="flex flex-row items-center justify-between" >
                <Text className="text-xl font-bold" >Quantidade</Text>
                <TextInput
                    placeholder="1"
                    keyboardType="numeric"
                    className="w-3/5 h-10 justify-center text-center px-2 mb-3 bg-slate-50 rounded-md text-lg"
                />
            </View>

            <View className="flex flex-row w-full justify-between" >
                <Pressable className="w-[22%] bg-cyan-500 h-10 rounded-md justify-center items-center" >
                    <Text className="text-lg font-bold" >+</Text>
                </Pressable>

                <Pressable className="bg-emerald-500 rounded-md h-10 w-3/4 items-center justify-center" >
                    <Text className="text-lg font-bold" >Avançar</Text>
                </Pressable>
            </View>
        </View>
    )
}