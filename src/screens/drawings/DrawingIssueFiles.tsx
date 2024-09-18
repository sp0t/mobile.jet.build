import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import { GenericNavigationProps } from '../../routes/types';
import { RootState } from '../../store/store';
import { dimensions } from '../../styles';
import Layout from '../../components/Layout';
import StyledText from '../../components/StyledText';
import { FadeAnimation } from '../../components/animations';
import { FlyType } from '../../components/animations/FadeAnimation';
import { baseMediaURL } from '../../constants/constants';
import PressAnimation from '../../components/animations/PressAnimation';
import StyledButton from '../../components/StyledButton';
import { useOpenFiles } from '../../hooks/useOpenFIles';
import { getCuttedFileName } from '../../utils/getCuttedFileName';

interface Props {
  navigation: any;
}

const DrawingIssueFiles = ({ navigation }: Props) => {
  const { drawingIssueFiles } = useSelector((state: RootState) => state.user);
  const openFile = useOpenFiles();

  return (
    <Layout style={styles.container}>
      <FadeAnimation fly={FlyType.up} style={styles.content}>
        <StyledText alignCenter white bold style={{ textTransform: 'uppercase', marginTop: dimensions.size.smaller, marginBottom: dimensions.size.smedium }}>
          {drawingIssueFiles?.issue} files
        </StyledText>
        {drawingIssueFiles && drawingIssueFiles.object_details && drawingIssueFiles.object_details.files &&
          drawingIssueFiles.object_details.files.map((item: any, index: number) => (
            <PressAnimation onPress={() => openFile(item.object_details.file_path)} key={`${item.pk}-${index}`} style={{ marginBottom: dimensions.size.medium }}>
                <StyledButton title={getCuttedFileName(item.object_details.file_name)} />
              </PressAnimation>
          ))}
      </FadeAnimation>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
  content: { flex: 1, width: '100%' },
});

export default DrawingIssueFiles