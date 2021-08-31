import React, {useContext, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useLogin} from '../hooks/ApiHooks'
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
    const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);

    /* const logIn = async () => {
        console.log("clicked")
        try{
            const login = await useLogin({username:"Jonnboy91", password:"React12345"});
            if(login != null || login != undefined){
                await AsyncStorage.setItem('userToken', login.token);
                setIsLoggedIn(true);
            } else {
                throw new Error("Login undefined or NULL");
            }
        } catch (e){
            console.log(e)
        }
        
      }; */

      const getToken = async () => {
          try{
            const userToken = await AsyncStorage.getItem('userToken');
            const response = await fetch('https://media.mw.metropolia.fi/wbma/users/user', {
                method: 'GET',
                headers: {
                  'x-access-token': userToken
                },
              });
              const json = await response.json();
              if(response.ok){
                  setUser(json);
                  setIsLoggedIn(true);
              }else {
                setIsLoggedIn(false);
              }
          } catch(e){
              console.log("error on token",e);
          }
        
      };
    
    useEffect(() => {
        getToken();
    }, []);
    return (
        <KeyboardAvoidingView style={styles.container}>
          <Text>Login</Text>
          <LoginForm navigation={navigation}/>
          <RegisterForm navigation={navigation} />
        </KeyboardAvoidingView>
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