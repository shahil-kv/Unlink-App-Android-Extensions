import React from 'react';
import { View, Text } from 'react-native';
import { ScreenBreak } from '../../sdk';

export const TestingExtension = () => {
  return (
    <View className="p-4 bg-zinc-900 rounded-2xl">
      <Text className="text-white">Hello from testing-extension!</Text>
    </View>
  );
};
