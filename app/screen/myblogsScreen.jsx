import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, FlatList, Image, Alert, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../../ReduxToolkit/BlogRedux";



const MyBlogsScreen = () => {

  const [myblog, setMyblog] = useState([])

  const { userDetails, allUsersBlogs } = useSelector((state) => state.blogSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    let myblog = allUsersBlogs.filter(blog => blog.author === userDetails._id)
    setMyblog(myblog)
  }, [allUsersBlogs, userDetails])



  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "My First Blog",
      content: "This is my first blog post about React Native UI design.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800",
      date: "2025-10-10",
      likes: 12,
      isLiked: false,
    },
    {
      id: 2,
      title: "React Native Tips",
      content: "Some useful tips and tricks for React Native beginners.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      date: "2025-10-12",
      likes: 25,
      isLiked: true,
    },
  ]);

  const handleLike = (id) => {

  };

  const handleEdit = (item) => {
    router.push({
      pathname: "screen/editBlog",
      params: {item: JSON.stringify(item) },
    });
  };

  const handleDelete = (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this blog?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => dispatch(deleteBlog(id)) },
    ]);
  };

  const handleRead = (item) => {
    router.push({
      pathname: "screen/blogDetailsScreen",
      params: { item: JSON.stringify(item) },
    });
  };


  const card = ({ item }) => (
    <View style={styles.blogCard}>
      <Image source={{ uri: item?.blogImage ? item.blogImage : 'https://images.pexels.com/photos/33771131/pexels-photo-33771131.jpeg' || item.image }} style={styles.blogImage} />
      <View style={styles.blogInfo}>
        <Text style={styles.blogTitle}>{item.title}</Text>
        <Text style={styles.blogDate}>
          Posted on: {new Date(item.createdAt).toDateString()}
        </Text>
        <Text style={styles.blogContent}>{item.content.length > 150 ? item.content.slice(0, 100) : item.content}</Text>

        <View style={styles.statsRow}>
          <Ionicons
            name={item.isLiked ? "heart" : "heart-outline"}
            size={20}
            color={item.isLiked ? "red" : "#444"}
            onPress={() => handleLike(item.id)}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.likeCountText}>
            {item?.likes?.length || item.likes} {item.likes >= 1 ? "Like" : "Likes"}
          </Text>
        </View>

        <View style={styles.btnRow}>
          <Pressable
            onPress={() => handleRead(item)} style={styles.readBtn}>
            <Text style={[styles.readBtnText, { fontSize: 17, paddingHorizontal: 4 }]}>Read</Text>
          </Pressable>

          <View style={styles.rightBtns}>
            <Pressable style={styles.editBtn} onPress={() => handleEdit(item)}>
              <Ionicons name="create-outline" size={16} color="#fff" />
              <Text style={styles.btnText}>Edit</Text>
            </Pressable>

            <Pressable style={styles.deleteBtn} onPress={() => handleDelete(item._id)}>
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
        data={myblog || blogs}
        renderItem={card}
        keyExtractor={(item) => item._id.toString()}
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
    backgroundColor: "#fff",
    marginBottom: 20,
    overflow: "hidden",
    elevation: 4,
  },
  blogImage: {
    width: "100%",
    height: 120,
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
    marginBottom: 8,
  },
  blogContent: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  likeCountText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readBtn: {
    backgroundColor: "#2a9d8f",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  readBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  rightBtns: {
    flexDirection: "row",
    gap: 8,
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
    marginLeft: 5,
    fontWeight: "600",
  },
});
