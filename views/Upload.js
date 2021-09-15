import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Image} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormTextInput from '../components/FormTextInput';

const Upload = (props) => {
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');

  const loadAvatar = async () => {
    try {
      const response = await fetch(
        'https://media.mw.metropolia.fi/wbma/tags/avatar_' + user.user_id
      );
      const jsonResponse = await response.json();
      setAvatar(jsonResponse[0].filename);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <View>
        <Image
        containerStyle={{alignSelf: 'center', marginVertical: 18}}
        style={{width: 350, height: 350}}
        source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + avatar}}
      />
      <Button title="Select file!" onPress={console.log("Selected")} buttonStyle={{marginBottom: 16}}/>

      <FormTextInput
        autoCapitalize="none"
        placeholder="Title"
        onChangeText={(txt) => console.log(txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Description"
        onChangeText={(txt) => console.log(txt)}
      />
      
      <Button title="Upload!" onPress={console.log("Uploaded")}/>
    </View>
  );
};

export default Upload;
