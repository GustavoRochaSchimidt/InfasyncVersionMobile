import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,

} from 'react-native';
import Header from '../../components/Header';
import * as Font from 'expo-font';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import * as Animatable from 'react-native-animatable';
//import { useFonts } from 'expo-font';

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
      <Animatable.View
        animation="fadeInDown"
        delay={300}
      >
        <Header />
      </Animatable.View>
      <View style={styles.imageContainer}>
        <Animatable.Image
          animation="flipInY"
          delay={300}
          source={require('../../../assets/imagens/LogoINFASYNCBlackOF.png')}
          style={styles.image}
        />
        <Animatable.View
          animation="flipInY"
          delay={300}
        >
          <Text style={styles.title}>
            <Text style={styles.textInfatec}>INFA</Text>
            <Text style={styles.textFatec}>SYNC</Text>
          </Text>
        </Animatable.View>
        <Animatable.View
          animation="fadeInUp"
          delay={600}
          style={styles.buttonContainer}>
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
        </Animatable.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    paddingHorizontal: 5,
    paddingBottom: getBottomSpace() + 5,
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
    top: '28%',
    width: '80%',
    height: "80%",
    resizeMode: "contain"
  },

  textInfatec: {
    position: 'relative',
    fontFamily: 'JuliusSansOne',
    fontSize: 38,
    color: '#000000',
    textAlign: 'center',
    top: 40,
  },

  textFatec: {
    position: 'relative',
    fontFamily: 'Ubuntu',
    color: '#000000',
    fontSize: 38,
    top: 40,
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
    fontFamily: 'Ubuntu',
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
    fontFamily: 'Ubuntu',
    backgroundColor: '#162938',
    top: '15%',
    borderColor: "#FFFFFF",
    borderWidth: 2,
  },

  button3: {
    backgroundColor: '#FAEBD7',
    top: '30%',
  },

  buttonText2: {
    textDecorationLine: 'underline',
    color: "#000000",
    textAlign: "center"
  },

  title: {
    top: '70%',
  },
});