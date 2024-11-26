import React, {useContext} from "react";
import { Button, SafeAreaView, Text } from "react-native";

import { AuthContext } from '../../contexts/AuthContext';

export default function Dashboard(){

    const {signOut} = useContext(AuthContext);

    return (
        <SafeAreaView>
            <Text>Dash</Text>
            <Button
                title="Sair do App"
                onPress={signOut}
            />
        </SafeAreaView>
    )
}