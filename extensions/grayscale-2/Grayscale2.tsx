import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Alert } from 'react-native';
import { ScreenBreak } from '../../sdk';

/**
 * Intelligent Focus Mode
 * 
 * An advanced extension that automatically applies grayscale filters
 * once daily screen time limits are exceeded.
 */

export const IntelligentFocusMode = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [wasManuallyDisabled, setWasManuallyDisabled] = useState(false);

  const toggleFocusMode = async (value: boolean) => {
    if (value && !hasPermission) {
      Alert.alert(
        "Display Permissions",
        "This extension requires permission to modify screen saturation through the ScreenBreak Accessibility Service.",
        [
          { text: "Cancel", style: "cancel", onPress: () => setIsEnabled(false) },
          { 
            text: "Enable", 
            onPress: async () => {
              setHasPermission(true);
              setIsEnabled(true);
              setWasManuallyDisabled(false);
              await ScreenBreak.visuals.setGrayscale(1.0);
            } 
          }
        ]
      );
    } else {
      setIsEnabled(value);
      // If the user manually turns it off, we mark it so it doesn't auto-re-enable immediately
      if (!value) setWasManuallyDisabled(true);
      else setWasManuallyDisabled(false);

      await ScreenBreak.visuals.setGrayscale(value ? 1.0 : 0.0);
    }
  };

  useEffect(() => {
    const unsubscribe = ScreenBreak.onUpdate(async (stats) => {
      // Auto-trigger at 2 hours (120 minutes)
      // Only auto-enable if:
      // 1. Time limit reached (120m)
      // 2. Not already enabled
      // 3. We have permission
      // 4. The user hasn't manually disabled it in this session
      if (stats.todayTotalMinutes >= 120 && !isEnabled && hasPermission && !wasManuallyDisabled) {
        setIsEnabled(true);
        await ScreenBreak.visuals.setGrayscale(1.0);
        Alert.alert("Daily Limit Reached", "Intelligent Focus has been enabled to help you stay focused.");
      }
    });

    return () => unsubscribe();
  }, [isEnabled, hasPermission, wasManuallyDisabled]);

  return (
    <View className="p-5 bg-zinc-900 rounded-3xl border border-zinc-800">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className="text-white font-bold text-xl tracking-tight">Intelligent Focus</Text>
            <View className="ml-2 px-2 py-0.5 bg-zinc-800 rounded-md border border-zinc-700">
              <Text className="text-[10px] text-zinc-400 font-bold uppercase">PRO</Text>
            </View>
          </View>
          <Text className="text-zinc-500 text-sm">
            Automatically activates grayscale mode after 120 minutes of daily usage.
          </Text>
        </View>
        <Switch 
          value={isEnabled} 
          onValueChange={toggleFocusMode}
          trackColor={{ false: '#27272a', true: '#ffffff' }}
          thumbColor={isEnabled ? '#000000' : '#71717a'}
        />
      </View>
      
      <View className="flex-row items-center justify-between border-t border-zinc-800 pt-3">
        <View className="flex-row items-center">
          <View className={`w-2 h-2 rounded-full mr-2 ${isEnabled ? 'bg-white' : 'bg-zinc-700'}`} />
          <Text className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
            {isEnabled ? 'Filter Active' : 'Monitoring Usage'}
          </Text>
        </View>
        
        {hasPermission && (
          <Text className="text-zinc-500 text-[10px]">Permission Active</Text>
        )}
      </View>
    </View>
  );
};
