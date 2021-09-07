import React, {useContext} from 'react';
import FormTextInput from './FormTextInput';
import {Alert, Button, View} from 'react-native';
import { useLogin } from '../hooks/ApiHooks';
import useLoginForm from '../hooks/LoginHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validator} from '../utils/validator'

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
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        icon={{ type: 'material', name: 'person' }}
        onEndEditing={(evt) => {
          validator("username", evt.nativeEvent.text, "username")
        }}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        icon={{ type: 'material', name: 'lock' }}
      />
      <Button title="Login!" onPress={doLogin}/>
    </View>
    );
}

export default LoginForm;
