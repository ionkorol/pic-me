import { useNavigation } from "@react-navigation/core";
import React, { Dispatch } from "react";
import { Modal, Pressable, StyleSheet, View, Text } from "react-native";
import { RootState } from "../../redux/store";
import { colors } from "../../styles/variables";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../ui";
import { connect } from "react-redux";
import { color } from "react-native-reanimated";

interface Props {
  show: boolean;
  setShow: Dispatch<boolean>;
  result: "win" | "loss";
  category: string;
}

const ResultModal: React.FC<Props> = (props) => {
  const { show, setShow, result, category } = props;

  const nav = useNavigation();

  const handleClose = () => {
    setShow(!show);
    nav.navigate("Home");
  };

  const handleRetry = () => {
    setShow(!show);
    nav.navigate("Camera");
  };

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      width: "80%",
      borderRadius: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    head: {
      backgroundColor: colors.primary,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignSelf: "stretch",
      alignItems: "center",
    },

    top: {
      alignSelf: "stretch",
      backgroundColor: colors.secondary,

      padding: 20,
      alignItems: "center",
    },
    bottom: {
      alignSelf: "stretch",
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      padding: 20,
      alignItems: "center",
      backgroundColor: colors.gray,
    },
    headline: {
      fontSize: 30,
      fontWeight: "bold",
      letterSpacing: 2,
      color: colors.gray,
      padding: 10,
    },
    text: {
      fontSize: 20,
      color: colors.primary,
      marginBottom: 30,
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.head}>
            <Text style={styles.headline}>Result</Text>
          </View>
          <View style={styles.top}>
            <Ionicons
              name={result === "win" ? "happy" : "sad"}
              size={100}
              color={result === "win" ? colors.successLight : colors.errorLight}
            />
          </View>
          <View style={styles.bottom}>
            <Text
              style={{
                ...styles.headline,
                color: result === "win" ? colors.success : colors.error,
              }}
            >
              {result === "win" ? "GREAT!" : "UH OH!"}
            </Text>
            <Text style={styles.text}>
              {result === "win" ? "You found" : "You did not find"} {category}!
            </Text>
            {result === "win" ? (
              <Button onPress={handleClose}>Close</Button>
            ) : (
              <Button onPress={handleRetry}>Retry</Button>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const mapState = (state: RootState) => ({
  result: state.result.data!,
  category: state.game.category!,
});

export default connect(mapState)(ResultModal);
