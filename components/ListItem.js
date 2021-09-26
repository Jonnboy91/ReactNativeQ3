import React from 'react';
import PropTypes from 'prop-types';
import {ListItem as NBListItem, Avatar, Button} from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {deleteMedia} from '../hooks/ApiHooks';

const uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = (props) => {
  return (
    <NBListItem bottomDivider>
      <Avatar source={{uri: uploadUrl + props.singleMedia.thumbnails?.w160}} />
      <NBListItem.Content>
        <NBListItem.Title>{props.singleMedia.title}</NBListItem.Title>
        <NBListItem.Subtitle>
          {props.singleMedia.description}
        </NBListItem.Subtitle>
        {props.showButtons && (
          <>
            <Button title="Modify" onPress={async () => {
                try {
                  const token = await AsyncStorage.getItem('userToken');
                  console.log('Modify', response);
                } catch (e) {
                  console.log('ListItem, Modify: ', e.message);
                }
              }}/>
            <Button
              title="Delete"
              onPress={async () => {
                try {
                  const token = await AsyncStorage.getItem('userToken');
                  const response = await deleteMedia(
                    props.singleMedia.file_id,
                    token
                  );
                  console.log('Delete', response);
                } catch (e) {
                  console.log('ListItem, delete: ', e.message);
                }
              }}
            />
          </>
        )}
      </NBListItem.Content>
      <Button
        title="View"
        onPress={() => {
          props.navigation.navigate('Single', {otherParam: props.singleMedia});
        }}
      />
    </NBListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  showButtons: PropTypes.bool.isRequired,
};

export default ListItem;
