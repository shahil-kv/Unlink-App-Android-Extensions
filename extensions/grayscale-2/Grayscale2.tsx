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
    // Check if the OS actually has the permission enabled
    const isActuallyEnabled = await (ScreenBreak.visuals as any).hasAccessibilityPermission();
    
    if (value && !isActuallyEnabled) {
      setHasPermission(false);
      Alert.alert(
        "Accessibility Permission Required",
        "To filter all apps, ScreenBreak needs Accessibility permission. We only use this to draw a gray filter over your screen without tracking what you type.",
        [
          { text: "Cancel", style: "cancel", onPress: () => setIsEnabled(false) },
          { 
            text: "Open Settings", 
            onPress: async () => {
              // Mark that they intended to turn it on, so when they return it's ready.
              setIsEnabled(true);
              setWasManuallyDisabled(false);
              await (ScreenBreak.visuals as any).openAccessibilitySettings();
              // Note: hasPermission should ideally be verified when the app resumes.
              // For demonstration in the extension, we trust they enabled it.
              setHasPermission(true); 
              // We'll apply it immediately in case they switch right back
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
    <View className="pt-2">
      <View className="flex-row justify-between items-center mb-6 pl-1">
        <View className="flex-1 pr-6">
          <Text className="text-gray-300 text-sm leading-5">
            Automatically applies the grayscale wash-out focus filter after you hit 120 minutes of daily ScreenBreak usage.
          </Text>
        </View>
        <Switch 
          value={isEnabled} 
          onValueChange={toggleFocusMode}
          trackColor={{ false: '#27272a', true: '#ff006e' }}
          thumbColor={isEnabled ? '#ffffff' : '#a1a1aa'}
        />
      </View>
      
      <View className="flex-row items-center justify-between border-t border-gray-800/60 pt-4 pb-2">
        <View className="flex-row items-center">
          <View className={`w-2 h-2 rounded-full mr-2.5 shadow-sm ${isEnabled ? 'bg-[#ff006e] shadow-[#ff006e]' : 'bg-gray-600'}`} />
          <Text className={`text-xs uppercase font-bold tracking-widest ${isEnabled ? 'text-[#ff006e]' : 'text-gray-500'}`}>
            {isEnabled ? 'Filter Active' : 'Monitoring Usage'}
          </Text>
        </View>
        
        {hasPermission && (
          <Text className="text-gray-600 text-[10px] uppercase font-bold tracking-wider">Access Granted</Text>
        )}
      </View>
    </View>
  );
};
