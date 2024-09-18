import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';

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
import { clearUser, updateFiles, updateReportDetails, updateReports } from '../../store/slices/userSlice';
import { Files as FilesInterface, FilesResponseKeys, Folders, Links } from '../../models/account';
import { useDocumentPicker } from '../../hooks';

import { useProgress } from '../../components/ProgressHud/ProgressContext';
import Layout from '../../components/Layout';
import StyledText from '../../components/StyledText';
import { FadeAnimation } from '../../components/animations';
import { FlyType } from '../../components/animations/FadeAnimation';
import StyledButton from '../../components/StyledButton';
import PressAnimation from '../../components/animations/PressAnimation';
import moment from 'moment';

interface Props {
  navigation: any;
}

const Reports = ({ navigation }: Props) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [openedCalendar, setOpenedCalendar] = useState(false);
  const dispatch = useDispatch();
  const { project, reports } = useSelector((state: RootState) => state.user);
  const { navigate } = useNavigation<GenericNavigationProps>();
  const route = useRoute<RouteProps>();
  const isFocused = useIsFocused();
  const { showProgress, hideProgress } = useProgress();
  const { colors } = useTheme();

  useEffect(() => {}, []);

  const getReportDetails = (report_id: any) => async () => {
    showProgress('Loading...');

    try {
      const reports = await apiService.getReportDetails(report_id);

      dispatch(updateReportDetails(reports));

      hideProgress();

      navigate(Routes.ReportDetails);
    } catch (error: any) {
      hideProgress();
      console.error(error);
      ToastService.showErrorMessage(error?.message || 'Error');
    }
  };

  const openCalendar = () => {
    setOpenedCalendar(true);
  };

  const createReport = async () => {
    setOpenedCalendar(false);
    showProgress('Loading...');

    console.log("selected Date", selectedDate)
    console.log("selected Date", moment(selectedDate).format('L'))
    console.log("project data", project?.project_data!)
    try {
      const newReport = await apiService.addReport(moment(selectedDate).format('L'), project?.project_data!);
      dispatch(updateReports([newReport, ...reports]));

      dispatch(updateReportDetails([newReport, ...reports]));

      hideProgress();

      // navigate(Routes.ReportDetails);
    } catch (error: any) {
      hideProgress();
      ToastService.showErrorMessage(error?.message || 'Error');
    }
  };

  const onDateChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Layout style={styles.container}>
        <FadeAnimation fly={FlyType.up} style={styles.content}>
          <StyledText alignCenter white bold style={{ textTransform: 'uppercase', marginTop: dimensions.size.smaller, marginBottom: dimensions.size.smedium }}>
            Daily Reports
          </StyledText>
          {openedCalendar && (
            <View>
              <CalendarPicker
                textStyle={{
                  color: 'white',
                  fontWeight: '900',
                }}
                startFromMonday={true}
                allowRangeSelection={false}
                todayBackgroundColor='pink'
                selectedDayColor='green'
                todayTextStyle={{
                  color: '#000',
                }}
                selectedDayTextColor='#FFFFFF'
                onDateChange={onDateChange}
              />
              <FadeAnimation style={{ alignSelf: 'center', margin: dimensions.size.large, zIndex: 1 }}>
                <PressAnimation onPress={createReport}>
                  <StyledButton title={'Select'} titleStyle={{ color: colors.black }} style={{ backgroundColor: colors.secondary }} />
                </PressAnimation>
              </FadeAnimation>
            </View>
          )}

          {!openedCalendar &&
            reports.map((report, idx: number) => (
              <PressAnimation key={`${report.pk}-${idx}`} style={{ marginBottom: dimensions.size.medium }} onPress={getReportDetails(report.pk)}>
                <StyledButton title={report.object_details?.date?.display} />
              </PressAnimation>
            ))}
        </FadeAnimation>
      </Layout>
      {!openedCalendar && (
        <FadeAnimation fly={FlyType.up} style={{ alignSelf: 'center', position: 'absolute', bottom: 0, margin: dimensions.size.large, zIndex: 1 }}>
          <PressAnimation onPress={openCalendar}>
            <StyledButton title={'Add Daily Report'} titleStyle={{ color: colors.black }} style={{ backgroundColor: colors.secondary }} />
          </PressAnimation>
        </FadeAnimation>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
  content: { flex: 1, width: '100%' },
});

export default Reports;
