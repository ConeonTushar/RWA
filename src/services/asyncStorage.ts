import AsyncStorage from '@react-native-async-storage/async-storage';
import { isValidJSON } from './helper';

// Define a generic type for the value in AsyncStorage
type AsyncStorageValue = string | number | boolean | object | null;

const asyncStorageService = {
  // Save data to AsyncStorage with generic types
  saveItem: async <T extends AsyncStorageValue>(
    key: string,
    value: T,
  ): Promise<void> => {
    try {
      if (typeof value === 'string') {
        await AsyncStorage.setItem(key, value);
      } else if (value) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      }
      console.log(`Data saved under the key: ${key}`);
    } catch (error) {
      console.error(`Error saving data: ${error}`);
    }
  },

  // Retrieve data from AsyncStorage
  getItem: async <T extends AsyncStorageValue>(
    key: string,
  ): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value && isValidJSON(value)) {
        return value != null ? (JSON.parse(value) as T) : null;
      }
      return value as any;
    } catch (error) {
      console.error(`Error getting data: ${error}`);
      return null;
    }
  },

  // Remove an item from AsyncStorage
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Data removed under the key: ${key}`);
    } catch (error) {
      console.error(`Error removing data: ${error}`);
    }
  },

  // Clear all data from AsyncStorage
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared');
    } catch (error) {
      console.error(`Error clearing data: ${error}`);
    }
  },

  // Get multiple items at once
  multiGetItems: async <T extends AsyncStorageValue>(
    keys: string[],
  ): Promise<{ key: string; value: T | null }[]> => {
    try {
      const result = await AsyncStorage.getMany(keys);
      return Object.entries(result).map(([key, value]) => ({
        key,
        value:
          value !== null
            ? isValidJSON(value)
              ? (JSON.parse(value) as T)
              : (value as unknown as T)
            : null,
      }));
    } catch (error) {
      console.error(`Error getting multiple items: ${error}`);
      return [];
    }
  },

  // Set multiple items at once
  multiSetItems: async (data: [string, AsyncStorageValue][]): Promise<void> => {
    try {
      const formattedData: Record<string, string> = {};
      data.forEach(([key, value]) => {
        formattedData[key] =
          typeof value === 'string' ? value : JSON.stringify(value);
      });
      await AsyncStorage.setMany(formattedData);
      console.log('Multiple items saved');
    } catch (error) {
      console.error(`Error saving multiple items: ${error}`);
    }
  },

  // Remove multiple items at once
  multiRemoveItems: async (keys: string[]): Promise<void> => {
    try {
      await AsyncStorage.removeMany(keys);
      console.log('Multiple items removed');
    } catch (error) {
      console.error(`Error removing multiple items: ${error}`);
    }
  },
};

export default asyncStorageService;
