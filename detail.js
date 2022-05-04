import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";

export default class DetailsScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        details: {},
        imagePath: "",
        url: `http://127.0.0.1:5000/star?name=${this.props.navigation.getParam(
          "star_name"
        )}`
      };
    }
    componentDidMount() {
        this.getDetails();
      }
      getDetails = () => {
        const { url } = this.state;
        axios
          .get(url)
          .then(response => {
            this.setDetails(response.data.data);
          })
          .catch(error => {
            Alert.alert(error.message);
          });
      };
    
      setDetails = starDetails => {
        const starType = starDetails.star_type;
        let imagePath = "";
        switch (starType) {
          case "star_name":
            imagePath = require("../assets/star_type/star_name.png");
            break;
          case "Distance":
            imagePath = require("../assets/star_type/Distance.png");
            break;
          case "Mass":
            imagePath = require("../assets/star_type/Mass.png");
            break;
          case "Radius":
            imagePath = require("../assets/star_type/Radius.png");
            break;
          default:
            imagePath = require("../assets/star_type/star_name.png");
        }
    
        this.setState({
          details: starDetails,
          imagePath: imagePath
        });
      };
    
      render() {
        const { details, imagePath } = this.state;
        if (details.specifications) {
          return (
            <View style={styles.container}>
              <Card
                title={details.name}
                image={imagePath}
                imageProps={{ resizeMode: "contain", width: "100%" }}
              >
                <View>
                  <Text
                    style={styles.cardItem}
                  >{`Distance from Milky : ${details.distance_from_milky}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Gravity : ${details.gravity}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Mass : ${details.mass}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Radius: ${details.radius}`}</Text>
                </View>
                <View style={[styles.cardItem, { flexDirection: "column" }]}>
                  <Text>{details.specifications ? `Specifications : ` : ""}</Text>
                  {details.specifications.map((item, index) => (
                    <Text key={index.toString()} style={{ marginLeft: 50 }}>
                      {item}
                    </Text>
                  ))}
                </View>
              </Card>
            </View>
          );
        }
        return null;
      }
    }

    
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    cardItem: {
      marginBottom: 10
    }
  });