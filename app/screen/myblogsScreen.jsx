import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const MyBlogsScreen = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "My First Blog",
      content: "This is my first blog post about React Native UI design.",
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800",
      date: "2025-10-10",
      likes: 12,
    },
    {
      id: 2,
      title: "React Native Tips",
      content: "Some useful tips and tricks for React Native beginners.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      date: "2025-10-12",
      likes: 25,
    },
  ]);

  const handleEdit = (id) => {
    Alert.alert("Edit Blog", `You clicked Edit on blog ID: ${id}`);
  };

  const handleDelete = (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this blog?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setBlogs(blogs.filter((b) => b.id !== id)),
      },
    ]);
  };

  const handleLike = (id) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    );
  };

  const card = ({ item }) => (
    <View style={styles.blogCard}>
      <Image source={{ uri: item.image }} style={styles.blogImage} />
      <View style={styles.blogInfo}>
        <Text style={styles.blogTitle}>{item.title}</Text>
        <Text style={styles.blogDate}>
          Posted on: {new Date(item.date).toDateString()}
        </Text>
        <Text style={styles.blogContent}>{item.content}</Text>

        {/* Likes section */}
        <View style={styles.statsRow}>
          <Ionicons name="heart" size={16} color="#e63946" />
          <Text style={styles.likeCountText}>
            {item.likes} {item.likes === 1 ? "Like" : "Likes"}
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <Pressable style={styles.likeBtn} onPress={() => handleLike(item.id)}>
            <Ionicons name="thumbs-up-outline" size={18} color="#fff" />
            <Text style={styles.likeBtnText}>Like</Text>
          </Pressable>

          <View style={styles.rightBtns}>
            <Pressable
              style={styles.editBtn}
              onPress={() => handleEdit(item.id)}
            >
              <Ionicons name="create-outline" size={16} color="#fff" />
              <Text style={styles.btnText}>Edit</Text>
            </Pressable>

            <Pressable
              style={styles.deleteBtn}
              onPress={() => handleDelete(item.id)}
            >
              <Ionicons name="trash-outline" size={16} color="#fff" />
              <Text style={styles.btnText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <Text style={styles.heading}>My Blogs</Text>

      <FlatList
        data={blogs}
        renderItem={card}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MyBlogsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111",
  },
  blogCard: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  blogImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  blogInfo: {
    padding: 12,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  blogDate: {
    fontSize: 13,
    color: "#888",
    marginBottom: 10,
  },
  blogContent: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  likeCountText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#e63946",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a9d8f",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  likeBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  rightBtns: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // space between edit & delete buttons
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d62828",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
});
