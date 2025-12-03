import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { newAddBlog } from '../../ReduxToolkit/BlogRedux';
import { router } from 'expo-router';

const NewPostTab = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('')
  const dispatch = useDispatch()
  const categories = ['Travel', 'Lifestyle', 'Technology', 'Nature', 'Food', 'Travel', 'Lifestyle', 'Technology', 'Nature', 'Food'];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow access to your photos.');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !category.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('blogImage', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    formData.append('category', category);


    // Here you would typically send formData to your backend server
    let res = await dispatch(newAddBlog(formData)).unwrap()

    if (res.success) {
      Alert.alert(res.message);
      setTitle('');
      setContent('');
      setImage(null);
      setCategory('');
      router.push("/(tabs)");
    } else {
      Alert.alert('Error', 'Failed to create blog post');
    }



  };


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.heading}>Create New Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
      />



      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter Content"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 }}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}

        >
          <Picker.Item label='Select Category' value='' />
          {
            categories.map((cat, ind) => (
              <Picker.Item key={ind} label={cat} value={cat.toLowerCase()} />
            ))
          }
        </Picker>
      </View>


      <Pressable style={styles.uploadBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.uploadText}>Tap to upload image</Text>
        )}
      </Pressable>

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default NewPostTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
  },
  uploadBox: {
    height: 150,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadText: {
    color: '#555',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
