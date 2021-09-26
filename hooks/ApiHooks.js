import axios from 'axios';
import {useState, useEffect} from 'react';

const url = 'https://media.mw.metropolia.fi/wbma/';

  const useLogin = async (data={}) => {
    try{
      console.log(data.confirm_password);
      const response = await fetch(url+'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      });
      if(response.ok){
        const json = await response.json();
        return json;
      } else{
        throw new Error("useLogin errors");
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
      body: inputs,
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

  const checkUsernameAvailability = async (username) => {
    try{
      const response = await fetch(
        'https://media.mw.metropolia.fi/wbma/users/username/' + username
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse.available
    } catch(e){
      console.log(e)
    }
  }

  const deleteMedia = async (id, token) => {
    const [loading, setLoading] = useState(false);
    try {
      setLoading(true);
      const options = {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      };
      const response = await fetch(url + 'media/' + id, options);
      const result = await response.json();
      return result;
    } catch (e) {
      console.log('deleteMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
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

const useUploadMedia = () => {
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(0);

  const uploadMedia = async (formData, token) => {
    try {
      setLoading(true);
      const options = {
        method: "POST",
        headers: { "x-access-token": token },
        data: formData
      };
      const result = await axios(url + "media/", options);
      console.log("axios", result.data);
      if (result.data) {
        setUpdate(update + 1);
        return result.data;
      }
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  
  };

  return {loading, uploadMedia};
}

const useTag = () => {

  const addTag = async (file_id, tag, token) => {
    const options = {
      method: 'POST',
      headers: {'x-access-token': token, "Content-Type": "application/json"},
      body: JSON.stringify({file_id, tag}),
    }

    try {
      const response = await fetch(url + 'tags', options)
      const tagInfo = response.json();
      if (tagInfo.error) {
        throw new Error(tagInfo.message + ": " + tagInfo.error);
      } else if (!response.ok) {
        throw new Error("fetch failed");
      }
      return tagInfo
    } catch (e) {
      throw new Error(e.message);
    }
  }

  return { addTag };
};



export {useLoadMedia, useLogin, useRegister, checkUsernameAvailability, useUploadMedia, useTag, deleteMedia};