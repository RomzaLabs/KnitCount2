import React from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import SafeAreaView from 'react-native-safe-area-view';
import { inject, observer } from "mobx-react";

import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import KnitCountAddButton from "../components/KnitCountAddButton";
import KnitCountProjectCard from "../components/KnitCountProjectCard";

const MyProjectsScreen = (props) => {
  const { projects } = props.projectsStore;

  const renderKnitCountCard = (item) => {
    return (
      <KnitCountProjectCard
        onPress={() => props.navigation.navigate("ProjectDetails")}
        image={item.imageUris[0]}
        title={item.name}
        status={item.status}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addProjectContainer}>
        <KnitCountAddButton onPress={() => props.navigation.navigate("CreateProject")} />
      </View>
      <FlatList
        style={styles.projectsContainer}
        data={projects}
        keyExtractor={item => JSON.stringify(item.id)}
        renderItem={({item}) => renderKnitCountCard(item)}
      />
    </SafeAreaView>
  );
};

MyProjectsScreen.navigationOptions = (navData) => {
  return (
    {
      headerTitle: "My Projects",
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={KnitCountHeaderButton}>
            <Item
              title="Settings"
              iconName={Platform.OS === "android" ? "md-settings" : "ios-settings"}
              onPress={() => navData.navigation.navigate('Settings')}
            />
          </HeaderButtons>
        );
      }
    }
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  addProjectContainer: {
    margin: 12
  },
  projectsContainer: {
    marginHorizontal: 12
  }
});

export default inject("projectsStore")(observer(MyProjectsScreen));
