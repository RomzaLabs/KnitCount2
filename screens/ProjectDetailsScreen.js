import React, {useState, useEffect} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as ImagePicker from 'expo-image-picker';

import AppSettingsStore from "../store/AppSettingsStore";
import ProjectsStore from "../store/ProjectsStore";
import Image from "../models/Image";
import KnitCountHeaderButton from "../components/buttons/KnitCountHeaderButton";
import KnitCountImageButton from "../components/buttons/KnitCountImageButton";
import KnitCountCounterAddButton from "../components/buttons/KnitCountCounterAddButton";
import KnitCountCounterButton from "../components/buttons/KnitCountCounterButton";

import KnitCountFinishedModal from "../components/modals/KnitCountFinishedModal";
import KnitCountUpdateTitleModal from "../components/modals/KnitCountUpdateTitleModal";
import KnitCountDeleteModal from "../components/modals/KnitCountDeleteModal";
import KnitCountImageModal from "../components/modals/KnitCountImageModal";
import KnitCountCounterModal from "../components/modals/KnitCountCounterModal";
import KnitCountImagePickerModal from "../components/modals/KnitCountImagePickerModal";

import
  SECTION_DETAILS,
  {
    ACTION_BUTTONS,
    MARK_FINISHED_BTN_ID,
    UPDATE_TITLE_BTN_ID,
    DELETE_PROJECT_BTN_ID
  } from "../constants/SECTION_DETAILS";
import KnitCountActionButton from "../components/buttons/KnitCountActionButton";
import KnitCountDestructiveButton from "../components/buttons/KnitCountDestructiveButton";
import {ProjectStatus} from "../models/ProjectStatus";
import KnitCountImagePicker from "../components/KnitCountImagePicker";

const ADD_BUTTON_ID = 0;

