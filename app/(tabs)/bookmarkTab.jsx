import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Placeholder data for bookmarked posts (you would replace this with real state)
const bookmarkedPosts = [
  {
    id: 'b1',
    title: 'Yoga and Indoor Plants',
    image:
      'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=60',
    category: 'Lifestyle',
    readTime: '5 min',
  },
  {
    id: 'b2',
    title: 'Hiking in Patagonia',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60',
    category: 'Travel',
    readTime: '10 min',
  },
  {
    id: 'b3',
    title: 'Best Ways to Brew Coffee',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60',
    category: 'Food',
    readTime: '3 min',
  },
  {
    id: 'b4',
    title: 'Yoga and Indoor Plants',
    image:
      'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=60',
    category: 'Lifestyle',
    readTime: '5 min',
  },
  {
    id: 'b5',
    title: 'Hiking in Patagonia',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60',
    category: 'Travel',
    readTime: '10 min',
  },
  {
    id: 'b6',
    title: 'Best Ways to Brew Coffee',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60',
    category: 'Food',
    readTime: '3 min',
  },
  {
    id: 'b7',
    title: 'Best Ways to Brew Coffee',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60',
    category: 'Food',
    readTime: '3 min',
  },
  // Add more posts as needed...
];

const BookmarkItem = ({ item }) => {
  return (
    <Pressable style={styles.listItem}>
      <Image source={{ uri: item.image }} style={styles.listImage} />
      <View style={styles.listDetails}>
        <Text style={styles.listCategory}>{item.category}</Text>
        <Text style={styles.listTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.listInfo}>
          {item.readTime} Read
        </Text>
      </View>
      {/* Optional: Add a button to un-bookmark */}
      <Ionicons 
        name="bookmark" 
        size={24} 
        color="#000" 
        
      />
    </Pressable>
  );
};

export default function BookmarkTab() {
  if (bookmarkedPosts.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer} >
        <Ionicons name="bookmark-outline" size={80} color="#ccc" />
        <Text style={styles.emptyText}>You haven't saved any posts yet.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top','bottom']}>
      <Text style={styles.headerTitle}>My Bookmarks</Text>
      <View style={styles.separator}></View>
      <FlatList
        data={bookmarkedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookmarkItem item={item} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '800',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#E8E1E1',
    marginVertical: 10,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  listImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  listDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  listCategory: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007AFF', // Blue color for category
    marginBottom: 2,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  listInfo: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  bookmarkIcon: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
});