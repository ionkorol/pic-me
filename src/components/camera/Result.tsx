import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  View,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { Button } from "../ui";

interface Props {
  ciLoading: boolean;
  found: boolean | null;
  currentImage: string;
  currentCategory: string;
  setCurrentImage: (value: any) => any;
}

const Result: React.FC<Props> = (props) => {
  const {
    ciLoading,
    found,
    currentCategory,
    currentImage,
    setCurrentImage,
  } = props;

  const nav = useNavigation();

  const handleClose = () => {
    setCurrentImage(null);
    nav.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={{ uri: currentImage }}>
        <View>
          {ciLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : found ? (
            <React.Fragment>
              <Text style={styles.headline}>Congratulations you found</Text>
              <Text style={{ ...styles.headline, fontWeight: "bold" }}>
                {currentCategory}
              </Text>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={styles.headline}>Couldn't find</Text>
              <Text style={{ ...styles.headline, fontWeight: "bold" }}>
                {currentCategory}
              </Text>
              <Text style={styles.headline}>Please Try Again</Text>
            </React.Fragment>
          )}
        </View>

        {!ciLoading && <Button onPress={handleClose}>Close</Button>}
      </ImageBackground>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {},
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-around",
  },
  headline: {},
});
