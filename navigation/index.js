import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import LandingScreen from 'Test1/screens/Landing';
import MainScreen from 'Test1/screens/Main';
import AddUser from 'Test1/screens/AddUser';
import EditUser from 'Test1/screens/EditUser';

import {Provider} from "react-redux";
import store from "Test1/redux/store"

const Stack = createNativeStackNavigator();

function App() {
  return (
      <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen 
            name="Landing" 
            component={LandingScreen} 
            options={{  
                headerShown: false,  
            }}   
        />
        <Stack.Screen 
            name="Main" 
            component={MainScreen} 
            options={{ title: 'สมาชิก' }}
        />
        <Stack.Screen 
            name="AddUser" 
            component={AddUser} 
            options={{ title: 'เพิ่มสมาชิก' }}
        />
        <Stack.Screen 
            name="EditUser" 
            component={EditUser} 
            options={{ title: 'แก้ไขสมาชิก' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;