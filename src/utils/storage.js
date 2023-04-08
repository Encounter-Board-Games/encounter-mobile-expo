import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  constructor() {
    // AsyncStorage.clear();
  }
  async clear() {
    AsyncStorage.clear();
  }
  async getItem(key) {
    const value = await AsyncStorage.getItem(key);

    return JSON.parse(value);
  }

  async setItem(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }
}

export default new Storage();
