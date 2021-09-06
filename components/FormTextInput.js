import React from 'react';
import {Input} from 'react-native-elements';

const FormTextInput = ({icon, ...otherProps}) => {
    return (
      <Input
        {...otherProps}
        leftIcon={icon}
      />
    );
  };

  export default FormTextInput;