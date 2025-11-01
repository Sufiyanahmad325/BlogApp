import React from 'react'
import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Redirect, router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../ReduxToolkit/BlogRedux'

const UserProfileTab = () => {
  
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.blogSlice.userDetails)



  const handleLogOut = async () => {
    try {
      let res = await dispatch(logOut()).unwrap();
  
      if (res.success) {
        Alert.alert(res.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Logout failed");
    }
  };
  

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: userDetails ? userDetails.avatar : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userDetails ? userDetails.fullName : 'Emma Johnson'}</Text>
        <Text style={styles.email}>{userDetails ? userDetails.email : 'emma.johnson@example.com'}</Text>
        <Text style={styles.bio}>
          { userDetails ? userDetails.bio : 'Passionate blogger and traveler. I love writing about lifestyle, technology, and health.'}
        </Text>

        <Pressable style={styles.editBtn} onPress={() => router.push('screen/editProfile')}>
          <Text style={styles.editText}>Edit Profile</Text>
        </Pressable>
      </View>

      {/* Menu Section */}
      <View style={styles.menu}>
        <Pressable style={styles.menuItem} onPress={() => router.push('screen//myblogsScreen')}>
          <Text style={styles.menuText}>My Blogs</Text>
          <Ionicons name="chevron-forward" size={20} color="#444" />
        </Pressable>

        <Pressable style={styles.menuItem} onPress={() => router.push('/(tabs)/bookmarkTab')}>
          <Text style={styles.menuText}>Bookmarks</Text>
          <Ionicons name="chevron-forward" size={20} color="#444" />
        </Pressable>

        <Pressable style={styles.logout}>
          {
            userDetails ? (
              <Pressable onPress={()=>handleLogOut()}>
                <Text style={styles.logoutText}>Logout</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => router.push('screen/loginForm')}>
                <Text style={styles.logoutText}>LogIn</Text>
              </Pressable>
            )
          }
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default UserProfileTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  profileSection: {
    alignItems: 'center',
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },

  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },

  bio: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 16,
  },

  editBtn: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  editText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  menu: {
    marginTop: 40,
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  menuText: {
    fontSize: 16,
    color: '#222',
  },

  logout: {
    marginTop: 30,
    alignItems: 'center',
  },

  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
})
