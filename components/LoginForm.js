import React from 'react';
import {Button, View, FormTextInput} from 'react-native';

const LoginForm = (props) => {
    return (
        <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button title="Login!" onPress={doLogin}/>
    </View>
    );
}

export default LoginForm;
