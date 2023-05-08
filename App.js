import Home from "./src/pages/Home/index";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, } from '@react-navigation/native';
import telaDeCadastro from "./src/screens/telaDeCadastro";
import telaDeLogin from "./src/screens/telaDeLogin";
import telaDeOpçoes from "./src/screens/telaDeOpçoes";
import telaDePerfilUser from "./src/screens/telaDePerfilUser";
import CustonDrawer from "./src/components/CustonDrawer";
import { View } from "react-native-animatable";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home} />

      <Stack.Screen
        name="telaDeCadastro"
        options={{
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
    </Stack.Navigator>
  );
};

function MyDrawer() {
  return (
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

export default function App() {
  return (

    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};



