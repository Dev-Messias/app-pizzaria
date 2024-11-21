import React, {useContext, useState} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import {AuthContext} from '../../contexts/AuthContext'

export default function SignIn() {

    const {signIn} = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(){

        if(email === '' || password === ''){
            return;
        }
        
        await signIn({email, password})
    }

    return (

        <View className='bg-red-700  flex-1  justify-center items-center px-3' >
            
            <View className='bg-neutral-50 w-full flex flex-col items-center justify-center py-8 rounded-lg' >
          
                <Image
                    className='rounded-full h-40 w-40 mb-4'
                    source={require('../../assets/chef-pizza.jpg')}
                />

              
               <Text className='font-bold text-3xl mb-1 ' >Pizzaria <Text className='text-red-700' >Chef</Text> </Text>
               <Text className='font-medium text-zinc-500' >Acesse a plataforma para gerenciar sua pizzaria.</Text>
         
    
               
                <View className='w-full  flex flex-col items-center gap-4 mt-6 py-3' >
                   
                    <TextInput 
                        className='w-4/5 border border-slate-500 rounded-lg px-2 py-2 text-black ' 
                        placeholderTextColor={"#000"}  
                        placeholder='Digite seu email'
                        value={email}  
                        onChangeText={setEmail}
                    />
                 
                    <TextInput 
                        className='w-4/5 border border-slate-500 rounded-lg px-2 py-2 text-black ' 
                        placeholderTextColor={"#000"} 
                        placeholder='Sua senha' 
                        secureTextEntry={true} 
                        value={password}  
                        onChangeText={setPassword}
                    />
               
                   <View className='w-4/5 bg-slate-800 flex items-center py-2 rounded-lg mt-2 ' >
                   <TouchableOpacity onPress={handleLogin} >
                       <Text className='text-slate-200 font-semibold' >Acessar</Text>
                    </TouchableOpacity>
                   </View>
                </View>
               
            </View>
           
        </View>
    )
}