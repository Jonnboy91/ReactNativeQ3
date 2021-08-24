import React, {useState, useEffect} from 'react';

const url = 'http://media.mw.metropolia.fi/wbma/';
const useLoadMedia = () => {
  const [data, setData] = useState({mediaArray: []});

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(url + 'media');
        const jsonResponse = await response.json();
        const json = await Promise.all(jsonResponse.map(async (item) => {
          const response = await fetch(url + 'media/' + item.file_id);
          const json = await response.json();
          return json;
        }));
        setData(json);
      } catch(e) {
        console.log(e.message);
      }
    };
    loadMedia();
  }, []);

  return data;
};

export {useLoadMedia};