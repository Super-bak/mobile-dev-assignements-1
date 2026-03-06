import * as Notifications from 'expo-notifications';
import { Pedometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Button, Dimensions, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Counter() {
  const [goal, setGoal] = useState('10');
  const [steps, setSteps] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [showDetails, setShowDetails] = useState(false);
  const [goalReached, setGoalReached] = useState(false);

  useEffect(() => {
    checkPedometer();
    registerForPushNotifications();

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      setShowDetails(true);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const checkPedometer = async () => {
    const available = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(available));
  };

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

  const Tracking = () => {
    const end = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const subscription = Pedometer.watchStepCount(result => {
      setSteps(result.steps);
      
      if (result.steps >= parseInt(goal) && !goalReached) {
        setGoalReached(true);
        sendNotification();
      }
    });

    Pedometer.getStepCountAsync(start, end).then(
      result => {
        setSteps(result.steps);
        if (result.steps >= parseInt(goal) && !goalReached) {
          setGoalReached(true);
          sendNotification();
        }
      },
      error => {
        setSteps(0);
      }
    );

    return () => subscription && subscription.remove();
  };

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Goal Reached!',
        body: 'Congratulations! You reached your daily step goal!',
        data: { screen: 'details' },
      },
      trigger: null,
    });
  };

  const resetGoal = () => {
    setGoalReached(false);
    setSteps(0);
    setShowDetails(false);
  };

  const percentage = Math.min((steps / parseInt(goal)) * 100, 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step Counter</Text>
      <TextInput
        style={styles.input}
        value={goal}
        onChangeText={setGoal}
        keyboardType="numeric"
        placeholder="Enter step goal"
      />

      <View>
        <TouchableOpacity onPress={Tracking} style={styles.buttonContainer}>start</TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Reset" onPress={resetGoal} color="orange" />
      </View>
      {showDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Stats Details</Text>
          <Text style={styles.detailsText}>Total Steps: {steps}</Text>
          <Text style={styles.detailsText}>Goal: {goal}</Text>
          <Text style={styles.detailsText}>Remaining: {Math.max(0, parseInt(goal) - steps)}</Text>
          <Text style={styles.detailsText}>Progress: {percentage.toFixed(1)}%</Text>
          <Text style={styles.detailsText}>
            Status: {goalReached ? 'Completed' : 'In Progress'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
    color: '#666',
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
    height: 50,
    margin:100,
    backgroundColor: "#000000ff",
    color:"#ffffffff",
  },
  statsContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  stepsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  goalText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  percentageText: {
    fontSize: 18,
    color: '#1976d2',
    fontWeight: 'bold',
  },
  successBanner: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  successText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1976d2',
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
});
