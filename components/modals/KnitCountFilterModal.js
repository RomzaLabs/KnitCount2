import React from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import Modal from "react-native-modal";
import PropTypes from "prop-types";

import AppSettingsStore from "../../store/AppSettingsStore";
import ProjectsStore from "../../store/ProjectsStore";
import {FilterPreference} from "../../models/FilterPreference";

const KnitCountFilterModal = (props) => {
  return (
    <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <View style={[styles.filterContent, {backgroundColor: AppSettingsStore.mainBGColor}]}>
        <Text style={[styles.popupTitle,{color: AppSettingsStore.mainTextColor}]}>Filter Projects</Text>
        <View style={styles.filterBtnContainer}>
          <Button
            style={[styles.filterButton]}
            title="💪 All Projects 💪"
            color={Platform.OS === "android" ? AppSettingsStore.mainColor : AppSettingsStore.mainTextColor}
            onPress={() => {
              props.onFilterChosen(FilterPreference.ALL);
              AppSettingsStore.updateFilterPreference(FilterPreference.ALL);
              ProjectsStore.toggleProjectModalVisible();
            }}
          />
        </View>
        <View style={styles.filterBtnContainer}>
          <Button
            style={[styles.filterButton]}
            title="🚧 Only WIPs 🚧"
            color={Platform.OS === "android" ? AppSettingsStore.mainColor : AppSettingsStore.mainTextColor}
            onPress={() => {
              props.onFilterChosen(FilterPreference.WIP);
              AppSettingsStore.updateFilterPreference(FilterPreference.WIP);
              ProjectsStore.toggleProjectModalVisible();
            }}
          />
        </View>
        <View style={styles.filterBtnContainer}>
          <Button
            style={[styles.filterButton]}
            title="✨ Only FOs ✨"
            color={Platform.OS === "android" ? AppSettingsStore.mainColor : AppSettingsStore.mainTextColor}
            onPress={() => {
              props.onFilterChosen(FilterPreference.FO);
              AppSettingsStore.updateFilterPreference(FilterPreference.FO);
              ProjectsStore.toggleProjectModalVisible();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

KnitCountFilterModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  onFilterChosen: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  filterContent: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  popupTitle: {
    fontFamily: "avenir-black",
    fontSize: 18,
    margin: 10
  },
  filterBtnContainer: {
    margin: 6,
    width: 200,
  },
  filterButton: {
    width: 200
  }
});

export default KnitCountFilterModal;
