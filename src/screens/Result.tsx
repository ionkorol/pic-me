import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import {
  View,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { RootState, useAppDispatch, useAppSelector } from "store/store";
import { connect } from "react-redux";
import { UserProp } from "utils/interfaces";

import { ResultModal } from "components/result";
import { getLabels } from "store/slices/labelsSlice";
import { rewardUser, setResult } from "store/slices/resultSlice";
import { setImage } from "store/slices/gameSlice";

interface Props {}

const Result: React.FC<Props> = (props) => {
  const { category } = useAppSelector((state) => state.categories);
  const { image } = useAppSelector((state) => state.game);
  const labelsData = useAppSelector((state) => state.labels.labels);
  const result = useAppSelector((state) => state.result.result!);
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  // Get Picture Labels
  useFocusEffect(
    useCallback(() => {
      if (image) {
        dispatch(getLabels(image));
      }
    }, [image])
  );

  // Check if the label is found
  useFocusEffect(
    useCallback(() => {
      if (labelsData === null) {
        return;
      }
      if (labelsData.includes(category!)) {
        dispatch(setResult("win"));
      } else {
        dispatch(setResult("loss"));
      }
      setShowModal(true);
    }, [labelsData])
  );

  // Reward point if label is found
  useFocusEffect(
    useCallback(() => {
      if (result === "win") {
        dispatch(rewardUser(category!));
      }
    }, [result])
  );

  // Clear labels and picture on exit
  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setImage(null));
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={{ uri: image! }}>
        <View>
          {result ? (
            <ResultModal show={showModal} setShow={setShowModal} />
          ) : (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-around",
  },
  headline: {},
});
