import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import Header from "./Header";

export default function FavouriteCountriesScreen(props) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      country: "Iran",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      country: "Pakistan",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      country: "China",
    },
  ];

  useEffect(() => {
    retrieveData();
    console.log("useEffect");
  }, [isFocused]);

  const retrieveData = async () => {
    var Arr=[]
    try {
      await AsyncStorage.getAllKeys().then(async (keys) => {
        await AsyncStorage.multiGet(keys).then((key) => {
          key.forEach((data) => {
            // console.log(data[1]); //values
            Arr.push(JSON.parse(data[1]));
          });
        });
      });
      setData(Arr)
    } catch (error) {
      console.error(error);
    }
    console.log('Loading Done!');
  };

  const goToCountry = (country) => {
    props.navigation.navigate("Countries", { country: country });
  };

  const removeFavCountry = (country) => {
    AsyncStorage.removeItem(country);
  }

  const Item = ({ card }) => {
    card = card || {
      country: "",
      confirmed: "",
      critical: "",
      recovered: "",
      deaths: "",
    };

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => goToCountry(card.country)}
        key={card.code}
      >
        <View style={{ width: 90 }}>
          <Text style={styles.country}>{card.country}</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statsStyle}>Confirmed: {card.confirmed}</Text>
          <Text style={styles.statsStyle}>Critical: {card.critical}</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statsStyle}>Recovered: {card.recovered}</Text>
          <Text style={styles.statsStyle}>Deaths: {card.deaths}</Text>
        </View>
        <TouchableOpacity style={{ marginLeft: 10,width: 30 }} >
          <FontAwesome name="star" size={24} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return <Item card={item} />;
  };

  return (
    <View style={styles.container}>
      <Header title="FAVOURITE" work={false} navigation={props.navigation} />
      <SafeAreaView>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => Math.random() * 0.0001}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  card: {
    flexDirection: "row",
    borderColor: "#e1e1e1",
    borderWidth: 1,
    width: 400,
    height: 80,
    borderRadius: 4,
    padding: 5,
    margin: 4,
    alignItems: "center",
  },
  country: {
    fontSize: 16,
    fontFamily: "SSP-Bold",
    color: "purple",
  },
  stats: {
    margin: 8,
  },
  statsStyle: {
    fontFamily: "SSP-Light",
  },
});
