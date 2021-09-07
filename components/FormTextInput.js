import React from 'react';
import {Input} from 'react-native-elements';

const FormTextInput = ({icon, error, label, ...otherProps}) => {
    return (
      <Input
      errorStyle={{color: 'red'}}
        errorMessage={error}
        {...otherProps}
        leftIcon={icon}
      />
    );
  };

  export default FormTextInput;