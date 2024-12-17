import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Pressable, TextInput, Button, Modal } from "react-native";

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { api } from '../../services/api'
import { ModalPicker } from "@/src/components/ModalPicker";


type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

export type CategoryProps = {
    id: string;
    name: string;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order() {
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [amount, setAmount] = useState('1');//controlar qtd de item


    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/category')
            setCategory(response.data)
            setCategorySelected(response.data[0])
        }
        loadInfo()
    }, [])

    async function handleCloseOrder() {

        try {

            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            })

            navigation.goBack();

        } catch (err) {
            console.log(err)
        }

    }


    function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item)
    }

    return (
        <View className="flex-1 bg-slate-200 py-14 px-4" >
            <View className="flex flex-row mt-6 mb-3 items-center gap-4" >
                <Text className="text-xl font-bold" >Mesa {route.params.number}</Text>
                <TouchableOpacity onPress={handleCloseOrder} >
                    <Feather name="trash-2" size={18} color="#FF3F4b" />
                </TouchableOpacity>
            </View>

            {category.length !== 0 && (
                <TouchableOpacity onPress={() => setModalCategoryVisible(true)} >
                    <View className="w-full h-10 justify-center px-2 mb-3 bg-slate-50 rounded-md"  >
                        <Text>
                            {categorySelected?.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}

            <Pressable className="w-full h-10 justify-center px-2 mb-3 bg-slate-50 rounded-md" >
                <Text>Pizzas calabresa</Text>
            </Pressable>

            <View className="flex flex-row items-center justify-between" >
                <Text className="text-xl font-bold" >Quantidade</Text>
                <TextInput
                    placeholder="1"
                    keyboardType="numeric"
                    className="w-3/5 h-10 justify-center text-center px-2 mb-3 bg-slate-50 rounded-md text-lg"
                    value={amount}
                    onChangeText={setAmount}
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


            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType="fade"

            >

                <ModalPicker

                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                
                />

            </Modal>
        </View>
    )
}