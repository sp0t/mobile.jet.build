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
import { clearUser, updateProject } from '../../store/slices/userSlice';

import { useProgress } from '../../components/ProgressHud/ProgressContext';
import Layout from '../../components/Layout';
import StyledText from '../../components/StyledText';
import { FadeAnimation } from '../../components/animations';
import { FlyType } from '../../components/animations/FadeAnimation';
import StyledButton from '../../components/StyledButton';
import PressAnimation from '../../components/animations/PressAnimation';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { navigate } = useNavigation<GenericNavigationProps>();
  const route = useRoute<RouteProps>();
  const isFocused = useIsFocused();
  const { showProgress, hideProgress } = useProgress();

  const getProjectsDetails = (project_pk: number) => async () => {
    showProgress('Loading...');

    try {
      const project = await apiService.getProjectsDetails(project_pk);

      dispatch(updateProject(project));

      hideProgress();

      navigate(Routes.Project);
    } catch (error: any) {
      hideProgress();
      console.error(error);
      ToastService.showErrorMessage(error?.message || 'Error');
    }
  };

  return (
    <Layout style={styles.container}>
      <FadeAnimation fly={FlyType.up} style={styles.content}>
        <StyledText alignCenter white bold style={styles.title}>
          Organization Projects
        </StyledText>

        {user.org_projects?.map((pro, index) => (
          <PressAnimation key={`${pro.pk}-${index}`} style={{ marginBottom: dimensions.size.medium }} onPress={getProjectsDetails(pro.pk!)}>
            <StyledButton title={pro.project_name} />
          </PressAnimation>
        ))}

        <StyledText alignCenter white bold style={styles.title}>
          External Projects
        </StyledText>

        {user.ext_projects?.map((pro, index) => (
          <PressAnimation key={`${pro.pk}-${index}`} style={{ marginBottom: dimensions.size.medium }} onPress={getProjectsDetails(pro.pk!)}>
            <StyledButton title={pro.project_name} />
          </PressAnimation>
        ))}
      </FadeAnimation>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
  content: { flex: 1, width: '100%' },
  title: { marginTop: dimensions.size.smaller, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: dimensions.size.smedium },
});

export default Home;
