//Os imports  são usados para importar módulos, componentes, estilos e outras dependências necessárias para o funcionamento do aplicativo.
import React from "react";
import {
    Alert,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
}from "react-native";
import {
    Ionicons,
    AntDesign,
    FontAwesome5,
} from '@expo/vector-icons';
import { useFonts, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';

//Uma função que pode ser importada em outro módulo ou arquivo, junto do navigation que é um bibioteca de navigação de telas.
function CustonDrawer({ navigation }) {

  //const que carrega as fonts.
  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  if(!fontLoaded){
    return null;
  };

    //Const para sair do app
    const handleExitApp = () => {
        Alert.alert(
            'Tem certeza?',
            'Deseja mesmo fechar o aplicativo?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: () => BackHandler.exitApp()
                }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('telaPerfilUser')}>
                    <Text style={styles.perfilUserText}>EDITAR PERFIL</Text>
                    <FontAwesome5 style={styles.perfilIcon} name="user-cog" size={20} color="000" />
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity>
                    <Text style={styles.perfilUserText}>MAIS INFORMAÇÕES</Text>
                    <AntDesign style={styles.perfilIcon} name="infocirlce" size={20} color="000" />
                </TouchableOpacity>
            </View>


            <View>
                <TouchableOpacity onPress={handleExitApp}>
                    <Text style={styles.perfilUserText}>SAIR</Text>
                    <Ionicons style={styles.perfilIcon} name="md-exit" size={20} color="000" />
                </TouchableOpacity>
            </View>

            <View style={styles.containerTop}>
                <View style={{ marginLeft: "5%", top: 35, position: "absolute" }}>
                    <View style={styles.imagenLogo}>
                    <Image
                        source={require("../../../assets/imagens/LogoINFASYNCWhiteOF.png")}
                        style={styles.image}
                    />
                    </View>

                    <Text style={{ fontSize: 15, top: 70, left: 20, position: "relative", color: "#FFF", fontFamily: "Ubuntu_400Regular", }}>E-mail: gustavo@fatec.sp.gov.br</Text>
                </View>
            </View>
        </View>
    )
};

export default CustonDrawer;

// Atribue a estilização do front-end.
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FAEBD7",
        borderRadius: 10,
    },

    imagenLogo: {
        position:"absolute",
        alignItems: "center",
        left: 50,
        marginTop: -55,
      },

    image: {
        width: 150,
        height: 150,
    },

    containerTop: {
        flex: 2,
        flexDirection: "row",
        backgroundColor: "#162938",
        marginTop: -65,
        marginBottom: "230%"

    },

    perfilUserText: {
        fontFamily: "Ubuntu_400Regular",
        position: "relative",
        top: 280,
        left: 40,

    },

    perfilIcon: {
        position: "relative",
        top: 260,
        left: 10,
    },

});