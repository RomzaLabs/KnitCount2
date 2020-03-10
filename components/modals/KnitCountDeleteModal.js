import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from "react-native-modal";
import PropTypes from "prop-types";

import AppSettingsStore from "../../store/AppSettingsStore";
import KnitCountActionButton from "../buttons/KnitCountActionButton";
import KnitCountDestructiveButton from "../buttons/KnitCountDestructiveButton";

const KnitCountDeleteModal = (props) => {
  return (
    <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <View style={[styles.modalContainer, {backgroundColor: AppSettingsStore.mainColor}]}>
        <View style={{alignItems: "center", margin: 12}}>
          <Text style={[styles.modalHeader, {color: AppSettingsStore.mainTextColor}]}>
            Are you sure? This cannot be undone!
          </Text>
          <View style={{width: "100%", marginTop: 6}}>
            <KnitCountActionButton
              onPress={props.onBackdropPress}
              label={"Oops! Don't delete"}
              bgColor={AppSettingsStore.mainTextColor}
              textColor={AppSettingsStore.mainColor}
            />
          </View>
          <View style={{width: "100%", margin: 6}}>
            <KnitCountDestructiveButton
              onPress={() => {
                props.onDeleteProject();
                props.onBackdropPress();
              }}
              label={"Yes, delete this project"}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

KnitCountDeleteModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  modalHeader: {
    fontSize: 16,
    marginTop: 12,
    fontFamily: "avenir-roman",
    textTransform: "uppercase"
  }
});

export default KnitCountDeleteModal;
