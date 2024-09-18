import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import TouchID from 'react-native-touch-id';
import { GenericNavigationProps, RouteProps } from '../../routes/types';
import Routes from '../../routes/routesNames';
import { RootState } from '../../store/store';
import { setIsLoggedIn, updateUser } from '../../store/slices/userSlice';

import { dimensions } from '../../styles';
import { passwordValidation, emailValidation } from '../../utils/validations';
import { apiService } from '../../services/api.service';
import ToastService from '../../services/toast.service';

import { useProgress } from '../../components/ProgressHud/ProgressContext';
import Layout from '../../components/Layout';
import StyledText from '../../components/StyledText';
import { FadeAnimation } from '../../components/animations';
import { FlyType } from '../../components/animations/FadeAnimation';
import StyledButton from '../../components/StyledButton';
import PressAnimation from '../../components/animations/PressAnimation';
import StyledTextInput, { InputType } from '../../components/StyledTextInput';
import StyledImage from '../../components/StyledImage';

const SignIn = () => {
  const dispatch = useDispatch();
  const {} = useSelector((state: RootState) => state.user);
  const { navigate } = useNavigation<GenericNavigationProps>();
  const route = useRoute<RouteProps>();
  const isFocused = useIsFocused();
  const { showProgress, hideProgress } = useProgress();

  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = (type: string) => (value: any) => {
    setData({ ...data, [type]: value });
  };

  const goToNext = async () => {
    showProgress('Loading...');

    try {
      const user = await apiService.login(data.email, data.password);

      dispatch(updateUser({ ...user, ...data }));
      dispatch(setIsLoggedIn(true));

      hideProgress();

      navigate(Routes.Home);
    } catch (error: any) {
      hideProgress();
      console.error(error);
      ToastService.showErrorMessage(error?.message || 'Error');
    }
  };

  const disabled = !data.email || !data.password || emailValidation(data.email) || passwordValidation(data.password);

  const authenticate = () => {
    TouchID.authenticate('to demo this react-native component')
      .then((success: any) => {
        // Success code
        console.log('Successfully authenticated');
      })
      .catch((error: any) => {
        // Failure code
        console.log('Failed to authenticate');
      });
      navigate(Routes.Home);
  };

  return (
    <Layout style={styles.container}>
      <StyledImage style={styles.logo} source={{ uri: 'https://jet-static.nyc3.cdn.digitaloceanspaces.com/misc/logos/white_yellow/1xPNG/stacked.png' }} />

      <FadeAnimation fly={FlyType.up} style={styles.content}>
        <StyledTextInput
          keyboardType='email-address'
          value={data.email}
          error={emailValidation(data.email)}
          onChangeText={handleChange('email')}
          placeholder='Email Address'
        />

        <StyledTextInput
          type={InputType.Password}
          error={passwordValidation(data.password)}
          value={data.password}
          onChangeText={handleChange('password')}
          placeholder='Password'
        />
        <TouchableOpacity onPress={authenticate}>
          <Text style={{color: 'white'}}>Autentificate</Text>
        </TouchableOpacity>
        <PressAnimation disabled={!!disabled} style={{ marginTop: dimensions.size.lmedium, marginBottom: dimensions.size.medium }} onPress={goToNext}>
          <StyledButton title={'LOGIN'} />
        </PressAnimation>
      </FadeAnimation>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
  content: { flex: 1, width: '100%', justifyContent: 'center', marginTop: -36 },
  logo: { width: '100%', height: '25%', resizeMode: 'contain' },
});

export default SignIn;
