import React from 'react';

import {Follows} from '../screens/Follows';
import {Search} from '../screens/Search';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UsersList} from '../screens/UsersList';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Follows" component={Follows} />
        <Stack.Screen name="UsersList" component={UsersList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
