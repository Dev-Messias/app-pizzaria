import React, { useContext, useState } from "react";
import { Button, SafeAreaView, Text, TouchableOpacity, TextInput, View, Pressable } from "react-native";

import { AuthContext } from '../../contexts/AuthContext';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "@/src/routes/app.routes";
import { api } from '../../services/api'


export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
    const [number, setNumber] = useState('');

    async function openOrder() {
        if(number === ''){
            return
        }

        const response = await api.post('/order', {
            table: Number(number)
        })



        //requisição para abrir a mesa
         navigation.navigate('Order', {number: number, order_id: response.data.id})

         setNumber('')
    }

    const { signOut } = useContext(AuthContext);

    return (
        <SafeAreaView className="flex-1 justify-center items-center py-4" >
            <Text className="text-2xl font-bold mb-5" >Novo Pedido</Text>

            <TextInput
                placeholder="Número da mesa"
                placeholderTextColor="#000"
                className="w-4/5 h-14 border rounded-lg px-2 text-center text-lg"
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}

            />

            <Pressable className="w-4/5 h-10 rounded-lg mt-5  bg-slate-950 flex flex-col items-center justify-center" onPress={openOrder}  >
                <Text className=" text-white text-lg font-bold" >Abrir mesa</Text>
            </Pressable>


        </SafeAreaView>
    )
}