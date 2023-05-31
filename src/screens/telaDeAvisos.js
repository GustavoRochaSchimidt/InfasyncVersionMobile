//Os imports  são usados para importar módulos, componentes, estilos e outras dependências necessárias para o funcionamento do aplicativo.
import React, { useEffect, useState, useRef } from "react";
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import infatecFetch from '../Services/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";

export default function telaDeAvisos() {
  
  //Essas conts de useState guardão o estado de cada componete para serem utilizados.
  const [valueTitulo, setValueTitulo] = useState("");
  const [valueDescriçao, setvalueDescriçao] = useState("");
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  //Função que carrega a fonte das letras no fron-end
  useEffect(() => {
    loadFont();
  }, []);

  async function loadFont() {
    await Font.loadAsync({
      Ubuntu: require("../../assets/fonts/Ubuntu-Regular.ttf"),
      JuliusSansOne: require("../../assets/fonts/JuliusSansOne-Regular.ttf"),
    });
  }

  const handleInputTitulo = (inputValueTitulo) => {
    setValueTitulo(inputValueTitulo);
  };

  const handleInputDescriçao = (inputValuedescriçao) => {
    setvalueDescriçao(inputValuedescriçao);
  };

  //Const que pede a permisao do usuario para o acesso da galeria
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão negada para acessar a biblioteca de mídia.");
      return;
    }
    //A galeria é aberta e a imagem e setada no setImage
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImage(result.uri);
      imageRef.current.src = result.uri;
    }
  };

  //Nesta const e pego todos os dados que a API necessita e enviado no formato que ela pede.
  const createWarning = async (imageUri) => {
    const formData = new FormData();
    formData.append("imageName", valueTitulo);
    formData.append("message", valueDescriçao);
    formData.append("imgUri", "");
    formData.append("loginId", 1);

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const imageFile = new File([blob], "image.jpg", { type: "image/jpeg" });
    formData.append("imageFile", imageFile);

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
    <ScrollView contentContainerStyle={{}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.containerFundoTela}
      >
        <View style={styles.imagenLogo}>
          <Animatable.Image
            animation="flipInY"
            delay={300}
            source={require("../../assets/imagens/LogoINFASYNCInLineBlack.png")}
            style={styles.image}
          />
        </View>
        <View>
          <View>
            <Text style={styles.textEnviaAviso}>ENVIAR AVISO</Text>
          </View>
          <View>
            <View>
              <Text style={styles.textDescriçao}>Titulo do Aviso:</Text>
            </View>
            <View style={styles.containerTextTitulo}>
              <TextInput
                style={styles.inputTitulo}
                value={valueTitulo}
                onChangeText={handleInputTitulo}
              />
            </View>
          </View>
          <View>
            <Text style={styles.textDescriçao}>Descrição do Aviso:</Text>
            <View style={styles.containerInputWarn}>
              <TextInput
                style={styles.inputWarn}
                value={valueDescriçao}
                onChangeText={handleInputDescriçao}
                multiline={true}
                numberOfLines={10}
                placeholder="             Digite seu aviso aqui ou Anexe uma Imagem."
              />
            </View>
          </View>
          <View>
            <Image
              ref={imageRef}
              source={{
                uri:
                  image ||
                  "https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png",
              }}
              style={{
                // width: 410,
                // height: 300,
                // borderRadius: 20,
                // backgroundColor: "#000",
                // position: "absolute"
              }}
            />
            <Text style={styles.textAnexar}>Anexar imagem:</Text>
            <View style={styles.containerAnexar}>
              <View>
                <TouchableOpacity
                  style={styles.buttonAnexar}
                  onPress={handleImagePicker}
                >
                  <Text style={styles.styleTextAdd}>Adicionar Arquivo</Text>
                </TouchableOpacity>
                <Text style={styles.textNehum}>
                  {image ? "Arquivo selecionado" : "Nenhum arquivo selecionado"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.containerEnviar}>
          <TouchableOpacity
            style={styles.buttonEnviar}
            onPress={handleSendImage}
          >
            <Text style={styles.textEnviar}>Enviar Aviso</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerFundoTela: {
    flex: 1,
    backgroundColor: "#FAEBD7",
  },
  imagenLogo: {
    left: 100,
    width: 230,
    height: 230,
  },
  image: {
    width: "100%",
    height: "100%",
    top: -60,
    resizeMode: "contain",
  },
  containerFull: {
    flex: 1,
    marginTop: "10%",
    borderRadius: 50,
    backgroundColor: "#162938",
    borderColor: "#FFFFFF",
    borderWidth: 2,
    height: "90%",
  },
  textEnviaAviso: {
    position: "relative",
    left: 100,
    top: -80,
    fontSize: 30,
    color: "#000",
    fontFamily: "Ubuntu",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTextTitulo: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 1,
    margin: 5,
    top: -65,
  },
  inputTitulo: {
    fontFamily: "Ubuntu",
    fontSize: 15,
    height: 50,
    width: 410,
  },
  textDescriçao: {
    position: "relative",
    marginLeft: 10,
    top: -60,
    fontSize: 20,
    color: "#000",
    fontFamily: "Ubuntu",
    fontWeight: "bold",
    marginTop: 10,
  },
  containerInputWarn: {
    marginTop: "-15%",
    borderRadius: 10,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 1,
    margin: 5,
  },
  inputWarn: {
    fontFamily: "Ubuntu",
    fontSize: 15,
    height: 300,
    width: 410,
  },
  textAnexar: {
    position: "relative",
    marginLeft: 10,
    fontSize: 20,
    color: "#000",
    fontFamily: "Ubuntu",
    fontWeight: "bold",
    marginTop: 10,
  },
  containerAnexar: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 1,
    height: 40,
    margin: 5,
  },
  styleTextAdd: {
    fontFamily: "Ubuntu",
    marginLeft: 20,
    position: "absolute",
    color: "#fff",
  },
  buttonAnexar: {
    borderBottomColor: "#000",
    width: 150,
    height: 25,
    borderWidth: 1,
    borderRadius: 10,
    left: 20,
    top: 7,
    backgroundColor: "#162938",
  },
  textNehum: {
    fontFamily: "Ubuntu",
    fontSize: 15,
    position: "absolute",
    top: 10,
    left: 180,
  },
  containerEnviar: {},
  buttonEnviar: {
    borderBottomColor: "#000",
    width: 170,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    left: 115,
    top: -5,
    backgroundColor: "#162938",
    margin: 10,
  },
  textEnviar: {
    position: "absolute",
    left: 40,
    top: 10,
    color: "#fff",
    fontFamily: "Ubuntu",
  },
});


