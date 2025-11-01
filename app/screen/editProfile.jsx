import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateProfileDetails } from "../../ReduxToolkit/BlogRedux";
import { router } from "expo-router";

export default function BioPage() {
    const { userDetails } = useSelector((state) => state.blogSlice);
    const dispatch = useDispatch();

    const [imageFile, setImageFile] = useState(userDetails?.avatar);
    const [name, setName] = useState(userDetails?.fullName || "");
    const [username, setUsername] = useState(userDetails?.username || "");
    const [email, setEmail] = useState(userDetails?.email || "");
    const [bio, setBio] = useState(
        userDetails?.bio || "Frontend Developer skilled in React.js, Tailwind CSS, and building user-friendly web apps."
    );

    useEffect(() => {
        if (userDetails) {
            setName(userDetails.fullName);
            setUsername(userDetails.username);
            setEmail(userDetails.email);
            setImageFile(userDetails.avatar);
            setBio(userDetails.bio);
        }
    }, [userDetails]);

    // ✅ Pick Image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImageFile(result.assets[0]);
        }
    };

    // ✅ Submit Form
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("fullName", name);
        formData.append("username", username);
        formData.append("bio", bio);

        if (imageFile?.uri) {
            formData.append("avatar", {
                uri: imageFile.uri,
                name: `profile_${Date.now()}.jpg`,
                type: "image/jpeg",
            });
        }
        let res = await dispatch(updateProfileDetails(formData)).unwrap();
        if(res.success){
            Alert.alert(res.message)
            router.push('/(tabs)/userProfileTab')
        }
    };

    return (
        <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.heading}>✏️ Update Profile</Text>

                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri: imageFile?.uri || imageFile || "https://i.ibb.co/2NfG6kK/avatar.png",
                            }}
                            style={styles.avatar}
                        />

                        <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                            <Text style={styles.imageButtonText}>Change Photo</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Full Name</Text>
                    <TextInput value={name} onChangeText={setName} style={styles.input} />

                    <Text style={styles.label}>Username</Text>
                    <TextInput value={username} onChangeText={setUsername} style={styles.input} />

                    <Text style={styles.label}>Email</Text>
                    <TextInput value={email} editable={false} style={[styles.input, styles.disabledInput]} />

                    <Text style={styles.label}>Bio</Text>
                    <TextInput
                        value={bio}
                        onChangeText={setBio}
                        style={[styles.input, styles.textArea]}
                        multiline
                        maxLength={150}
                    />

                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#edf2f7",
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        elevation: 4,
    },
    heading: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#2563EB",
    },
    imageButton: {
        marginTop: 10,
        backgroundColor: "#2563EB",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    imageButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
    disabledInput: {
        backgroundColor: "#e5e7eb",
    },
    textArea: {
        height: 90,
        textAlignVertical: "top",
    },
    submitButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 10,
    },
    submitButtonText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
