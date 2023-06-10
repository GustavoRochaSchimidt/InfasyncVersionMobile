//Os imports  são usados para importar módulos, componentes, estilos e outras dependências necessárias para o funcionamento do aplicativo.
import React, { useState} from "react";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';
import infatecFetch from "../Services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import {
  AntDesign,
  MaterialCommunityIcons
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
  Platform,
} from 'react-native';

//Uma função que pode ser importada em outro módulo ou arquivo, junto do navigation que é um bibioteca de navigação de telas.
export default function telaDeLogin({ navigation }) {

  //Const com useState para realizar a visibilidade da senha. 
  const [hidePass, setHidePass] = useState(true);

  //Schema da bibioteca hookForm para facilitar a criação da validaçãode fromularios juntamente com yup  
  const schema = yup.object({
    senha: yup.string().required("Informe sua senha"),
    email: yup
      .string()
      .email("E-mail inválido")
      .matches(/^[a-zA-Z0-9._%+-]+@fatec\.sp\.gov\.br$/, "E-mail deve ser @fatec.sp.gov.br")
      .required("Informe seu e-mail"),
  });

  //Notifica o usuário em caso de erro do login
  const showToastError = () => {
    console.log("Falha ao realizar o login")
    ToastAndroid.show(
      "Falha ao cadastrar usário",
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    )
  };

  //Está const rederiza o formulario e apresenta os erros nos campos dos usuario e entrega o valor de cada campo pra a API
  const { control, handleSubmit, formState: { errors, values } } = useForm({
    resolver: yupResolver(schema)
  });

  //Const que trata em caso de erro na senha
  const [loginError, setLoginError] = useState(false);

  //função da API que pega os valores das inputs e repassa para o login.
  async function loginUser(values) {
    try {
      const data = {
        email: values.email,
        password: values.senha
      };
      const response = await infatecFetch.post('/api/Login/LoginUser', data);
      
      //Armazena o token so usuario
      const token = response.data.bearer;
      await AsyncStorage.setItem('bearer', token);
      navigation.navigate('telaDeOpçoes');
    } catch (error) {
      console.error(error);
      setLoginError(true);
      showToastError()
    }
  };

  // Esse useEffect carrega as fonts ultlizadas no front-end do código.
  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  if(!fontLoaded){
    return null;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.fundoTela}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 3 }}>
        <Animatable.View animation="bounceIn" style={styles.fundoFormato}>
          <View>
            <View style={styles.caixaDeTexto}>
              <View style={styles.imagenLogo}>
                <Image
                  source={require("../../assets/imagens/LogoINFASYNCWhiteOF.png")}
                  style={styles.image}
                />
              </View>
              <Text style={styles.textEntrar}> ENTRAR</Text>
              <View>
                <Controller
                  control={control}
                  name="email"
                  defaultValue=""
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                      style={[styles.email, {
                        paddingLeft: 30,
                        borderColor: errors.email ? '#ff375b' : 'white',
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

                <View style={styles.iconUser}>
                  <MaterialCommunityIcons name="email-outline" size={22} color="#FFF" />
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
                
                {loginError && (
                  <Text style={styles.inputError}>Usuário ou senha incorretos</Text>
                )}

                <View style={styles.iconLock}>
                  <AntDesign name="lock1" size={22} color="#FFF" />
                </View>
                <TouchableOpacity style={styles.iconEye} onPress={() => setHidePass(!hidePass)}>
                  {hidePass ?
                    <AntDesign name="eye" size={22} color="#FFF" />
                    :
                    <AntDesign name="eyeo" size={22} color="#FFF" />
                  }
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={[styles.trocar, styles.button2]} onPress={() => navigation.navigate('telaDeRecuperacao')}>
                  <Text style={styles.buttonText2}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('telaDeOpçoes')}>
                <Text style={styles.buttonText}>LOGIN</Text>
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
    top: "5%",
  },

  imagenLogo: {
    alignItems: "center",
    marginTop: -85,
  },

  image: {
    width: 200,
    height: 200,
  },

  textEntrar: {
    fontFamily: 'Ubuntu_400Regular',
    color: "#fff",
    fontSize: 18,
    textAlign: 'center',
    top: '-10%',
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

  email: {
    height: 50,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 20,
    padding: 9,
    marginBottom: 20,
    fontFamily: "Ubuntu_400Regular",
    fontSize: 16,
    color: "#FFF",
  },

  senha: {
    height: 50,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 20,
    padding: 9,
    marginBottom: 20,
    color: "#FFFFFF",
    fontFamily: "Ubuntu_400Regular",
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
    top: '10%',
  },

  buttonText: {
    textAlign: 'center',
    color: "#FFFFFF",
    fontFamily: "Ubuntu_400Regular",
    fontSize: 16,
  },

  buttonText2: {
    top: '-40%',
    left: '5%',
    textDecorationLine: 'underline',
    fontFamily: "Ubuntu_400Regular",
    fontSize: 16,
    color: "#FFF",
    position: "relative",
  },

  trocar: {
    color: '#FFFFFF',
  },

  iconUser: {
    top: '17%',
    left: 5,
    position: 'absolute',
  },

  iconLock: {
    top: '15%',
    left: 5,
    position: 'absolute',
  },

  iconEye: {
    width: '15%',
    top: 15,
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
});
