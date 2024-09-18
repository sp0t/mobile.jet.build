import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLocal = async (key: any, data: any) => {
  try {
    data = JSON.stringify(data);
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.error('Storage: error saving to local for key', key);
  }
};

export const getLocal = async (key = '') => {
  try {
    const storageString = (await AsyncStorage.getItem(key)) || '';

    const storageJson = JSON.parse(storageString);

    if (storageJson) {
      return storageJson;
    }

    return null;
  } catch (error) {
    console.error('Storage: error getting from local for key', key);
    return null;
  }
};

export const removeLocal = async (key = '') => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Storage: error removing local with key', key);
  }
};
