//Os imports  são usados para importar módulos, componentes, estilos e outras dependências necessárias para o funcionamento do aplicativo.
import Home from "./src/pages/Home/index";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, } from '@react-navigation/native';
import telaDeCadastro from "./src/screens/telaDeCadastro";
import telaDeLogin from "./src/screens/telaDeLogin";
import telaDeOpçoes from "./src/screens/telaDeOpçoes";
import telaDePerfilUser from "./src/screens/telaDePerfilUser";
import telaDeAvisos from "./src/screens/telaDeAvisos";
import telaDeEventos from "./src/screens/telaDeEventos";
import telaDECronogramas from "./src/screens/telaDeCronogramas";
import telaDeRecuperacao from "./src/screens/telaDeRecuperacao";
import telaDePosRecuperacao from "./src/screens/telaDePosRecuperacao";
import telaDeEditarSenha from "./src/screens/telaDeEditarSenha";
import CustonDrawer from "./src/components/CustonDrawer";

//Const que chamam as funções ultilizadas no dispositivo.
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//Esta fução carrega as telas em formato de pilha.
function MyStack() {
  return (
    //Tela inicial que o APP vai carregar.
    <Stack.Navigator initialRouteName="Home"> 
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }} //Tira o header da tela.
        component={Home} />

      <Stack.Screen
        name="telaDeCadastro"
        options={{ //estiliza o header.
          title: "Voltar",
          headerStyle: {
            backgroundColor: "#FAEBD7",
          },
          headerTintColor: "#000000",

        }}
        component={telaDeCadastro} />

      <Stack.Screen
        name="telaDeLogin"
        options={{
          title: "Voltar",
          headerStyle: {
            backgroundColor: "#FAEBD7",
          },
          headerTintColor: "#000000",

        }}
        component={telaDeLogin} />

      <Stack.Screen
        name="telaDeOpçoes"
        component={MyDrawer}
        options={{ headerShown: false }}

      />

      <Stack.Screen
        name="telaPerfilUser"
        component={telaDePerfilUser}
        options={{
          title: "Voltar",
          headerStyle: {
            backgroundColor: "#FAEBD7",
          },
          headerTintColor: "#000000",

        }}
      />

      <Stack.Screen
        name="telaAvisos"
        component={telaDeAvisos}
        options={{
          title: "Voltar",
          headerStyle: {
            backgroundColor: "#FAEBD7",
          },
          headerTintColor: "#000000",

        }}
      />

      <Stack.Screen
        name="telaDeCronogramas"
        component={telaDECronogramas}
        options={{
          title: "Voltar",
          headerStyle: {
            backgroundColor: "#FAEBD7",
          },
          headerTintColor: "#000000",

        }}
      />

      <Stack.Screen
        name="telaDeEventos"
        component={telaDeEventos}
        options={{
          title: "Voltar",
          headerStyle: {
            backgroundColor: "#FAEBD7",
          },
          headerTintColor: "#000000",

        }}
      />

      <Stack.Screen
        name="telaDeRecuperacao"
        component={telaDeRecuperacao}
        options={{
          title: "Voltar",
          headerStyle: {
            backgroundColor: "#FAEBD7",
          },
          headerTintColor: "#000000",
        }}
      />

      <Stack.Screen
        name="telaDePosRecuperacao"
        component={telaDePosRecuperacao}
        options={{
          title: "Voltar",
          headerStyle: {
            backgroundColor: "#FAEBD7",
          },
          headerTintColor: "#000000",
        }}
      />

      <Stack.Screen
        name="telaDeEditarSenha"
        component={telaDeEditarSenha}
        options={{
          title: "Voltar",
          headerStyle: {
            backgroundColor: "#FAEBD7",
          },
          headerTintColor: "#000000",
        }}
      />

    </Stack.Navigator>
  );
};

//Função que aplica o efeito de gaveta na tela de Opçoes.
function MyDrawer() {
  return (
    //Pega a propriedade do drawer.
    <Drawer.Navigator drawerContent={(props) => <CustonDrawer {...props} />}
    >
      <Drawer.Screen
        name="drawerTelaDeOpçoes"
        component={telaDeOpçoes}
        options={{
          headerShown: false,
          contentComponent: CustonDrawer,
        }}
      />
    </Drawer.Navigator>
  );
};

//Carrega o App.js
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};



