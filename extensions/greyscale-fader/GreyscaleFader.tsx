import React from 'react';
import { View, Text, Switch } from 'react-native';
import { ScreenBreak } from '../../sdk';

/**
 * Greyscale Fader Extension
 * 
 * Logic:
 * - Simple toggle to turn the entire screen Black & White.
 */

export const GreyscaleFader = () => {
  const [enabled, setEnabled] = React.useState(false);

  const toggleGreyscale = async (value: boolean) => {
    setEnabled(value);
    // 1.0 = Full B&W, 0.0 = Full Color
    await ScreenBreak.visuals.setGrayscale(value ? 1.0 : 0.0);
  };

  return (
    <View className="pt-2">
      <View className="flex-row justify-between items-center mb-6 pl-1">
        <View className="flex-1 pr-6">
          <Text className="text-gray-300 text-sm leading-5">
            Manually force your screen into a wash-out tint mode to reduce dopamine.
          </Text>
        </View>
        <Switch 
          value={enabled} 
          onValueChange={toggleGreyscale}
          trackColor={{ false: '#27272a', true: '#ff006e' }}
          thumbColor={enabled ? '#ffffff' : '#a1a1aa'}
        />
      </View>
      
      <View className="flex-row items-center border-t border-gray-800/60 pt-4 pb-2">
        <View className={`w-2 h-2 rounded-full mr-2.5 shadow-sm ${enabled ? 'bg-[#ff006e] shadow-[#ff006e]' : 'bg-gray-600'}`} />
        <Text className={`text-xs uppercase font-bold tracking-widest ${enabled ? 'text-[#ff006e]' : 'text-gray-500'}`}>
          {enabled ? 'Active' : 'Inactive'}
        </Text>
      </View>
    </View>
  );
};
