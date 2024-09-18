import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '../../routes/types';
import Routes from '../../routes/routesNames';
import { RootState } from '../../store/store';

import { dimensions } from '../../styles';
import { ReportsObjectDetailsKeys } from '../../models/account';

import Layout from '../../components/Layout';
import StyledText from '../../components/StyledText';
import { FadeAnimation } from '../../components/animations';
import { FlyType } from '../../components/animations/FadeAnimation';
import StyledButton from '../../components/StyledButton';
import PressAnimation from '../../components/animations/PressAnimation';
import { setDrawingIssueFiles } from '../../store/slices/userSlice';

interface Props {
  navigation: any;
}

const ReportDetails = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { reportDetails, drawingDetails } = useSelector((state: RootState) => state.user);
  const { navigate } = useNavigation<GenericNavigationProps>();

  const navigateToDrawingIssueFiles = (issue: any) => {
    dispatch(setDrawingIssueFiles(issue))
    navigate(Routes.DrawingIssueFiles);
  }
  

  return (
    <Layout style={styles.container}>
      <FadeAnimation fly={FlyType.up} style={styles.content}>
        <StyledText alignCenter white bold style={{ textTransform: 'uppercase', marginTop: dimensions.size.smaller, marginBottom: dimensions.size.smedium }}>
          {reportDetails.object_details?.date?.display}
        </StyledText>
        {drawingDetails && 'issues' in drawingDetails &&
          drawingDetails?.issues?.map((issue: ReportsObjectDetailsKeys | any, index:number) =>
              <PressAnimation onPress={() => navigateToDrawingIssueFiles(issue)} key={`${issue.pk}-${index}`} style={{ marginBottom: dimensions.size.medium }}>
                <StyledButton title={issue.issue} />
              </PressAnimation>
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
