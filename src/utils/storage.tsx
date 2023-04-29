import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageProps {
  clear: () => Promise<void>;
  getItem: (key: string) => Promise<any>;
  setItem: (key: string, value: any) => Promise<void>;
}

const Storage: StorageProps = {
  clear: async () => {
    await AsyncStorage.clear();
  },
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value!);
  },
  setItem: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
};

export default Storage;
