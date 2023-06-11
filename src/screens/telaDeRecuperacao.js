import React, { useState } from "react";
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
import infatecFetch from "../Services/api";

export default function telaDeRecuperacao({ navigation }) {
    
    //armazena o e-mail do user
    const [email, setEmail] = useState('');

    const [fontLoaded] = useFonts({
        Ubuntu_400Regular,
    });

    if (!fontLoaded) {
        return null;
    }

    //Envia o e-mail com o codigo de recuperação de senha.
    const enviarEmail = async () => {
        try {
            const dados = {
                body: 'este é seu código:',
                email: email
            };

            const response = await infatecFetch.post('/api/ForgotPassword/SendEmail/2', dados);
            console.log(response.data);
            console.log('Código enviado para o email com sucesso');
            navigation.navigate('telaDePosRecuperacao');
        } catch (error) {
            console.error('Erro ao enviar código:', error);
        }
    };

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
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => enviarEmail()}>
                            <Text style={styles.buttonText}>ENVIAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
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
        fontFamily: "Ubuntu_400Regular",
        textAlign: "center",
    },

    text2: {
        position: "relative",
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
        marginBottom: 100,
        borderColor: "#FFF"
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
        fontFamily: "Ubuntu_400Regular",
        fontSize: 16,
    },
});
