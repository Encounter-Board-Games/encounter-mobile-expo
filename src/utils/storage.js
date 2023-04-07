import { AsyncStorage } from "react-native";

class Storage {
  constructor() {}
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
