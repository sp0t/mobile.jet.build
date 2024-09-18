import React, { useState } from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { StyleProp, TouchableOpacity, View, ViewStyle, Modal, Text, StyleSheet, TouchableWithoutFeedback  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { navigationRef } from './navigationUtils';
import { HeaderRightInterface, GenericNavigationProps } from './types';
import { colors, devices, dimensions, fonts, images } from '../styles';
import { ios } from '../styles/devices';
import { Colors } from '../styles/colors';
import { RootState } from '../store/store';
import { useProgress } from '../components/ProgressHud/ProgressContext';

import { FadeAnimation } from '../components/animations';
import { FlyType } from '../components/animations/FadeAnimation';
import PressAnimation from '../components/animations/PressAnimation';
import StyledText from '../components/StyledText';
import Routes from './routesNames'
import handleModuleAction from '../utils/handleModuleAction';
import StyledImage from '../components/StyledImage';

export const renderBackButton = (navigation: any) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation<GenericNavigationProps>();
  const [menuVisible, setMenuVisible] = useState(false);
  const { project, user} = useSelector((state: RootState) => state.user);
  const { showProgress, hideProgress } = useProgress();

  const onPress = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleMenuSelection = (key: string) => {
    handleModuleAction(key, project, dispatch, navigate, showProgress, hideProgress);
    setMenuVisible(false); // Close the menu after the selection
  };

  return (
    <>
    <FadeAnimation fly={FlyType.left} style={{ marginLeft: dimensions.size.lmedium }}>
      <PressAnimation onPress={onPress}>
        <StyledImage source={images.Hamburger} style={styles.hamburgerIcon} />
      </PressAnimation>
    </FadeAnimation>

    <Modal visible={menuVisible} transparent={true} animationType="slide">
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>

          {/* Menu Options */}
          {['Home', 'Daily Reports', 'Drawings', 'Files', 'Punch Lists'].map((key) => (
            <TouchableOpacity key={key} onPress={() => handleMenuSelection(key)}>
              <Text style={styles.menuOption}>{key}</Text>
            </TouchableOpacity>
          ))}

          {/* <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
  </>
  );
};

export const renderTitle = () => {
  return <View></View>;
};

export const renderRight = ({ navigation }: HeaderRightInterface) => {
  return null;
};

export const renderHeader = (navigation: any, colors: Colors): StackNavigationOptions => ({
  animationTypeForReplace: 'pop',
  gestureEnabled: true,
  animationEnabled: true,
  headerShown: true,
  headerStyle: {
    // height: ios ? 120 : 60,
    backgroundColor: colors.black,
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerLeft: () => renderBackButton(navigation),
  headerRight: () => renderRight({ navigation }),
  headerTitle: () => renderTitle(),
});


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#4471c4', // Blue background
    borderRadius: 10,
  },
  menuOption: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white', // Text color white
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
  hamburgerIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
