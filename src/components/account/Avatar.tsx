import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import { connect } from "react-redux";
import { colors } from "../../styles/variables";
import { RootState } from "../../redux/store";
import { UserProp } from "../../utils/interfaces";
import { useAssets } from "expo-asset";

interface Props {
  size?: number;
  data: UserProp;
  sex?: "male" | "female";
}

const Avatar: React.FC<Props> = (props) => {
  const { size, data, sex } = props;

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
      if (data.sex === "female") {
        setImage(require("../../assets/icons/avatar/female.png"));
      } else {
        setImage(require("../../assets/icons/avatar/male.png"));
      }
    }
  }, [sex, data.sex]);

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

const mapState = (state: RootState) => ({
  data: state.user.data!,
});

export default connect(mapState)(Avatar);
