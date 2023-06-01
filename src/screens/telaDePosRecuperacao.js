import React, { useState, useEffect } from "react";
import * as Font from 'expo-font';
import {
    Ionicons,
    AntDesign,
  } from '@expo/vector-icons';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';


export default function telaDePosRecuperacao() {

    const [hidePass, setHidePass] = useState(true);
    const [hidePassConf, setHidePassConf] = useState(true);

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
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView>
                <View style={styles.containerFormato}>
                    <View>
                        <Text style={styles.text1}>PREENCHA OS CAMPO ABAIXO PARA REDEFINIR SUA SENHA</Text>
                    </View>
                    <View>
                        <Text style={styles.text2}>O código foi enviado para o e-mail selecionado</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.inputEmail}
                            placeholder='Insira o código'
                            placeholderTextColor='#000'
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.inputEmail}
                            placeholder='Nova senha'
                            placeholderTextColor='#000'
                        />
                        <TouchableOpacity
                            style={styles.iconEye}
                            onPress={() => setHidePass(!hidePass)}
                        >
                            {hidePass ? (
                                <AntDesign name='eye' size={24} color='#000' />
                            ) : (
                                <AntDesign name='eyeo' size={24} color='#000' />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TextInput
                            style={styles.inputEmail}
                            placeholder='Confirmar nova senha'
                            placeholderTextColor='#000'
                        />
                        <TouchableOpacity
                            style={styles.iconEye}
                            onPress={() => setHidePassConf(!hidePassConf)}
                        >
                            {hidePassConf ? (
                                <AntDesign name='eye' size={24} color='#000' />
                            ) : (
                                <AntDesign name='eyeo' size={24} color='#000' />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText}>REDEFIR SENHA</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAEBD7"
    },

    containerFormato: {
        marginTop: '30%',
        borderRadius: 50,
        backgroundColor: "#162938",
        borderColor: "#FFFFFF",
        borderWidth: 2,
        padding: "10%"
    },

    text1: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Ubuntu",
        textAlign: "center",
    },

    text2: {
        top: 10,
        color: "#fff",
        fontSize: 16,
        fontFamily: "Ubuntu",
        textAlign: "center",
    },

    inputEmail: {
        position: "relative",
        top: 60,
        left: -15,
        width: 350,
        height: 45,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
        fontSize: 16,
        backgroundColor: "#FFF",
        marginBottom: 20,
        borderColor: "#FFF"
    },

    iconEye: {
        width: '15%',
        top: 70,
        left: 300,
        height: 50,
        position: 'absolute',
      },

    button: {
        backgroundColor: "#162938",
        marginLeft: -100,
        width: 210,
        left: '50%',
        borderRadius: 10,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        padding: 10,
        top: 80,
        marginBottom: '20%',
    },

    buttonText: {
        textAlign: 'center',
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
        fontSize: 16,
    },
})