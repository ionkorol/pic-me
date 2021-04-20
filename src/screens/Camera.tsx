import React, { useState, useEffect, useRef } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import Layout from "../components/common/Layout";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { RootState } from "../redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../components/ui";

import { UserProp, CategoryProp } from "../utils/interfaces";
import { colors } from "../styles/variables";

import { LoadingScreen } from "../components/common";
import { locationCheck } from "../lib";

import * as pictureActions from "../redux/actions/pictureActions";

interface Props {
  category: string;
  userData: UserProp;
  image: string | null;
  pictureSet: typeof pictureActions.set;
  pictureGetLabels: typeof pictureActions.getLabels;
  labelsData: string[] | null;
}

const CameraScreen: React.FC<Props> = (props) => {
  const { category, userData, pictureSet } = props;

  const [locationError, setLocationError] = useState<boolean | null>(null);
  const nav = useNavigation();

  const cameraRef = useRef<Camera>(null);

  // Check for location error
  useEffect(() => {
    (async () => {
      setLocationError(
        await locationCheck(
          userData.categories[category.toLowerCase()] as CategoryProp
        )
      );
    })();
  }, [category]);

  // Handle take picture button
  const takePick = async () => {
    if (cameraRef.current) {
      const camera = cameraRef.current;

      await camera.takePictureAsync({
        onPictureSaved: (picture) => {
          pictureSet(picture.uri);
          nav.navigate("Result");
        },
      });
    }
  };

  if (locationError === null) {
    return <LoadingScreen />;
  }

  if (locationError) {
    return (
      <Layout>
        <View
          style={{
            backgroundColor: colors.gray,
            alignSelf: "center",
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Ionicons name="compass" size={100} color={colors.error} />
          <Text
            style={{
              textAlign: "center",
              color: "#E05C63",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Not Far Enough!
          </Text>
          <Button onPress={() => nav.navigate("Home")}>Close</Button>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
      >
        <TouchableOpacity style={styles.cameraButton} onPress={takePick}>
          <Ionicons name="camera" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.close}
          onPress={() => nav.navigate("Home")}
        >
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </Camera>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  userData: state.user.data!,
  category: state.game.category!,
  image: state.picture.image,
  labelsData: state.picture.labelsData,
});

const mapDispatch = {
  pictureSet: pictureActions.set as any,
  pictureGetLabels: pictureActions.getLabels as any,
};

export default connect(mapState, mapDispatch)(CameraScreen);

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingBottom: 20,
  },
  cameraButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 50,
  },
  text: {},
  label: {
    color: "red",
    fontSize: 20,
    backgroundColor: "#000000a0",
    marginBottom: 2,
    width: 200,
  },

  headline: {
    fontSize: 30,
    marginVertical: 10,
    paddingVertical: 10,
    textAlign: "center",
    color: colors.secondary,
    backgroundColor: "#00000080",
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
