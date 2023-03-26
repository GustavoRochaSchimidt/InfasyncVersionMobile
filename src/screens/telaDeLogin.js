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
} from 'react-native';


export default function telaDeLogin() {
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

        <View style={styles.fundoTela}>
            <View style={styles.fundoFormato}>
                <View>
                    <Text style={styles.textEntrar}> ENTRAR</Text>
                </View>
                <View style={styles.imagenLogo}>
                    <Image
                        source={require("C:/Users/gusta/Projeto_Infatec_mobile_OF/assets/logoInfatec.png")}
                        style={styles.image}
                    />
                </View>
                <View style={styles.caixaDeTexto}>
                    <View>
                        <TextInput
                            style={[styles.ra,
                            { paddingLeft: 30 }]}
                            placeholder='E-mail ou RA'
                            placeholderTextColor='#FFF'
                        />
                        <View style={styles.iconUser}>
                            <Icon name="user" size={22} color="#FFF" />
                        </View>
                    </View>
                    <View>
                        <TextInput
                            style={[styles.senha,{ paddingLeft: 30 }]}
                            placeholder='Insira sua senha'
                            placeholderTextColor='#FFF'
                            value={input}
                            onChangeText={(texto) => setInput(texto)}
                            secureTextEntry={hidePass}
                        />
                        <View style={styles.iconLock}>
                            <Icon name="lock1" size={22} color="#FFF" />
                        </View>

                        <TouchableOpacity style={styles.iconEye} onPress={() => setHidePass(!hidePass)}>
                            {hidePass ?
                                <Icon name="eye" size={22} color="#FFF" />
                                :
                                <Icon name="eyeo" size={22} color="#FFF" />
                            }

                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity style={[styles.button, styles.button1]} onPress={() => alert('Entrar')}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.trocar, styles.button2]} onPress={() => alert('Tela de recuperação de senha')}>
                    <Text style={styles.buttonText2}>Esqueceu a senha?</Text>
                </TouchableOpacity>
            </View>
        </View>

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
    },

    textEntrar: {
        fontFamily: 'Ubuntu',
        color: "#fff",
        fontSize: 18,
        top: '650%',
        left: '40%',
    },

    caixaDeTexto: {
        backgroundColor: "#162938",
        top: '20%',
        width: '80%',
        left: '10%',
        height: '25%',
        borderColor: "#162938",
        borderWidth: 2,


    },

    ra: {
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        fontFamily: "Ubuntu",
        color: "#FFF",

    },

    senha: {
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        fontFamily: "Ubuntu",
        color: "#FFF",

    },

    button: {
        backgroundColor: "#162938",
        top: '40%',
        width: '65%',
        left: '20%',
        borderRadius: 20,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        padding: 10,

    },

    buttonText: {
        textAlign: 'center',
        color: "#FFFFFF",
        fontFamily: "Ubuntu"
    },

    buttonText2: {
        top: '600%',
        left: '10%',
        textDecorationLine: 'underline',
        fontFamily: "Ubuntu",
    },

    trocar: {
        color: '#000000',
        top: '35%',

    },

    iconUser: {
        top: '-55%',
        left: 5,
    },

    iconLock: {
        top: '-35%',
        left: 5,
    },

    iconEye: {
        width: '15%',
        top: '-52%',
        left: '90%',
        height: 50,

    },

});
