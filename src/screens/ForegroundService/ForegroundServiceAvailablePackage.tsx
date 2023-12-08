import React from 'react'
import {Button} from "react-native";
import {useNavigation} from "@react-navigation/native";

const ForegroundServiceAvailablePackage = () => {
    const navigation = useNavigation()
    return <>
        <Button title={"ForegroundService"} onPress={() => {
            alert('react-native-foreground-service package is dead')
        }}/>
        <Button title={"ForegroundServiceV2"} onPress={() => {
            navigation.navigate('ForegroundServiceV2')
        }} />
        <Button title={"NotifeeForegroundService"} onPress={() => {
            navigation.navigate('NotifeeForegroundService')
        }} />
    </>
}

export default  ForegroundServiceAvailablePackage
