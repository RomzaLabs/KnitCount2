import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from "react-native-modal";
import PropTypes from "prop-types";

import AppSettingsStore from "../../store/AppSettingsStore";
import ProjectsStore from "../../store/ProjectsStore";
import KnitCountDestructiveButton from "../KnitCountDestructiveButton";

const KnitCountCounterModal = (props) => {
  const [counterLabel, setCounterLabel] = useState(props.counter.label);

  return (
    <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <View style={[styles.modalContainer, {backgroundColor: AppSettingsStore.mainColor}]}>
        <View style={styles.actionsContainer}>
          <Text style={[styles.modalHeader, {color: AppSettingsStore.mainTextColor}]}>
            Counter Actions
          </Text>
          <View style={styles.actionContainer}>
            <Text style={[styles.actionLabel, {color: AppSettingsStore.mainTextColor}]}>
              Label
            </Text>
            <TextInput
              style={[styles.input, {backgroundColor: AppSettingsStore.mainBGColor, color: AppSettingsStore.mainTextColor}]}
              placeholder="Enter counter label"
              value={counterLabel}
              onChangeText={(e) => setCounterLabel(e)}
              onSubmitEditing={(e) => {
                ProjectsStore.updateCounterLabel(props.counter, e.nativeEvent.text);
                props.onBackdropPress();
              }}
            />
          </View>
          <View style={styles.actionContainer}>
            <Text style={[styles.actionLabel, {color: AppSettingsStore.mainTextColor}]}>
              Steps per count
            </Text>
            <TextInput
              style={[styles.input, {backgroundColor: AppSettingsStore.mainBGColor, color: AppSettingsStore.mainTextColor}]}
              placeholder="Enter counter label"
              value={counterLabel}
              onChangeText={(e) => setCounterLabel(e)}
              onSubmitEditing={(e) => {
                ProjectsStore.updateCounterLabel(props.counter, e.nativeEvent.text);
                props.onBackdropPress();
              }}
            />
          </View>
          <View style={styles.actionContainer}>
            <View style={{width: "100%"}}>
              <KnitCountDestructiveButton
                onPress={() => {
                  props.onBackdropPress();
                  ProjectsStore.deleteCounter(props.counter);
                }}
                label={"Delete counter"}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

KnitCountCounterModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  counter: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  actionsContainer: {
    alignItems: "center",
    marginHorizontal: 6,
    marginVertical: 12
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
    width: "70%",
    padding: 8,
    borderRadius: 5
  },
  actionContainer: {
    flexDirection: "row",
    margin: 12,
    fontFamily: "avenir-roman",
    fontSize: 16,
    justifyContent: "space-between"
  },
  actionLabel: {
    fontSize: 16,
    width: "30%",
    padding: 8
  }
});

export default KnitCountCounterModal;
