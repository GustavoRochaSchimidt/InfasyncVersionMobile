import React, { useState } from "react";
import * as Font from 'expo-font';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
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
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';


export default function telaDeLogin() {
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.fundoFormato}>
          <View>
            <Text style={styles.textEntrar}> ENTRAR</Text>
          </View>
          <View style={styles.imagenLogo}>
            <Image
              source={require("../../assets/logoInfatec.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.caixaDeTexto}>
            <View>
              <TextInput
                style={[styles.ra, { paddingLeft: 30 }]}
                placeholder='Ra'
                placeholderTextColor='#FFF'
              />
              <View style={styles.iconUser}>
                <Ionicons name="school-outline" size={22} color="#FFF" />
              </View>
            </View>
            <View>
              <TextInput
                style={[styles.senha, { paddingLeft: 30 }]}
                placeholder='Insira sua senha'
                placeholderTextColor='#FFF'
                value={input}
                onChangeText={(texto) => setInput(texto)}
                secureTextEntry={hidePass}
              />
              <View style={styles.iconLock}>
                <Icon name="lock1" size={22} color="#FFF" />
              </View>
              <TouchableOpacity style={styles.iconEye} onPress={() => setHidePass(!hidePass)}>
                {hidePass ?
                  <Icon name="eye" size={22} color="#FFF" />
                  :
                  <Icon name="eyeo" size={22} color="#FFF" />
                }
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, styles.button1]} onPress={() => alert('Entrar')}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.trocar, styles.button2]} onPress={() => alert('Tela de recuperação de senha')}>
            <Text style={styles.buttonText2}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  );

}
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
    top: "5%"
  },

  imagenLogo: {
    alignItems: "center",
    marginTop: -15,
    top: '-15%'
  },

  textEntrar: {
    fontFamily: 'Ubuntu',
    color: "#fff",
    fontSize: 18,
    marginTop: 120,
    marginLeft: '40%',
    top: '20%',
  },

  caixaDeTexto: {
    backgroundColor: "#162938",
    marginTop: '10%',
    width: '80%',
    marginLeft: '10%',
    marginBottom: '10%',
    borderRadius: 20,
    borderColor: "#162938",
    borderWidth: 2,
    top: '-15%'
  },

  ra: {
    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    fontFamily: "Ubuntu",
    color: "#FFF",
    top: '25%',

  },

  senha: {
    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    color: "#FFFFFF",
    fontFamily: "Ubuntu",
    top: '20%',

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
    top: '5%',

  },

  buttonText: {
    textAlign: 'center',
    color: "#FFFFFF",
    fontFamily: "Ubuntu"
  },

  buttonText2: {
    top: '600%',
    left: '10%',
    textDecorationLine: 'underline',
    fontFamily: "Ubuntu",
  },

  trocar: {
    color: '#000000',
    top: '-10%',

  },

  iconUser: {
    top: '-30%',
    left: 5,
  },

  iconLock: {
    top: '-15%',
    left: 5,
  },

  iconEye: {
    width: '15%',
    top: '-30%',
    left: '90%',
    height: 50,

  },

});
