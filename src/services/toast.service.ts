import Toast from 'react-native-root-toast';

import { colors, dimensions, fonts } from '../styles';

const toastOptions = {
  animation: true,
  duration: Toast.durations.LONG,
  hideOnPress: true,
  opacity: 1,
  position: dimensions.height.Default + dimensions.size.large,
  shadow: false,
  textStyle: { fontFamily: fonts.family.Inter, fontSize: fonts.size.lmedium },
};

export default class ToastService {
  static showInfoMessage(message: string) {
    Toast.show(message, { ...toastOptions, backgroundColor: colors.grey40 });
  }

  static showErrorMessage(message: string) {
    Toast.show(message, { ...toastOptions, backgroundColor: colors.red });
  }

  static showSuccessMessage(message: string) {
    Toast.show(message, { ...toastOptions, backgroundColor: colors.green });
  }
}
