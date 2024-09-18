import { ActionSheetIOS } from 'react-native';
import ActionSheet from 'react-native-action-sheet';

import { ios } from '../styles/devices';

export default function showActionSheetWithOptions(...args: any[]) {
  if (ios) {
    ActionSheetIOS.showActionSheetWithOptions(...args);
  } else {
    ActionSheet.showActionSheetWithOptions(...args);
  }
}
