//Os imports são usados para importar módulos, componentes, estilos e outras dependências necessárias para o funcionamento do aplicativo.
import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    Linking,
} from "react-native";
import {
    Ionicons,
    AntDesign,
    FontAwesome5,
} from '@expo/vector-icons';
import { useFonts, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";


//Uma função que pode ser importada em outro módulo ou arquivo, junto do navigation que é um biblioteca de navegação de telas.
function CustomDrawer({ navigation }) {

    //Const que traz o email da outra tela.
    const route = useRoute();
    const { email } = route.params;


    //const que carrega as fonts.
    const [fontLoaded] = useFonts({
        Ubuntu_400Regular,
    });

    if (!fontLoaded) {
        return null;
    };

    //botão mais informações
    function handleMaisInformacoesPress() {
        const url = 'http://localhost:3000/adm';
        Linking.openURL(url);
    }


    //Const para sair do app
    const handleLogout = async () => {
        try {

            // Exemplo de remoção do token:
            await AsyncStorage.removeItem("token");

            // Navegue para a tela inicial
            navigation.navigate("Home");
        } catch (error) {
            // Lide com o erro, se necessário
            console.log(error);
        }
    };


    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('telaDeEditarSenha', { email: email })}>
                    <Text style={styles.perfilUserText}>EDITAR PERFIL</Text>
                    <FontAwesome5 style={styles.perfilIcon} name="user-cog" size={20} color="000" />
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity onPress={handleMaisInformacoesPress}>
                    <Text style={styles.perfilUserText}>MAIS INFORMAÇÕES</Text>
                    <AntDesign style={styles.perfilIcon} name="infocirlce" size={20} color="#000" />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={handleLogout}>
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

                    <Text style={{ fontSize: 15, top: 70, left: 20, position: "relative", color: "#FFF", fontFamily: "Ubuntu_400Regular", }}>
                        E-mail: {email}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default CustomDrawer;

// Atribui a estilização do front-end.
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FAEBD7",
        borderRadius: 10,
    },

    imagenLogo: {
        position: "absolute",
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
