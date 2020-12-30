import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header(props) {
  const [saveBtnOn] = useState(props.work);
  const [saveIcon, setSaveIcon] = useState("star-o");
  const [isSaved, setIsSaved] = useState(false);

  const clearData = () => {
    AsyncStorage.clear().then((res) => console.log("CLEARED"));
  };

  return (
    <View style={styles.header}>
      <View style={styles.navigationBars}>
        <FontAwesome
          name="bars"
          size={24}
          color="white"
          onPress={props.navigation.openDrawer}
        />
      </View>
      <View style={{ marginTop: 45, flexDirection: "row" }}>
        <Text style={styles.headerText} onPress={clearData}>
          {props.title}
        </Text>
      </View>
      {saveBtnOn != true ? (
        <View></View>
      ) : (
        <TouchableOpacity style={styles.addToFavourite} onPress={props.save}>
          <FontAwesome name={saveIcon} size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "purple",
    width: "100%",
    height: 90,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontFamily: "SSP-Bold",
  },
  navigationBars: { position: "absolute", left: 30, top: 35, padding: 15 },
  addToFavourite: { position: "absolute", right: 30, top: 35, padding: 15 },
});
