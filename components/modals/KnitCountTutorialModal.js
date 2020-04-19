import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from "react-native-modal";
import PropTypes from "prop-types";

import AppSettingsStore from "../../store/AppSettingsStore";
import KnitCountActionButton from "../buttons/KnitCountActionButton";
import {Linking} from "expo";

const KnitCountTutorialModal = (props) => {
  return (
    <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <View style={[styles.modalContainer, {backgroundColor: AppSettingsStore.mainColor}]}>
        <View style={styles.tutorialContainer}>
          <Text style={[styles.modalHeader, {color: AppSettingsStore.mainTextColor}]}>
            {props.isFirstLaunch ? "Welcome to KnitCount!" : "KnitCount Help"}
          </Text>
          <Text style={[styles.modalText, {color: AppSettingsStore.mainTextColor}]}>
            {
              props.isFirstLaunch
                ? "We recommend that you start by watching this brief tutorial. If you want to view it again, it's " +
                "in the app settings screen."
                : "Tap Add Counter to add a counter\n" +
                "Tap a counter to increase the counter\n" +
                "Swipe left to decrease the counter\n" +
                "Tap and Hold to show the advanced counter actions"
            }
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <View style={{width: "100%"}}>
            <View style={{margin: 6}}>
              <KnitCountActionButton
                onPress={() => Linking.openURL('https://www.youtube.com/watch?v=7KsW2X-eXJo')}
                label={"Watch Tutorial"}
                bgColor={AppSettingsStore.mainTextColor}
                textColor={AppSettingsStore.mainColor}
              />
            </View>
            {
              props.isFirstLaunch && (
                <View style={{margin: 6}}>
                  <KnitCountActionButton
                    onPress={props.onBackdropPress}
                    label={"I'm ready! 🧶"}
                    bgColor={AppSettingsStore.mainTextColor}
                    textColor={AppSettingsStore.mainColor}
                  />
                </View>
              )
            }
          </View>
        </View>
      </View>
    </Modal>
  );
};

KnitCountTutorialModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  isFirstLaunch: PropTypes.bool
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  tutorialContainer: {
    alignItems: "center",
    margin: 8
  },
  modalHeader: {
    fontSize: 18,
    marginTop: 12,
    fontFamily: "avenir-roman",
    textTransform: "uppercase"
  },
  modalText: {
    fontSize: 14,
    marginHorizontal: 8,
    marginTop: 12,
    fontFamily: "avenir-roman",
    textAlign: "left"
  },
  actionContainer: {
    flexDirection: "row",
    margin: 12,
    fontFamily: "avenir-roman",
    fontSize: 16
  }
});

export default KnitCountTutorialModal;
