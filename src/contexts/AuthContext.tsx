import React, { useState, createContext, ReactNode, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string
}

export const AuthContext = createContext({} as AuthContextData);

//provider
export function AuthProvider({children}: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name;//convertendo para boolean

    useEffect(() => {
        async function getUser() {
            //pegando dados salvos do user
            const userInfo = await AsyncStorage.getItem('@pizzariachef');
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            //verificando se recebemos as informações
            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }

            setLoading(false)
        }

        getUser();

    }, [])


    //login
    async function  signIn({email, password}: SignInProps){
        setLoadingAuth(true);

        try {

            const response = await api.post('/session', {
                email,
                password
            })

            const data = {
                ...response.data
            }

            //console.log(response.data)

            const {id, name, token} = response.data;

            //salvando dados off
            await AsyncStorage.setItem('@pizzariachef', JSON.stringify(data))

            //passando token na requisição
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email,
                token
            })

            setLoadingAuth(false);
            
        } catch (err) {
            console.log('Erro ao acessar')
            setLoadingAuth(false)
        }
    }


    async function signOut(){
        await AsyncStorage.clear()
        .then(() => {
            setUser({
                id: '',
                name: '',
                email: '',
                token: ''
            })
        })
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, loading, loadingAuth, signOut }}
        >
            {/* todas as paginas */}
            {children}
        </AuthContext.Provider>
    )
}