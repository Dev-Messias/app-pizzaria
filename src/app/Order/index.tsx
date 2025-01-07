import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Pressable, TextInput, Button, Modal, FlatList } from "react-native";

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { api } from '../../services/api'
import { ModalPicker } from "@/src/components/ModalPicker";
import { ListItem } from "@/src/components/ListItem";

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackPramsList } from '../../routes/app.routes';


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

type ProductsProps = {
    id: string;
    name: string;
}

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order() {
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [products, setProducts] = useState<ProductsProps[] | []>([]);
    const [productSelected, setProductSelected] = useState<ProductsProps | undefined>();
    const [modalProductVisible, setModalProductVisible] = useState(false);

    const [amount, setAmount] = useState('1');//controlar qtd de item
    const [items, setItems] = useState<ItemProps[]>([])


    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/category')
            setCategory(response.data)
            setCategorySelected(response.data[0])
        }
        loadInfo()
    }, [])

    useEffect(() => {

        async function loadProducts() {
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })

            setProducts(response.data);
            setProductSelected(response.data[0])
        }

        loadProducts()

    }, [categorySelected])

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


    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item)
    }

    function handleChangeProduct(item: ProductsProps) {
        setProductSelected(item)
    }

    //adicionando produto a mesa
    async function handleAdd() {
        const response = await api.post('/order/add', {
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data])// pegando o item e adicionando mais um item
    }

    async function handleDeleteItem(item_id: string) {
        await api.delete('/order/remove', {
            params: {
                item_id: item_id
            }
        })

        //após remover da api removemos da nossa lista de item
        let removeItem = items.filter(item => {
            return (item.id !== item_id)
        })

        setItems(removeItem)
    }

    function handleFinishOrder(){
        navigation.navigate("FinishOrder", {number: route.params.number, order_id: route.params.order_id})
    }

    return (
        <View className="flex-1 bg-slate-200 py-14 px-4" >
            <View className="flex flex-row mt-6 mb-3 items-center gap-4" >
                <Text className="text-2xl font-bold" >Mesa {route.params.number}</Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder} >
                        <Feather name="trash-2" size={18} color="#FF3F4b" />
                    </TouchableOpacity>
                )}
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

            {products.length !== 0 && (
                <Pressable className="w-full h-10 justify-center px-2 mb-3 bg-slate-50 rounded-md" onPress={() => setModalProductVisible(true)} >
                    <Text>{productSelected?.name}</Text>
                </Pressable>
            )}

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
                <Pressable className="w-[22%] bg-cyan-500 h-10 rounded-md justify-center items-center" onPress={handleAdd} >
                    <Text className="text-lg font-bold" >+</Text>
                </Pressable>

                
                    <Pressable
                        className={`${items.length === 0 ? 'bg-emerald-500 rounded-md h-10 w-3/4 items-center justify-center  opacity-30' : 'bg-emerald-500 rounded-md h-10 w-3/4 items-center justify-center  opacity-100'}`}
                        disabled={items.length === 0} 
                        onPress={handleFinishOrder}
                    >
                        <Text className="text-lg font-bold" >Avançar</Text>
                    </Pressable>
            </View>


            <FlatList
                showsVerticalScrollIndicator={false}
                className="flex-1 mt-6"
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />


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


            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType="fade"
            >

                <ModalPicker

                    handleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleChangeProduct}

                />

            </Modal>
        </View>
    )
}