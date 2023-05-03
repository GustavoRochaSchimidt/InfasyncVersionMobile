import React, { useState } from "react";
import * as Font from 'expo-font';
import { useEffect } from 'react';
import SelectMultiple from '../../src/components/SelectMultiple';
import { useForm, Controller } from 'react-hook-form';
import { posts } from "../components/SelectMultiple/posts";
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
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";


export default function TelaDeCadastro() {

  const [hidePass, setHidePass] = useState(true);
  const [hidePassConf, setHidePassConf] = useState(true);

  const schema = yup.object({
    userName: yup.string().required("Informe seu nome"),
    email: yup.string().email("E-mail inválido").required("Informe seu e-mail"),
    ra: yup.string().min(13, "O seu ra tem 13 digitos").required("Informe seu Ra"),
    senha: yup.string().min(8, "Sua senha tem que ter no minimo 8 digitos").required("Informe sua senha"),
    senhaConfirm: yup.string().oneOf([yup.ref('senha'), null], 'As senhas não coincidem'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  function handerInfosCadastro(infos) {
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
      <ScrollView>
        <View style={styles.fundoFormato}>
          <View>
            <View style={styles.caixaDeTexto}>
              <View style={styles.imagenLogo}>
                <Image
                  source={require('../../assets/logoInfatec.png')}
                  style={styles.image}
                />
              </View>
              <Text style={styles.textCadastro}>CADASTRO</Text>
              <View style={styles.cursoInput}>
                <SelectMultiple
                  title="Cursos"
                  max={3}
                  options={posts}
                  initinalSelect={[]}

                />
              </View>
              <View>
                <Controller
                  control={control}
                  name="userName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.name, {
                        borderColor: errors.userName ? '#ff375b' : 'white',
                        paddingLeft: 35,
                      }]}
                      placeholder='Nome'
                      placeholderTextColor='#FFF'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.userName && <Text style={styles.inputError}>{errors.userName?.message} </Text>}

                <View style={styles.iconUser}>
                  <AntDesign name='user' size={22} color='#FFF' />
                </View>
              </View>
              <View>
                <Controller
                  control={control}
                  name="ra"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.ra, {
                        borderColor: errors.ra ? '#ff375b' : 'white',
                        paddingLeft: 35
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
                <View style={styles.iconRA}>
                  <Ionicons name='school-outline' size={22} color='#FFF' />
                </View>
              </View>
              <View>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.tel, {
                        borderColor: errors.email ? '#ff375b' : 'white',
                        paddingLeft: 35
                      }]}
                      placeholder='E-mail'
                      placeholderTextColor='#FFF'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.email && <Text style={styles.inputError}>{errors.email?.message} </Text>}

                <View style={styles.iconTel}>
                  <AntDesign name='mail' size={22} color='#FFF' />
                </View>
              </View>
              <View>
                <Controller
                  control={control}
                  name="senha"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.senha, {
                        borderColor: errors.senha ? '#ff375b' : 'white',
                        paddingLeft: 35,
                      }]}
                      placeholder='Senha'
                      placeholderTextColor='#FFF'
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={hidePass}
                    />
                  )}
                />
                {errors.senha && <Text style={styles.inputError}>{errors.senha?.message} </Text>}

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
                    <AntDesign name='eyeo' size={22} color='#FFF' />
                  )}
                </TouchableOpacity>
              </View>
              <View>
                <Controller
                  control={control}
                  name="senhaConfirm"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.senhaConfirm, {
                        borderColor: errors.senhaConfirm ? '#ff375b' : 'white',
                        paddingLeft: 35,
                      }]}
                      placeholder='Confirme sua senha'
                      placeholderTextColor='#FFF'
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={hidePassConf}
                    />
                  )}
                />
                {errors.senhaConfirm && <Text style={styles.inputError}>{errors.senhaConfirm?.message} </Text>}

                <View style={styles.iconSenha}>
                  <AntDesign name='lock' size={22} color='#FFF' />
                </View>
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
              <TouchableOpacity style={[styles.button, styles.button1]} onPress={handleSubmit(handerInfosCadastro)}>
                <Text style={styles.buttonText}>CADASTRAR</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  },

  image: {
    width: 100,
    height: 100,
    top: -10,
  },

  textCadastro: {
    fontFamily: 'Ubuntu',
    color: "#fff",
    fontSize: 18,
    textAlign: 'center',
    top: "-5%",
  },

  caixaDeTexto: {
    backgroundColor: "#162938",
    marginTop: '20%',
    width: '80%',
    marginLeft: '10%',
    height: '50%',
    borderRadius: 20,
    borderColor: "#162938",
    borderWidth: 2,
    top: '-10%',
  },

  name: {
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    padding: 9,
    color: "#FFFFFF",
    fontFamily: "Ubuntu",
    fontSize: 16,
    marginBottom: 20,
  },

  ra: {
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    padding: 9,
    fontFamily: "Ubuntu",
    color: "#FFF",
    fontSize: 16,
    marginBottom: 20,
  },

  tel: {
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    padding: 9,
    color: "#FFFFFF",
    fontFamily: "Ubuntu",
    fontSize: 16,
    marginBottom: 20,
  },

  senha: {
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    padding: 9,
    color: "#FFFFFF",
    fontFamily: "Ubuntu",
    fontSize: 16,
    marginBottom: 20,

  },

  senhaConfirm: {
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    padding: 9,
    color: "#FFFFFF",
    fontFamily: "Ubuntu",
    fontSize: 16,
    marginBottom: 20,

  },

  button: {
    backgroundColor: "#162938",
    marginLeft: -100,
    marginBottom: 15,
    width: 210,
    left: '50%',
    borderRadius: 20,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    padding: 9,
    top: 10,
    textAlign: 'center'

  },

  buttonText: {
    left: 50,
    color: "#FFFFFF",
    fontFamily: "Ubuntu",
    fontSize: 16,
  },

  iconUser: {
    top: '17%',
    left: '2%',
    position: 'absolute',
  },

  iconRA: {
    top: '17%',
    left: '2%',
    position: 'absolute',
  },

  iconTel: {
    top: '17%',
    left: '2%',
    position: 'absolute',
  },

  iconSenha: {
    top: '17%',
    left: '2%',
    position: 'absolute',
  },

  iconEye: {
    width: '15%',
    top: '17%',
    left: '90%',
    height: 50,
    position: 'absolute',
  },

  inputError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 5,
    top: -20,
    left: 10,
    fontFamily: "Ubuntu",
  },

  cursoInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
});



