import React, {Component, useEffect} from 'react';
import {Platform, StyleSheet, View, Button, Text} from 'react-native';
import RNForegroundService from "@supersami/rn-foreground-service";
import { counter } from "@/utils";

/*
package: https://rn-foreground.vercel.app/api/tasks
*/

const ForegroundServiceV2 = () => {
    const addTask = () => {
        RNForegroundService.add_task(() => counter({delay: 1000}), {
            //            delay: 1000,
            onLoop: false,
            taskId: "taskid",
            onError: (e) => {console.log(`Error logging:`, e)},
            onSuccess: () => {
                console.log('RNForegroundService processed successfully')
            }
        });
    }

    const startForegroundService = () => {
        RNForegroundService.remove_all_tasks()
        RNForegroundService.start({
            id: 1244,
            title: "Foreground Service",
            message: "We are live World",
            icon: "ic_launcher",
            button: true,
            button2: true,
            buttonText: "Button",
            button2Text: "Anther Button",
            buttonOnPress: "cray",
            setOnlyAlertOnce: "true",
            color: "#000000",
            progress: {
                max: 100,
                curr: 50,
            },
            visibility: "private",
            importance: "high"
        }).then(() => {
            console.log('RNForegroundService started')
        }).catch((error) => {
            console.log(error)
        });
    }

    const stopBackgroundService = () => {
        RNForegroundService.stop().then()
    }

    useEffect(() => {
        RNForegroundService.eventListener(() => {
            console.log('notification clicked')
        })

    }, [])

    return (
        <View style={styles.container}>
            <Text style={{color: 'black'}}>{`RNForegroundService.is_running(): ${RNForegroundService.is_running().toString()}`}</Text>
            <Button title="Add task" onPress={() => addTask()}/>
            <Button title="Start foreground service" onPress={() => startForegroundService()}/>
            <View style={styles.space}/>
            <Button title="Stop foreground service" onPress={() => stopBackgroundService()}/>
        </View>
        );
}

export default ForegroundServiceV2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    space: {
        flex: 0.1
    }
});
