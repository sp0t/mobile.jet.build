import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PressAnimation from '../../components/animations/PressAnimation'
import StyledButton from '../../components/StyledButton'
import { dimensions } from '../../styles'
import { useTheme } from '../../theme'
import Layout from '../../components/Layout'
import { Colors } from '../../styles/colors'


const ManPower = () => {
    const { colors } = useTheme();
    const styles = stylesWithTheme(colors);

  return (
    <Layout style={styles.container}>
      <PressAnimation style={{ marginTop: dimensions.size.biggest }}>
        <StyledButton title={'Add Manpower'} titleStyle={{ color: colors.black }} style={{ backgroundColor: colors.secondary }} />
      </PressAnimation>
    </Layout>
  )
}

const stylesWithTheme = (colors: Colors) =>
  StyleSheet.create({
    container: { height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
    content: { flex: 1, width: '100%' },
    photos: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
    photoView: {
      height: 120,
      padding: dimensions.size.tiny,
      borderRadius: dimensions.borderRadius.macro,
      borderWidth: 1,
      borderColor: colors.primary,
      marginBottom: dimensions.size.small,
    },
    photo: { width: '100%', height: '100%' },
  });


export default ManPower