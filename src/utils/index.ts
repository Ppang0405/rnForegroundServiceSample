import {Platform} from "react-native";
import RNForegroundService from "@supersami/rn-foreground-service";

export const sleep = (time: any) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));
export const update = () => {}

export const counter = async (taskData: {delay: number}) => {
    if (Platform.OS === 'ios') {
        console.warn(
            'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
            'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.'
            );
    }
    await new Promise(async (resolve) => {
        // For loop with a delay
        const { delay } = taskData;
        console.log(RNForegroundService.is_running(), delay)
        for (let i = 0; RNForegroundService.is_running(); i++) {
            console.log('Runned -> ', i);
            await sleep(delay);
            //            RNForegroundService.stop().then()
        }
        //        RNForegroundService.stop().then()
    });
};
