import React from 'react';
import {View} from 'react-native';
import {Icon, Image, Text} from 'react-native-elements';

const uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = (file) => {
  const otherParam = file.route.params.otherParam;
  return (
    <View>
      <Image
        containerStyle={{alignSelf: 'center', marginTop: 32}}
        style={{width: 300, height: 300}}
        source={{
          uri:
            uploadUrl + otherParam.thumbnails?.w160 ??
            'https://placekitten.com/200/300',
        }}
      />
      <View style={{flexDirection: 'row', paddingTop: 32}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Icon name="photo"></Icon>
        </View>
        <View style={{flex: 8}}>
          <Text h4>{otherParam.title}</Text>
          <Text>{otherParam.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default Single;
