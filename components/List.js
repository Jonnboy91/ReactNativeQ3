import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem'
import {useLoadMedia} from '../hooks/ApiHooks'

const url = 'http://media.mw.metropolia.fi/wbma/';

const List = () => {
  const mediaArray = useLoadMedia();
  return (
    <FlatList 
          data={ mediaArray }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ListItem singleMedia={item} />}
        />
  );
};

export default List;