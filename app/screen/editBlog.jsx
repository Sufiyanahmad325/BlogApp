import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { editBlog, updateProfileDetails } from "../../ReduxToolkit/BlogRedux";
import { Picker } from "@react-native-picker/picker";

export default function EditBlog() {
    const { item } = useLocalSearchParams();
const [itemParsed, setItemParsed] = useState({})
    const dispatch = useDispatch();
    const { allUsersBlogs } = useSelector((state) => state.blogSlice);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const categories = [ 'Travel', 'Lifestyle', 'Technology', 'Nature', 'Food', 'Travel', 'Lifestyle', 'Technology', 'Nature', 'Food'];


    // ✅ Load Data
    useEffect(() => {
        const blogData = allUsersBlogs.find(blog => blog._id === JSON.parse(item)._id);
        if (blogData) {
            setItemParsed(blogData);
            setTitle(blogData.title);
            setContent(blogData.content);
            setCategory(blogData.category);
            setImage(blogData.blogImage);
        }
    }, [item, allUsersBlogs]);
    

    // ✅ Save Edited Blog
    const handleSave = async () => {
        let formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);
        formData.append("blogId", itemParsed._id);

        if (image && image !== itemParsed.blogImage) {
            formData.append("blogImage", {
                uri: image,
                name: "blog.jpg",
                type: "image/jpg",
            });
        }

        let res = await dispatch(editBlog(formData)).unwrap();
        if (res.success) {
            Alert.alert("✅ Blog updated successfully");
            router.push('screen/myblogsScreen');
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
        });

        if (!result.canceled) setImage(result.assets[0].uri);
    };

    return (
        <SafeAreaView edges={['top', 'bottom']} style={{ flex:1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <Text style={styles.heading}>Edit Blog</Text>

                {/* Title */}
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} />

                {/* Content */}
                <Text style={styles.label}>Content</Text>
                <TextInput
                    style={[styles.input, { height: 120 }]}
                    multiline
                    value={content}
                    onChangeText={setContent}
                />

                {/* Category Picker */}
                <Text style={styles.label}>Category</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={category}
                        onValueChange={(value) => setCategory(value)}
                    >
                        {categories.map((cat, i) => (
                            <Picker.Item key={i} label={cat} value={cat} />
                        ))}
                    </Picker>
                </View>

                {/* Image */}
                <Text style={styles.label}>Change Image</Text>
                {image && <Image source={{ uri: image }} style={styles.previewImg} />}

                <TouchableOpacity onPress={pickImage} style={styles.selectBtn}>
                    <Text style={{ color: "white" }}>Select Image</Text>
                </TouchableOpacity>

                {/* Buttons */}
                <View style={styles.btnRow}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                        <Text style={{ color: "#444" }}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                        <Text style={{ color: "white" }}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },
    previewImg: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginTop: 10,
    },
    selectBtn: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    btnRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    cancelBtn: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        width: "45%",
        alignItems: "center",
    },
    saveBtn: {
        backgroundColor: "#28a745",
        padding: 12,
        borderRadius: 8,
        width: "45%",
        alignItems: "center",
    },  
});
