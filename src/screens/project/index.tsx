import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { GenericNavigationProps, RouteParamsInterface, RouteProps } from '../../routes/types';
import Routes from '../../routes/routesNames';
import { RootState } from '../../store/store';
import * as Constants from '../../constants/constants';

import { colors, devices, dimensions, fonts, images } from '../../styles';
import { android } from '../../styles/devices';
import { passwordValidation, emailValidation } from '../../utils/validations';
import { apiService } from '../../services/api.service';
import ToastService from '../../services/toast.service';
import { clearUser, updateDrawings, updateFiles, updateReports } from '../../store/slices/userSlice';
import { UserAppsKeys } from '../../models/account';

import { useProgress } from '../../components/ProgressHud/ProgressContext';
import Layout from '../../components/Layout';
import StyledText from '../../components/StyledText';
import { FadeAnimation } from '../../components/animations';
import { FlyType } from '../../components/animations/FadeAnimation';
import StyledButton from '../../components/StyledButton';
import PressAnimation from '../../components/animations/PressAnimation';
import handleModuleAction from '../../utils/handleModuleAction';

const Project = () => {
  const dispatch = useDispatch();
  const { project, user} = useSelector((state: RootState) => state.user);
  const { navigate } = useNavigation<GenericNavigationProps>();
  const route = useRoute<RouteProps>();
  const isFocused = useIsFocused();
  const { showProgress, hideProgress } = useProgress();

  const availableModules = ["Daily Reports", "Drawings", "Files", "Punch Lists"]

  const onPress = (key: UserAppsKeys) => () => {
    handleModuleAction(key, project, dispatch, navigate, showProgress, hideProgress);
  };

  const getFiles = async (folder_pk: number) => {
    showProgress('Loading...');

    try {
      const files = await apiService.getFiles(folder_pk, project?.project_data!);

      dispatch(updateFiles(files));

      hideProgress();

      const params: RouteParamsInterface = {
        files,
      };
      navigate(Routes.Files, params);
    } catch (error: any) {
      hideProgress();
      console.error(error);
      ToastService.showErrorMessage(error?.message || 'Error');
    }
  };

  const getReports = async () => {
    showProgress('Loading...');

    try {
      const reports = await apiService.getReports(project?.project_data!);

      dispatch(updateReports(reports));

      hideProgress();

      navigate(Routes.Reports);
    } catch (error: any) {
      hideProgress();
      console.error(error);
      ToastService.showErrorMessage(error?.message || 'Error');
    }
  };

  const getDrawings = async () => {
    showProgress('Loading...');

    try {
      const drawings = await apiService.getDrawings(project?.project_data!);

      dispatch(updateDrawings(drawings));

      hideProgress();

      navigate(Routes.Drawings);
    } catch (error: any) {
      hideProgress();
      console.error(error);
      ToastService.showErrorMessage(error?.message || 'Error');
    }
  };

  const user_apps: any = project?.user_apps;

  return (
    <Layout style={styles.container}>
      <FadeAnimation fly={FlyType.up} style={styles.content}>
        <StyledText
          alignCenter
          white
          bold
          style={{ textTransform: 'uppercase', fontWeight: 'bold', marginTop: dimensions.size.smaller, marginBottom: dimensions.size.smedium }}
        >
          {project?.project_data?.project_name!} APPLICATIONS
        </StyledText>

        {user_apps &&
          Object.keys(user_apps).map((key: any, index) =>
            user_apps[key] ? (
              <PressAnimation key={`${key}-${index}`} style={{ marginBottom: dimensions.size.medium }} onPress={onPress(key)}>
                {availableModules.includes(key) && <StyledButton title={key} />}
              </PressAnimation>
            ) : null
          )}
      </FadeAnimation>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
  content: { flex: 1, width: '100%' },
});

export default Project;
