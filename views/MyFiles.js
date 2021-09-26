import React from 'react';
import {FlatList} from 'react-native';
import {useLoadMedia} from '../hooks/ApiHooks';
import ListItem from '../components/ListItem';
import PropTypes from 'prop-types';

const MyFiles = ({navigation}) => {
    const mediaArray = useLoadMedia();
  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => (
        <ListItem
          singleMedia={item}
          navigation={navigation}
          showButtons={true}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MyFiles;