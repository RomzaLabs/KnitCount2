import React, {useState, useEffect} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import AppSettingsStore from "../store/AppSettingsStore";
import ProjectsStore from "../store/ProjectsStore";
import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import KnitCountFinishedModal from "../components/modals/KnitCountFinishedModal";
import KnitCountUpdateTitleModal from "../components/modals/KnitCountUpdateTitleModal";
import KnitCountDeleteModal from "../components/modals/KnitCountDeleteModal";
import KnitCountImageModal from "../components/modals/KnitCountImageModal";

import
  SECTION_DETAILS,
  {
    ACTION_BUTTONS,
    MARK_FINISHED_BTN_ID,
    UPDATE_TITLE_BTN_ID,
    DELETE_PROJECT_BTN_ID
  } from "../constants/SECTION_DETAILS";
import KnitCountActionButton from "../components/KnitCountActionButton";
import KnitCountDestructiveButton from "../components/KnitCountDestructiveButton";
import {ProjectStatus} from "../models/ProjectStatus";
import KnitCountImagePicker from "../components/KnitCountImagePicker";

const ProjectDetailsScreen = (props) => {
  const [selectedProject, setSelectedProject] = useState(undefined);
  const [projectName, setProjectName] = useState("");
  const [projectStatus, setProjectStatus] = useState(undefined);
  const [projectNotes, setProjectNotes] = useState("");
  const [projectImages, setProjectImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isFinishedModalVisible, setIsFinishedModalVisible] = useState(false);
  const [isUpdateTitleModalVisible, setIsUpdateTitleModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  useEffect(() => {
    setSelectedProject(ProjectsStore.selectedProject);
    setProjectStatus(ProjectsStore.selectedProject.status);
    setProjectName(ProjectsStore.selectedProject.name);
    setProjectNotes(ProjectsStore.selectedProject.notes);
    setProjectImages(ProjectsStore.selectedProject.images);
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

  const handleMarkFinished = () => {
    ProjectsStore.toggleStatusForProject(ProjectsStore.selectedProject.id);
    setProjectStatus(projectStatus === ProjectStatus.WIP ? ProjectStatus.FO : ProjectStatus.WIP);
    toggleFinishedModalVisible();
  };
  const handleMarkInProgress = () => {
    ProjectsStore.toggleStatusForProject(ProjectsStore.selectedProject.id);
    setProjectStatus(projectStatus === ProjectStatus.WIP ? ProjectStatus.FO : ProjectStatus.WIP);
  };
  const handleUpdateTitle = () => toggleUpdateTitleModalVisible();
  const handleDeleteProject = () => toggleDeleteModalVisible();

  const getHandlerForBtn = (btnName) => {
    switch (btnName) {
      case MARK_FINISHED_BTN_ID:
        if (projectStatus === ProjectStatus.WIP) return handleMarkFinished;
        return handleMarkInProgress;
      case UPDATE_TITLE_BTN_ID: return handleUpdateTitle;
      case DELETE_PROJECT_BTN_ID: return handleDeleteProject;
      default: return handleDeleteProject;
    }
  };

  const renderActionBtn = (btnName) => {
    const btnTitle = ACTION_BUTTONS[btnName];
    const updatedTitle = btnTitle === "Mark Finished" && projectStatus === ProjectStatus.FO ? "Mark In Progress" : btnTitle;
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

  const renderPhotos = () => {

    const onImageCardPress = (image) => {
      setSelectedImage(image);
      toggleImageModalVisible();
    };

    const renderImageCards = () => {
      // TODO: Make Platform specific image buttons.
      if (projectImages.length) {
        return projectImages.map((image, idx) => {
          return (
            <View key={idx} style={styles.photosItem}>
              <TouchableOpacity onPress={() => onImageCardPress(image)}>
                <Image style={styles.image} source={{uri: image.imageUri}} />
              </TouchableOpacity>
            </View>
          );
        });
      }
      return null;
    };

    return (
      <ScrollView horizontal style={styles.photosScrollView}>
        <View style={styles.photosImagePicker}>
          <KnitCountImagePicker
            projectId={selectedProject && selectedProject.id ? selectedProject.id : null}
            mainColor={AppSettingsStore.mainColor}
            mainTextColor={AppSettingsStore.mainTextColor}
            onImageTaken={(image) => setProjectImages([image, ...projectImages])}
          />
        </View>
        {renderImageCards()}
      </ScrollView>
    );
  };

  const renderNotes = () => {
    return (
      <KeyboardAvoidingView>
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
            value={projectNotes}
            onChangeText={(e) => setProjectNotes(e)}
            onSubmitEditing={(e) => {
              ProjectsStore.updateProjectNotes(selectedProject.id, e.nativeEvent.text);
            }}
            numberOfLines={6}
          />
        </View>
      </KeyboardAvoidingView>
    );
  };

  const renderSectionHeader = (title, fontColor) => {
    return <Text style={[styles.header, {color: fontColor}]}>{title}</Text>;
  };

  return (
    <SafeAreaView style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]} >
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {color: AppSettingsStore.mainTextColor}]}>{projectName}</Text>
      </View>
      <SectionList
        style={{backgroundColor: AppSettingsStore.mainColor}}
        sections={PROJECT_DETAILS_SECTIONS}
        keyExtractor={(item, index) => item + index}
        renderItem={({ section, item }) => {
          if (section.key === SECTION_DETAILS.PHOTOS.key) return renderPhotos();
          if (section.key === SECTION_DETAILS.NOTES.key) return renderNotes();
          if (section.key === SECTION_DETAILS.ACTIONS.key) return renderActionBtn(item);
          return null;
        }}
        renderSectionHeader={({ section: { title } }) => renderSectionHeader(title, AppSettingsStore.mainTextColor)}
      />

      <KnitCountFinishedModal
        isVisible={isFinishedModalVisible}
        onBackdropPress={toggleFinishedModalVisible}
        image={projectImages.length ? projectImages[0] : null}
        name={projectName}
        status={projectStatus}
        navigation={props.navigation}
      />

      <KnitCountUpdateTitleModal
        isVisible={isUpdateTitleModalVisible}
        onBackdropPress={toggleUpdateTitleModalVisible}
        title={projectName}
        onChangeText={setProjectName}
        projectId={selectedProject && selectedProject.id}
      />

      <KnitCountDeleteModal
        isVisible={isDeleteModalVisible}
        onBackdropPress={toggleDeleteModalVisible}
        projectId={selectedProject && selectedProject.id}
        navigation={props.navigation}
      />

      <KnitCountImageModal
        isVisible={isImageModalVisible}
        onBackdropPress={toggleImageModalVisible}
        selectedImage={selectedImage}
        onRemoveImage={(i) => setProjectImages(projectImages.filter(image => image.id !== i.id))}
        projectId={selectedProject && selectedProject.id}
      />

    </SafeAreaView>
  );
};

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
  photosItem: {
    width: 160,
    height: 90,
    marginHorizontal: 6
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    resizeMode: "center"
  }
});

export default ProjectDetailsScreen;
