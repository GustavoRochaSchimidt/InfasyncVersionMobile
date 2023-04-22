import React from "react";
import * as Font from 'expo-font';
import {
    AntDesign,
    Feather,
} from '@expo/vector-icons';

import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    TextInput,

} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


const SelectMultiple = ({ options = [], onChange, initinalSelect = [], title = '', max = '' }) => {
    const [visible, setVisible] = useState(false);
    const [originalOpitions, setOriginalOptions] = useState([...options]);
    const [data, setData] = useState([...options])
    const [termo, setTermo] = useState('')
    const [selected, setSelected] = useState([...initinalSelect])

    function renderItem(item) {
        return (
            <TouchableOpacity
                style={[styles.item, {
                    backgroundColor:selected?.findIndex(i=>i.id == item.id) != -1 ? '#FAEBD7' : '#FFF'
                }]}
                onPress={() => toggleSelection(item)}
            >
                <Text style={[styles.txt, {fontWeight: selected?.findIndex(i=>i.id == item.id) != -1 ? '600' : '400'}]}>{item?.title}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        setOriginalOptions(options)
        setData(options)
    }, [options])

    useEffect(() => {
        let arr = [...originalOpitions];
        setData(arr.filter(i =>
            i.title.toLowerCase().includes(termo.toLowerCase())) ||
            i.body.toLowerCase().includes(termo.toLowerCase()))
    }, [termo])


    useEffect(() => {
        loadFont();
    }, []);

    async function loadFont() {
        await Font.loadAsync({
            'Ubuntu': require('../../../assets/fonts/Ubuntu-Regular.ttf'),
            'JuliusSansOne': require('../../../assets/fonts/JuliusSansOne-Regular.ttf'),
        });
    }

    function toggleSelection(item) {
        let index = selected.findIndex(i => i?.id == item.id);
        let arrSelected = [...selected];
        if (index != -1) {
            arrSelected.splice(index, 1);
        } else {
            if (arrSelected.length < max) {
                arrSelected.push(item)
            } else {
                alert('já foram selecionadas o maximo de matérias')
            }
        }
        setSelected(arrSelected)
    }


    return <TouchableOpacity style={styles.container} onPress={() => setVisible(true)}>
        <Text style={styles.textSelect}numberOfLines={1}><Feather name='book' size={22} color='#FFF' /> {selected.length > 0 ? selected.map(p=>`${p.title}, `): 'Selecione um curso'}</Text>
        <AntDesign name='downcircleo' size={22} color='#FFF' />
        <Modal onRequestClose={() => setVisible(false)} visible={visible} animationType="slide" >
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.header}>
                    <View style={styles.headerR1}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={styles.back}>Voltar</Text>
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.subtitle}>{`Selecione até ${max} opções`}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.finsh}>Concluir</Text>
                        </TouchableOpacity>
                    </View>

                    {originalOpitions.length > 10 ?
                        <TextInput
                            placeholder="  Pesquisar"
                            style={styles.input}
                            value={termo}
                            onChangeText={setTermo}
                            placeholderTextColor="#FFF"

                        /> : null}
                </View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => renderItem(item)}


                />


            </SafeAreaView >
        </Modal>
    </TouchableOpacity>

}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderRadius: 20,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        paddingHorizontal: 10,
        padding: 10,
        width: '100%',
        top: -25
    },

    header: {
        backgroundColor: "#FAEBD7",
        padding: 10,

    },

    headerR1: {
        backgroundColor: "#FAEBD7",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",

    },
    back: {
        fontSize: 15,
        fontFamily: "Ubuntu",
       
    },
    title: {
        fontSize: 18,
        fontFamily: "Ubuntu",
        textAlign: "center",
       
    },

    finsh: {
        fontSize: 15,
        fontFamily: "Ubuntu",
    },

    subtitle: {
        fontSize: 16,
        fontFamily: "Ubuntu",
        textAlign: "center",
    },
    input: {
        backgroundColor: "#162938",
        marginTop: '10%',
        width: '100%',
        borderRadius: 20,
        borderColor: "#fff",
        borderWidth: 2,
        height: 40,
        color:"#FFF",
        fontFamily: "Ubuntu",
    },

    item: {
        borderRadius: 20,
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: '5%',
        marginHorizontal:'5%',
        top: 5,

    },
    textSelect:{
        color: '#FFF',
        fontSize: 16,
        fontFamily: "Ubuntu",
        
    }
})

export default SelectMultiple;