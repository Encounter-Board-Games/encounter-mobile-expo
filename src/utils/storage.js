import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = () => {
  const clear = async () => {
    await AsyncStorage.clear();
  };

  const getItem = async (key) => {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  };

  const setItem = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  return {
    clear,
    getItem,
    setItem,
  };
};

export default Storage();
