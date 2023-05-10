import React, { useState, useEffect } from "react";
import * as Animatable from 'react-native-animatable';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";

import {
    Ionicons,
    AntDesign,
    FontAwesome5,
    FontAwesome,
    MaterialCommunityIcons,

} from '@expo/vector-icons';


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

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.containerFundoTela}>
            <ScrollView contentContainerStyle={{  }}>
                <View style={styles.imagenLogo}>
                    <Animatable.Image
                        animation="flipInY"
                        delay={300}
                        source={require("../../assets/imagens/logoInfatecInLine.png")}
                        style={styles.image}
                    />
                </View>

                <Text style={styles.textEnviaAviso}>ENVIAR AVISO</Text>
                <Text style={styles.textDescriçao}>Descrição do Aviso:</Text>

                <View style={styles.containerInputWarn}>
                    <TextInput
                        style={styles.inputWarn}
                        multiline={true}
                        numberOfLines={10}
                        placeholder="             Digite seu aviso aqui ou Anexe uma Imagen."
                    />
                </View>

                <Text style={styles.textAnexar}>Anexar imagem:</Text>
            </ScrollView>
        </KeyboardAvoidingView>

    )
};

const styles = StyleSheet.create({

    containerFundoTela: {
        flex: 1,
        backgroundColor: "#FAEBD7",
    },

    imagenLogo: {
        //margin: 10,
        left: 100,
        width: 200,
        height: 200,
    },

    image: {
        width: '100%',
        height: '100%',
        top: -60,
        resizeMode: "contain",
        // marginLeft: 10
    },

    textEnviaAviso: {
        position:"relative",
        marginLeft: 10,
        top: -80,
        fontSize: 30,
        color: "#000",
        fontFamily: "Ubuntu",
        fontWeight: "bold",
    },

    textDescriçao: {
        position:"relative",
        marginLeft: 10,
        top: -80,
        fontSize: 20,
        color: "#000",
        fontFamily: "Ubuntu",
        fontWeight: "bold",
        marginTop: 10,
    },

    containerInputWarn: {
        flex: 1,
        marginTop: '-15%',
        borderRadius: 20,
        backgroundColor: "#FFF",
        borderColor: "#FFFFFF",
        borderWidth: 2,
    },

    inputWarn:{
        fontFamily: "Ubuntu",
        fontSize: 15,
        height: 300,
        width: 410
    },

    textAnexar:{
        position:"relative",
        marginLeft: 10,
        fontSize: 20,
        color: "#000",
        fontFamily: "Ubuntu",
        fontWeight: "bold",
        marginTop: 10,
    },
    

});