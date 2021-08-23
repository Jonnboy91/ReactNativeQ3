import React, {useState, useEffect} from 'react';

const url = 'http://media.mw.metropolia.fi/wbma/';
const useLoadMedia = () => {
    const [data, setData] = useState({ mediaArray: [] });
    try {
      useEffect(() => {
        const loadMedia = async () => {
          const response = await fetch(url+'media');
          const jsonResponse = await response.json();
          const json = await Promise.all(jsonResponse.map(async (item) => {
            const response =  await fetch(url + 'media/' + item.file_id);
            const json = await response.json();
            console.log("Tässä",json.thumbnails?.w160 ?? "https://placekitten.com/200/300"); // Some files are missing thumbnails.
            return json;
          }));
          setData(json);
        };
        loadMedia();
      }, []);
    } catch {
      console.log(error);
    }
  return data;
};

export {useLoadMedia};