//Os imports  são usados para importar módulos, componentes, estilos e outras dependências necessárias para o funcionamento do aplicativo.
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

//Uma função que pode ser importada em outro módulo ou arquivo, junto do navigation que é um bibioteca de navigação de telas.
export default function telaDeRecuperacao({ navigation }) {

    //Guarda o e-mail pra ser validado.
    const [emailValid, setEmailValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    //armazena o e-mail do user.
    const [email, setEmail] = useState('');

    //Carrega as Fonts do front-end.
    const [fontLoaded] = useFonts({
        Ubuntu_400Regular,
    });

    if (!fontLoaded) {
        return null;
    }

    //Valida o dominio de e-mail.
    const validateEmail = () => {
        const domain = "@fatec.sp.gov.br";
        if (!email.endsWith(domain)) {
            setEmailValid(false);
            setErrorMessage('E-mail inválido. O e-mail deve ser do domínio @fatec.sp.gov.br.');
        } else {
            setEmailValid(true);
            setErrorMessage('');
        }
    };

    //Envia o e-mail com o codigo de recuperação de senha.
    const enviarEmail = async () => {
        try {
          const domain = "@fatec.sp.gov.br"; //cheaga se o dominio esta correto.
          if (!email.endsWith(domain)) {
            setErrorMessage('E-mail inválido. O e-mail deve ser do domínio @fatec.sp.gov.br.');
            return;
          }
      
          const dados = {
            body: 'este é seu código:',
            email: email
          };
      
          const response = await infatecFetch.post('/api/ForgotPassword/SendEmail/2', dados);
          console.log(response.data);
          console.log('Código enviado para o e-mail com sucesso');
          navigation.navigate('telaDePosRecuperacao', { email: email });
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
                            style={[
                                styles.inputEmail,
                                !emailValid ? styles.inputError : null,
                            ]}
                            placeholder='E-mail'
                            placeholderTextColor='#000'
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailValid(true);
                            }}
                            onBlur={validateEmail}
                        />
                        {!emailValid && (
                            <Text style={styles.errorText}>O e-mail deve ser @fatec.sp.gov.br</Text>
                        )}
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
};

//Cuida da estilização do código.
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

    inputError: {
        color: "#000",
        top: 60,
        left: -15,
        fontFamily: "Ubuntu_400Regular",
        position: "relative",
        borderColor: "#ff375b",
        borderWidth: 2,
    },

    errorText: {
        position:"relative",
        color: "#ff375b",
        fontFamily: "Ubuntu_400Regular",
        fontSize: 12,
        marginTop: 5,
        top: -30,
        textAlign: 'center',
    },

});
