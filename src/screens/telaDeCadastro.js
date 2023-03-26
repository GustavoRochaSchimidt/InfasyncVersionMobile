import React, { useState } from "react";
import * as Font from 'expo-font';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

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

export default function TelaDeCadastro() {

    const [input, setInput] = useState('');
    const [hidePass, setHidePass] = useState(true);

    useEffect(() => {
        loadFont();
    }, []);

    async function loadFont() {
        await Font.loadAsync({
            'Ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
            'JuliusSansOne': require('../../assets/fonts/JuliusSansOne-Regular.ttf'),
        });
    }

    return (
       
        <KeyboardAvoidingView 
        behavior={Platform.OS == 'ios' ? 'padding' : 'height' }
        style={styles.fundoTela}>
            
            <View style={styles.fundoFormato}>
                <View>
                    <Text style={styles.textCadastro}> CADASTRO</Text>
                </View>
                <View style={styles.imagenLogo}>
                    <Image
                        source={require("C:/Users/gusta/Projeto_Infatec_mobile_OF/assets/logoInfatec.png")}
                        style={styles.image}
                    />
                </View>
                <View style={styles.caixaDeTexto}>
                    <View>
                        <TextInput style={[styles.name, { paddingLeft: 35 }]}
                            placeholder='Nome'
                            placeholderTextColor='#FFF'
                        />
                        <View style={styles.iconUser}>
                            <Icon name="user" size={22} color="#FFF" />
                        </View>
                    </View>

                    <View>
                        <TextInput style={[styles.ra, { paddingLeft: 35 }]}
                            placeholder='E-mail ou RA'
                            placeholderTextColor='#FFF'
                        />
                        <View style={styles.iconRA}>
                            <Icon name="mail" size={22} color="#FFF" />
                        </View>
                    </View>

                    <View>
                        <TextInput style={[styles.tel, { paddingLeft: 35 }]}
                            placeholder='Telefone'
                            placeholderTextColor='#FFF'

                        />
                        <View style={styles.iconTel}>
                            <Icon name="phone" size={22} color="#FFF" />
                        </View>
                    </View>

                    <View>
                        <TextInput style={[styles.senha, { paddingLeft: 35 }]}
                            placeholder='Senha'
                            placeholderTextColor='#FFF'
                            value={input}
                            onChangeText={(texto) => setInput(texto)}
                            secureTextEntry={hidePass}

                        />
                        <View style={styles.iconSenha}>
                            <Icon name="lock" size={22} color="#FFF" />
                        </View>

                        <TouchableOpacity style={styles.iconEye} onPress={() => setHidePass(!hidePass)}>
                            {hidePass ?
                                <Icon name="eye" size={22} color="#FFF" />
                                :
                                <Icon name="eyeo" size={22} color="#FFF" />
                            }

                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={[styles.button, styles.button1]} onPress={() => alert('aaaaaaaaaaaaa')}>
                    <Text style={styles.buttonText}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView >
        
    );
}

const styles = StyleSheet.create({
    fundoTela: {
        flex: 1,
        backgroundColor: "#FAEBD7",
    },

    fundoFormato: {
        top: '10%',
        //width: 415,
        height: '70%',
        borderRadius: 50,
        backgroundColor: "#162938",
        borderColor: "#FFFFFF",
        borderWidth: 2,

    },

    imagenLogo: {
        alignItems: "center",
        top: -15
    },

    textCadastro: {
        fontFamily: 'Ubuntu',
        color: "#fff",
        fontSize: 18,
        top: 120,
        left: 160,
    },

    caixaDeTexto: {
        backgroundColor: "#162938",
        top: '10%',
        width: '80%',
        left: '10%',
        height: '55%',
        borderRadius: 20,
        borderColor: "#162938",
        borderWidth: 2,
    },

    name: {
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
    },

    ra: {
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
    },

    tel: {
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
    },

    senha: {
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
    },
    button: {
        backgroundColor: "#162938",
        top: 80,
        width: 210,
        left: 100,
        borderRadius: 20,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        padding: 10
    },

    buttonText: {
        left: 50,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
    },

    iconUser: {
        top: '-55%',
        left: '2%',
    },

    iconRA: {
        top: '-55%',
        left: '2%',
    },

    iconTel: {
        top: '-55%',
        left: '2%',

    },

    iconSenha: {
        top: '-35%',
        left: '2%',
    },

    iconEye: {
        width: '15%',
        top: '-52%',
        left: '90%',
        height: 50,

    },
});



