import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import Confetti from 'reanimated-confetti';

import AppSettingsStore from "../../store/AppSettingsStore";
import KnitCountProjectCard from "../KnitCountProjectCard";
import KnitCountActionButton from "../KnitCountActionButton";

const KnitCountFinishedModal = (props) => {
  return (
    <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <View style={[styles.modalContainer, {backgroundColor: AppSettingsStore.mainColor}]}>
        <KnitCountProjectCard
          onPress={() => {}}
          image={props.image}
          title={props.name}
          status={props.status}
          textColor={AppSettingsStore.mainTextColor}
          hideShadows={true}
        />
        {Platform.OS === "ios" && <Confetti duration={4000} />}
        <View style={styles.finishedModalActionContainer}>
          <KnitCountActionButton
            onPress={() => {
              props.onBackdropPress();
              props.navigation.popToTop();
            }}
            label={"Go to My Projects"}
            bgColor={AppSettingsStore.mainTextColor}
            textColor={AppSettingsStore.mainColor}
          />
        </View>
      </View>
    </Modal>
  );
};

KnitCountFinishedModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  image: PropTypes.object,
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  finishedModalActionContainer: {
    margin: 6
  }
});

export default KnitCountFinishedModal;
