import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import infatecFetch from "../Services/api";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Upload() {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão negada para acessar a biblioteca de mídia.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImage(result.uri);
      imageRef.current.src = result.uri;
    }
  };

  const createWarning = async (imageUri) => {
    const formData = new FormData();

    formData.append("imageName", "");
    formData.append("message", "ddadadadaaaaaa");
    formData.append("imgUri", "");
    formData.append("loginId", 1);

    const response = await fetch(imageUri);
    const blob = await response.blob();
    console.log(response)

    const imageFile = new File([blob], "image.jpg", { type: "image/jpeg" });
    formData.append("imageFile", imageFile);
 console.log(formData)
    try {
      const token = AsyncStorage.getItem("bearer");
      await infatecFetch.post("/api/Warnings/CreateNewWarning", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(formData);
      console.log(token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendImage = async () => {
    await createWarning(image);
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
          <Text style={styles.buttonText}>Escolher imagem</Text>
        </TouchableOpacity>
        <Image
          ref={imageRef}
          source={{
            uri: image || "https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png",
          }}
          style={styles.avatar}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSendImage}>
        <Text style={styles.buttonText}>Enviar imagem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 3,
    backgroundColor: "#7159c1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
