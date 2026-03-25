import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '../../context/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="briefcase.fill" color={color} />,
        }}
      />
      {user?.role === 'employer' && (
        <Tabs.Screen
          name="create-job"
          options={{
            title: 'Create Job',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
          }}
        />
      )}
      {user?.role === 'jobseeker' && (
        <Tabs.Screen
          name="applications"
          options={{
            title: 'Applications',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.text.fill" color={color} />,
          }}
        />
      )}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
