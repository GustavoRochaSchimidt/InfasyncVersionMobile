//Os imports  são usados para importar módulos, componentes, estilos e outras dependências necessárias para o funcionamento do aplicativo.
import React, { useEffect, useState } from "react";
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import infatecFetch from '../Services/api';
import { Picker } from '@react-native-picker/picker';
import { useFonts, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import { TextInputMask } from 'react-native-masked-text';
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
import { Ionicons } from '@expo/vector-icons';

//Uma função que pode ser importada em outro módulo ou arquivo, junto do navigation que é um bibioteca de navigação de telas.
export default function TelaDeCronogramas() {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [coursesData, setCoursesData] = useState([]);

  //Guarda os valores de todos os itens que desejam sem auterados sobre os cursos
  const [nomeCurso, setNomeCurso] = useState("");
  const [andar, setAndar] = useState("");
  const [materia, setMateria] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaTermino, setHoraTermino] = useState("");
  const [nomeProfessor, setNomeProfessor] = useState("");

  //Const que faz o GET da API para trazer os cursos
  const getCourses = async () => {
    try {
      const token = await AsyncStorage.getItem('bearer');
      const response = await infatecFetch.get('/api/Courses/GetAllCourses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const coursesData = response.data.data.map((course) => ({
        Id: course.id,
        Curso: course.name,
      }));
      console.log(coursesData)

      setCoursesData(coursesData);
      setCourses(coursesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  //Carrega as font da letras no front-end
  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  if (!fontLoaded) {
    return null;
  }

  //Const para abrir a livraria do aparelho e selecionar o excel
  const handleDocumentPicker = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({ type: "application/vnd.ms-excel" });
      if (document.type === "success") {
        setSelectedFile(document);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Const traforma os dados em formdata e manda para a API fazer o POST e adcionar todos os cursos.
  const handleSendDocument = async () => {
    if (!selectedFile) {
      return;
    }
    const fileUri = selectedFile.uri;
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, selectedFile.name);

    try {
      const token = await AsyncStorage.getItem('bearer');
      await infatecFetch.post('/api/Courses/InsertNewCourseByXLSX', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(formData);
      console.log("Excel com cursos enviado com sucesso")
    } catch (error) {
      console.error(error);
    }
  };

  //Const que busca na API os cursos e deleta todos os cursos
  const deleteCourses = async () => {
    try {
      const token = await AsyncStorage.getItem('bearer');
      await infatecFetch.delete('/api/Courses/DeleteAllCourses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("Excel com cursos deletados com sucesso");
    } catch (error) {
      console.error(error);
    }
  };

  //Pergunta sem tem certaza que deseja deletar tudos os cursos
  const handleDeleteAllCourses = () => {
    const shouldDelete = window.confirm('Tem certeza de que deseja deletar todos os cursos?');
    if (shouldDelete) {
      deleteCourses();
    }
  };

  //Envia os novos dados para a API
  const handleEnviar = async () => {
    const dados = {
      id: selectedValue,
      name: nomeCurso,
      period: selectedValue2,
      matter: materia,
      start: horaInicio,
      end: horaTermino,
      floor: andar,
      coordinator: nomeProfessor
    };

    console.log(dados)

    try {
      const token = sessionStorage.getItem('bearer');

      const response = await infatecFetch.put(`/api/Courses/UpdateCourse`, dados, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Curso editado com sucesso:', response.data);
      // Realize as ações necessárias após o envio bem-sucedido, se necessário
    } catch (error) {
      console.error('Erro ao editar curso:', error);
      // Realize as ações necessárias em caso de erro, se necessário
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.containerFundoTela}
      >
        <View style={styles.imagenLogo}>
          <Image
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
          <Picker
            style={styles.selectPicker}
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Selecione um curso" value="" />
            {coursesData.map((course) => (
              <Picker.Item key={course.Id} label={course.Curso} value={course.Id} />
            ))}
          </Picker>
        </View>
        <View>
          <Picker
            style={styles.selectPicker2}
            selectedValue={selectedValue2}
            onValueChange={(itemValue) => setSelectedValue2(itemValue)}
          >
            <Picker.Item label="Selecione o Horario" value="" />
            <Picker.Item label="Diurno" value="diurno" />
            <Picker.Item label="Noturno" value="noturno" />
          </Picker>
        </View>
        <View>
          <TextInput
            style={styles.inputName}
            placeholder="Nome do curso"
            placeholderTextColor="#000"
            value={nomeCurso}
            onChangeText={setNomeCurso}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputName}
            placeholder="Andar"
            placeholderTextColor="#000"
            value={andar}
            onChangeText={setAndar}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputName}
            placeholder="Matéria"
            placeholderTextColor="#000"
            value={materia}
            onChangeText={setMateria}
          />
        </View>
        <View>
          <TextInputMask
            style={styles.inputHoraInicio}
            placeholder="Horario de inicio"
            placeholderTextColor="#000"
            value={horaInicio}
            onChangeText={setHoraInicio}
            type={'datetime'}
            options={{
              format: 'HH:mm',
            }}
          />
        </View>
        <View>
          <TextInputMask
            style={styles.inputHoraTerm}
            placeholder="Horario de término"
            placeholderTextColor="#000"
            value={horaTermino}
            onChangeText={setHoraTermino}
            type={'datetime'}
            options={{
              format: 'HH:mm',
            }}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputNameProf}
            placeholder="Nome do professor"
            placeholderTextColor="#000"
            value={nomeProfessor}
            onChangeText={setNomeProfessor}
          />
        </View>
        <View style={styles.containerEnviar}>
          <TouchableOpacity style={styles.buttonEnviar} onPress={handleEnviar} >
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
          <Text style={styles.text2}>É necessário que o documento esteja preenchido na seguinte ordem:</Text>
        </View>
        <View style={styles.iconLock}>
          <Ionicons name="warning" size={22} color="#000" />
        </View>

        <View>
          <Text style={styles.text3}>Curso, Período, Horário de Início, horário de término, Nome, Matéria e Andar.</Text>
        </View>

        <View>
          <Image
            source={{
              uri:
                "https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png",
            }}
          />
          <Text style={styles.textAnexar}>Anexar Excel:</Text>
          <View style={styles.containerAnexar}>
            <View>
              <TouchableOpacity
                style={styles.buttonAnexar}
                onPress={handleDocumentPicker}
              >
                <Text style={styles.styleTextAdd}>Adicionar Arquivo</Text>
              </TouchableOpacity>
              <Text style={styles.textNehum}>
                {selectedFile ? selectedFile.name : "Nenhum arquivo selecionado"}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.buttonEnviar2}
            onPress={handleSendDocument}
          >
            <Text style={styles.textEnviar2}>Enviar Todos os Cronogramas</Text>
          </TouchableOpacity>
        </View>

        <View >
          <TouchableOpacity
            style={styles.buttonEnviar3}
            onPress={handleDeleteAllCourses}
          >
            <Text style={styles.textEnviar3}>Deletar Todos os Cronogramas</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </ScrollView>
  );
}



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
    fontFamily: "Ubuntu_400Regular",
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
    color: "#000",
    fontFamily: "Ubuntu_400Regular",
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
    color: "#000",
    fontFamily: "Ubuntu_400Regular",
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
    color: "#000",
    fontFamily: "Ubuntu_400Regular",
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
    color: "#000",
    fontFamily: "Ubuntu_400Regular",
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
    fontFamily: "Ubuntu_400Regular",
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
    fontFamily: "Ubuntu_400Regular",
    fontSize: 16,
    top: -90,
    left: 20,
  },

  text2: {
    position: "relative",
    fontFamily: "Ubuntu_400Regular",
    fontSize: 12,
    top: -90,
    left: 20,
    color: "red"
  },

  text3: {
    position: "relative",
    fontFamily: "Ubuntu_400Regular",
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
    fontFamily: "Ubuntu_400Regular",
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
    fontFamily: "Ubuntu_400Regular",
    marginLeft: 20,
    position: "absolute",
    color: "#fff",
  },

  textNehum: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 15,
    position: "absolute",
    top: 10,
    left: 180,
  },

  buttonEnviar2: {
    textAlign: "center",
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
    textAlign: "center",
    position: "absolute",
    color: "#fff",
    fontFamily: "Ubuntu_400Regular",
    alignItems: "center",
    alignContent: "center"
  },

  buttonEnviar3: {
    textAlign: "center",
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
    textAlign: "center",
    position: "absolute",
    color: "#fff",
    fontFamily: "Ubuntu_400Regular",
    alignItems: "center",
    alignContent: "center"
  },


});

