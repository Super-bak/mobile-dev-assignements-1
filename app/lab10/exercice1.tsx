import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { Button, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Waterexercice() {
  const [minutes, setMinutes] = useState('30');
  const [message, setMessage] = useState('');

  useEffect(() => {
    registerForPushNotifications();

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      setMessage('Time to drink water! Stay hydrated!');
    });

    return () => subscription.remove();
  }, []);

  const registerForPushNotifications = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
  };  

  const scheduleNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    
    const trigger = {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: parseInt(minutes) * 60,
      repeats: true,
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Water Reminder',
        body: 'Time to drink water!',
        data: { screen: 'reminder' },
      },
      trigger,
    });

    setMessage(`Reminder set for every ${minutes} minutes`);
  };

  const cancelNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setMessage('Reminder cancelled');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water</Text>
      
      <Text style={styles.label}>Set reminder interval (minutes):</Text>
      <TextInput
        style={styles.input}
        value={minutes}
        onChangeText={setMinutes}
        keyboardType="numeric"
        placeholder="Enter minutes"
      />

      <View style={styles.buttonContainer}>
        <Button title="Start Reminder" onPress={scheduleNotification} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Cancel Reminder" onPress={cancelNotification} color="red" />
      </View>

      {message ? (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  messageContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1976d2',
  },
});
