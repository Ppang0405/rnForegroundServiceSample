import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
	Startup: undefined;
	Example: undefined;
	ForegroundServiceAvailablePackages: undefined;
	NotifeeForegroundService: undefined;
	ForegroundServiceV2: undefined;
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;
