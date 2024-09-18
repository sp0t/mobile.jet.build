import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { GenericNavigationProps, RouteProps } from '../../routes/types';
import Routes from '../../routes/routesNames';
import { RootState } from '../../store/store';

import { dimensions } from '../../styles';
import { ReportsObjectDetailsKeys } from '../../models/account';
import { useDocumentPicker } from '../../hooks';

import { useProgress } from '../../components/ProgressHud/ProgressContext';
import Layout from '../../components/Layout';
import StyledText from '../../components/StyledText';
import { FadeAnimation } from '../../components/animations';
import { FlyType } from '../../components/animations/FadeAnimation';
import StyledButton from '../../components/StyledButton';
import PressAnimation from '../../components/animations/PressAnimation';

interface Props {
  navigation: any;
}

const ReportDetails = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { project, reports, reportDetails } = useSelector((state: RootState) => state.user);
  const { navigate } = useNavigation<GenericNavigationProps>();
  const route = useRoute<RouteProps>();
  const isFocused = useIsFocused();
  const { showProgress, hideProgress } = useProgress();
  const { documents, docSinglePicker } = useDocumentPicker();

  useEffect(() => {}, []);

  const goToNext = (key: ReportsObjectDetailsKeys) => () => {    
    if (key === 'photos') {
      navigate(Routes.Photos);
    } else if (key === 'manpower') {
      navigate(Routes.ManPower)
    }
  };

  const object_details: any = reportDetails.object_details;

  return (
    <Layout style={styles.container}>
      <FadeAnimation fly={FlyType.up} style={styles.content}>
        <StyledText alignCenter white bold style={{ textTransform: 'uppercase', marginTop: dimensions.size.smaller, marginBottom: dimensions.size.smedium }}>
          {reportDetails.object_details?.date?.display}
        </StyledText>

        {object_details &&
          Object.keys(object_details).map((key: ReportsObjectDetailsKeys | any, index) =>
            object_details[key] && key !== 'date' && key !== 'weather' ? (
              <PressAnimation key={`${key}-${index}`} style={{ marginBottom: dimensions.size.medium }} onPress={goToNext(key)}>
                <StyledButton title={key} />
              </PressAnimation>
            ) : null
          )}
      </FadeAnimation>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
  content: { flex: 1, width: '100%' },
});

export default ReportDetails;
