import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from "react-native-modal";
import PropTypes from "prop-types";

import AppSettingsStore from "../../store/AppSettingsStore";
import KnitCountActionButton from "../buttons/KnitCountActionButton";
import KnitCountDestructiveButton from "../buttons/KnitCountDestructiveButton";
import KnitCountNumberStepper from "../KnitCountNumberStepper";
import AudioManager from "../../constants/AudioManager";
import {Rips} from "../../constants/Sounds";

const KnitCountCounterModal = (props) => {
  const [counterLabel, setCounterLabel] = useState('');
  const [stepsPerCount, setStepsPerCount] = useState(0);

  useEffect(() => { setCounterLabel(props.counter.label) }, [props.counter.label]);
  useEffect(() => { setStepsPerCount(props.counter.stepsPerCount) }, [props.counter.stepsPerCount]);

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
            <View style={styles.actionItem}>
              <TextInput
                style={[styles.input, {backgroundColor: AppSettingsStore.mainBGColor, color: AppSettingsStore.mainTextColor}]}
                placeholder="Enter counter label"
                value={counterLabel}
                onChangeText={(e) => {
                  setCounterLabel(e);
                  const newCounter = {...props.counter, label: e};
                  props.onCounterChanged(newCounter);
                }}
                onSubmitEditing={() => {
                  props.onBackdropPress();
                }}
              />
            </View>
          </View>
          <View style={styles.actionContainer}>
            <Text style={[styles.actionLabel, {color: AppSettingsStore.mainTextColor}]}>
              Steps per count
            </Text>
            <View style={styles.actionItem}>
              <KnitCountNumberStepper
                value={stepsPerCount}
                minValue={1}
                maxValue={50}
                stepValue={1}
                buttonsTextColor={AppSettingsStore.mainTextColor}
                buttonsBackgroundColor={AppSettingsStore.mainColor}
                labelTextColor={AppSettingsStore.mainTextColor}
                labelBackgroundColor={AppSettingsStore.mainBGColor}
                cornerRadius={5}
                onChange={(e) => {
                  setStepsPerCount(e);
                  const newCounter = {...props.counter, stepsPerCount: e};
                  props.onCounterChanged(newCounter);
                }}
              />
            </View>
          </View>
          <View style={styles.actionContainer}>
            <View style={{width: "100%"}}>
              <View style={{margin: 6}}>
                <KnitCountActionButton
                  onPress={() => {
                    const _ = AudioManager.playRipSound(Rips.frog);
                    const newCounter = {...props.counter, value: 0};
                    props.onCounterChanged(newCounter);
                    props.onBackdropPress();
                  }}
                  label={"Reset to Zero"}
                  bgColor={AppSettingsStore.mainTextColor}
                  textColor={AppSettingsStore.mainColor}
                />
              </View>
              <View style={{margin: 6}}>
                <KnitCountDestructiveButton
                  onPress={() => {
                    props.onCounterDeleted(props.counter);
                    props.onBackdropPress();
                  }}
                  label={"Delete Counter"}
                />
              </View>
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
  counter: PropTypes.object.isRequired,
  onCounterChanged: PropTypes.func.isRequired,
  onCounterDeleted: PropTypes.func.isRequired
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
    width: "100%",
    padding: 8,
    borderRadius: 5,
    height: 50
  },
  actionContainer: {
    flexDirection: "row",
    margin: 12,
    fontFamily: "avenir-roman",
    fontSize: 16
  },
  actionLabel: {
    fontSize: 16,
    marginVertical: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionItem: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-end"
  }
});

export default KnitCountCounterModal;
