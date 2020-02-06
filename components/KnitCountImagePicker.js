import React from 'react';
import { Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import { Ionicons } from '@expo/vector-icons';

import Image from "../models/Image";
import ProjectsStore from "../store/ProjectsStore";

const KnitCountImagePicker = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) ButtonComponent = TouchableNativeFeedback;
  const addIconName = Platform.OS === "android" ? "md-camera" : "ios-camera";

  const verifyPermissions = async() => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        "Insufficient permissions!",
        "KnitCount needs camera permissions to be able to use your device's camera or image gallery.",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async() => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    const pickedImage = new Image(null, props.projectId, image.uri);
    if (props.projectId && pickedImage.imageUri) ProjectsStore.addImageToProjectById(props.projectId, pickedImage);
  };

  return (
    <View style={[styles.buttonContainer, {borderColor: props.mainTextColor}]}>
      <ButtonComponent onPress={takeImageHandler} >
        <View style={[styles.button, {backgroundColor: props.mainColor}]}>
          <Ionicons name={addIconName} size={60} color={props.mainTextColor} />
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 3,
    borderWidth: 2
  },
  button: {
    paddingVertical: 12,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  }
});

export default KnitCountImagePicker;
