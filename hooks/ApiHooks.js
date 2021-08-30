import React, {useState, useEffect} from 'react';

const url = 'https://media.mw.metropolia.fi/wbma/';

  const useLogin = async (data={}) => {
    try{
      const response = await fetch(url+'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if(response.ok){
        const json = await response.json();
        return json;
      } else{
        throw new Error("Response is not ok");
      }
    }catch(e){
      console.log("error is: ", e)
    }
   
  }

  const useRegister = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
       const response = await fetch(url + 'users', fetchOptions);
       const json = await response.json();
       return json;
    } catch (e) {
        console.log('ApiHooks register', e.message);
        return false;
    }
  };


const useLoadMedia = () => {
  const [data, setData] = useState({mediaArray: []});


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
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return data;
};

export {useLoadMedia, useLogin, useRegister};