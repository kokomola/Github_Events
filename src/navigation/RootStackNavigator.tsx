import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import GithubEventList from '../screens/GithubEventList';
import GithubEvent from '../screens/GithubEvent';
import type {RootStackParamList} from '../shared.types';
import {Screens} from './Screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Screens.GithubEventList}
          component={GithubEventList}
          options={{headerTitle: 'Github Events'}}
        />
        <Stack.Screen
          name={Screens.GithubEvent}
          component={GithubEvent}
          options={{headerTitle: 'Event'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
