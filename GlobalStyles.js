import { StyleSheet, Platform, droidSafeArea } from 'react-native';

export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : 0 //For some reason the android did not need the padding anymore...
    },
});