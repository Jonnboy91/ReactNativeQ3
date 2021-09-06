import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, getIconType, Icon, Image, Text} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {
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

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    props.navigation.navigate('Login');
  };
  return (
    <View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <Icon name="person" style={{flex: 1, justifyContent: 'center'}} />
        <Text style={{flex: 1, color: 'blue'}}>Username: {user.username}</Text>
      </View>
      <Image
        containerStyle={{alignSelf: 'center', marginVertical: 18}}
        style={{width: 350, height: 350}}
        source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + avatar}}
      />
      <Text style={{padding: 10}}>Fullname: {user.full_name ?? 'No added name'}</Text>
      <Text style={{padding: 10}}>Email: {user.email}</Text>
      <Button title={'Logout'} onPress={logout} />
    </View>
  );
};

export default Profile;
