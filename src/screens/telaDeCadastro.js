//Os imports  são usados para importar módulos, componentes, estilos e outras dependências necessárias para o funcionamento do aplicativo.
import React, { useState } from "react";
import SelectMultiple from '../../src/components/SelectMultiple';
import { useForm, Controller } from 'react-hook-form';
import { posts } from "../components/SelectMultiple/posts";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';
import infatecFetch from "../Services/api";
import { useFonts, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
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
  ToastAndroid,
} from "react-native";

export default function TelaDeCadastro() {
  const [hidePass, setHidePass] = useState(true);
  const [hidePassConf, setHidePassConf] = useState(true);

  //Toast cuida da notifições do app
  const showToast = () => {
    console.log("Usuário cadastrado com sucesso")
    ToastAndroid.show(
      "Usuário cadastrado com sucesso",
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    )
  };

  //Toast em caso de erro no cadastro
  const showToastError = () => {
    console.log("Falha ao cadastrar usário")
    ToastAndroid.show(
      "Falha ao cadastrar usário",
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    )
  };

  //O schema cuida das validações dos campos de formularios
  const schema = yup.object().shape({
    ra: yup.string().min(13, "O seu ra tem 13 digitos").required("Informe seu Ra"),
    userName: yup.string().required("Informe seu nome"),
    email: yup
      .string()
      .email("E-mail inválido")
      .matches(/^[a-zA-Z0-9._%+-]+@fatec\.sp\.gov\.br$/, "E-mail deve ser @fatec.sp.gov.br")
      .required("Informe seu e-mail"),
    senha: yup.string().min(8, "Sua senha tem que ter no minimo 8 digitos").required("Informe sua senha"),
    senhaConfirm: yup.string().oneOf([yup.ref('senha'), null], 'As senhas não coincidem'),
  });

  const { control, handleSubmit, formState: { errors, values } } = useForm({
    resolver: yupResolver(schema)
  });

  async function createUser(values) {
    try {
      const data = {
        id: 0,
        ra: values.ra,
        name: values.userName,
        email: values.email,
        password: values.senha,
        type: 0,
        coursesId: 0,
      };

      const response = await infatecFetch.post('/api/Login/CreateUser', data);
      showToast()
      console.log(response.data);
    } catch (error) {
      showToastError()
      console.error(error);
    }
  };

  //const que carrega as fonts
  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  if (!fontLoaded) {
    return null;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.fundoTela}
    >
      <ScrollView>
        <Animatable.View animation="bounceIn" style={styles.fundoFormato}>
          <View>
            <View style={styles.caixaDeTexto}>
              <View style={styles.imagenLogo}>
                <Image
                  source={require('../../assets/imagens/LogoINFASYNCWhiteOF.png')}
                  style={styles.image}
                />
              </View>
              <Text style={styles.textCadastro}>CADASTRO</Text>
              <View style={styles.cursoInput}>
                <SelectMultiple
                  title="Cursos"
                  max={1}
                  options={posts}
                  initinalSelect={[]}
                />
              </View>

              <View>
                <Controller
                  control={control}
                  name="ra"
                  defaultValue=""
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
                  name="userName"
                  defaultValue=""
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
                  name="email"
                  defaultValue=""
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
                  defaultValue=""
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
                  defaultValue=""
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
              <TouchableOpacity style={[styles.button]} onPress={handleSubmit(createUser)}>
                <Text style={styles.buttonText}>CADASTRAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Atribue a estilização do front-end.
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
    marginTop: -85,
    alignItems: "center",
  },

  image: {
    width: 200,
    height: 200,
  },

  textCadastro: {
    fontFamily: 'Ubuntu_400Regular',
    color: "#fff",
    fontSize: 18,
    textAlign: 'center',
    top: "-5%",
    position: "relative",
  },

  caixaDeTexto: {
    backgroundColor: "#162938",
    marginTop: '20%',
    marginEnd: '20%',
    width: '80%',
    marginLeft: '10%',
    marginBottom: '10%',
    borderRadius: 20,
    borderColor: "#162938",
    borderWidth: 2,
  },

  name: {
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    padding: 9,
    color: "#FFFFFF",
    fontFamily: "Ubuntu_400Regular",
    fontSize: 16,
    marginBottom: 20,
  },

  ra: {
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    padding: 9,
    fontFamily: "Ubuntu_400Regular",
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
    fontFamily: "Ubuntu_400Regular",
    fontSize: 16,
    marginBottom: 20,
  },

  senha: {
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    padding: 9,
    color: "#FFFFFF",
    fontFamily: "Ubuntu_400Regular",
    fontSize: 16,
    marginBottom: 20,
  },

  senhaConfirm: {
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    padding: 9,
    color: "#FFFFFF",
    fontFamily: "Ubuntu_400Regular",
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#162938",
    marginLeft: -100,
    marginBottom: 20,
    width: 210,
    left: '50%',
    borderRadius: 20,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    padding: 9,
    textAlign: 'center',
  },

  buttonText: {
    left: 50,
    color: "#FFFFFF",
    fontFamily: "Ubuntu_400Regular",
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
    fontFamily: "Ubuntu_400Regular",
    position: "relative",
  },

  cursoInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
});



