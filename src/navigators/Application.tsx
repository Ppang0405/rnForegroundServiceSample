import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {Example, ForegroundServiceAvailablePackages, ForegroundServiceV2, NotifeeForegroundService, Startup} from '@/screens';
import { useTheme } from '@/theme';

import type { ApplicationStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();

	return (
		<NavigationContainer theme={navigationTheme}>
			<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Startup" component={Startup} />
				<Stack.Screen name="ForegroundServiceAvailablePackages" component={ForegroundServiceAvailablePackages} />
				<Stack.Screen name="NotifeeForegroundService" component={NotifeeForegroundService} />
				<Stack.Screen name="ForegroundServiceV2" component={ForegroundServiceV2} />
				<Stack.Screen name="Example" component={Example} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;
