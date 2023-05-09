import React from "react";
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

import {
    Ionicons,
    AntDesign,
    FontAwesome5,
    FontAwesome,
} from '@expo/vector-icons';

export default function telaDePerfilUser() {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.fundoTela}
        >
            <ScrollView>
                <View style={styles.fundoFormato}>
                    <FontAwesome style={styles.perfilIcon} name="user-circle" size={100} color="#FAEBD7" />
                    <TextInput style={[styles.inputCorRa, {
                        borderColor: "#FFF",
                        paddingLeft: 35,
                    }]}
                        placeholder='Ra'
                        placeholderTextColor='#FFF'
                    />

                    <TextInput style={[styles.inputCorEmail, {
                        borderColor: "#FFF",
                        paddingLeft: 35,
                    }]}
                        placeholder='E-mail'
                        placeholderTextColor='#FFF'
                    />

                    <TextInput style={[styles.inputCorName, {
                        borderColor: "#FFF",
                        paddingLeft: 35,
                    }]}
                        placeholder='Nome'
                        placeholderTextColor='#FFF'
                    />
                    <View>
                        <TouchableOpacity style={[styles.button, styles.button1]} >
                            <Text style={styles.buttonText}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    perfilIcon: {
        position: "relative",
        alignItems: "center",
        margin: 10,
        marginLeft: 155,
    },

    inputCorRa: {
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

    inputCorEmail: {
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

    inputCorName: {
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
        //left: 50,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
        fontSize: 16,
        textAlign: "center",
    },

});