import React, {useContext} from 'react';
import {Alert, View} from 'react-native';
import { useLogin, useRegister } from '../hooks/ApiHooks';
import useSignUpForm from '../hooks/RegisterHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Button} from 'react-native-elements';

const RegisterForm = () => {
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);

  const doRegister = async () => {
    const serverResponse = await useRegister(inputs);
    if (serverResponse) {
      Alert.alert(serverResponse.message);
      const loginServerResponse = await useLogin(inputs);
      if (loginServerResponse) {
        Alert.alert(loginServerResponse.message);
        await AsyncStorage.setItem('userToken', loginServerResponse.token);
        setUser(loginServerResponse.user);
        console.log("user is: ",user);
        setIsLoggedIn(true);
      } else {
        Alert.alert('Login failed');
      }
    } else {
      Alert.alert('register failed');
    }
};

const {inputs, handleInputChange} = useSignUpForm(); // makes inputs and handleInput change visible from RegisterHooks.js

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
      <Input
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <Input
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register!" onPress={doRegister}/>
    </View>
    );
}

export default RegisterForm;
