//Os imports  são usados para importar módulos, componentes, estilos e outras dependências necessárias para o funcionamento do aplicativo.
import React from "react";
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
} from "react-native"
import { useFonts, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';

const StatusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

//Uma função que pode ser importada em outro módulo ou arquivo, junto do navigation que é um bibioteca de navigação de telas.
export default function Header() {

    const [fontLoaded] = useFonts({
        Ubuntu_400Regular,
      });
    
      if(!fontLoaded){
        return null;
      }
    
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Bem Vindo(a) de Volta.</Text>
            </View>
        </View>
    )
}

// Atribue a estilização do front-end.
const styles = StyleSheet.create({
    container: {

        backgroundColor: ('#162938'),
        paddingTop: '10%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderColor: "#FFFFFF",
        borderTopColor: "#162938",
        borderWidth: 1,
    },

    title: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 25,
        color: '#FFFFFF',
        textAlign: "center",
        height: 75,
        lineHeight: 30,
    },

})
