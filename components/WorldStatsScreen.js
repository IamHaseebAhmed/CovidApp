import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import axios from "axios";
import Header from "./Header";

export default function WorldStatsScreen(props) {
  const [covidData, setCovidData] = useState([]);
  const [popData, setPopData] = useState([]);

  var covidOptions = {
    method: "GET",
    url: "https://covid-19-data.p.rapidapi.com/totals",
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
    axios
      .request(covidOptions)
      .then(function (response) {
        setCovidData(response.data);
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

  const population = popData.world_population;
  const confirmed = covidData.map((el) => el.confirmed);
  const recovered = covidData.map((el) => el.recovered);
  const critical = covidData.map((el) => el.critical);
  const deaths = covidData.map((el) => el.deaths);
  
  function getConfirmedPercent() {
    return ((confirmed * 100) / population).toString().substring(0, 5)
  }

  function getRecoveredPercent() {
    return ((recovered * 100) / population).toString().substring(0, 5)
  }

  function getCriticalPercent() {
    return ((critical * 100) / population).toString().substring(0, 5)
  }

  function getdeathsPercent() {
    return ((deaths * 100) / population).toString().substring(0, 5)
  }

  return (
    <View style={styles.container}>
      <Header title="WORLD" work={false} navigation={props.navigation} />
      <View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={[styles.card, { backgroundColor: "rgba(95, 39, 205, 0.2)" }]}
          >
            <View>
              <Text style={[styles.cardPercent, { color: "#5f27cd" }]}>
                {getConfirmedPercent() + ' Percent'}
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
              {getRecoveredPercent() + ' Percent'}
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
                {getCriticalPercent() + ' Percent'}
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
              {getdeathsPercent() + ' Percent'}
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
                {covidData.map((el) => {
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
                {covidData.map((el) => {
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
  card: {
    width: 150,
    height: 100,
    justifyContent: "center",
    margin: 5,
    padding: 15,
    borderRadius: 10,
    borderColor: "purple",
    borderWidth: 1,
    elevation: 0.2,
  },
  cardPercent: {
    color: "grey",
    textAlign: "right",
    fontFamily: "SSP-Bold",
  },
});
