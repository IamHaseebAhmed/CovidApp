import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Header from "./Header";

export default function CountryStatsScreen(props) {
  const [popData, setPopData] = useState([]);
  const isFocused = useIsFocused();
  const [countriesList, setCountriesList] = useState([]);
  const [Country, setCountry] = useState('Pakistan');
  const [CountryData, setCountryData] = useState([]);

  var gcOption = {
    method: "GET",
    url: "https://world-population.p.rapidapi.com/allcountriesname",
    headers: {
      "x-rapidapi-key": "963b2b9c69msh8389036fec6cf0dp1c65b8jsndff09bb48f90",
      "x-rapidapi-host": "world-population.p.rapidapi.com",
    },
  };

  var gcnOption = {
    method: "GET",
    url: "https://covid-19-data.p.rapidapi.com/country",
    params: { name: Country },
    headers: {
      "x-rapidapi-key": "963b2b9c69msh8389036fec6cf0dp1c65b8jsndff09bb48f90",
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    },
  };

  var populationOptions = {
    method: "GET",
    url: "https://world-population.p.rapidapi.com/worldpopulation",
    headers: {
      "x-rapidapi-key": "963b2b9c69msh8389036fec6cf0dp1c65b8jsndff09bb48f90",
      "x-rapidapi-host": "world-population.p.rapidapi.com",
    },
  };

  useEffect(() => {
    setCountry(props == undefined ? 'Pakistan' : props.route.params.country)
  }, [isFocused]);

  useEffect(() => {
    axios
      .request(gcOption)
      .then(function (response) {
        setCountriesList(response.data.body.countries);
      })
      .catch(function (error) {
        console.error(error);
      });

    axios
      .request(populationOptions)
      .then(function (response) {
        setPopData(response.data.body);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .request(gcnOption)
      .then(function (response) {
        setCountryData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [Country]);

  const AddtoFavourite = () => {
    console.log("Saving");
    const dataToSave = JSON.stringify(CountryData.pop());
    AsyncStorage.setItem(Country, dataToSave);
    console.log("Country: " + Country);
    console.log("dataToSave: " + dataToSave);
    console.log("Saving Done!");
  };

  const population = popData.world_population;
  const confirmed = CountryData.map((el) => el.confirmed);
  const recovered = CountryData.map((el) => el.recovered);
  const critical = CountryData.map((el) => el.critical);
  const deaths = CountryData.map((el) => el.deaths);
  const lastUpdate = CountryData.map((el) => el.lastUpdate);

  function getConfirmedPercent() {
    return ((confirmed * 100) / population).toString().substring(0, 5);
  }

  function getRecoveredPercent() {
    return ((recovered * 100) / population).toString().substring(0, 5);
  }

  function getCriticalPercent() {
    return ((critical * 100) / population).toString().substring(0, 5);
  }

  function getdeathsPercent() {
    return ((deaths * 100) / population).toString().substring(0, 5);
  }

  return (
    <View style={styles.container}>
      <Header
        title="COUNTRY"
        work={true}
        navigation={props.navigation}
        save={AddtoFavourite}
      />
      <Text
        style={{
          marginTop: 30,
          marginBottom: 20,
          fontSize: 18,
        }}
      >
        Select the Country:
      </Text>
      <View>
        <Picker
          selectedValue={Country}
          style={styles.picker}
          onValueChange={(itemValue) => setCountry(itemValue)}
        >
          {countriesList.map((el, index) => (
            <Picker.Item key={index} label={el} value={el} />
          ))}
        </Picker>
      </View>
      <View style={{ marginTop: 40 }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={[styles.card, { backgroundColor: "rgba(95, 39, 205, 0.2)" }]}
          >
            <View>
              <Text style={[styles.cardPercent, { color: "#5f27cd" }]}>
                {getConfirmedPercent() + " Percent"}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "SSP-Bold",
                  color: "#5f27cd",
                }}
              >
                {confirmed}
              </Text>
              <Text style={{ fontSize: 16, fontFamily: "SSP-Regular" }}>
                Confirmed
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.card,
              { backgroundColor: "rgba(29, 209, 161, 0.2)" },
            ]}
          >
            <View>
              <Text style={[styles.cardPercent, { color: "#1dd1a1" }]}>
                {getRecoveredPercent() + " Percent"}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "SSP-Bold",
                  color: "#1dd1a1",
                }}
              >
                {recovered}
              </Text>
              <Text style={{ fontSize: 16, fontFamily: "SSP-Regular" }}>
                Recovered
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={[
              styles.card,
              { backgroundColor: "rgba(255, 159, 67, 0.2)" },
            ]}
          >
            <View>
              <Text style={[styles.cardPercent, { color: "#ff9f43" }]}>
                {getCriticalPercent() + " Percent"}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "SSP-Bold",
                  color: "#ff9f43",
                }}
              >
                {critical}
              </Text>
              <Text style={{ fontSize: 16, fontFamily: "SSP-Regular" }}>
                Critical
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.card,
              { backgroundColor: "rgba(255, 107, 107, 0.2)" },
            ]}
          >
            <View>
              <Text style={[styles.cardPercent, { color: "#ff6b6b" }]}>
                {getdeathsPercent() + " Percent"}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "SSP-Bold",
                  color: "#ff6b6b",
                }}
              >
                {deaths}
              </Text>
              <Text style={{ fontSize: 16, fontFamily: "SSP-Regular" }}>
                Deaths
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={[
              styles.card,
              { width: 310, backgroundColor: "rgba(87, 101, 116, 0.1)" },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 14, fontFamily: "SSP-Light" }}>
                {CountryData.map((el) => {
                  const d = el.lastUpdate;
                  return d.split("T")[1];
                })}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "SSP-Bold",
                  color: "#576574",
                }}
              >
                {CountryData.map((el) => {
                  const d = el.lastUpdate;
                  return d.split("T")[0];
                })}
              </Text>
              <Text style={{ fontSize: 16, fontFamily: "SSP-Regular" }}>
                Last Updated
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  picker: {
    backgroundColor: "rgba(87, 101, 116, 0.1)",
    height: 50,
    width: 250,
    borderWidth: 12,
    borderColor: "black",
  },
  card: {
    width: 150,
    height: 100,
    justifyContent: "center",
    margin: 5,
    padding: 15,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    elevation: 2,
  },
  cardPercent: {
    color: "grey",
    textAlign: "right",
    fontFamily: "SSP-Bold",
  },
});
