import React, {useContext, useState} from 'react';
import FormTextInput from './FormTextInput';
import {Alert, View} from 'react-native';
import { useLogin, useRegister } from '../hooks/ApiHooks';
import useSignUpForm from '../hooks/RegisterHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';

const RegisterForm = () => {
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
  const {inputs, handleInputChange, checkUsername, registerError} = useSignUpForm();
  const [usernameNotUsed, setUsernameNotUsed] = useState(true)

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


    return (
        <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt) }
        icon={{ type: 'material', name: 'person' }}
        onEndEditing = { async (evt) => {
          await checkUsername(evt.nativeEvent.text);
          }}
        error = {registerError.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        icon={{ type: 'material', name: 'lock' }}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        icon={{ type: 'material', name: 'email' }}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        icon={{ type: 'material', name: 'badge' }}
      />
      <Button title="Register!" onPress={doRegister}/>
    </View>
    );
}

export default RegisterForm;
