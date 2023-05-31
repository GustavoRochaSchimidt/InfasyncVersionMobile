import React, { useEffect, useState, useRef } from "react";
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import infatecFetch from '../Services/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Image,
} from "react-native";

import {
    Ionicons,
    AntDesign,
} from '@expo/vector-icons';

export default function telaDECronogramas() {

    useEffect(() => {
        loadFont();
    }, []);

    async function loadFont() {
        await Font.loadAsync({
            Ubuntu: require("../../assets/fonts/Ubuntu-Regular.ttf"),
            JuliusSansOne: require("../../assets/fonts/JuliusSansOne-Regular.ttf"),
        });
    }


    const [selectedValue, setSelectedValue] = useState('');
    const [selectHorario, setSelectHorario] = useState('');
    return (

        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.containerFundoTela}

            >
                <View style={styles.imagenLogo}>
                    <Animatable.Image
                        animation="flipInY"
                        delay={300}
                        source={require("../../assets/imagens/LogoINFASYNCInLineBlack.png")}
                        style={styles.image}
                    />
                </View>
                <View>
                    <View style={styles.divider} />
                    <View>
                        <Text style={styles.textCronogramas}>CRONOGRAMAS</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Picker
                            style={styles.selectPicker}
                            placeholder="Selecione a matéria"
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedValue(itemValue)

                            }
                        >
                            <Picker.Item label="Opção 1" value="option1" />
                            <Picker.Item label="Opção 2" value="option2" />
                            <Picker.Item label="Opção 3" value="option3" />
                        </Picker>
                    </View>
                    <View>
                        <Picker
                            style={styles.selectPicker2}
                            placeholder="Selecione o horário do curso"
                            selectedValue={selectHorario}
                            onValueChange={(itemHorario, itemHorarioIndex) =>
                                setSelectHorario(itemHorario)
                            }
                        >
                            <Picker.Item label="Diurno" value="option1" />
                            <Picker.Item label="Noturno" value="option2" />
                        </Picker>
                    </View>
                </View>
                <View>
                    <TextInput
                        style={styles.inputName}
                        placeholder='Nome do curso'
                        placeholderTextColor='#000'
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.inputName}
                        placeholder='Andar'
                        placeholderTextColor='#000'
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.inputName}
                        placeholder='Matéria'
                        placeholderTextColor='#000'
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.inputHoraInicio}
                        placeholder='Horario de inicio'
                        placeholderTextColor='#000'
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.inputHoraTerm}
                        placeholder='Horario de término'
                        placeholderTextColor='#000'
                    />
                </View>

                <View>
                    <TextInput
                        style={styles.inputNameProf}
                        placeholder='Nome do professor'
                        placeholderTextColor='#000'
                    />
                </View>

                <View style={styles.containerEnviar}>
                    <TouchableOpacity
                        style={styles.buttonEnviar}
                    >
                        <Text style={styles.textEnviar}>Enviar</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.divider} />
                <View>
                    <Text style={styles.text1}>Para carregar todos os cronogramas insira um Excel.</Text>
                </View>

                <View style={styles.iconLock1}>
                    <Ionicons name="warning" size={22} color="#000" />
                </View>
                <View>
                    <Text style={styles.text2}>É necessario que o documento esteja preenchido na seguinte ordem</Text>
                </View>
                <View style={styles.iconLock}>
                    <Ionicons name="warning" size={22} color="#000" />
                </View>

                <View>
                    <Text style={styles.text3}>Curso, Período, Horário de Início, horário de término, Nome, Matéria e Andar</Text>
                </View>

                <View>
                    <Image
                        //ref={imageRef}
                        source={{
                            uri:
                                "https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png",
                        }}
                        style={{
                            // width: 410,
                            // height: 300,
                            // borderRadius: 20,
                            // backgroundColor: "#000",
                            // position: "absolute"
                        }}
                    />
                    <Text style={styles.textAnexar}>Anexar Excel:</Text>
                    <View style={styles.containerAnexar}>
                        <View>
                            <TouchableOpacity
                                style={styles.buttonAnexar}
                            //onPress={handleImagePicker}
                            >
                                <Text style={styles.styleTextAdd}>Adicionar Arquivo</Text>
                            </TouchableOpacity>
                            <Text style={styles.textNehum}>
                                {"Nenhum arquivo selecionado"}
                            </Text>
                        </View>
                    </View>
                </View>


                <View>
                    <TouchableOpacity
                        style={styles.buttonEnviar2}
                    >
                        <Text style={styles.textEnviar2}>Enviar Todos os Cronogramas</Text>
                    </TouchableOpacity>

                </View>


                <View >
                    <TouchableOpacity
                        style={styles.buttonEnviar3}
                    >
                        <Text style={styles.textEnviar3}>Deletar Todos os Cronogramas</Text>
                    </TouchableOpacity>

                </View>


            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({

    containerFundoTela: {
        flex: 1,
        backgroundColor: "#FAEBD7",
    },

    imagenLogo: {
        left: 100,
        width: 230,
        height: 230,
    },

    image: {
        width: "100%",
        height: "100%",
        top: -60,
        resizeMode: "contain",
    },

    textCronogramas: {
        position: "relative",
        left: 100,
        top: -85,
        fontSize: 30,
        color: "#000",
        fontFamily: "Ubuntu",
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
    },

    selectPicker: {
        left: 35,
        top: -35,
        width: 170,
        height: 45,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        alignContent: "center",
        position: "relative",
    },

    inputName: {
        position: "relative",
        top: -60,
        left: 35,
        width: 350,
        height: 45,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
        fontSize: 16,
        backgroundColor: "#FFF",
        marginBottom: 20,
    },

    inputHoraInicio: {
        position: "relative",
        top: -60,
        left: 35,
        width: 170,
        height: 45,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
        fontSize: 16,
        backgroundColor: "#FFF",
        marginBottom: 20,
    },

    inputHoraTerm: {
        position: "relative",
        top: -125,
        left: 210,
        width: 170,
        height: 45,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
        fontSize: 16,
        backgroundColor: "#FFF",
        marginBottom: 20,
    },

    selectPicker2: {
        left: 210,
        top: -80,
        width: 170,
        height: 45,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        alignContent: "center",
        position: "relative",
    },

    inputNameProf: {
        position: "relative",
        top: -120,
        left: 35,
        width: 350,
        height: 45,
        borderWidth: 2,
        borderRadius: 10,
        padding: 9,
        color: "#FFFFFF",
        fontFamily: "Ubuntu",
        fontSize: 16,
        backgroundColor: "#FFF",
        marginBottom: 20,
    },

    buttonEnviar: {
        borderBottomColor: "#000",
        width: 180,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        left: "28%",
        top: -120,
        backgroundColor: "#162938",
        alignItems: "center",
        alignContent: "center",
        positon: "relative",
    },

    textEnviar: {
        position: "absolute",
        top: 10,
        color: "#fff",
        fontFamily: "Ubuntu",
        alignItems: "center",
        alignContent: "center"
    },

    divider: {
        top: -100,
        borderBottomWidth: 3,
        borderBottomColor: '#000',
        width: '100%',
    },

    text1: {
        position: "relative",
        fontFamily: "Ubuntu",
        fontSize: 16,
        top: -90,
        left: 20,
    },

    text2: {
        position: "relative",
        fontFamily: "Ubuntu",
        fontSize: 12,
        top: -90,
        left: 20,
        color: "red"
    },

    text3: {
        position: "relative",
        fontFamily: "Ubuntu",
        fontSize: 16,
        top: -90,
        textAlign: "center",
    },

    iconLock1: {
        top: -70,
    },

    iconLock: {
        top: -110,
        left: 393,
    },

    textAnexar: {
        top: -60,
        position: "relative",
        marginLeft: 10,
        fontSize: 20,
        color: "#000",
        fontFamily: "Ubuntu",
        fontWeight: "bold",
    },

    containerAnexar: {
        top: -50,
        borderRadius: 10,
        backgroundColor: "#FFF",
        borderColor: "#000",
        borderWidth: 1,
        height: 40,
        margin: 5,
    },

    buttonAnexar: {
        borderBottomColor: "#000",
        width: 150,
        height: 25,
        borderWidth: 1,
        borderRadius: 10,
        left: 20,
        top: 7,
        backgroundColor: "#162938",
    },

    styleTextAdd: {
        fontFamily: "Ubuntu",
        marginLeft: 20,
        position: "absolute",
        color: "#fff",
    },

    textNehum: {
        fontFamily: "Ubuntu",
        fontSize: 15,
        position: "absolute",
        top: 10,
        left: 180,
    },

    buttonEnviar2: {
        textAlign:"center",
        borderBottomColor: "#000",
        width: 180,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        left: "5%",
        top: -10,
        backgroundColor: "#162938",
        alignItems: "center",
        alignContent: "center",
        positon: "relative",
    },

    textEnviar2: {
        textAlign:"center",
        position: "absolute",
        color: "#fff",
        fontFamily: "Ubuntu",
        alignItems: "center",
        alignContent: "center"
    },

    buttonEnviar3: {
        textAlign:"center",
        borderBottomColor: "#000",
        width: 180,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        left: "50%",
        top: -50,
        backgroundColor: "red",
        alignItems: "center",
        alignContent: "center",
        positon: "relative",
    },

    textEnviar3: {
        textAlign:"center",
        position: "absolute",
        color: "#fff",
        fontFamily: "Ubuntu",
        alignItems: "center",
        alignContent: "center"
    },


});

