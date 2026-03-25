import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { jobsAPI, Job, applicationsAPI, handleApiError } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function JobsScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadJobs();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadJobs = async () => {
    try {
      const data = await jobsAPI.getAll();
      setJobs(data);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadJobs();
    setRefreshing(false);
  };

  const handleApply = async (jobId: string) => {
    try {
      await applicationsAPI.apply(jobId);
      Alert.alert('Success', 'Application submitted successfully');
      loadJobs();
    } catch (error) {
      Alert.alert('Error', handleApiError(error));
    }
  };

  const renderJob = ({ item }: { item: Job }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        {item.matchPercentage !== undefined && (
          <View style={[
            styles.matchBadge,
            { backgroundColor: item.matchPercentage >= 50 ? '#34C759' : '#FF9500' }
          ]}>
            <Text style={styles.matchText}>{item.matchPercentage}% Match</Text>
          </View>
        )}
      </View>
      <Text style={styles.company}>{item.company}</Text>
      <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
      
      <View style={styles.skillsContainer}>
        {item.requiredSkills.map((skill, index) => (
          <View 
            key={index} 
            style={[
              styles.skillTag,
              item.matchingSkills?.includes(skill) && styles.skillTagMatched
            ]}
          >
            <Text style={[
              styles.skillText,
              item.matchingSkills?.includes(skill) && styles.skillTextMatched
            ]}>
              {skill}
            </Text>
          </View>
        ))}
      </View>

      {user?.role === 'jobseeker' && (
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => handleApply(item._id)}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Job Listings</Text>
        <Text style={styles.headerSubtitle}>{jobs.length} jobs available</Text>
      </View>
      <FlatList
        data={jobs}
        renderItem={renderJob}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No jobs available</Text>
          </View>
        }
      />
    </View>
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
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  listContent: {
    padding: 15,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  matchBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginLeft: 10,
  },
  matchText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  company: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillTagMatched: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    
  },
  applyButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  skillText: {
    fontSize: 12,
    color: '#666',
  },
  skillTextMatched: {
    color: '#34C759',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
