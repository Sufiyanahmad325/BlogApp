import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersData } from '../../ReduxToolkit/BlogRedux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const categories = ['All', 'Travel', 'Lifestyle', 'Technology', 'Nature', 'Food', 'Travel', 'Lifestyle', 'Technology', 'Nature', 'Food'];

const recentPosts = [
  {
    id: '1',
    title: 'Hiking in Patagonia',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60',
    desc: 'Patagonia adventure and views',
  },
  {
    id: '2',
    title: 'Morning Rituals: Coffee Love',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60',
    desc: 'Best ways to brew your coffee',
  },
  {
    id: '3',
    title: 'Yoga and Indoor Plants',
    image:
      'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=60',
    desc: 'Boost calmness with yoga & plants',
  },
  {
    id: '4',
    title: 'Hiking in Patagonia',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60',
    desc: 'Patagonia adventure and views',
  },
  {
    id: '5',
    title: 'Morning Rituals: Coffee Love',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60',
    desc: 'Best ways to brew your coffee',
  },
  {
    id: '6',
    title: 'Yoga and Indoor Plants',
    image:
      'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=60',
    desc: 'Boost calmness with yoga & plants',
  },
  {
    id: '7',
    title: 'Hiking in Patagonia',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60',
    desc: 'Patagonia adventure and views',
  },
  {
    id: '8',
    title: 'Morning Rituals: Coffee Love',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60',
    desc: 'Best ways to brew your coffee',
  },
  {
    id: '9',
    title: 'Yoga and Indoor Plants',
    image:
      'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=60',
    desc: 'Boost calmness with yoga & plants',
  },
  {
    id: '10',
    title: 'Yoga and Indoor Plants',
    image:
      'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=60',
    desc: 'Boost calmness with yoga & plants',
  },
  {
    id: '11',
    title: 'Yoga and Indoor Plants',
    image:
      'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=60',
    desc: 'Boost calmness with yoga & plants',
  },
];


const Cards = ({ item }) => {
  return (
    <Pressable
      onPress={() =>router.push({pathname: 'screen/blogDetailsScreen',params: { item: JSON.stringify(item) }})
      }>
    
      <View
        style={{ width: 170, height: 160, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' }}>

        <Image source={{ uri: item.blogImage || 'https://images.pexels.com/photos/34005820/pexels-photo-34005820.jpeg' }} style={{ width: '100%', height: 110, borderRadius: 8, marginBottom: 6 }} />
        <Text numberOfLines={2}
          style={{ paddingHorizontal: 2, fontSize: 15, fontWeight: '600', color: '#222', marginBottom: 2 }}>{item.title}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 13,
            color: '#555'
          }}>
          {item.content || item.desc}
        </Text>

      </View>
    </Pressable>

  );
};

export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState('All');
  const [token , setToken ] = useState()

  const dispatch = useDispatch()


  const { userDetails, allUsersBlogs } = useSelector((state) => state.blogSlice)


  // here is accessing cookies => accessToken
  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('accessToken');
      setToken(storedToken);
    };
    getToken();
  }, []);




  useEffect(() => {
       dispatch(fetchUsersData())
  }, [token])








  return (
    <SafeAreaView edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>BLOGIFY</Text>
        <View style={styles.headerRight}>
          <Ionicons name="notifications-outline" size={24} />
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/30253590/pexels-photo-30253590.jpeg',
            }}
            style={styles.featuredImage}
          />
        </View>
      </View>

      {/* Line */}
      <View style={styles.separator}></View>

      {/* category Buttons */}
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <View style={[styles.categoryBox]}>
              <Pressable onPress={() => setActiveCategory(item)}>
                <Text style={[styles.categoryText, activeCategory === item ? styles.activeBtn : '']}>{item}</Text>
              </Pressable>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      {/* Below categories */}

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>



        {/* image */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.mainImage}
            source={{
              uri: 'https://images.pexels.com/photos/32713102/pexels-photo-32713102.jpeg',
            }}
          />
          <View style={styles.imageTextContainer}>
            <Text style={styles.imageTitle}>Exploring the Dommities:</Text>
            <Text style={styles.imageTitle}>A Hiker Paradise</Text>
          </View>
        </View>



        {/* cards */}
        <View style={styles.cardConainer}>
          <Text style={styles.cardText}>Recent Blogs</Text>
          <FlatList
            scrollEnabled={false}
            data={allUsersBlogs.length > 0  ? allUsersBlogs : recentPosts}
            renderItem={({ item }) => <Cards item={item} />}
            keyExtractor={(item) => item.id || item._id}
            numColumns={2}
            contentContainerStyle={{ gap: 10 }}
            columnWrapperStyle={{ gap: 8 }}
          />
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '800',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  featuredImage: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  separator: {
    width: '100%',
    height: 10,
    backgroundColor: '#E8E1E1',
    marginBottom: 16,
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  categoryList: {
    gap: 5,
  },
  categoryBox: {

  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  activeBtn: {
    backgroundColor: 'black',
    color: "white"
  },
  imageContainer: {
    paddingHorizontal: 8,
    position: 'relative',
    marginTop: 10,
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  imageTextContainer: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    gap: 4,
  },
  imageTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  cardConainer: {
    marginVertical: 15, paddingHorizontal: 10
  },
  cardText: {
    fontSize: 25, fontWeight: 600,
    paddingVertical: 10
  },


});