import {View, ActivityIndicator } from 'react-native'

export function Loading() {
	return (
        <View style={{ flex: 1, alignContent: 'center', alignSelf: 'center'}}>
			<ActivityIndicator color="#ceced2" />
		</View>
	)
}