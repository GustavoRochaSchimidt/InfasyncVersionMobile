import React from "react";
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
} from "react-native"
import { useEffect } from 'react';

const StatusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header() {
    useEffect(() => {
        loadFont();
       }, []);
      
        async function loadFont() {
          await Font.loadAsync({
           'Ubuntu-Regular': require('../../../assets/fonts/Ubuntu-Regular.ttf'),
          });
        }
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Bem Vindo(a) de Volta.</Text>
            </View>
        </View>
    )
}

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
        fontFamily: 'Ubuntu-Regular',
        fontSize: 25,
        color: '#FFFFFF',
        textAlign: "center",
        height: 75,
        lineHeight: 30,
    },

})
