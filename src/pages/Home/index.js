import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import Header from '../../components/Header';
  import * as Font from 'expo-font';
  import { useEffect } from 'react';
  import { useNavigation } from '@react-navigation/native';
  
  export default function Home() {
    const navigation = useNavigation({});
  
    useEffect(() => {
      loadFont();
    }, []);
  
    async function loadFont() {
      await Font.loadAsync({
        'Ubuntu': require('../../../assets/fonts/Ubuntu-Regular.ttf'),
        'JuliusSansOne': require('../../../assets/fonts/JuliusSansOne-Regular.ttf'),
      });
    }
  
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.imageContainer}>
          <Image
            source={require('C:/Users/gusta/Projeto_Infatec_mobile_OF/assets/LogoInfatecBlack.png')}
            style={styles.image}
          />
          <View>
            <Text style={styles.title}>
              <Text style={styles.textInfatec}>IN</Text>
              <Text style={styles.textFatec}>FATEC</Text>
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.button1]}
              onPress={() => navigation.navigate('telaDeLogin')}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.button2]}
              onPress={() => navigation.navigate('telaDeCadastro')}
            >
              <Text style={styles.buttonText}>CADASTRE-SE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.button3]}
              onPress={() => alert('Botão pressionado')}
            >
              <Text style={styles.buttonText2}>MAIS INFORMAÇÕES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAEBD7',
    },
    imageContainer: {
      position: 'relative',
      width: '45%',
      height: '30%',
      top: '10%',
      left: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '70%',
      top: '30%',

    },
    textInfatec: {
      position: 'absolute',
      fontFamily: 'JuliusSansOne',
      fontSize: 38,
      color: '#000000',
      textAlign: 'center',
    
    },
    textFatec: {
      fontFamily: 'Ubuntu',
      color: '#000000',
      fontSize: 38,
    },
    buttonContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      top: '70%',
    },
    button: {
      padding: '5%',
      borderRadius: 30,
      width: 255,
      height: 50,
    },
    buttonText: {
      fontFamily: 'Ubuntu-Regular',
      color: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    button1: {
      backgroundColor: '#162938',
      borderColor: "#FFFFFF",
      borderWidth: 2,
    },
    button2: {
      backgroundColor: '#162938',
      top: '15%',
      borderColor: "#FFFFFF",
      borderWidth: 2,
    },
    button3: {
      backgroundColor: '#FAEBD7',
      top: '30%',
    },
    buttonText2:{
      textDecorationLine:'underline',
      color: "#000000",
      textAlign: "center"
    },

    title:{
      top: '160%',
    },
  });
  