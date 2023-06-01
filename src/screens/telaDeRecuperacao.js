import React, { useState, useEffect } from "react";
import * as Font from 'expo-font';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';

export default function telaDeRecuperacao({ navigation }) {

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
                        <Text style={styles.text1}>ESQUECEU SUA SENHA?</Text>
                    </View>
                    <View>
                        <Text style={styles.text2}>Informe Seu E-mail cadastrado para recuperar sua senha</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.inputEmail}
                            placeholder='E-mail'
                            placeholderTextColor='#000'
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telaDePosRecuperacao')}>
                            <Text style={styles.buttonText}>ENVIAR</Text>
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
        position: "relative",
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
        marginBottom: 100,
        borderColor:"#FFF"
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
        top: '10%',
    },

    buttonText: {
        textAlign: 'center',
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
        fontSize: 16,
    },
})