import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { jobsAPI, handleApiError } from '../../services/api';
import { useRouter } from 'expo-router';

export default function CreateJobScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !requiredSkills.includes(trimmed)) {
      setRequiredSkills([...requiredSkills, trimmed]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setRequiredSkills(requiredSkills.filter(s => s !== skill));
  };

  const handleCreateJob = async () => {
    if (!title || !company || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (requiredSkills.length === 0) {
      Alert.alert('Error', 'Add at least one required skill');
      return;
    }

    setLoading(true);
    try {
      await jobsAPI.create({ title, company, description, requiredSkills });
      Alert.alert('Success', 'Job created successfully', [
        { text: 'OK', onPress: () => router.back() }
      ]);
      setTitle('');
      setCompany('');
      setDescription('');
      setRequiredSkills([]);
    } catch (error) {
      Alert.alert('Error', handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'employer') {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Only employers can create jobs</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Job</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Job Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Frontend Developer"
          value={title}
          onChangeText={setTitle}
          editable={!loading}
        />

        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Acme Corp"
          value={company}
          onChangeText={setCompany}
          editable={!loading}
        />

        <Text style={styles.label}>Job Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the role, responsibilities..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          editable={!loading}
        />

        <Text style={styles.label}>Required Skills</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.skillInput]}
            placeholder="Add a skill"
            value={newSkill}
            onChangeText={setNewSkill}
            onSubmitEditing={handleAddSkill}
            editable={!loading}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddSkill} disabled={loading}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.skillsContainer}>
          {requiredSkills.map((skill, index) => (
            <View key={index} style={styles.skillChip}>
              <Text style={styles.skillChipText}>{skill}</Text>
              <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
                <Text style={styles.removeButton}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.createButton, loading && styles.buttonDisabled]}
          onPress={handleCreateJob}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.createButtonText}>Create Job</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  skillInput: {
    flex: 1,
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
    marginTop: 15,
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
  createButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#999',
  },
});
