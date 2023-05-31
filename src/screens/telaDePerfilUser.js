import React, { useEffect, useState } from "react";
import * as Animatable from 'react-native-animatable';
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

import {
    Ionicons,
    AntDesign,
    FontAwesome5,
    FontAwesome,
    MaterialCommunityIcons,
} from '@expo/vector-icons';

export default function telaDePerfilUser() {

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
            style={styles.fundoTela}
        >
            <ScrollView>
                <Animatable.View animation="bounceIn" style={styles.fundoFormato}>
                    <View>
                        <Text style={styles.textInfos}>Informações do Perfil</Text>
                        <Text style={styles.textEmail}>E-mail: gustavo@fatec.sp.gov.br</Text>
                    </View>
                    <View>
                        <Text style={styles.textEditProfile}>REDEFINIR SENHA</Text>
                    </View>
                    <View>
                        <TextInput style={[styles.inputCorName, {
                            borderColor: "#FFF",
                            paddingLeft: 35,
                        }]}
                            placeholder='E-mail'
                            placeholderTextColor='#FFF'
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
                        />

                        <TouchableOpacity
                            style={styles.iconEye}
                            onPress={() => setHidePass(!hidePass)}
                        >
                            {hidePass ? (
                                <AntDesign name='eye' size={22} color='#FFF' />
                            ) : (
                                <AntDesign name='eyeo' size={22} color='#FFF' />
                            )}
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={[styles.button, styles.button1]} >
                            <Text style={styles.buttonText}>ENVIAR</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </ScrollView >
        </KeyboardAvoidingView >
    )
};

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
        height: '85%',
    },
    textInfos: {
        top: 15,
        color: "#FFF",
        fontFamily: 'Ubuntu',
        fontSize: 20,
        position: "relative",
        textAlign: "center",
    },

    textEmail: {
        top: 20,
        color: "#FFF",
        fontFamily: 'Ubuntu',
        fontSize: 16,
        position: "relative",
        textAlign: "center",
    },

    textEditProfile: {
        color: "#FFF",
        fontFamily: 'Ubuntu',
        fontSize: 20,
        top: 40,
        position: "relative",
        textAlign: "center",
    },

    iconUser: {
        top: 75,
        left: '11%',
        position: 'absolute',
    },

    inputCorName: {
        position: "relative",
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        fontFamily: "Ubuntu",
        color: "#FFF",
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 40,
        top: 60,
    },

    iconLock1: {
        top: 75,
        left: '11%',
        position: 'absolute',
    },

    inputSenha: {
        position: "relative",
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        fontFamily: "Ubuntu",
        color: "#FFF",
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 40,
        top: 60,
    },

    iconLock: {
        top: '84%',
        left: '11%',
        position: 'absolute',
    },

    inputConfSenha: {
        position: "relative",
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        fontFamily: "Ubuntu",
        color: "#FFF",
        fontSize: 16,
        marginBottom: 40,
        marginLeft: 40,
        marginRight: 40,
        top: 60,
    },

    button: {
        top: 50,
        backgroundColor: "#162938",
        marginLeft: -100,
        marginBottom: 120,
        width: 210,
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
        fontFamily: "Ubuntu",
        fontSize: 16,
        textAlign: "center",
    },

    iconEye: {
        width: '15%',
        top: 75,
        left: '80%',
        height: 50,
        position: 'absolute',
    }

});