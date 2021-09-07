import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
  const [account, setAccount] = useState(false);

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await fetch(
        'https://media.mw.metropolia.fi/wbma/users/user',
        {
          method: 'GET',
          headers: {
            'x-access-token': userToken,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setUser(json);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.log('error on token', e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <KeyboardAvoidingView>
      {account ? (
        <View>
        <Text h3 style={{textAlign: 'center'}}>
          Register
        </Text>
        <RegisterForm navigation={navigation} />
      </View>
      ) : (
        <View>
          <Text h3 style={{textAlign: 'center'}}>
            Login
          </Text>
          <LoginForm navigation={navigation} />
        </View>
      )}
        <Button
          title= {account ? "Already have an account? Login here" : "Don't have an account? Register here"}
          onPress={() => {
            setAccount(!account);
          }}
        ></Button>

    </KeyboardAvoidingView>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
