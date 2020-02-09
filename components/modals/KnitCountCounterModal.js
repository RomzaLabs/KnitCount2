import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from "react-native-modal";
import PropTypes from "prop-types";

import AppSettingsStore from "../../store/AppSettingsStore";
import ProjectsStore from "../../store/ProjectsStore";
import KnitCountDestructiveButton from "../KnitCountDestructiveButton";

const KnitCountCounterModal = (props) => {
  return (
    <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <View style={[styles.modalContainer, {backgroundColor: AppSettingsStore.mainColor}]}>
        <View style={styles.projectNameContainer}>
          <Text style={[styles.modalHeader, {color: AppSettingsStore.mainTextColor}]}>
            Counter Actions
          </Text>
          <View>
            <Text>Label:</Text>
            <TextInput
              style={[styles.input, {backgroundColor: AppSettingsStore.mainBGColor, color: AppSettingsStore.mainTextColor}]}
              placeholder="Enter project name"
              value={props.counter.label}
              onChangeText={(e) => props.onChangeText(e)}
              onSubmitEditing={(e) => {
                ProjectsStore.updateCounterLabel(props.counter, e.nativeEvent.text);
                props.onBackdropPress();
              }}
            />
          </View>
          <View>
            <Text>Steps per count:</Text>
          </View>
          <View>
            <KnitCountDestructiveButton
              onPress={() => {
                props.onBackdropPress();
                ProjectsStore.deleteCounter(props.counter);
              }}
              label={"Yes, delete this project."}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

KnitCountCounterModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  counter: PropTypes.object.isRequired,
  onChangeText: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  projectNameContainer: {
    alignItems: "center",
    margin: 12
  },
  modalHeader: {
    fontSize: 16,
    marginTop: 12,
    fontFamily: "avenir-roman",
    textTransform: "uppercase"
  },
  input: {
    fontFamily: "avenir-roman",
    fontSize: 16,
    width: "100%",
    marginTop: 8,
    marginBottom: 12,
    padding: 8,
    borderRadius: 5
  }
});

export default KnitCountCounterModal;
