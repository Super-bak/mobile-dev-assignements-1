import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/api';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout, refreshUser } = useAuth();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setSkills(user.skills || []);
    }
  }, [user]);

  const handleAddSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setNewSkill('');
    } else if (skills.includes(trimmedSkill)) {
      Alert.alert('Error', 'Skill already added');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSaveSkills = async () => {
    setLoading(true);
    try {
      await userAPI.updateSkills(skills);
      await refreshUser();
      Alert.alert('Success', 'Skills updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update skills');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const hasChanges = JSON.stringify(skills) !== JSON.stringify(user?.skills || []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Username</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{user?.username}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Your Skills</Text>
        <Text style={styles.subtitle}>Add skills to match with job listings</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a skill (e.g., React, Node.js)"
            value={newSkill}
            onChangeText={setNewSkill}
            onSubmitEditing={handleAddSkill}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddSkill}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.skillsContainer}>
          {skills.length === 0 ? (
            <Text style={styles.emptyText}>No skills added yet</Text>
          ) : (
            skills.map((skill, index) => (
              <View key={index} style={styles.skillChip}>
                <Text style={styles.skillChipText}>{skill}</Text>
                <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
                  <Text style={styles.removeButton}>×</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {hasChanges && (
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSaveSkills}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Save Skills</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skillChipText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 8,
  },
  removeButton: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
    fontStyle: 'italic',
  },
  saveButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#999',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
