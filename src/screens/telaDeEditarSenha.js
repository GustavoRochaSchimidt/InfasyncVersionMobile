//Os imports  são usados para importar módulos, componentes, estilos e outras dependências necessárias para o funcionamento do aplicativo.
import React, { useState } from "react";
import * as Animatable from 'react-native-animatable';
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
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import infatecFetch from "../Services/api";

//Uma função que pode ser importada em outro módulo ou arquivo, junto do navigation que é um bibioteca de navigação de telas.
export default function telaDeEditarSenha({ navigation }) {

     //Const que tras o email da outra tela.
     const route = useRoute();
     const { email } = route.params;

    //Função que carrega a fonte das letras no fron-end.
    const [fontLoaded] = useFonts({
        Ubuntu_400Regular
    });

     //armazena o e-mail do user
     const [trocaEmail, setTrocaEmail] = useState('');

    if (!fontLoaded) {
        return null;
    };

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
            navigation.navigate('telaPerfilUser', {email: email});
        } catch (error) {
            console.error('Erro ao enviar código:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.fundoTela}
        >
            <ScrollView>
                <Animatable.View animation="bounceIn" style={styles.fundoFormato}>
                    <View>
                        <Text style={styles.textInfos}>Informações do Perfil</Text>
                        <Text style={styles.textEmail}> E-mail: {email}</Text>
                    </View>
                    <View>
                        <Text style={styles.textEditProfile}> REDEFINIR SENHA: </Text>
                    </View>
                    <View>
                        <TextInput style={[styles.inputCorName, {
                            borderColor: "#FFF",
                            paddingLeft: 35,
                        }]}
                            placeholder='E-mail'
                            placeholderTextColor='#FFF'
                            value={trocaEmail}
                            onChangeText={setTrocaEmail}
                        />
                        <View style={styles.iconUser}>
                            <AntDesign name='mail' size={22} color='#FFF' />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => enviarEmail()}>
                        <Text style={styles.buttonText}>ENVIAR</Text>
                    </TouchableOpacity>

                </Animatable.View>
            </ScrollView >
        </KeyboardAvoidingView >
    )
};

//Cuida da parte de estilização do codigo.
const styles = StyleSheet.create({

    fundoTela: {
        backgroundColor: "#FAEBD7",
        flex: 1,
    },

    fundoFormato: {
        marginTop: '15%',
        borderRadius: 50,
        backgroundColor: "#162938",
        borderColor: "#FFFFFF",
        borderWidth: 2,
    },

    textInfos: {
        top: 15,
        color: "#FFF",
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 20,
        position: "relative",
        textAlign: "center",
    },

    textEmail: {
        top: 20,
        color: "#FFF",
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 16,
        position: "relative",
        textAlign: "center",
    },

    textEditProfile: {
        color: "#FFF",
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 20,
        top: 60,
        position: "relative",
        textAlign: "center",
    },

    iconUser: {
        top: 140,
        left: '11%',
        position: 'absolute',
    },

    inputCorName: {
        position: "relative",
        height: 50,
        width: 320,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        fontFamily: "Ubuntu_400Regular",
        color: "#FFF",
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 40,
        top: 125,
    },

    button: {
        top: 140,
        backgroundColor: "#162938",
        marginLeft: -100,
        marginBottom: 200,
        height: 40,
        width: 200,
        left: '50%',
        borderRadius: 10,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        padding: 10,
        textAlign: 'center',
        marginTop: 10
    },

    buttonText: {
        color: "#FFFFFF",
        fontFamily: "Ubuntu_400Regular",
        fontSize: 16,
        textAlign: "center",
    },

});