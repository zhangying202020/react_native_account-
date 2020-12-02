import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/Main'
import Login from './src/Login'
import Tally from './src/Tally'

import Category from './src/add/Category'
import Bills from './src/add/Bills'
import Income from './src/add/Income'
import Expend from './src/add/Expend'
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="Main" component={Main} options={{headerShown:false}}/>
          <Stack.Screen name="Tally" component={Tally} options={{headerShown:false}}/>
          <Stack.Screen name="Category" component={Category} options={{headerShown:false}}/>
          <Stack.Screen name="Bills" component={Bills} options={{headerShown:false}}/>
          <Stack.Screen name="Income" component={Income} options={{headerShown:false}}/>
          <Stack.Screen name="Expend" component={Expend} options={{headerShown:false}}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;