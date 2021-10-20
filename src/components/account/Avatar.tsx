import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "style/variables";
import { useAssets } from "expo-asset";
import { useAppSelector } from "store/store";

interface Props {
  size?: number;
  sex?: "male" | "female";
}

const Avatar: React.FC<Props> = (props) => {
  const { size, sex } = props;
  const { user } = useAppSelector((state) => state.user);

  const [image, setImage] = useState<ImageSourcePropType | null>(null);

  const [assets] = useAssets([
    require("../../assets/icons/avatar/female.png"),
    require("../../assets/icons/avatar/male.png"),
  ]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.gray,
      borderRadius: 50,
      padding: 0,
      marginHorizontal: 5,
    },
    avatar: {
      width: size ? size : 50,
      height: size ? size : 50,
    },
  });

  useEffect(() => {
    if (sex) {
      if (sex === "female") {
        setImage(require("../../assets/icons/avatar/female.png"));
      } else {
        setImage(require("../../assets/icons/avatar/male.png"));
      }
    } else {
      if (user?.sex === "female") {
        setImage(require("../../assets/icons/avatar/female.png"));
      } else {
        setImage(require("../../assets/icons/avatar/male.png"));
      }
    }
  }, [sex, user?.sex]);

  if (!assets || !image) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.avatar} />
    </View>
  );
};

export default Avatar;
