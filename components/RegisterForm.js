import React, {useContext} from 'react';
import FormTextInput from './FormTextInput';
import {Alert, View} from 'react-native';
import { useLogin, useRegister } from '../hooks/ApiHooks';
import useSignUpForm from '../hooks/RegisterHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';

const RegisterForm = () => {
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
  const {inputs, handleInputChange, handleOnEndEditing, checkUsername, registerErrors} = useSignUpForm();
  const doRegister = async () => {
    try{
      const serverResponse = await useRegister(JSON.stringify({
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
        full_name: inputs.full_name,
      }));
      if (serverResponse) {
        Alert.alert(serverResponse.message);
        const loginServerResponse = await useLogin(JSON.stringify({
          username: inputs.username,
          password: inputs.password,
          email: inputs.email,
          full_name: inputs.full_name,
        }));
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
    }catch (e) {
      console.log(e);
    }
};


    return (
        <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(txt) => handleInputChange('username', txt) }
        icon={{ type: 'material', name: 'person' }}
        onEndEditing = { async (evt) => {
          handleOnEndEditing('username', evt.nativeEvent.text)
          await checkUsername(evt.nativeEvent.text);
          }}
        error = {registerErrors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        icon={{ type: 'material', name: 'lock' }}
        onEndEditing = { async (evt) => {
          handleOnEndEditing('password', evt.nativeEvent.text)
          }}
        error = {registerErrors.password}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Confirm password"
        onChangeText={(txt) => handleInputChange('confirm_password', txt)}
        secureTextEntry={true}
        icon={{ type: 'material', name: 'lock' }}
        onEndEditing = { async (evt) => {
          handleOnEndEditing('confirm_password', evt.nativeEvent.text)
          }}
        error = {registerErrors.confirm_password}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        icon={{ type: 'material', name: 'email' }}
        onEndEditing = { async (evt) => {
          handleOnEndEditing('email', evt.nativeEvent.text)
          }}
        error = {registerErrors.email}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        icon={{ type: 'material', name: 'badge' }}
        onEndEditing = { async (evt) => {
          handleOnEndEditing('full_name', evt.nativeEvent.text)
          }}
        error = {registerErrors.full_name}
      />
      <Button title="Register!" onPress={doRegister} disabled={registerErrors.username || registerErrors.password || registerErrors.confirm_password || registerErrors.email}/>
    </View>
    );
}

export default RegisterForm;
