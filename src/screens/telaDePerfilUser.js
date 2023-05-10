import React, { useEffect } from "react";
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
                        <Text style={styles.textEditProfile}>EDITAR PERFIL</Text>
                    </View>
                    <View>
                        <FontAwesome style={styles.perfilIcon} name="user-circle" size={130} color="#FAEBD7" />
                        <TouchableOpacity>
                            <MaterialCommunityIcons style={styles.perfilAddPhoto} name="pencil-circle" size={40} color="#FAEBD7" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TextInput style={[styles.inputCorName, {
                            borderColor: "#FFF",
                            paddingLeft: 35,
                        }]}
                            placeholder='Nome'
                            placeholderTextColor='#FFF'
                        />
                        <View style={styles.iconUser}>
                            <AntDesign name='user' size={22} color='#FFF' />
                        </View>
                    </View>

                    <View>
                        <View style={styles.iconRa}>
                            <Ionicons name='school-outline' size={22} color='#FFF' />
                        </View>
                        <TextInput style={[styles.inputCorRa, {
                            borderColor: "#FFF",
                            paddingLeft: 35,
                        }]}
                            placeholder='Ra'
                            placeholderTextColor='#FFF'
                        />
                    </View>

                    <View>
                        <View style={styles.iconEmail}>
                            <AntDesign name='mail' size={22} color='#FFF' />
                        </View>
                        <TextInput style={[styles.inputCorEmail, {
                            borderColor: "#FFF",
                            paddingLeft: 35,
                        }]}
                            placeholder='E-mail'
                            placeholderTextColor='#FFF'
                        />
                    </View>

                    <View>
                        <TouchableOpacity style={[styles.button, styles.button1]} >
                            <Text style={styles.buttonText}>SALVAR</Text>
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
        marginTop: '10%',
        borderRadius: 50,
        backgroundColor: "#162938",
        borderColor: "#FFFFFF",
        borderWidth: 2,
        height: '90%',
    },

    textEditProfile: {
        color:"#FFF",
        fontFamily: 'Ubuntu',
        fontSize: 20,
        top: '2%',
        position: "relative",
        textAlign: "center",

    },

    perfilIcon: {
        position: "relative",
        alignItems: "center",
        margin: 10,
        marginLeft: 130,
    },

    perfilAddPhoto: {
        position: "relative",
        alignItems: "center",
        margin: -45,
        marginLeft: 230,
    },

    iconUser: {
        top: '75%',
        left: '11%',
        position: 'absolute',
    },

    inputCorName: {
        position: "relative",
        height: 50,
        borderWidth: 2,
        borderRadius: 20,
        padding: 9,
        fontFamily: "Ubuntu",
        color: "#FFF",
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 40,
        top: 40,
    },

    iconRa: {
        top: '75%',
        left: '11%',
        position: 'absolute',
    },

    inputCorRa: {
        position: "relative",
        height: 50,
        borderWidth: 2,
        borderRadius: 20,
        padding: 9,
        fontFamily: "Ubuntu",
        color: "#FFF",
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 40,
        top: 40,
    },

    iconEmail: {
        top: '60%',
        left: '11%',
        position: 'absolute',
    },

    inputCorEmail: {
        position: "relative",
        height: 50,
        borderWidth: 2,
        borderRadius: 20,
        padding: 9,
        fontFamily: "Ubuntu",
        color: "#FFF",
        fontSize: 16,
        marginBottom: 40,
        marginLeft: 40,
        marginRight: 40,
        top: 40,
    },

    button: {
        backgroundColor: "#162938",
        marginLeft: -100,
        marginBottom: 40,
        width: 210,
        left: '50%',
        borderRadius: 20,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        padding: 9,
        textAlign: 'center',
        marginTop: 20
    },

    buttonText: {
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
        fontSize: 16,
        textAlign: "center",
    },

});