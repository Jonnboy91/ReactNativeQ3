import {useState} from 'react';
import {checkUsernameAvailability} from './ApiHooks';
import { validator } from "../utils/validator";

const constraints = {
  username: {
    presence: true,
    length: {
      minimum: 3,
      message: "^Username must be at least 3 characters long"
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "^Password must be at least 6 characters"
    }
  },
  confirm_password: {
    presence: true,
    equality: {
      attribute: "password",
      message: "^Passwords doesn't match",
    }

  },
  email: {
    presence: true,
    email: {
      message: "^Enter a valid email address"
    }
  },
  full_name: {
    format: {
      pattern: "[a-zA-Z]+",
      message: "^Full name can only contain letters"
    }
  }

};

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

  const handleOnEndEditing = (name, text) => {

    let error = validator(name, text, constraints);

    if (name === 'confirm_password') {
      error = validator(name, {password: inputs.password, confirm_password: text}, constraints)
    } else {
      error = validator(name, text, constraints);
    }

    setRegisterErrors((registerErrors) => {
      return {
        ...registerErrors,
        [name]: error
      };
    });
  };

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
    handleOnEndEditing,
    inputs,
    registerErrors,
  };
};

export default useSignUpForm;