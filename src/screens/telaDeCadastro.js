import React, { useState } from "react";
import * as Font from 'expo-font';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign/';
import SelectMultiple from 'C:/Users/gusta/Projeto_Infatec_mobile_OF/src/components/SelectMultiple';
import { 
    Ionicons,
    AntDesign,
} from '@expo/vector-icons';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import { posts } from "../components/SelectMultiple/posts";

export default function TelaDeCadastro() {

    const [input, setInput] = useState('');
    const [hidePass, setHidePass] = useState(true);

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
            <View style={styles.fundoFormato}>
              
                <Text style={styles.textCadastro}>CADASTRO</Text>
              
              <View style={styles.imagenLogo}>
                <Image
                  source={require('../../assets/logoInfatec.png')}
                  style={styles.image}
                  
                />
              </View>
              <View style={styles.caixaDeTexto}>

                <SelectMultiple title="Cursos" max={3} options={posts} initinalSelect={[]}/>

                <View>
                  <TextInput
                    style={[styles.name, { paddingLeft: 35 }]}
                    placeholder='Nome'
                    placeholderTextColor='#FFF'
                  />
                  <View style={styles.iconUser}>
                    <Icon name='user' size={22} color='#FFF' />
                  </View>
                </View>
                <View>
                  <TextInput
                    style={[styles.ra, { paddingLeft: 35 }]}
                    placeholder='Ra'
                    placeholderTextColor='#FFF'
                  />
                  <View style={styles.iconRA}>
                    <Ionicons name='school-outline' size={22} color='#FFF' />
                  </View>
                </View>
                <View>
                  <TextInput
                    style={[styles.tel, { paddingLeft: 35 }]}
                    placeholder='E-mail'
                    placeholderTextColor='#FFF'
                  />
                  <View style={styles.iconTel}>
                    <Icon name='mail' size={22} color='#FFF' />
                  </View>
                </View>
                <View>
                  <TextInput
                    style={[styles.senha, { paddingLeft: 35 }]}
                    placeholder='Senha'
                    placeholderTextColor='#FFF'
                    value={input}
                    onChangeText={(texto) => setInput(texto)}
                    secureTextEntry={hidePass}
                  />
                  <View style={styles.iconSenha}>
                    <AntDesign name='lock' size={22} color='#FFF' />
                  </View>
                  <TouchableOpacity
                    style={styles.iconEye}
                    onPress={() => setHidePass(!hidePass)}
                  >
                    {hidePass ? (
                      <AntDesign name='eye' size={22} color='#FFF' />
                    ) : (
                      <Icon name='eyeo' size={22} color='#FFF' />
                    )}
                  </TouchableOpacity>
                  
                </View>
                
                </View>
                <TouchableOpacity style={[styles.button, styles.button1]} onPress={() => alert('aaaaaaaaaaaaa')}>
                    <Text style={styles.buttonText}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
              
            
            
          </ScrollView>
          
        </KeyboardAvoidingView>
        
      );
    };

    const styles = StyleSheet.create({
        fundoTela: {
          flex: 1,
          backgroundColor: "#FAEBD7",
        },
        fundoFormato: {
          
          marginTop: '10%',
          borderRadius: 50,
          backgroundColor: "#162938",
          borderColor: "#FFFFFF",
          borderWidth: 2,
          height: '90%',
        },
        imagenLogo: {
          alignItems: "center",
          marginTop: -15,
          top: '-18%'
        },
        textCadastro: {
          fontFamily: 'Ubuntu',
          color: "#fff",
          fontSize: 18,
          marginTop: 120,
          marginLeft: '40%',
        },
        caixaDeTexto: {
          backgroundColor:"#162938",
          marginTop: '5%',
          width: '80%',
          marginLeft: '10%',
          height: '50%',
          borderRadius: 20,
          borderColor: "#162938",
          borderWidth: 2,
          top:'-5%',
        },

    name: {
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
        fontSize: 16,
    },

    ra: {
      borderColor: "#FFFFFF",
      borderWidth: 2,
      borderRadius: 20,
      padding: 10,
      marginBottom: 10,
      fontFamily: "Ubuntu",
      color: "#FFF",
      fontSize: 16,
    },

    tel: {
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
        fontSize: 16,

    },

    senha: {
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#162938",
        marginLeft: -100,
        width: 210,
        left: '50%',
        borderRadius: 20,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        padding: 10,
        
    },

    buttonText: {
        left: 50,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
    },

    iconUser: {
        top: '-55%',
        left: '2%',
    },

    iconRA: {
        top: '-55%',
        left: '2%',
    },

    iconTel: {
        top: '-55%',
        left: '2%',

    },

    iconSenha: {
        top: '-35%',
        left: '2%',
    },

    iconEye: {
        width: '15%',
        top: '-52%',
        left: '90%',
        height: 50,

    },



   
});



