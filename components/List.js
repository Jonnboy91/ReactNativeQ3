import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem'

const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

const List = () => {
  const [data, setData] = useState({ mediaArray: [] });

  try {
    useEffect(() => {
      const loadMedia = async () => {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        console.log(json);
      };
      loadMedia();
    }, []);
  } catch {
    console.log(error);
  }

  return (
    <FlatList 
          data={ data }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ListItem singleMedia={item} />}
        />
  );
};

export default List;