const ProjectDetailsScreen = observer(({ navigation }) => {
  const { selectedProject } = ProjectsStore;

  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState(ProjectStatus.WIP);
  const [images, setImages] = useState([]);
  const [counters, setCounters] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCounter, setSelectedCounter] = useState(null);

  const [isFinishedModalVisible, setIsFinishedModalVisible] = useState(false);
  const [isUpdateTitleModalVisible, setIsUpdateTitleModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isCounterModalVisible, setIsCounterModalVisible] = useState(false);
  const [isImagePickerModalVisible, setIsImagePickerModalVisible] = useState(false);

  useEffect(() => {
    const newName = selectedProject ? selectedProject.name : "";
    const newNotes = selectedProject ? selectedProject.notes : "";
    const newStatus = selectedProject ? selectedProject.status : ProjectStatus.WIP;
    const newImages = selectedProject ? selectedProject.images : [];
    const newCounters = selectedProject ? selectedProject.counters : [];

    setName(newName);
    setNotes(newNotes);
    setStatus(newStatus);
    setImages(newImages);
    setCounters(newCounters);
  }, [selectedProject]);

  const PROJECT_DETAILS_SECTIONS = [
    { key: SECTION_DETAILS.COUNTERS.key, title: SECTION_DETAILS.COUNTERS.title, data: SECTION_DETAILS.COUNTERS.data },
    { key: SECTION_DETAILS.PHOTOS.key, title: SECTION_DETAILS.PHOTOS.title, data: SECTION_DETAILS.PHOTOS.data },
    { key: SECTION_DETAILS.NOTES.key, title: SECTION_DETAILS.NOTES.title, data: SECTION_DETAILS.NOTES.data },
    { key: SECTION_DETAILS.ACTIONS.key, title: SECTION_DETAILS.ACTIONS.title, data: SECTION_DETAILS.ACTIONS.data }
  ];

  const toggleFinishedModalVisible = () => setIsFinishedModalVisible(!isFinishedModalVisible);
  const toggleUpdateTitleModalVisible = () => setIsUpdateTitleModalVisible(!isUpdateTitleModalVisible);
  const toggleDeleteModalVisible = () => setIsDeleteModalVisible(!isDeleteModalVisible);
  const toggleImageModalVisible = () => setIsImageModalVisible(!isImageModalVisible);
  const toggleCounterModalVisible = () => setIsCounterModalVisible(!isCounterModalVisible);
  const toggleImagePickerModalVisible = () => setIsImagePickerModalVisible(!isImagePickerModalVisible);

  const handleFavoriteImageMarked = (image) => {
    const updatedImage = {...image, dateAdded: +new Date()};
    const sortedImages = images.length ? [updatedImage, ...images.filter(i => i.id !== image.id)] : [];
    setImages(sortedImages);
    ProjectsStore.setImagesForSelectedProject(sortedImages);
  };

  const handleMarkFinished = () => {
    setStatus(ProjectStatus.FO);
    ProjectsStore.toggleStatusForProject(selectedProject.id);
    toggleFinishedModalVisible();
  };
  const handleMarkInProgress = () => {
    setStatus(ProjectStatus.WIP);
    ProjectsStore.toggleStatusForProject(selectedProject.id);
  };
  const handleUpdateTitle = () => toggleUpdateTitleModalVisible();
  const handleDeleteProject = () => toggleDeleteModalVisible();

  const imagePickerOptions = { allowsEditing: true, aspect: [16, 9], quality: 0.5 };

  const handleCamera = async() => {
    const image = await ImagePicker.launchCameraAsync(imagePickerOptions);
    if (image.uri) {
      const pickedImage = new Image(null, selectedProject.id, image.uri);
      const dbResult = await ProjectsStore.saveImage(selectedProject.id, pickedImage);
      const updatedImage = {...pickedImage, id: dbResult.insertId};
      const newImages = [updatedImage, ...images];
      ProjectsStore.setImagesForSelectedProject(newImages);
      setImages(newImages);
    }
    toggleImagePickerModalVisible();
  };

  const handleImageLibrary = async() => {
    const image = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);
    if (image.uri) {
      const pickedImage = new Image(null, selectedProject.id, image.uri);
      const dbResult = await ProjectsStore.saveImage(selectedProject.id, pickedImage);
      const updatedImage = {...pickedImage, id: dbResult.insertId};
      const newImages = [updatedImage, ...images];
      ProjectsStore.setImagesForSelectedProject(newImages);
      setImages(newImages);
    }
    toggleImagePickerModalVisible();
  };

  const getHandlerForBtn = (btnName) => {
    switch (btnName) {
      case MARK_FINISHED_BTN_ID:
        if (status === ProjectStatus.WIP) return handleMarkFinished;
        return handleMarkInProgress;
      case UPDATE_TITLE_BTN_ID: return handleUpdateTitle;
      case DELETE_PROJECT_BTN_ID: return handleDeleteProject;
      default: return handleDeleteProject;
    }
  };

  const renderActionBtn = (btnName) => {
    const btnTitle = ACTION_BUTTONS[btnName];
    const updatedTitle = btnTitle === "Mark Finished" && status === ProjectStatus.FO ? "Mark In Progress" : btnTitle;
    const handleOnPress = getHandlerForBtn(btnName);

    let btnComponent;
    if (btnName === DELETE_PROJECT_BTN_ID) {
      btnComponent = <KnitCountDestructiveButton onPress={handleOnPress} label={btnTitle} />;
    } else {
      btnComponent = (
        <KnitCountActionButton
          onPress={handleOnPress}
          label={updatedTitle}
          bgColor={AppSettingsStore.mainTextColor}
          textColor={AppSettingsStore.mainColor}
        />
      );
    }

    return <View style={styles.actionBtnContainer}>{btnComponent}</View>;
  };

  const handleLongPressForCounter = async(counterId) => {
    const foundCounter = counters.find(counter => counter.id === counterId);
    await setSelectedCounter(foundCounter);
    toggleCounterModalVisible();
  };

  const renderProjectFinishModal = () => {
    if (!selectedProject) return null;
    return (
      <KnitCountFinishedModal
        isVisible={isFinishedModalVisible}
        onBackdropPress={toggleFinishedModalVisible}
        image={images.length ? images[0] : null}
        name={name}
        status={status}
        navigation={navigation}
      />
    );
  };

  const renderProjectUpdateTitleModal = () => {
    if (!selectedProject) return null;
    return (
      <KnitCountUpdateTitleModal
        isVisible={isUpdateTitleModalVisible}
        onBackdropPress={toggleUpdateTitleModalVisible}
        title={name}
        onChangeText={(e) => {
          setName(e);
          ProjectsStore.setNameForSelectedProject(e)
        }}
      />
    );
  };

  const renderProjectDeletedModal = () => {
    if (!selectedProject) return null;
    return (
      <KnitCountDeleteModal
        isVisible={isDeleteModalVisible}
        onBackdropPress={toggleDeleteModalVisible}
        onDeleteProject={() => {
          ProjectsStore.deleteProjectById(selectedProject.id);
          setSelectedProject(null);
          navigation.popToTop();
        }}
      />
    );
  };

  const renderCounterActionsModal = () => {
    if (!selectedProject || !selectedCounter) return null;
    return (
      <KnitCountCounterModal
        isVisible={isCounterModalVisible}
        onBackdropPress={toggleCounterModalVisible}
        counter={selectedCounter}
        onCounterChanged={(updatedCounter) => {
          const newCounters = counters.map(c => {
            if (c.id === updatedCounter.id) return updatedCounter;
            return c;
          });
          setCounters(newCounters);
          ProjectsStore.setCountersForSelectedProject(newCounters);
        }}
        onCounterDeleted={(counter) => {
          setCounters(counters.filter(c => c.id !== counter.id));
          ProjectsStore.deleteCounter(counter);
        }}
      />
    );
  };

  const renderImageModal = () => {
    if (!selectedProject || !selectedImage) return null;
    return (
      <KnitCountImageModal
        isVisible={isImageModalVisible}
        onFavoriteImageMarked={(i) => handleFavoriteImageMarked(i)}
        onBackdropPress={toggleImageModalVisible}
        selectedImage={selectedImage}
        onRemoveImage={(i) => {
          const newImages = images.filter(image => image.id !== i.id);
          setImages(newImages);
          ProjectsStore.setImagesForSelectedProject(newImages);
          ProjectsStore.deleteImageFromProjectById(selectedProject.id, i.id);
        }}
      />
    );
  };

  const renderImagePickerModal = () => {
    return (
      <KnitCountImagePickerModal
        isVisible={isImagePickerModalVisible}
        onBackdropPress={toggleImagePickerModalVisible}
        onCameraChosen={handleCamera}
        onImageLibraryChosen={handleImageLibrary}
      />
    );
  };

  const renderCounters = () => {
    const renderGridItem = (gridItem) => {
      const counterId = gridItem.item.id;
      if (counterId === ADD_BUTTON_ID) {
        return (
          <View style={styles.gridItem}>
            <KnitCountCounterAddButton
              mainTextColor={AppSettingsStore.mainTextColor}
              mainColor={AppSettingsStore.mainColor}
              onPress={() => navigation.navigate("CreateCounter")}
            />
            <Text style={[styles.gridItemLabel, {color: AppSettingsStore.mainTextColor}]}>Add Counter</Text>
          </View>
        );
      }

      const counter = counters.find(counter => counter.id === counterId);
      if (!counter) return null;
      return (
        <View style={styles.gridItem}>
          <KnitCountCounterButton
            mainTextColor={AppSettingsStore.mainTextColor}
            mainColor={AppSettingsStore.mainColor}
            mainBGColor={AppSettingsStore.mainBGColor}
            counter={counter}
            onCounterChanged={(updatedCounter) => {
              const newCounters = counters.map(c => {
                if (c.id === updatedCounter.id) return updatedCounter;
                return c;
              });
              setCounters(newCounters);
              ProjectsStore.setCountersForSelectedProject(newCounters);
            }}
            onLongPress={handleLongPressForCounter}
          />
          <Text style={[styles.gridItemLabel, {color: AppSettingsStore.mainTextColor}]}>{counter.label}</Text>
        </View>
      );
    };

    const addButtonData = {id: ADD_BUTTON_ID};
    const counterGridData = [addButtonData, ...counters];
    return (
      <FlatList
        style={styles.countersSectionContainer}
        keyExtractor={(item) => item.id}
        numColumns={2}
        data={counterGridData}
        renderItem={renderGridItem}
      />
    );
  };

  const renderPhotos = () => {

    const onImageCardPress = (image) => {
      setSelectedImage(image);
      toggleImageModalVisible();
    };

    const renderImageCards = () => {
      if (!images.length) return null;
      return images.map((image, idx) => {
        return <KnitCountImageButton key={idx} onPress={() => onImageCardPress(image)} image={image} />;
      });
    };

    return (
      <ScrollView horizontal style={styles.photosScrollView}>
        <View style={styles.photosImagePicker}>
          <KnitCountImagePicker
            mainColor={AppSettingsStore.mainColor}
            mainTextColor={AppSettingsStore.mainTextColor}
            onPress={toggleImagePickerModalVisible}
          />
        </View>
        {renderImageCards()}
      </ScrollView>
    );
  };

  const renderNotes = () => {
    return (
      <View style={{marginHorizontal: 12}}>
        <TextInput
          multiline
          editable
          style={[
            styles.input,
            styles.notesInput,
            {
              backgroundColor: AppSettingsStore.mainBGColor,
              color: AppSettingsStore.mainTextColor
            }
          ]}
          placeholder="Enter notes"
          value={notes}
          onChangeText={(e) => {
            setNotes(e);
            ProjectsStore.setNotesForSelectedProject(e);
          }}
          numberOfLines={6}
        />
      </View>
    );
  };

  const renderSectionHeader = (title, fontColor) => {
    return <Text style={[styles.header, {color: fontColor}]}>{title}</Text>;
  };

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]}
    >
      <SafeAreaView style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]} >
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: AppSettingsStore.mainTextColor}]}>{name}</Text>
        </View>
        <SectionList
          style={{backgroundColor: AppSettingsStore.mainColor}}
          sections={PROJECT_DETAILS_SECTIONS}
          keyExtractor={(item, index) => item + index}
          renderItem={({ section, item }) => {
            switch (section.key) {
              case SECTION_DETAILS.COUNTERS.key: return renderCounters();
              case SECTION_DETAILS.PHOTOS.key: return renderPhotos();
              case SECTION_DETAILS.NOTES.key: return renderNotes();
              case SECTION_DETAILS.ACTIONS.key: return renderActionBtn(item);
              default: return null;
            }
          }}
          renderSectionHeader={({ section: { title } }) => renderSectionHeader(title, AppSettingsStore.mainTextColor)}
        />

        { renderProjectFinishModal() }
        { renderProjectUpdateTitleModal() }
        { renderProjectDeletedModal() }
        { renderCounterActionsModal() }
        { renderImageModal() }
        { renderImagePickerModal() }
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
});

