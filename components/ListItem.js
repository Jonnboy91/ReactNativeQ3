import React from 'react';
import PropTypes from 'prop-types';
import { ListItem as NBListItem, Avatar, Button} from 'react-native-elements';

const uploadUrl = "http://media.mw.metropolia.fi/wbma/uploads/"

const ListItem = (props) => {
    return (
        <NBListItem bottomDivider>
           <Avatar source={{uri: uploadUrl + props.singleMedia.thumbnails?.w160}} />
        <NBListItem.Content>
          <NBListItem.Title>{props.singleMedia.title}</NBListItem.Title>
          <NBListItem.Subtitle>{props.singleMedia.description}</NBListItem.Subtitle>
        </NBListItem.Content>
        <Button title="View" onPress={
            () => {
                props.navigation.navigate('Single', {otherParam: props.singleMedia});
            }
        }/>
      </NBListItem>
    );
}

ListItem.propTypes = {
    singleMedia: PropTypes.object,
    navigation: PropTypes.object,
};

export default ListItem;
