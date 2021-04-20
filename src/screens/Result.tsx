import { useFocusEffect, useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { Button } from "../components/ui";
import { RootState } from "../redux/store";
import { connect } from "react-redux";
import { UserProp } from "../utils/interfaces";

import * as gameActions from "../redux/actions/gameActions";
import * as pictureActions from "../redux/actions/pictureActions";
import * as resultActions from "../redux/actions/resultActions";
import { ResultModal } from "../components/result";

interface Props {
  category: string;

  userData: UserProp;

  picture: string;

  labelsLoading: boolean;
  labelsData: string[] | null;
  labelsError: string | null;

  result: "win" | "loss" | null;

  gameRewardPoint: typeof gameActions.rewardPoint;
  pictureClear: typeof pictureActions.clear;
  pictureGetLabels: typeof pictureActions.getLabels;
  pictureClearLabels: typeof pictureActions.clearLabels;

  resultSet: typeof resultActions.set;
  resultClear: typeof resultActions.clear;
}

const Result: React.FC<Props> = (props) => {
  const {
    category,
    picture,
    userData,
    labelsData,
    labelsLoading,
    labelsError,
    gameRewardPoint,
    pictureClear,
    pictureGetLabels,
    pictureClearLabels,
    resultSet,
    resultClear,
    result,
  } = props;

  const [showModal, setShowModal] = useState(false);

  // Get Picture Labels
  useFocusEffect(
    useCallback(() => {
      if (picture) {
        pictureGetLabels(picture);
      }
    }, [picture])
  );

  // Check if the label is found
  useFocusEffect(
    useCallback(() => {
      if (labelsData === null) {
        return;
      }
      if (labelsData.includes(category)) {
        resultSet("win");
      } else {
        resultSet("loss");
      }
      setShowModal(true);
    }, [labelsData])
  );

  // Reward point if label is found
  useFocusEffect(
    useCallback(() => {
      if (result === "win") {
        gameRewardPoint();
      }
    }, [result])
  );

  // Clear labels and picture on exit
  useFocusEffect(
    useCallback(() => {
      return () => {
        pictureClearLabels();
        pictureClear();
        resultClear();
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={{ uri: picture }}>
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

const mapState = (state: RootState) => ({
  userData: state.user.data!,
  picture: state.picture.image!,
  category: state.game.category!,
  labelsLoading: state.picture.labelsLoading,
  labelsData: state.picture.labelsData,
  labelsError: state.picture.labelsError,
  result: state.result.data,
});

const mapDispatch = {
  gameRewardPoint: gameActions.rewardPoint as any,
  pictureClear: pictureActions.clear as any,
  pictureGetLabels: pictureActions.getLabels as any,
  pictureClearLabels: pictureActions.clearLabels as any,
  resultSet: resultActions.set as any,
  resultClear: resultActions.clear as any,
};

export default connect(mapState, mapDispatch)(Result);

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
