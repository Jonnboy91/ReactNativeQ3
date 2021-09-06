import React, {useContext} from 'react';
import {Alert, View} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useLogin } from '../hooks/ApiHooks';
import useLoginForm from '../hooks/LoginHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = () => {
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);

    const doLogin = async () => {
      const serverResponse = await useLogin(inputs);
      if (serverResponse) {
        Alert.alert(serverResponse.message);
        await AsyncStorage.setItem('userToken', serverResponse.token);
        setUser(serverResponse.user);
        setIsLoggedIn(true);
      } else {
        Alert.alert('Login failed');
      }
  };

  const {inputs, handleInputChange} = useLoginForm(); 

    return (
        <View>
      <Input
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <Input
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button title="Sign in!" onPress={doLogin}/>
    </View>
    );
}

export default LoginForm;
