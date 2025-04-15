import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemListScreen from '../screens/ItemListScreen';
import AddEditItemScreen from '../screens/AddEditItemScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ItemListScreen} />
        <Stack.Screen name="Add/Edit Item" component={AddEditItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
