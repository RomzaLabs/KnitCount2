import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Modal from "react-native-modal";
import PropTypes from "prop-types";

import AppSettingsStore from "../../store/AppSettingsStore";
import KnitCountActionButton from "../buttons/KnitCountActionButton";
import KnitCountDestructiveButton from "../buttons/KnitCountDestructiveButton";

const KnitCountImageModal = (props) => {
  return (
    <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <View style={[styles.modalContainer, {backgroundColor: AppSettingsStore.mainColor}]}>
        <View style={{alignItems: "center", margin: 12}}>
          <View style={styles.photosItemLarge}>
            <Image style={styles.image} source={{uri: props.selectedImage ? props.selectedImage.imageUri : null}} />
          </View>

          <View style={{width: "100%", marginTop: 6}}>
            <KnitCountActionButton
              onPress={() => {
                props.onFavoriteImageMarked(props.selectedImage);
                props.onBackdropPress();
              }}
              label={"Set as cover image"}
              bgColor={AppSettingsStore.mainTextColor}
              textColor={AppSettingsStore.mainColor}
            />
          </View>

          <View style={{width: "100%", margin: 6}}>
            <KnitCountDestructiveButton
              onPress={() => {
                props.onRemoveImage(props.selectedImage);
                props.onBackdropPress();
              }}
              label={"Delete this image."}
            />
          </View>

        </View>
      </View>
    </Modal>
  );
};

KnitCountImageModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onFavoriteImageMarked: PropTypes.func.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  selectedImage: PropTypes.object,
  onRemoveImage: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  photosItemLarge: {
    width: "100%",
    height: 200
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    resizeMode: "cover"
  }
});

export default KnitCountImageModal;
