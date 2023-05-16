import React, { useEffect, useState } from "react";
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    Image,
} from "react-native";

export default function telaDeAvisos() {

    useEffect(() => {
        loadFont();
    }, []);

    async function loadFont() {
        await Font.loadAsync({
            'Ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
            'JuliusSansOne': require('../../assets/fonts/JuliusSansOne-Regular.ttf'),
        });
    };

    const [image, setImage] = useState ("https://github.com/account")

const handleImagePicker = async () =>{
  const result = await ImagePicker.launchImageLibraryAsync
    (
        {
            aspect:[4,4],
            allowsEditing: true,
            base64: true,
            quality: 1,
        }
    );

    if(!result.canceled) {
        setImage(result.assets[0].uri);
    }
}
    

    return (
        <ScrollView contentContainerStyle={{}}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.containerFundoTela}>

                <View style={styles.imagenLogo}>
                    <Animatable.Image
                        animation="flipInY"
                        delay={300}
                        source={require("../../assets/imagens/logoInfatecInLine.png")}
                        style={styles.image}
                    />
                </View>
                <View styele={styles.containerFull}>
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
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textDescriçao}>Descrição do Aviso:</Text>

                        <View style={styles.containerInputWarn}>
                        <Image
                                 source={{uri: image}}
                                 style={{width:410, height:300, borderRadius: 20, backgroundColor:"#000", position:"absolute"}}
                                /> 
                            <TextInput
                                style={styles.inputWarn}
                                multiline={true}
                                numberOfLines={10}
                                placeholder="             Digite seu aviso aqui ou Anexe uma Imagen."
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={styles.textAnexar}>Anexar imagem:</Text>
                        <View style={styles.containerAnexar}>
                            <View>
                                <TouchableOpacity
                                    onPress={handleImagePicker}
                                    style={styles.buttonAnexar}>

                                    <Text style={styles.styleTextAdd}>Adcionar Arquivo</Text>
                                </TouchableOpacity>
                                <Text style={styles.textNehum}>Nenhum a... foi selecionado</Text>
                               
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={styles.textEnviaAviso2}>ENVIAR AVISO 2</Text>

                <View>
                    <View>
                        <Text style={styles.textDescriçao2}>Titulo do Aviso:</Text>
                    </View>
                    <View style={styles.containerTextTitulo2}>
                        <TextInput
                            style={styles.inputTitulo2}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.textDescriçao2}>Descrição do Aviso:</Text>
                    <View style={styles.containerInputWarn2}>
                        <TextInput
                            style={styles.inputWarn2}
                            multiline={true}
                            numberOfLines={10}
                            placeholder="             Digite seu aviso aqui ou Anexe uma Imagen."
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.textAnexar}>Anexar imagem:</Text>

                    <View style={styles.containerAnexar}>
                        <View>
                            <TouchableOpacity style={styles.buttonAnexar}>
                                <Text style={styles.styleTextAdd}>Adcionar Arquivo</Text>
                            </TouchableOpacity>
                            <Text style={styles.textNehum}>Nenhum a... foi selecionado</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.containerEnviar}>
                    <TouchableOpacity style={styles.buttonEnviar}>
                        <Text style={styles.textEnviar}>Enviar Avisos</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({

    containerFundoTela: {
        height: "100%",
        flex: 1,
        backgroundColor: "#FAEBD7",
    },

    imagenLogo: {
        left: 100,
        width: 200,
        height: 200,
    },

    image: {
        width: '100%',
        height: '100%',
        top: -60,
        resizeMode: "contain",
    },

    containerFull:{
        flex: 1,
        marginTop: '10%',
        borderRadius: 50,
        backgroundColor: "#162938",
        borderColor: "#FFFFFF",
        borderWidth: 2,
        height: '90%',
    },

    textEnviaAviso: {
        position: "relative",
        marginLeft: 85,
        top: -80,
        fontSize: 30,
        color: "#000",
        fontFamily: "Ubuntu",
        fontWeight: "bold",
    },

    containerTextTitulo: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#FFF",
        borderColor: "#000",
        borderWidth: 1,
        margin: 5,
        top: -65
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
        flex: 1,
        marginTop: '-15%',
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
        width: 410
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
        //flex: 1,
        //marginTop: '-15%',
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
        color: "#fff"
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
        left: 180
    },

    textEnviaAviso2: {
        position: "relative",
        marginLeft: 85,
        top: 15,
        fontSize: 30,
        color: "#000",
        fontFamily: "Ubuntu",
        fontWeight: "bold",
        margin: 25

    },

    containerTextTitulo2: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#FFF",
        borderColor: "#000",
        borderWidth: 1,
        margin: 5,
        //top: 15
    },

    inputTitulo2: {
        fontFamily: "Ubuntu",
        fontSize: 15,
        height: 50,
        width: 410,

    },

    textDescriçao2: {
        position: "relative",
        marginLeft: 10,

        fontSize: 20,
        color: "#000",
        fontFamily: "Ubuntu",
        fontWeight: "bold",
        marginTop: 10,
    },

    containerInputWarn2: {
        flex: 1,
        //marginTop: '10%',
        borderRadius: 10,
        backgroundColor: "#FFF",
        borderColor: "#000",
        borderWidth: 1,
        margin: 5,
    },

    inputWarn2: {
        fontFamily: "Ubuntu",
        fontSize: 15,
        height: 300,
        width: 410
    },

    containerEnviar: {

    },

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
        fontFamily: "Ubuntu"


    }
});