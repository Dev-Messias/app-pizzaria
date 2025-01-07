import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ItemProps {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    },
    deleteItem: (item_id: string) => void;
}

export function ListItem({ data, deleteItem }: ItemProps) {

    function handleDeleteItem(){
       deleteItem(data.id)
    }

    return (
        <View
            style={styles.container}
        >

            <Text
                className='text-slate-900'
            >
                {data.amount} - {data.name} 
            </Text>

            <TouchableOpacity onPress={handleDeleteItem} >
                <Feather name='trash-2' color="#FF3F4b" size={25} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius:4,
    }
})