ProjectDetailsScreen.navigationOptions = (navData) => {
  return (
    {
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={KnitCountHeaderButton} title="My Projects">
            <Item
              title="My Projects"
              iconName={Platform.OS === "android" ? "md-home" : "ios-home"}
              onPress={() => navData.navigation.popToTop()}
            />
          </HeaderButtons>
        );
      },
      title: "",
      headerStyle: { ...navData.navigationOptions.headerStyle, backgroundColor: AppSettingsStore.mainColor },
      headerTitleStyle: { ...navData.navigationOptions.headerTitleStyle, color: AppSettingsStore.mainTextColor },
      headerBackTitleStyle: { ...navData.navigationOptions.headerBackTitleStyle, color: AppSettingsStore.mainTextColor },
      headerTintColor: AppSettingsStore.mainTextColor
    }
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  titleContainer: {
    margin: 12
  },
  title: {
    fontFamily: "avenir-black",
    fontSize: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 3
  },
  header: {
    fontSize: 16,
    marginHorizontal: 12,
    fontFamily: "avenir-roman",
    textTransform: "uppercase"
  },
  actionBtnContainer: {
    marginHorizontal: 12,
    marginVertical: 2
  },
  input: {
    fontFamily: "avenir-roman",
    fontSize: 16,
    width: "100%",
    marginTop: 8,
    marginBottom: 12,
    padding: 8,
    borderRadius: 5
  },
  notesInput: {
    textAlignVertical: "top",
    minHeight: 100
  },
  photosScrollView: {
    marginTop: 6,
    marginBottom: 12,
    marginHorizontal: 12
  },
  photosImagePicker: {
    width: 160,
    height: 90,
    marginRight: 6
  },
  countersSectionContainer: {
    marginHorizontal: 12,
    marginBottom: 12
  },
  gridItem: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 6,
    justifyContent: "center",
    alignItems: "center"
  },
  gridItemLabel: {
    fontFamily: "avenir-roman",
    fontSize: 18,
    marginTop: 6,
    marginHorizontal: 6
  }
});

export default ProjectDetailsScreen;
