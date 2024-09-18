import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { GenericNavigationProps, RouteParamsInterface, RouteProps } from '../../routes/types';
import Routes from '../../routes/routesNames';
import { RootState } from '../../store/store';
import * as Constants from '../../constants/constants';

import { dimensions, fonts, images } from '../../styles';
import { Colors, buildRgba } from '../../styles/colors';
import { useTheme } from '../../theme';
import { passwordValidation, emailValidation } from '../../utils/validations';
import { apiService } from '../../services/api.service';
import ToastService from '../../services/toast.service';
import { clearUser, updateFiles, updateReportDetails } from '../../store/slices/userSlice';
import { Files as FilesInterface, FilesResponseKeys, Folders, Links, ReportsObjectDetailsKeys } from '../../models/account';
import { useDimensions, useDocumentPicker, useImagePicker } from '../../hooks';
import { FilePickerResponse } from '../../models/reports';

import { useProgress } from '../../components/ProgressHud/ProgressContext';
import Layout from '../../components/Layout';
import StyledText from '../../components/StyledText';
import { FadeAnimation } from '../../components/animations';
import { FlyType } from '../../components/animations/FadeAnimation';
import StyledButton from '../../components/StyledButton';
import PressAnimation from '../../components/animations/PressAnimation';
import StyledImage from '../../components/StyledImage';

interface Props {
  navigation: any;
}

const Photos = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  let { project, reports, reportDetails } = useSelector((state: RootState) => state.user);
  const { navigate } = useNavigation<GenericNavigationProps>();
  const route = useRoute<RouteProps>();
  const isFocused = useIsFocused();
  const { showProgress, hideProgress } = useProgress();
  const { width } = useDimensions();
  const { colors } = useTheme();
  const styles = stylesWithTheme(colors);
  const { openPicker, openCamera, openLibraryOrCamera } = useImagePicker();

  useEffect(() => {}, []);

  const openLibrary = async () => {
    const images = await openPicker({
      cropperCircleOverlay: false,
      includeBase64: true,
      cropping: true,
      multiple: true,
    });

    if (images.length) {
      const files: FilePickerResponse[] = images.map((img, idx) => {
        let uri = `data:${img.mime};base64,${img.data}`;
        const splitPath = img.path.split('/');
        const name = img.filename || splitPath[splitPath.length - 1] || '';

        return {
          uri,
          type: img.mime,
          name,
          size: img.size,
        };
      });
      photosUpload(files);
    }
  };

  const photosUpload = async (files: FilePickerResponse[]) => {
    showProgress('Uploading...');

    try {
      const resPhotos = await apiService.uploadPhotos(project?.project_data!, reportDetails.pk, files);

      const newPhotos = [...(reportDetails.object_details?.photos || []), ...resPhotos];
      reportDetails = {
        ...reportDetails,
        object_details: {
          ...reportDetails.object_details,
          photos: newPhotos,
        },
      };

      dispatch(updateReportDetails({ ...reportDetails }));

      hideProgress();
    } catch (error: any) {
      hideProgress();
      console.error(error);
      ToastService.showErrorMessage(error?.message || 'Error');
    }
  };

  const allImages = reportDetails.object_details?.photos?.map((photo) => `${Constants.baseMediaURL}${photo.object_details?.file_path}`);
  const photoWidth = width / 2 - dimensions.size.smedium * 2.4;

  return (
    <Layout style={styles.container}>
      <FadeAnimation fly={FlyType.up} style={styles.content}>
        <StyledText alignCenter style={{ textTransform: 'uppercase', marginTop: dimensions.size.smaller, marginBottom: dimensions.size.smedium }}>
          {reportDetails.object_details?.date?.display} - Photos
        </StyledText>

        <FadeAnimation fly={FlyType.up} style={styles.photos}>
          {reportDetails.object_details?.photos?.map((photo, index) => (
            <View key={`${photo.pk}-${index}`} style={[styles.photoView, { width: photoWidth }]}>
              <StyledImage source={{ uri: `${Constants.baseMediaURL}${photo.object_details?.file_path}` }} images={allImages} style={styles.photo} />
            </View>
          ))}
        </FadeAnimation>
      </FadeAnimation>

      <PressAnimation style={{ marginTop: dimensions.size.biggest }} onPress={openLibrary}>
        <StyledButton title={'Add Photos'} titleStyle={{ color: colors.black }} style={{ backgroundColor: colors.secondary }} />
      </PressAnimation>
    </Layout>
  );
};

const stylesWithTheme = (colors: Colors) =>
  StyleSheet.create({
    container: { height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
    content: { flex: 1, width: '100%' },
    photos: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
    photoView: {
      height: 120,
      padding: dimensions.size.tiny,
      borderRadius: dimensions.borderRadius.macro,
      borderWidth: 1,
      borderColor: colors.primary,
      marginBottom: dimensions.size.small,
    },
    photo: { width: '100%', height: '100%' },
  });

export default Photos;
