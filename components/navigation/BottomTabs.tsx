import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabNavigatorParamList } from './types';
import FilesScreen from '../FilesScreen/FilesScreen';
import SettingsScreen from '../SettingsScreen/SettingsScreen';
import HomeScreenStack from './HomeScreenStack';
import { colors } from '../../colors';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
    return (
        <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                height: 60,
                alignContent: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: 'white',
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 9,
                },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 18,
            },
            tabBarIcon: ({ focused, color, size }) => {
                let iconColor = focused ? colors.black : colors.lightGray

                if (route.name === 'Files') {
                    return focused 
                    ? <MaterialCommunityIcons name="folder" size={size} color={iconColor} />
                    : <MaterialCommunityIcons name="folder-outline" size={size} color={iconColor} />
                } else if (route.name === 'Home') {
                    return focused 
                    ? <MaterialCommunityIcons name="home-variant" size={size} color={iconColor} />
                    : <MaterialCommunityIcons name="home-variant-outline" size={size} color={iconColor} />
                } else if (route.name === 'Settings') {
                    return focused 
                    ? <Ionicons name="settings" size={size} color={iconColor} />
                    : <Ionicons name="settings-outline" size={size} color={iconColor} />
                } 

                // You can return any component that you like here!
            },
            tabBarActiveTintColor: colors.black,
            tabBarInactiveTintColor: colors.lightGray,
        })}
        >
            <Tab.Screen name="Files" component={FilesScreen} />
            <Tab.Screen
                name="Home"
                component={HomeScreenStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabs;