import React, { useState, useEffect } from "react";
import * as Font from 'expo-font';
import {
  AntDesign,
  Feather,
} from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import infatecFetch from '../../Services/api';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const SelectMultiple = ({ title = '', max = '' }) => {
  const [visible, setVisible] = useState(false);
  const [originalOptions, setOriginalOptions] = useState([]);
  const [data, setData] = useState([]);
  const [termo, setTermo] = useState('');
  const [selected, setSelected] = useState([]);

  function renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, {
          backgroundColor: selected?.findIndex(i => i.id === item.id) !== -1 ? '#FAEBD7' : '#FFF'
        }]}
        onPress={() => toggleSelection(item)}
      >
        <Text style={[styles.txt, { fontWeight: selected?.findIndex(i => i.id === item.id) !== -1 ? '600' : '400' }]}>{item?.title}</Text>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    loadFont();
    fetchCourses();
  }, []);

  async function loadFont() {
    await Font.loadAsync({
      'Ubuntu': require('../../../assets/fonts/Ubuntu-Regular.ttf'),
      'JuliusSansOne': require('../../../assets/fonts/JuliusSansOne-Regular.ttf'),
    });
  }
  

 

  async function fetchCourses() {
    try {
      const token = await AsyncStorage.getItem('bearer');
      const response = await infatecFetch.get('/api/Courses/GetAllCourses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log(response.data); // Verifique o valor de response.data
  
      const courses = response.data.data.map((course) => ({
        id: course.id,
        title: course.name,
      }));
      setOriginalOptions(courses);
      setData(courses);
      console.log(courses)
      return courses

    } catch (error) {
      console.error(error);
    }
  }
  function toggleSelection(item) {
    let index = selected.findIndex(i => i?.id === item.id);
    let arrSelected = [...selected];
    if (index !== -1) {
      arrSelected.splice(index, 1);
    } else {
      if (arrSelected.length < max) {
        arrSelected.push(item)
      } else {
        alert('Já foram selecionadas o máximo de matérias');
      }
    }
    setSelected(arrSelected);
  }

  function handleTermoChange(text) {
    setTermo(text);
    const filteredOptions = originalOptions.filter(option =>
      option.title.toLowerCase().includes(text.toLowerCase())
    );
    setData(filteredOptions);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => setVisible(true)}>
      <Text style={styles.textSelect} numberOfLines={1}><Feather name='book' size={22} color='#FFF' /> {selected.length > 0 ? selected.map(p => `${p.title}, `) : 'Selecione um curso'}</Text>
      <AntDesign name='downcircleo' size={22} color='#FFF' />
      <Modal onRequestClose={() => setVisible(false)} visible={visible} animationType="slide" >
        <SafeAreaView style={{ flex: 1 }}>
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

            {originalOptions.length > 10 ?
              <TextInput
                placeholder="  Pesquisar"
                style={styles.input}
                value={termo}
                onChangeText={handleTermoChange}
                placeholderTextColor="#FFF"
              /> : null}
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => renderItem(item)}
          />
        </SafeAreaView>
      </Modal>
    </TouchableOpacity>
  );
};

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
        padding: 9,
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
        color: "#FFF",
        fontFamily: "Ubuntu",
    },

    item: {
        borderRadius: 20,
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: '5%',
        marginHorizontal: '5%',
        top: 5,

    },
    textSelect: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: "Ubuntu",


    }
})

export default SelectMultiple;