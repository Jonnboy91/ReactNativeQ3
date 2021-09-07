import {useState} from 'react';
import {checkUsernameAvailability} from './ApiHooks';

const useSignUpForm = (callback) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const [registerErrors, setRegisterErrors] = useState({})

  const checkUsername = async (username) => {
    if(username.length < 3){
      return;
    }
    try{
      const isAvailable = await checkUsernameAvailability(username);
      if(!isAvailable){
        setRegisterErrors((registerErrors) => {
          return {...registerErrors, username:"Username is not available"}
        })
      }else{
        setRegisterErrors((registerErrors) => {
          return {...registerErrors, username: null}
        })
      }
    }catch(e){
      console.log('username check failed', e);
    }

  }

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };
  return {
    handleInputChange,
    checkUsername,
    inputs,
    registerError: registerErrors,
  };
};

export default useSignUpForm;