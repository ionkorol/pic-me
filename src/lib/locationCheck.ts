import * as Location from "expo-location";
import { CategoryProp } from "../utils/interfaces";

const locationCheck = async (userCategory: CategoryProp) => {
  try {
    const currentLocation = (
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      })
    ).coords;
    let lastLocation = {
      latitude: 0,
      longitude: 0,
    };
    if (userCategory) {
      lastLocation = userCategory.location!;
    }

    const latitudeDistance = Math.abs(
      lastLocation.latitude - currentLocation.latitude
    );
    const longitudeDistance = Math.abs(
      lastLocation.longitude - currentLocation.longitude
    );

    if (latitudeDistance < 0.001 && longitudeDistance < 0.001) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default locationCheck;
