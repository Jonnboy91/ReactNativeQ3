import React from 'react';
import {StatusBar} from 'expo-status-bar'
import {View} from 'react-native';
import List from '../components/List'

const Home = ({navigation}) => {
    return (
        <View>
            <List navigation={navigation}></List>
            <StatusBar style="auto" />
        </View>
    );
};


export default Home;