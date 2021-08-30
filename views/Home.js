import React from 'react';
import {StatusBar} from 'expo-status-bar'
import {StyleSheet, SafeAreaView} from 'react-native';
import GlobalStyles from '../GlobalStyles'
import List from '../components/List'

const Home = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container, GlobalStyles.droidSafeArea}>
            <List navigation={navigation}></List>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});


export default Home;