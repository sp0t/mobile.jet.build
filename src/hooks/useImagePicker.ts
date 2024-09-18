import { useCallback } from 'react';
import { Linking } from 'react-native';
import ImagePicker, { Options } from 'react-native-image-crop-picker';

import { Alert } from '../components/alerts';
import ToastService from '../services/toast.service';
import showActionSheetWithOptions from '../utils/actionsheet';
import { ImageVideoCommon } from '../models/reports';

export default function useImagePicker() {
  const openPicker = useCallback(async (options: Options): Promise<ImageVideoCommon[]> => {
    let image: ImageVideoCommon[] | any = [];
    try {
      image = (await ImagePicker.openPicker(options)) || [];
    } catch (e: any) {
      if (e?.message === 'User did not grant library permission.') {
        Alert({
          buttons: [
            { style: 'cancel', text: 'Cancel' },
            {
              onPress: Linking.openSettings,
              text: 'Enable library access',
            },
          ],
          message: 'This allows SmokeLab to use your photos from your library',
          title: 'SmokeLab would like to access your photos',
        });
      }
    }
    return image;
  }, []);

  const openCamera = useCallback(async (options: Options) => {
    let image = null;
    try {
      image = await ImagePicker.openCamera(options);
    } catch (e: any) {
      console.error(e);
      if (e?.message === 'User did not grant camera permission.') {
        Alert({
          buttons: [
            { style: 'cancel', text: 'Cancel' },
            {
              onPress: Linking.openSettings,
              text: 'Enable camera access',
            },
          ],
          message: 'This allows SmokeLab to take the photos from camera',
          title: 'SmokeLab would like to access camera',
        });
      } else if (e?.message === 'Cannot run camera on simulator') {
        ToastService.showErrorMessage(e?.message);
      }
    }
    return image;
  }, []);

  const openLibraryOrCamera = (title: string, callback: any = null) => {
    const androidContractActions = ['Choose from Library', 'Choose from Camera', 'Cancel'];

    showActionSheetWithOptions(
      {
        cancelButtonIndex: 2,
        options: androidContractActions,
        showSeparators: true,
        title,
      },
      (idx: number) => {
        callback?.(idx);
      }
    );
  };

  return {
    openPicker,
    openCamera,
    openLibraryOrCamera,
  };
}
