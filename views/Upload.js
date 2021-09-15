import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Image} from 'react-native-elements';
import useUploadForm from "../hooks/UploadHooks";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormTextInput from '../components/FormTextInput';
import {useTag, useUploadMedia} from '../hooks/ApiHooks';

const Upload = ({navigation}) => {
  const {inputs, handleInputChange } = useUploadForm();
  const [image, setImage] = useState(require("../assets/icon.png"));
  const { uploadMedia, loading } = useUploadMedia();
  const { addTag } = useTag();

  const doUpload = async () => {
    const filename = image.uri.split('/').pop();
    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    if (type === 'image/jpg') type = 'image/jpeg';
    const formData = new FormData();
    formData.append("file", { uri: image.uri, name: filename, type });
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);

    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const result = await uploadMedia(formData, userToken);
      console.log("doUpload", result);
      const tagResult = await addTag(result.file_id, "myApp1991", userToken);
      console.log("doUploading", tagResult);
      if (tagResult.message) {
        navigation.navigate("Home Screen");
      }
    } catch (e) {
      console.log("doUpload error", e.message);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5
    });

    console.log(result);

    if (!result.cancelled) {
      setImage({ uri: result.uri });
    }
  };

  return (
    <View>
        <Image
        source={image}
        style={{ width: 400, height: 200 }} />
      <Button title="Select media" onPress={pickImage} loading={loading} />

      <FormTextInput
        autoCapitalize="none"
        placeholder="Title"
        onChangeText={(txt) => handleInputChange("title", txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Description"
        onChangeText={(txt) => handleInputChange("description", txt)}
      />
      
      <Button title="Upload" onPress={doUpload} loading={loading} />
    </View>
  );
};

export default Upload;
