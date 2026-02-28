import React from 'react';
import { View, Text } from 'react-native';
import { ScreenBreak } from '../../sdk';

export const TestingExtension = () => {
  return (
    <View className="p-4 bg-transparent border-t border-gray-800/60 mt-2">
      <Text className="text-gray-300 font-medium">Hello there! The developer testing extension has been successfully loaded over the air.</Text>
      <View className="mt-4 flex-row items-center">
        <View className="w-2 h-2 rounded-full mr-2.5 shadow-sm bg-[#ff006e] shadow-[#ff006e]" />
        <Text className="text-[#ff006e] text-[10px] uppercase font-bold tracking-widest">Active Bundle Connection</Text>
      </View>
    </View>
  );
};
