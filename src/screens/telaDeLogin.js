import React, { useState } from "react";
import * as Font from 'expo-font';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  const [hidePass, setHidePass] = useState(true);

  const schema = yup.object({
    ra: yup.string().min(13, "Ra ou senha incorretos").required("Informe seu Ra"),
    senha: yup.string().min(8, "Ra ou senha incorretos").required("Informe sua senha"),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  function handerInfosLogin(infos) {
    console.log(infos);
  }

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
      <ScrollView contentContainerStyle={{ flexGrow: 3 }}>
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
              <Controller
                control={control}
                name="ra"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    style={[styles.ra, {
                      paddingLeft: 30,
                      borderColor: errors.ra ? '#ff375b' : 'white',
                    }]}
                    placeholder='Ra'
                    placeholderTextColor='#FFF'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.ra && <Text style={styles.inputError}>{errors.ra?.message} </Text>}

              <View style={styles.iconUser}>
                <Ionicons name="school-outline" size={22} color="#FFF" />
              </View>
            </View>
            <View>
              <TouchableOpacity style={[styles.trocar, styles.button2]} onPress={() => alert('Tela de recuperação de senha')}>
                <Text style={styles.buttonText2}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
            <View>

              <Controller
                control={control}
                name="senha"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.senha, {
                      paddingLeft: 30,
                      borderColor: errors.senha ? '#ff375b' : 'white',
                    }]}
                    placeholder='Insira sua senha'
                    placeholderTextColor='#FFF'
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={hidePass}
                  />
                )}
              />
              {errors.senha && <Text style={styles.inputError}>{errors.senha?.message} </Text>}

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
            <TouchableOpacity style={[styles.button, styles.button1]} onPress={handleSubmit(handerInfosLogin)}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>

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
    top: "5%",
  },

  imagenLogo: {
    alignItems: "center",
    marginTop: -15,
    top: '-20%'
  },

  textEntrar: {
    fontFamily: 'Ubuntu',
    color: "#fff",
    fontSize: 18,
    marginTop: 120,
    marginLeft: '40%',
    top: '10%',
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
    padding: 9,
    marginBottom: 10,
    fontFamily: "Ubuntu",
    fontSize: 16,
    color: "#FFF",
    top: '25%',

  },

  senha: {
    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 20,
    padding: 9,
    marginBottom: 10,
    color: "#FFFFFF",
    fontFamily: "Ubuntu",
    fontSize: 16,
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
    top: '50%',

  },

  buttonText: {
    textAlign: 'center',
    color: "#FFFFFF",
    fontFamily: "Ubuntu",
    fontSize: 16,
  },

  buttonText2: {
    top: '590%',
    left: '5%',
    textDecorationLine: 'underline',
    fontFamily: "Ubuntu",
    fontSize: 16,
    color: "#FFF"
  },


  trocar: {
    color: '#FFFFFF',

  },

  iconUser: {
    top: '40%',
    left: 5,
    position: 'absolute',
  },

  iconLock: {
    top: '40%',
    left: 5,
    position: 'absolute',
  },

  iconEye: {
    width: '15%',
    top: '40%',
    left: '90%',
    height: 50,
    position: 'absolute',

  },

  inputError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 5,
    top: 10,
    left: 10,
    fontFamily: "Ubuntu",

  },

});
