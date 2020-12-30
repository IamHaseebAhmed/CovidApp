import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "@use-expo/font";

import Header from "./components/Header";
import WorldStatsScreen from "./components/WorldStatsScreen";
import CountryStatsScreen from "./components/CountryStatsScreen";
import FavouriteCountriesScreen from "./components/FavouriteCountriesScreen";

const Drawer = createDrawerNavigator();

export default function App() {

  useFonts({
    'SSP-Bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
    'SSP-Regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    'SSP-Light': require('./assets/fonts/SourceSansPro-Light.ttf'),
  });

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World">
        <Drawer.Screen name="World" component={WorldStatsScreen} />
        <Drawer.Screen name="Countries" component={CountryStatsScreen} />
        <Drawer.Screen name="Favourites" component={FavouriteCountriesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
});
