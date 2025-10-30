import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../../ReduxToolkit/BlogRedux";

const blogDetailsScreen = () => {
  const [bookmarked, setBookmarked] = useState(false);
  const [islikeBlog, setIslikeBlog] = useState()
  const { item } = useLocalSearchParams()
  const itemParse = JSON.parse(item);


  const { userDetails, allUsersBlogs } = useSelector((state) => state.blogSlice)

  const dispatch = useDispatch()


  const handleLikesBlog = () => {
    dispatch(likeBlog(itemParse._id))
  }


  useEffect(() => {
    if (allUsersBlogs && itemParse) {
      const Liked = allUsersBlogs.find(blog => blog._id === itemParse._id)?.likes.includes(userDetails._id)
      console.log('hello sir =>>>>>>>>>>>>>> ' , islikeBlog)
      setIslikeBlog(Liked)
    }
  }, [userDetails, itemParse, allUsersBlogs])

  const blog = {
    title: "Exploring the Beauty of Nature 🌿",
    content:
      "Nature has always been a source of inspiration and peace. From lush green forests to majestic mountains, the world around us offers endless beauty and serenity. In this blog, we’ll explore why spending time in nature is essential for mental well-being.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    date: "2025-10-14",
    author: "Sufiyan Ahmad",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{ padding: 15, borderBottomWidth: 1, borderColor: "#eee" }}>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#222" }}>Blog Details</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Blog Image */}
        <Image
          source={{ uri: itemParse ? itemParse.blogImage : blog.image }}
          style={{ width: "100%", height: 220, resizeMode: "cover" }}
        />

        {/* Writer Info */}
        <View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
          <Image
            source={{ uri: itemParse?.writerAvatar ? itemParse.writerAvatar : blog.avatar }}
            style={{ width: 45, height: 45, borderRadius: 25, marginRight: 10 }}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>{blog.author}</Text>
            <Text style={{ fontSize: 13, color: "#777" }}>
              {new Date(itemParse?.createdAt || blog.date).toDateString()}
            </Text>
          </View>
        </View>

        {/* Blog Content */}
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#111", marginBottom: 10 }}>
            {itemParse?.title || blog.title}
          </Text>
          <Text style={{ fontSize: 15, color: "#444", lineHeight: 22 }}>
            {itemParse?.content || blog.content}
          </Text>
        </View>

        {/* Buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 25,
            paddingBottom: 30,
          }}
        >
          <Pressable
            onPress={() => handleLikesBlog()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: islikeBlog ? "#ffe6e6" : "#f5f5f5",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
            }}
          >
            <Ionicons
              name={islikeBlog ? "heart" : "heart-outline"}
              size={22}
              color={islikeBlog ? "red" : "#555"}
              style={{ marginRight: 6 }}
            />
            <Text style={{ fontSize: 15, color: islikeBlog ? "red" : "#333", fontWeight: "500" }}>
              {islikeBlog ? "Liked" : "Like"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setBookmarked(!bookmarked)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: islikeBlog ? "#e6f0ff" : "#f5f5f5",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
            }}
          >
            <Feather
              name={bookmarked ? "bookmark" : "bookmark"}
              size={22}
              color={bookmarked ? "#007bff" : "#555"}
              style={{ marginRight: 6 }}
            />
            <Text
              style={{
                fontSize: 15,
                color: bookmarked ? "#007bff" : "#333",
                fontWeight: "500",
              }}
            >
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default blogDetailsScreen;

const styles = StyleSheet.create({});
