import React from 'react';
import { Settings } from "react-native-feather";
import {StatusBar} from 'expo-status-bar'
import {StyleSheet, SafeAreaView, ImageBackground, View, Text} from 'react-native';
import GlobalStyles from '../GlobalStyles'
import List from '../components/List'

const Home = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.container, GlobalStyles.droidSafeArea]}>
            <View style={styles.textBox}>
                <Text style={{
        fontSize: 30,}}>Hello</Text>
            </View>
            <Settings style={styles.settingsIcon} stroke="white" width={32} height={32}/>
            <View style={styles.ImageBackgroundBox}>
            <ImageBackground source={{uri: 'https://placekitten.com/250/200'}} style={styles.backgroundImageView} imageStyle={styles.backgroundImage}>
            </ImageBackground>
            </View>
            <List navigation={navigation}></List>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292827'
    },
    ImageBackgroundBox: {
        height: 250,
        marginBottom: 10,
    },
    backgroundImageView: {
        width: '100%', 
        height: '100%',
        resizeMode: 'cover',
        marginBottom: 16,
        
    },
    backgroundImage: {
        borderBottomRightRadius: 100
    },
    
    textBox: {
        position: 'absolute',
        backgroundColor: 'blue',
        width: 70,
        top: 200,
        zIndex: 9999,
    },
    settingsIcon:{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 9999,
    }
});


export default Home;