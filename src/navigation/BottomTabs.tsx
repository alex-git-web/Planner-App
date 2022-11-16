import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import { colors } from '../../colors';
import FilesScreen from '../screens/FilesScreen/FilesScreen';
import { BottomTabNavigatorParamList } from './types';
import { useAppSelector } from '../redux/hooks';
import { bottom_tabs_height } from '../common/constants';
import { HomeScreen } from '../screens/HomeScreen/TodoListScreen/TodoListScreen';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
    const { isMainAppPartLoaded } = useAppSelector(state => state.appConfigure)
    const { isOpenModal } = useAppSelector(state => state.homeScreen)

    return (
        <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                height: !isMainAppPartLoaded || isOpenModal ? 0 : bottom_tabs_height,
                alignContent: 'center',
                backgroundColor: 'white',
                shadowColor: colors.black,
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
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabs;