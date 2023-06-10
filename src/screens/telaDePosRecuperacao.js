//Os imports  são usados para importar módulos, componentes, estilos e outras dependências necessárias para o funcionamento do aplicativo.
import React, { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { useFonts, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
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

export default function telaDePosRecuperacao() {

    //Const useState que guardam os estados da input
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConf, setHidePassConf] = useState(true);

    //Função que carrega a fonte das letras no fron-end
    const [fontLoaded] = useFonts({
        Ubuntu_400Regular
    });

    if (!fontLoaded) {
        return null;
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView>
                <View style={styles.containerFormato}>
                    <Text style={styles.text1}>ESQUECEU SUA SENHA?</Text>
                    <Text style={styles.text2}>Digite o código e a nova senha</Text>
                    <TextInput
                        style={styles.inputEmail}
                        placeholder='Código recebido'
                        placeholderTextColor='#000'
                    />
                    <TextInput
                        style={styles.inputSenha}
                        placeholder='Nova senha'
                        placeholderTextColor='#000'
                        secureTextEntry={hidePass}
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
                    <TextInput
                        style={styles.inputEmail}
                        placeholder='Confirmar nova senha'
                        placeholderTextColor='#000'
                        secureTextEntry={hidePassConf}

                    />
                    <TouchableOpacity
                        style={styles.iconEye2}
                        onPress={() => setHidePassConf(!hidePassConf)}
                    >
                        {hidePassConf ? (
                            <AntDesign name='eye' size={24} color='#000' />
                        ) : (
                            <AntDesign name='eyeo' size={24} color='#000' />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}>REDEFINIR SENHA</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

//Cuida da parte de estilização do codigo
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
        fontFamily: "Ubuntu_400Regular",
        textAlign: "center",
    },

    text2: {
        top: 10,
        color: "#fff",
        fontSize: 16,
        fontFamily: "Ubuntu_400Regular",
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
        color: "#000",
        fontFamily: "Ubuntu_400Regular",
        fontSize: 16,
        backgroundColor: "#FFF",
        marginBottom: 20,
        borderColor: "#FFF"
    },

    inputSenha: {
        position: "relative",
        top: 60,
        left: -15,
        width: 350,
        height: 45,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        color: "#000",
        fontFamily: "Ubuntu_400Regular",
        fontSize: 16,
        backgroundColor: "#FFF",
        marginBottom: 20,
        borderColor: "#FFF"
    },

    inputSenhaConf: {
        position: "relative",
        top: 60,
        left: -15,
        width: 350,
        height: 45,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        color: "#000",
        fontFamily: "Ubuntu_400Regular",
        fontSize: 16,
        backgroundColor: "#FFF",
        marginBottom: 20,
        borderColor: "#FFF"
    },

    iconEye: {
        width: '15%',
        top: 223,
        left: 340,
        height: 50,
        position: 'absolute',
    },

    iconEye2: {
        width: '15%',
        top: 288,
        left: 340,
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
        fontFamily: "Ubuntu_400Regular",
        fontSize: 16,
    },
})