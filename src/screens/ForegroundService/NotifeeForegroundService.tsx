import notifee, { EventType, AuthorizationStatus } from '@notifee/react-native';
import { Button,TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';

type TaskState = {
	update: {
		total: number;
		current: number;
	};
	complete: boolean;
};

function onTaskUpdate(callback) {}

export function notifeeRegisterForegroundService() {
	notifee.registerForegroundService(notification => {
		console.warn('Foreground service started.', notification);
		return new Promise(resolve => {
			/**
			 * Cancel the notification and resolve the service promise so the Headless task quits.
			 */
			async function stopService(id?: string): Promise<void> {
				console.warn(`Stopping service, using notification id: ${id}`);
				clearInterval(interval);
				if (id) {
					await notifee.cancelNotification(id);
				}
				return resolve();
			}

			/**
			 * Cancel our long running task if the user presses the 'stop' action.
			 */
			async function handleStopActionEvent({
				type,
				detail,
			}: Event): Promise<void> {
				console.log(
					'handleStopActionEvent1 type:',
					type,
					'pressactionid',
					detail?.pressAction?.id,
				);

				if (type !== EventType.ACTION_PRESS) return;
				console.log(
					'handleStopActionEvent2 type:',
					type,
					'pressactionid',
					detail?.pressAction?.id,
				);

				if (detail?.pressAction?.id === 'stop') {
					console.warn('Stop action was pressed');
					await stopService(detail.notification?.id);
				}
			}

			notifee.onForegroundEvent(handleStopActionEvent);
			notifee.onBackgroundEvent(handleStopActionEvent);

			// A fake progress updater.
			let current = 1;
			const interval = setInterval(async () => {
				notification.android = {
					progress: { current },
				};
				notifee.displayNotification(notification);
				current++;
			}, 125);

			setTimeout(async () => {
				clearInterval(interval);
				console.warn('Background work has completed.');
				await stopService(notification.id);
			}, 15000);
		});
	});
}

function NotifeeForegroundService() {
	return (
		<>
			<Button title="Start Foreground Service" />
			<Button title="Stop Foreground Service" />

			<TouchableOpacity
				onPress={async (): Promise<void> => {
                const currentPermissions = await notifee.getNotificationSettings();
					if (
						currentPermissions.authorizationStatus !==
						AuthorizationStatus.AUTHORIZED
					) {
                        await notifee.requestPermission();
					}
					notifee.displayNotification({
						// @ts-ignore FIXME what is key and why doesn't typescript like this line?
						key: 'Big Picture Style',
						notification: {
							title: 'Big Picture Style',
							body: 'Expand for a cat',
							ios: {
								attachments: [
									{
										id: 'image',
										url: 'https://github.githubassets.com/images/modules/open_graph/github-mark.png',
										thumbnailHidden: false,
										thumbnailClippingRect: {
											x: 0.1,
											y: 0.1,
											width: 0.1,
											height: 0.1,
										},
									},
								],
							},
						},
					}).then(() => {
                        console.log('displayNotification called')
                    }).catch((error) => {
                        console.log({error})
                    });
					// Alert.alert(
					//   'Restrictions Detected',
					//   'To ensure notifications are delivered, please disable battery optimization for the app.',
					//   [
					//     // 3. launch intent to navigate the user to the appropriate screen
					//     {
					//       text: 'OK, open settings',
					//       onPress: () => Notifee.openBatteryOptimizationSettings(),
					//     },
					//     {
					//       text: 'Cancel',
					//       onPress: () => console.log('Cancel Pressed'),
					//       style: 'cancel',
					//     },
					//   ],
					//   { cancelable: false },
					// );
				}}
			>
				<View style={styles.button}>
					{/* eslint-disable-next-line react-native/no-inline-styles */}
					<Text style={{ color: '#2c8be6' }}>Display Notification</Text>
				</View>
			</TouchableOpacity>
		</>
	);
}

export default NotifeeForegroundService;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    imageContainer: { justifyContent: 'center', alignContent: 'center', marginBottom: 60 },
    logo: {
        width: 100,
        height: 100,
    },
    button: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'yellow',
        height: 30,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    alertText: {
        color: '#2c8be6',
    },
});
