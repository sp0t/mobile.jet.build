import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { GenericNavigationProps, RouteParamsInterface, RouteProps } from '../../routes/types';
import Routes from '../../routes/routesNames';
import { RootState } from '../../store/store';
import * as Constants from '../../constants/constants';

import { dimensions, fonts, images } from '../../styles';
import { useTheme } from '../../theme';
import { android } from '../../styles/devices';
import { passwordValidation, emailValidation } from '../../utils/validations';
import { apiService } from '../../services/api.service';
import ToastService from '../../services/toast.service';
import { clearUser, updateFiles } from '../../store/slices/userSlice';
import { Files as FilesInterface, FilesResponseKeys, Folders, Links } from '../../models/account';
import { useDocumentPicker } from '../../hooks';

import { useProgress } from '../../components/ProgressHud/ProgressContext';
import Layout from '../../components/Layout';
import StyledText from '../../components/StyledText';
import { FadeAnimation } from '../../components/animations';
import { FlyType } from '../../components/animations/FadeAnimation';
import StyledButton from '../../components/StyledButton';
import PressAnimation from '../../components/animations/PressAnimation';
import { useOpenFiles } from '../../hooks/useOpenFIles';

interface Props {
  navigation: any;
}

const Files = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { project } = useSelector((state: RootState) => state.user);
  const { navigate } = useNavigation<GenericNavigationProps>();
  const route = useRoute<RouteProps>();
  const isFocused = useIsFocused();
  const openFile = useOpenFiles();
  const { showProgress, hideProgress } = useProgress();
  const { documents, docSinglePicker } = useDocumentPicker();
  const { colors } = useTheme();

  const files = route.params.files || {};
  const folder_pk = route.params.folder_pk || 0;

  useEffect(() => {
    if (documents) {
      fileUpload();
    }
  }, [documents]);

  const onPress = (key: FilesResponseKeys, folder_pk: number) => () => {
    if (folder_pk >= 0) {
      if (key === 'folders') {
        getFiles(folder_pk);
      }
    } else {
      openFile(key)
    }
  };

  const getFiles = async (folder_pk: number) => {
    showProgress('Loading...');

    try {
      const files = await apiService.getFiles(folder_pk, project?.project_data!);

      dispatch(updateFiles(files));

      hideProgress();

      const params: RouteParamsInterface = {
        files,
        folder_pk,
      };
      navigation.push(Routes.Files, params);
    } catch (error: any) {
      hideProgress();
      console.error(error);
      ToastService.showErrorMessage(error?.message || 'Error');
    }
  };

  const openFilePicker = async () => {
    await docSinglePicker();
  };

  const fileUpload = async () => {
    showProgress('Uploading...');

    try {
      const resFiles = await apiService.uploadFiles(folder_pk, project?.project_data!, files.path, documents);

      files.files = [...(files.files || []), ...resFiles];

      hideProgress();
    } catch (error: any) {
      hideProgress();
      console.error(error);
      ToastService.showErrorMessage(error?.message || 'Error');
    }
  };

  return (
    <Layout style={styles.container}>
      <FadeAnimation fly={FlyType.up} style={styles.content}>
        {Object.keys(files).map((key: FilesResponseKeys | any, index) => {
          const sFiles: any = files;
          const data = sFiles[key];
          if (data && typeof data !== 'string' && data.length) {
            return (
              <FadeAnimation fly={FlyType.up} key={`${key}-${index}`}>
                <StyledText
                  alignCenter
                  white
                  bold
                  style={{ textTransform: 'uppercase', marginTop: dimensions.size.smaller, marginBottom: dimensions.size.smedium }}
                >
                  {files.path || project?.project_data?.project_name!} {key}
                </StyledText>

                {data.map((value: any, idx: number) => (
                  <PressAnimation key={`${value.pk}-${idx}`} style={{ marginBottom: dimensions.size.medium }} onPress={value?.object_details ? onPress(value?.object_details?.file_path, -1)  : onPress(key, value.pk)}>
                    <StyledButton title={value.folder_name || value.object_details?.file_name || value.link_name || `${key} ${idx + 1}`} />
                  </PressAnimation>
                ))}
              </FadeAnimation>
            );
          } else {
            return null;
          }
        })}

        {folder_pk && files.path ? (
          <PressAnimation style={{ marginTop: dimensions.size.biggest }} onPress={openFilePicker}>
            <StyledButton title={'Add File'} titleStyle={{ color: colors.black }} style={{ backgroundColor: colors.secondary }} />
          </PressAnimation>
        ) : null}
      </FadeAnimation>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
  content: { flex: 1, width: '100%' },
});

export default Files;
