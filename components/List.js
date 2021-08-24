import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem'

const url = 'http://media.mw.metropolia.fi/wbma/';

const List = () => {
  const [data, setData] = useState({mediaArray: []});


  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(url + 'media');
        const jsonResponse = await response.json();
        const json = await Promise.all(jsonResponse.map(async (item) => {
          const response = await fetch(url + 'media/' + item.file_id);
          const json = await response.json();
          console.log("Tässä", json.thumbnails?.w160 ?? "https://placekitten.com/200/300");
          return json;
        }));
        setData(json);
      } catch {
        console.log(error);
      }
    };
    loadMedia();
  }, []);


  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;