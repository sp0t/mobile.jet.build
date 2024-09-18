import { Linking } from "react-native";
import { baseMediaURL } from "../constants/constants";

export const useOpenFiles = () => {
    const openFile = (file: string) => {
    Linking.openURL(baseMediaURL + file);
    }
    return openFile;
}