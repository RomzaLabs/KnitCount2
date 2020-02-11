import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from "react-native-modal";
import PropTypes from "prop-types";

import AppSettingsStore from "../../store/AppSettingsStore";
import KnitCountActionButton from "../KnitCountActionButton";
import * as Permissions from "expo-permissions";

const KnitCountImagePickerModal = (props) => {

  const verifyCameraPermissions = async() => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
    if (result.status !== 'granted') {
      Alert.alert(
        "Insufficient permissions!",
        "KnitCount needs camera permissions to be able to use your device's camera.",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const verifyImageLibraryPermissions = async() => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        "Insufficient permissions!",
        "KnitCount needs camera roll permissions to be able to use your device's image gallery.",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  return (
    <Modal style={styles.view} isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <View style={[styles.modalContainer, {backgroundColor: AppSettingsStore.mainColor}]}>
        <View style={{alignItems: "center"}}>
          <View style={{width: "100%", marginTop: 6}}>
            <KnitCountActionButton
              onPress={async() => {
                const hasCameraPermission = await verifyCameraPermissions();
                const hasCameraRollPermission = await verifyImageLibraryPermissions(); // Required for Android and iOS10
                if (hasCameraPermission && hasCameraRollPermission) {
                  props.onCameraChosen();
                }
                props.onBackdropPress();
              }}
              label={"Take a photo"}
              bgColor={AppSettingsStore.mainTextColor}
              textColor={AppSettingsStore.mainColor}
            />
          </View>

          <View style={{width: "100%", margin: 6}}>
            <KnitCountActionButton
              onPress={async() => {
                const hasCameraRollPermission = await verifyImageLibraryPermissions();
                if (hasCameraRollPermission) {
                  props.onImageLibraryChosen();
                }
                props.onBackdropPress();
              }}
              label={"Choose from library"}
              bgColor={AppSettingsStore.mainTextColor}
              textColor={AppSettingsStore.mainColor}
            />
          </View>

        </View>
      </View>
    </Modal>
  );
};

KnitCountImagePickerModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  onCameraChosen: PropTypes.func.isRequired,
  onImageLibraryChosen: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0
  },
  modalContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
});

export default KnitCountImagePickerModal;
