import AsyncStorage from '@react-native-async-storage/async-storage';

import * as BackgroundTask from 'expo-background-task';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import { useEffect, useState } from 'react';
import { Switch, Text, TextInput, View } from 'react-native';

const TASK_NAME = 'hydration-task';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

TaskManager.defineTask(TASK_NAME, async () => {
  const hours = await AsyncStorage.getItem('hours');
  if (!hours) return;

  const { start, end } = JSON.parse(hours);
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;

  if (current >= startMin && current <= endMin) {
    await Notifications.scheduleNotificationAsync({
      content: { title: 'Hydration ', body: 'Please go drink' },
      trigger: null,
    });
  }
});

export default function Lab_test_3() {
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('17:00');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    loadSettings();
    requestPermissions();
  }, []);

  const loadSettings = async () => {
    const saved = await AsyncStorage.getItem('hours');
    const savedEnabled = await AsyncStorage.getItem('enabled');
    if (saved) {
      const { start, end } = JSON.parse(saved);
      setStart(start);
      setEnd(end);
    }
    if (savedEnabled) setEnabled(JSON.parse(savedEnabled));
  };

  const requestPermissions = async () => {
    await Notifications.requestPermissionsAsync();
  };

  const activate_or_deactivate = async () => {
    const newEnabled = !enabled;
    await AsyncStorage.setItem('hours', JSON.stringify({ start, end }));
    await AsyncStorage.setItem('enabled', JSON.stringify(newEnabled));

    if (newEnabled) {
      await BackgroundTask.registerTaskAsync(TASK_NAME, {
        minimumInterval: 180,
      });
    } else {
      await BackgroundTask.unregisterTaskAsync(TASK_NAME);
    }
    setEnabled(newEnabled);
  };


  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Go dring water</Text>

      <Text>Start Time (HH:MM):</Text>
      <TextInput
        value={start}
        onChangeText={setStart}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>End Time (HH:MM):</Text>
      <TextInput
        value={end}
        onChangeText={setEnd}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Enable?: </Text>
        <Switch value={enabled} onValueChange={activate_or_deactivate} />
      </View>

      <Text style={{ marginTop: 20, color: '#666' }}>
        {enabled ? `Active: ${start} - ${end}` : 'Disabled'}
      </Text>
    </View>
  );
}
