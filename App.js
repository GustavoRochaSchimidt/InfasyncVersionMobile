import Home from "./src/pages/Home/index";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import telaDeCadastro from "./src/screens/telaDeCadastro";
import telaDeLogin from "./src/screens/telaDeLogin";
import telaDeOpçoes from "./src/screens/telaDeOpçoes";

const Stack = createStackNavigator();

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
          component={telaDeOpçoes}
          options={{ headerShown: false }}

        />

    </Stack.Navigator>
  );
}

export default function App() {
  return (

    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}



