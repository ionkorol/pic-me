import React from "react";
import { Image, StyleSheet } from "react-native";

interface Props {
  size?: number;
}

const Avatar: React.FC<Props> = (props) => {
  const { size } = props;
  const styles = StyleSheet.create({
    avatar: {
      width: size ? size : 50,
      height: size ? size : 50,
    },
  });

  return (
    <Image
      source={{
        uri:
          "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png",
      }}
      style={styles.avatar}
    />
  );
};

export default Avatar;
