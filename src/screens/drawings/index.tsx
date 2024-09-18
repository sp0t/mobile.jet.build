import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import { dimensions} from '../../styles';
import { useTheme } from '../../theme';
import Layout from '../../components/Layout';
import StyledText from '../../components/StyledText';
import { FadeAnimation } from '../../components/animations';
import { FlyType } from '../../components/animations/FadeAnimation';
import StyledButton from '../../components/StyledButton';
import PressAnimation from '../../components/animations/PressAnimation';
import { Drawing, ProjectData } from '../../models/account';
import { useProgress } from '../../components/ProgressHud/ProgressContext';
import { apiService } from '../../services/api.service';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '../../routes/types';
import ToastService from '../../services/toast.service';
import Routes from '../../routes/routesNames';
import { updateDrawingsDetails } from '../../store/slices/userSlice';


interface Props {
    navigation: any;
  }

const Drawings = ({ navigation }: Props)=>{
    const { drawings, reports, project } = useSelector((state: RootState) => state.user);
    const { showProgress, hideProgress } = useProgress();
    const dispatch = useDispatch();
    const { navigate } = useNavigation<GenericNavigationProps>();

    const getDrawingDetails = (drawing_id: number | string) => async () => {
      showProgress('Loading...');
  
      try {
        const drawings = await apiService.getDrawingDetails(project?.project_data as ProjectData, drawing_id);
  
        dispatch(updateDrawingsDetails(drawings));
  
        hideProgress();
  
        navigate(Routes.DrawingDetails);
      } catch (error: any) {
        hideProgress();
        console.error(error);
        ToastService.showErrorMessage(error?.message || 'Error');
      }
    };
    
    return (
      <>
        <Layout style={styles.container}>
          <FadeAnimation fly={FlyType.up} style={styles.content}>
            <StyledText alignCenter white bold style={{ textTransform: 'uppercase', marginTop: dimensions.size.smaller, marginBottom: dimensions.size.smedium }}>
              Drawings
            </StyledText>
  
            {drawings?.drawings.map((drawing:Drawing, idx: number) => (
              <PressAnimation key={`${drawing.pk}-${idx}`} style={{ marginBottom: dimensions.size.medium }} onPress={getDrawingDetails(drawing.pk)}>
                <StyledButton title={drawing.drawing} />
              </PressAnimation>
            ))}
          </FadeAnimation>
        </Layout>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: { height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
    content: { flex: 1, width: '100%' },
  });
  
export default Drawings