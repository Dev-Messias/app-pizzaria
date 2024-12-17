import React from "react";
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native";

import { CategoryProps } from '../../app/Order'

interface ModalPickerProps {
    options: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: CategoryProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const w = WIDTH - 20;
const hg = Math.floor(HEIGHT / 2).toString();

const hstring = hg + 'px'

//console.log(hstring)

export function ModalPicker({ options, handleCloseModal, selectedItem }: ModalPickerProps) {

    function onPressItem(item: CategoryProps) {
        //console.log(item)
        selectedItem(item)
        handleCloseModal()
    }

    const option = options.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => onPressItem(item)} >
            <View className="w-full items-start border-t-[1px] border-slate-200" >
                <Text className="m-3 text-md font-bold" >
                    {item?.name}
                </Text>
            </View>
        </TouchableOpacity>
    ))

    return (

        <View className="w-full h-screen " >
            <TouchableOpacity onPress={handleCloseModal} >

                <View className="w-full h-screen  bg-transparent justify-center items-center  px-5" >
                    <View className={` w-full  h-[${hstring}] bg-white border-gray-400 rounded-lg`} >
                        <ScrollView showsVerticalScrollIndicator={false} className="py-4" >
                            {option}
                        </ScrollView>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    )
}