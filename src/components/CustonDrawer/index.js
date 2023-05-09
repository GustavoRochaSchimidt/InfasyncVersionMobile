import React, { useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Button,
    Text,
    Image,
    StyleSheet,
}
    from "react-native";

import {
    Ionicons,
    AntDesign,
    FontAwesome5,
    FontAwesome,
} from '@expo/vector-icons';


function CustonDrawer({ navigation }) {

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
                <TouchableOpacity>
                    <Text style={styles.perfilUserText}>SAIR</Text>
                    <Ionicons style={styles.perfilIcon} name="md-exit" size={20} color="000" />
                </TouchableOpacity>
            </View>

            <View style={styles.containerTop}>
                <View style={{ marginLeft: "5%", top: 35, position: "absolute" }}>
                    <FontAwesome name="user-circle" size={100} color="#FAEBD7" />
                    <Text style={{ fontSize: 20, top: -85, left: 110, position: "relative", color: "#FFF", fontFamily: "Ubuntu", }}>Gustavo rocha  </Text>
                    <Text style={{ fontSize: 15, top: -80, left: 110, position: "relative", color: "#FFF", fontFamily: "Ubuntu", }}>Ra: 1234567891013</Text>
                    <Text style={{ fontSize: 15, top: -80, left: 110, position: "relative", color: "#FFF", fontFamily: "Ubuntu", }}>E-mail: G@gmail.com</Text>
                </View>
            </View>
        </View>
    )
};

export default CustonDrawer;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FAEBD7",

    },

    containerTop: {
        flex: 2,
        flexDirection: "row",
        backgroundColor: "#162938",
        marginTop: -65,
        marginBottom: "230%"

    },

    perfilUserText: {
        fontFamily: "Ubuntu",
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