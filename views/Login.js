import React, {useContext, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';
import PropTypes from 'prop-types';
import {useLogin} from '../hooks/ApiHooks'
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);

    const logIn = async () => {
        console.log("clicked")
        try{
            const login = await useLogin({username:"Jonnboy91", password:"React12345"});
            console.log("login",login);
            if(login != null || login != undefined){
                await AsyncStorage.setItem('userToken', login.token);
                setIsLoggedIn(true);
            } else {
                throw new Error("Login undefined or NULL");
            }
        } catch (e){
            console.log("errooorrrs")
            console.log(e)
        }
        
      };

      const getToken = async () => {
          try{
            const userToken = await AsyncStorage.getItem('userToken');
            console.log('token', userToken);
            const response = await fetch('https://media.mw.metropolia.fi/wbma/users/user', {
                method: 'GET',
                headers: {
                  'x-access-token': userToken
                },
              });
              if(response.ok){
                  isLoggedIn = true;
              }else {
                  isLoggedIn = false;
              }
          } catch(e){
              console.log("error on token",e);
          }
        
      };
    
    useEffect(() => {
        getToken();
    }, []);
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Button title="Sign in!" onPress={logIn} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

Login.propTypes = {
    navigation: PropTypes.object,
};

export default Login;