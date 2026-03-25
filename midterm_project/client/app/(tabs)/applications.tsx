import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { applicationsAPI, Application, handleApiError } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

export default function ApplicationsScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user?.role === 'jobseeker') {
      loadApplications();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadApplications = async () => {
    try {
      const data = await applicationsAPI.getMyApplications();
      setApplications(data);
    } catch (error) {
      console.error('Failed to load applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadApplications();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return '#34C759';
      case 'rejected': return '#FF3B30';
      default: return '#FF9500';
    }
  };

  const renderApplication = ({ item }: { item: Application }) => (
    <TouchableOpacity
      style={styles.applicationCard}
      onPress={() => item.status === 'accepted' && router.push(`/chat/${item._id}`)}
      disabled={item.status !== 'accepted'}
    >
      <View style={styles.applicationHeader}>
        <Text style={styles.jobTitle}>{item.jobId?.title || 'Job'}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.company}>{item.jobId?.company || ''}</Text>
      <Text style={styles.date}>Applied: {new Date(item.createdAt).toLocaleDateString()}</Text>
      {item.status === 'accepted' && (
        <Text style={styles.chatHint}>Tap to chat with employer</Text>
      )}
    </TouchableOpacity>
  );

  if (user?.role !== 'jobseeker') {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Only job seekers can view applications</Text>
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>My Applications</Text>
        <Text style={styles.headerSubtitle}>{applications.length} applications</Text>
      </View>
      <FlatList
        data={applications}
        renderItem={renderApplication}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No applications yet</Text>
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
  applicationCard: {
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
  applicationHeader: {
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
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginLeft: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  company: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  chatHint: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600',
    marginTop: 10,
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
