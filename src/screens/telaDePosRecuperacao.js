import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useFonts, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import infatecFetch from "../Services/api";
import { useRoute } from '@react-navigation/native';

export default function telaDePosRecuperacao({ navigation }) {
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConf, setHidePassConf] = useState(true);
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [codeError, setCodeError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const route = useRoute();
    const { email } = route.params;

    const [fontLoaded] = useFonts({
        Ubuntu_400Regular,
    });

    if (!fontLoaded) {
        return null;
    }

    const handleResetPassword = async () => {
        if (code.trim() === '') {
            setCodeError('Preencha o campo com o código.');
            return;
        } else {
            setCodeError('');
        }

        if (password.trim() === '') {
            setPasswordError('Preencha o campo com a nova senha.');
            return;
        } else {
            setPasswordError('');
        }

        if (confirmPassword.trim() === '') {
            setConfirmPasswordError('Preencha o campo com a confirmação da nova senha.');
            return;
        } else {
            setConfirmPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('As senhas não coincidem.');
            return;
        } else {
            setConfirmPasswordError('');
        }

        try {
            const data = {
                email: email,
                password: password
            };

            const response = await infatecFetch.put(`/api/ForgotPassword/NewPassword/${code}`, data);
            console.log(response.data);
            console.log('Senha alterada com sucesso');
            navigation.navigate('telaDeLogin');
        } catch (error) {
            console.error(error);
            console.log('Erro ao alterar senha');
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView>
                <View style={styles.containerFormato}>
                    <Text style={styles.text1}>ESQUECEU SUA SENHA?</Text>
                    <Text style={styles.text2}>Digite o código e a nova senha</Text>
                    <TextInput
                        style={[
                            styles.inputEmail,
                            codeError !== null ? styles.inputError : null,
                        ]}
                        placeholder="Código recebido"
                        placeholderTextColor="#000"
                        value={code}
                        onChangeText={setCode}
                        onBlur={() => {
                            if (code.trim() === '') {
                                setCodeError('Preencha o campo com o código.');
                            } else {
                                setCodeError(null);
                            }
                        }}
                    />
                    {codeError !== null && <Text style={styles.errorText}>{codeError}</Text>}

                    <TextInput
                        style={[
                            styles.inputSenha,
                            passwordError !== null ? styles.inputError : null,
                        ]}
                        placeholder="Nova senha"
                        placeholderTextColor="#000"
                        secureTextEntry={hidePass}
                        value={password}
                        onChangeText={setPassword}
                        onBlur={() => {
                            if (password.trim() === '') {
                                setPasswordError('Preencha o campo com a nova senha.');
                            } else {
                                setPasswordError(null);
                            }
                        }}
                    />
                    {passwordError !== null && <Text style={styles.errorText}>{passwordError}</Text>}

                    <TouchableOpacity
                        style={styles.iconEye}
                        onPress={() => setHidePass(!hidePass)}
                    >
                        {hidePass ? (
                            <AntDesign name="eye" size={24} color="#000" />
                        ) : (
                            <AntDesign name="eyeo" size={24} color="#000" />
                        )}
                    </TouchableOpacity>

                    <TextInput
                        style={[
                            styles.inputSenhaConf,
                            confirmPasswordError !== null ? styles.inputError : null,
                        ]}
                        placeholder="Confirmar nova senha"
                        placeholderTextColor="#000"
                        secureTextEntry={hidePassConf}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onBlur={() => {
                            if (confirmPassword.trim() === '') {
                                setConfirmPasswordError('Preencha o campo com a confirmação da nova senha.');
                            } else if (confirmPassword !== password) {
                                setConfirmPasswordError('As senhas não coincidem.');
                            } else {
                                setConfirmPasswordError(null);
                            }
                        }}
                    />
                    {confirmPasswordError !== null && (
                        <Text style={styles.errorText}>{confirmPasswordError}</Text>
                    )}


                    <TouchableOpacity style={styles.iconEye2} onPress={() => setHidePassConf(!hidePassConf)}>
                        {hidePassConf ? <AntDesign name="eye" size={24} color="#000" /> : <AntDesign name="eyeo" size={24} color="#000" />}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                        <Text style={styles.buttonText}>REDEFINIR SENHA</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAEBD7',
    },
    containerFormato: {
        marginTop: '30%',
        borderRadius: 50,
        backgroundColor: '#162938',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        padding: '10%',
    },
    text1: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Ubuntu_400Regular',
        textAlign: 'center',
    },
    text2: {
        top: 10,
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Ubuntu_400Regular',
        textAlign: 'center',
    },
    inputEmail: {
        position: 'relative',
        top: 60,
        left: -15,
        width: 350,
        height: 45,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        color: '#000',
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 16,
        backgroundColor: '#FFF',
        marginBottom: 40,
        borderColor: '#FFF',
    },
    inputSenha: {
        position: 'relative',
        top: 60,
        left: -15,
        width: 350,
        height: 45,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        color: '#000',
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 16,
        backgroundColor: '#FFF',
        marginBottom: 40,
        borderColor: '#FFF',
    },
    inputSenhaConf: {
        position: 'relative',
        top: 60,
        left: -15,
        width: 350,
        height: 45,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        color: '#000',
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 16,
        backgroundColor: '#FFF',
        marginBottom: 40,
        borderColor: '#FFF',
    },
    iconEye: {
        width: '15%',
        top: 240,
        left: 340,
        height: 50,
        position: 'absolute',
    },
    iconEye2: {
        width: '15%',
        top: 290,
        left: 340,
        height: 50,
        position: 'absolute',
    },
    button: {
        backgroundColor: '#162938',
        marginLeft: -100,
        width: 210,
        left: '50%',
        borderRadius: 10,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        padding: 10,
        top: 80,
        marginBottom: '20%',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 16,
    },

    errorText: {
        color: '#ff375b',
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 16,
        alignSelf: 'flex-start',
        top: 20,
        left: 10,
        position: 'relative',
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
});
