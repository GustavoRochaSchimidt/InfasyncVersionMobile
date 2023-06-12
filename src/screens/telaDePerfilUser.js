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
export default function telaDePerfilUser({navigation}) {

    //Const useState que guardam os estados das inputs.
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConf, setHidePassConf] = useState(true);
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //Const que tras o email da outra tela.
    const route = useRoute();
    const { email } = route.params;

    //Função que carrega a fonte das letras no fron-end.
    const [fontLoaded] = useFonts({
        Ubuntu_400Regular
    });

    if (!fontLoaded) {
        return null;
    };

    //Const para resetar o password.
    const handleResetPassword = async () => {
        try {
            const data = {
                email: email,
                password: password
            };

            const response = await infatecFetch.put(`/api/ForgotPassword/NewPassword/${code}`, data);
            console.log(response.data);
            console.log("Senha alterada com sucesso")
            navigation.navigate('telaDeOpçoes', {email: email});
        } catch (error) {

            console.error(error);
            console.log("Erro ao alterar senha")
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
                        <Text style={styles.textEmail}>E-mail:{email}</Text>
                    </View>
                    <View>
                        <Text style={styles.textEditProfile}>REDEFINIR SENHA</Text>
                    </View>
                    <View>
                        <TextInput style={[styles.inputCorName, {
                            borderColor: "#FFF",
                            paddingLeft: 35,
                        }]}
                            placeholder='Código recebido'
                            placeholderTextColor='#FFF'
                            value={code}
                            onChangeText={setCode}
                        />
                        <View style={styles.iconUser}>
                            <AntDesign name='mail' size={22} color='#FFF' />
                        </View>
                    </View>

                    <View>
                        <View style={styles.iconLock1}>
                            <AntDesign name='lock1' size={22} color='#FFF' />
                        </View>
                        <TextInput style={[styles.inputSenha, {
                            borderColor: "#FFF",
                            paddingLeft: 35,
                        }]}
                            placeholder='Nova senha'
                            placeholderTextColor='#FFF'
                            secureTextEntry={hidePassConf}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={styles.iconEye}
                            onPress={() => setHidePassConf(!hidePassConf)}
                        >
                            {hidePassConf ? (
                                <AntDesign name='eye' size={22} color='#FFF' />
                            ) : (
                                <AntDesign name='eyeo' size={22} color='#FFF' />
                            )}
                        </TouchableOpacity>

                    </View>
                    <View>
                        <View style={styles.iconLock}>
                            <AntDesign name='lock1' size={22} color='#FFF' />
                        </View>
                        <TextInput style={[styles.inputConfSenha, {
                            borderColor: "#FFF",
                            paddingLeft: 35,
                        }]}
                            placeholder='Confirmar nova senha'
                            placeholderTextColor='#FFF'
                            secureTextEntry={hidePass}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity
                            style={styles.iconEye2}
                            onPress={() => setHidePass(!hidePass)}
                        >
                            {hidePass ? (
                                <AntDesign name='eye' size={22} color='#FFF' />
                            ) : (
                                <AntDesign name='eyeo' size={22} color='#FFF' />
                            )}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
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
        top: 40,
        position: "relative",
        textAlign: "center",
    },

    iconUser: {
        top: 70,
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
        top: 55,
    },

    iconLock1: {
        top: 65,
        left: '11%',
        position: 'absolute',
    },

    inputSenha: {
        position: "absolute",
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
        top: 50,
    },

    iconLock: {
        top: 135,
        left: '11%',
        position: 'absolute',
    },

    inputConfSenha: {
        position: "absolute",
        height: 50,
        width: 320,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        fontFamily: "Ubuntu_400Regular",
        color: "#FFF",
        fontSize: 16,
        marginBottom: 40,
        marginLeft: 40,
        marginRight: 40,
        top: 120,
    },

    button: {
        top: 180,
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

    iconEye: {
        width: '15%',
        top: 65,
        left: '80%',
        height: 50,
        position: 'absolute',
    },

    iconEye2: {
        width: '10%',
        top: 135,
        left: '80%',
        height: 50,
        position: 'absolute',
    }

});