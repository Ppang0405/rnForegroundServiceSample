import React, {Component} from 'react';
import {Platform, StyleSheet, View, Button, Text} from 'react-native';
import VIForegroundService from "@voximplant/react-native-foreground-service";
import {counter} from "@/utils";

class ForegroundService extends Component {
    foregroundService = VIForegroundService.getInstance();

    state = {
        isRunningService: false,
    };

    async startService() {
        if (Platform.OS !== 'android') {
            console.log('Only Android platform is supported');
            return;
        }
        if (this.state.isRunningService) return;
        if (Platform.Version >= 26) {
            const channelConfig = {
                id: 'ForegroundServiceChannel',
                name: 'Notification Channel',
                description: 'Notification Channel for Foreground Service',
                enableVibration: false,
                importance: 2
            };
            await this.foregroundService.createNotificationChannel(channelConfig);
        }
        const notificationConfig = {
            channelId: 'ForegroundServiceChannel',
            id: 3456,
            title: 'Foreground Service',
            text: 'Foreground service is running',
            icon: 'ic_notification',
            priority: 0,
            button: 'Stop service'
        };
        try {
            this.subscribeForegroundButtonPressedEvent();
            await this.foregroundService.startService(notificationConfig);
//            await counter({delay: 1000})
            this.setState({isRunningService: true});
        } catch (error) {
            console.warn(error)
            this.foregroundService.off();
        }
    }

    async stopService() {
        if (!this.state.isRunningService) return;
        this.setState({isRunningService: false});
        await this.foregroundService.stopService();
        this.foregroundService.off();
    }

    subscribeForegroundButtonPressedEvent() {
        this.foregroundService.on('VIForegroundServiceButtonPressed', async () => {
            await this.stopService();
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <Button title="Start foreground service" onPress={() => this.startService()}/>
                <Text style={{color: 'black'}}>{` foreground service is running: ${this.state.isRunningService}`}</Text>
                <View style={styles.space}/>
                <Button title="Stop foreground service" onPress={() => this.stopService()}/>
            </View>
            );
    }
}

export default  ForegroundService;

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
