//Os imports  são usados para importar módulos, componentes, estilos e outras dependências necessárias para o funcionamento do aplicativo.
import React, {useState, useEffect} from "react";
import { useFonts, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

//Uma função que pode ser importada em outro módulo ou arquivo, junto do navigation que é um bibioteca de navigação de telas.
export default function telaDeOpçoes({ navigation }) {

  const [tipo, setTipo] = useState('');

  useEffect(() => {
    const getTipoFromAsyncStorage = async () => {
      try {
        const tipoArmazenado = await AsyncStorage.getItem('type');
        setTipo(tipoArmazenado);
      } catch (error) {
        console.error(error);
      }
    };

    getTipoFromAsyncStorage();
  }, []);
  
  
  //Const que carrega as Fonts.
  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  if (!fontLoaded) {
    return null;
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.fundoTela}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 3 }}>
        <View>
          <View style={styles.formatoHeader}>
            <View style={styles.imagenLogo}>
              <Animatable.Image
                animation="flipInY"
                delay={300}
                source={require("../../assets/imagens/LogoINFASYNCInLineOF.png")}
                style={styles.image}
              />
            </View>
            <TouchableOpacity style={[styles.buttonNotify]} onPress={() => navigation.openDrawer()} >
              <View style={styles.iconOptions}>
                <Ionicons name="settings" size={30} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text style={styles.textOption}> SELECIONE UMA OPÇÃO</Text>
          </View>

          <Animatable.View
            animation="wobble"
            delay={600}
            style={styles.iconNotification}>
            <Ionicons name="notifications" size={50} color="#162938" />
          </Animatable.View>
          <TouchableOpacity 
          style={[styles.button, tipo === '1' && { opacity: 0.5 }]} 
          onPress={() => navigation.navigate('telaAvisos')}
          disabled={tipo === '1'}
          >
            <Text style={styles.buttonText}>ENVIAR AVISO</Text>
            <View style={[styles.iconArrow, tipo === '1' && { opacity: 0.5 }]}>
              <AntDesign name="arrowright" size={22} color="#fff" />
            </View>
          </TouchableOpacity>

          <Animatable.View
            animation="wobble"
            delay={900}
            style={styles.iconEventos}>
            <MaterialIcons name="event" size={50} color="#162938" />
          </Animatable.View>
          <TouchableOpacity 
          style={[styles.button, tipo === '1' && { opacity: 0.5 }]} 
          onPress={() => navigation.navigate('telaDeEventos')}
          disabled={tipo === '1'}
          >
            <Text style={styles.buttonText}>ENVIAR EVENTO</Text>
            <View style={[styles.iconArrow, tipo === '1' && { opacity: 0.5 }]}>
              <AntDesign name="arrowright" size={22} color="#fff" />
            </View>
          </TouchableOpacity>

          <Animatable.View
            animation="wobble"
            delay={1200}
            style={styles.iconCronogramas}>
            <FontAwesome5 name="book" size={50} color="#162938" />
          </Animatable.View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telaDeCronogramas')}>
            <Text style={styles.buttonText}>CRONOGRAMAS</Text>
            <View style={styles.iconArrow}>
              <AntDesign name="arrowright" size={22} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
//O styles é encarregado de dar a estilização do front-end.
const styles = StyleSheet.create({
  fundoTela: {
    flex: 1,
    backgroundColor: "#FAEBD7",
  },

  formatoHeader: {
    backgroundColor: '#162938',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderColor: "#FFFFFF",
    borderTopColor: "#162938",
    borderWidth: 1,
  },

  imagenLogo: {
    margin: 10,
    width: 220,
    height: 220,
  },

  iconOptions: {
    position: "absolute",
    marginLeft: "85%",
    top: 55,
  },

  buttonNotify: {
    top: -220,
  },

  image: {
    width: '100%',
    height: '100%',
    top: -30,
    resizeMode: "contain",
    marginLeft: 10
  },

  textOption: {
    fontFamily: 'Ubuntu_400Regular,',
    color: "#fff",
    fontSize: 20,
    top: '-10%',
    position: "relative",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#162938",
    marginLeft: -150,
    width: "70%",
    left: '50%',
    borderRadius: 20,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    padding: 12,
    top: '5%',
    margin: 20,
  },

  buttonText: {
    textAlign: 'center',
    color: "#FFFFFF",
    fontFamily: "Ubuntu_400Regular,",
    fontSize: 16,
  },

  iconNotification: {
    alignItems: "center",
    top: '8%',

  },

  iconEventos: {
    alignItems: "center",
    top: "8%",
  },

  iconCronogramas: {
    alignItems: "center",
    top: "8%",
  },

  iconArrow: {
    position: "absolute",
    marginLeft: "85%",
    top: 10,
  }

});
