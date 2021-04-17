import React, { useState, useEffect, useRef, useCallback } from "react";
import * as FileSystem from "expo-file-system";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import Layout from "../components/common/Layout";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { RootState } from "../redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../components/ui";
import firebase from "firebase";
import { UserProp, CategoryProp } from "../utils/interfaces";
import { colors } from "../styles/variables";
import * as Location from "expo-location";
import { LoadingScreen } from "../components/common";
import { Result } from "../components/camera";
import { locationCheck } from "../lib";

interface Props {
  currentCategory: string;
  data: UserProp;
}

const CameraScreen: React.FC<Props> = (props) => {
  const { currentCategory, data } = props;

  const [locationError, setLocationError] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [ciLabels, setCILabels] = useState<string[]>([]);
  const [ciLoading, setCILoading] = useState(false);

  const cameraRef = useRef<Camera>(null);

  const nav = useNavigation();

  const [found, setFound] = useState<boolean | null>(null);

  const addPoint = async () => {
    const { longitude, latitude } = (
      await Location.getCurrentPositionAsync()
    ).coords;

    const userRef = firebase.firestore().collection("users").doc(data.id);

    userRef.update({
      totalPoints: firebase.firestore.FieldValue.increment(1),
      [`categories.${currentCategory.toLowerCase()}.points`]: firebase.firestore.FieldValue.increment(
        1
      ),
      [`categories.${currentCategory.toLowerCase()}.location`]: new firebase.firestore.GeoPoint(
        latitude,
        longitude
      ),
    });
  };

  useEffect(() => {
    (async () => {
      setLocationError(
        await locationCheck(
          data.categories[currentCategory.toLowerCase()] as CategoryProp
        )
      );
    })();
  }, []);

  useEffect(() => {
    if (found) {
      addPoint();
    }
  }, [found]);

  const analPic = async (image: string) => {
    setCILabels([]);
    setCILoading(true);
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const res = await fetch("http://10.0.0.101:8080/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: base64,
      }),
    });
    const data = await res.json();
    setCILabels(data);
    setCILoading(false);
  };

  const takePick = async () => {
    if (cameraRef.current) {
      const camera = cameraRef.current;

      await camera.takePictureAsync({
        onPictureSaved: (picture) => {
          setCurrentImage(picture.uri);
          analPic(picture.uri);
        },
      });
    }
  };

  useEffect(() => {
    setFound(ciLabels.includes(currentCategory));
  }, [ciLabels]);

  if (locationError === null) {
    return <LoadingScreen />;
  }

  if (locationError) {
    return (
      <Layout>
        <View style={{ padding: 50 }}>
          <Text
            style={{
              textAlign: "center",
              color: "red",
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

  if (currentImage) {
    return (
      <Result
        ciLoading={ciLoading}
        found={found}
        currentImage={currentImage}
        currentCategory={currentCategory}
        setCurrentImage={setCurrentImage}
      />
    );
  }
  return (
    <Layout>
      <Camera ref={cameraRef} style={styles.camera} type={type}>
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
  loading: state.user.loading,
  data: state.user.data,
  error: state.user.error,
  currentCategory: state.game.currentCategory,
});

export default connect(mapState)(CameraScreen);

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
