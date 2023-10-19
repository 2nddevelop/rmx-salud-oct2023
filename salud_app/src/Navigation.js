import React from 'react';
import { AppProvider } from './context/AppContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CustonDrawer from './components/CustonDrawer';

import App2 from './components/App2';

//Colors
import CustomColors from './stylus/colors';

//Screens Public
import Welcome from './screens/Welcome';
import Rutas from './screens/Rutas';
import ServiciosEspeciales2 from './screens/ServiciosEspeciales2';
import Horarios from './screens/Horarios';
import MisAlertas from './screens/MisAlertas';
import Law from './screens/Law';
import Noticias from './screens/Noticias';
import Avisos from './screens/Avisos';

//Screens User
import Login from './screens/Login';
import Signup from './screens/Signup';

//Screens Admin
import Manage from './admin/Manage';
import Create from './admin/Create';
import Delete from './admin/Delete';
import Edit from './admin/Edit';
import EditPrices from './admin/EditPrices';

//icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

//Drawers navigation
const Drawer = createDrawerNavigator();

function MiMenu() {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustonDrawer {...props} />}
            initialRouteName='Welcome'
            screenOptions={{
                drawerStyle: {
                    backgroundColor: CustomColors.white,
                    width: 250
                },
                headerStyle: {
                    backgroundColor: CustomColors.primary
                },
                headerTintColor: CustomColors.white,
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                drawerActiveTintColor: CustomColors.primary,
                drawerLabelStyle: {
                    color: CustomColors.primary,
                    marginLeft: -25
                }
            }}
        >
            <Drawer.Screen
                name="Welcome"
                component={Welcome} style={{ height:10 }}
                options={{
                    drawerLabel: 'Inicio',
                    title: 'EMAT',
                    drawerIcon: () => (
                        <Ionicons name='home' size={24} color={CustomColors.primary} />
                    )
                }}
            />
            <Drawer.Screen
                name="MisAlertas"
                component={MisAlertas}
                options={{
                    drawerLabel: 'Mis Alertas',
                    title: 'Mis Alertas',
                    drawerIcon: () => (
                        <FontAwesome5 name="clock" size={20} color={CustomColors.primary} />
                    )
                }}
            />
            <Drawer.Screen
                name="ServiciosEspeciales2"
                component={ServiciosEspeciales2}
                options={{
                    drawerLabel: 'ServiciosEspeciales2',
                    title: 'ServiciosEspeciales2',
                    drawerIcon: () => (
                        <FontAwesome5 name="truck" size={20} color={CustomColors.primary} />
                    )
                }}
            />
            {/* <Drawer.Screen
                name="ServiciosEspeciales"
                component={ServiciosEspeciales}
                options={{
                    drawerLabel: 'Servicios Especiales',
                    title: 'Servicios Especiales',
                    drawerIcon: () => (
                        <FontAwesome5 name="truck" size={20} color={CustomColors.primary} />)
                }}
            />*/}
            <Drawer.Screen
                name="Noticias"
                component={Noticias}
                options={{
                    drawerLabel: 'Noticias',
                    title: 'Noticias',
                    drawerIcon: () => (
                        <FontAwesome5 name="newspaper" size={20} color={CustomColors.secondary} />
                    )
                }}
            />
            <Drawer.Screen
                name="Avisos"
                component={Avisos}
                options={{
                    drawerLabel: 'Avisos',
                    title: 'Avisos',
                    drawerIcon: () => (
                        <FontAwesome5 name="paper-plane" size={20} color={CustomColors.secondary} />
                    )
                }}
            />
            <Drawer.Screen
                name="Rutas"
                component={Rutas}
                options={{
                    drawerLabel: 'Rutas',
                    title: 'Rutas',
                    drawerStyle: () => (
                        height = 10
                        //fontSize = 16,
                        //color = CustomColors.terciary
                    ), 
                    drawerIcon: () => (
                        <FontAwesome5 name="map" size={20} color={CustomColors.terciary} />
                    )
                }}
            />
            <Drawer.Screen
                name="Horarios"
                component={Horarios}
                options={{
                    drawerLabel: 'Horarios',
                    title: 'Horarios',
                    drawerIcon: () => (
                        <FontAwesome5 name="clock" size={20} color={CustomColors.terciary} />
                    )
                }}
            />

            <Drawer.Screen
                name="Law"
                component={Law}
                options={{
                    drawerLabel: 'Reglamento N° 001',
                    title: 'Reglamento N° 001',
                    drawerIcon: () => (
                        <Octicons name="law" size={24} color={CustomColors.terciary} />
                    )
                }}
            />

            <Drawer.Screen
                name="App2"
                component={App2}
                options={{
                    drawerLabel: 'App2',
                    title: 'App2',
                    drawerIcon: () => (
                        <FontAwesome5 name="paper-plane" size={20} color={CustomColors.terciary} />
                    )
                }}
            />

        </Drawer.Navigator>
    );
}


//Stacks Navigation
const Stack = createNativeStackNavigator();

function MisPaginas() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={MiMenu}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    // headerShown: false
                    headerStyle: { backgroundColor: CustomColors.primary 
                    },
                    headerTitleStyle: {color: CustomColors.white}
                }}
            />
            <Stack.Screen
                name='Signup'
                component={Signup}
                options={{
                    // headerShown: false
                    headerStyle: { backgroundColor: CustomColors.primary 
                    },
                    headerTitleStyle: {color: CustomColors.white}
                }}
            />
            <Stack.Screen
                name='Manage'
                component={Manage}
                options={{
                    // headerShown: false
                    headerStyle: { backgroundColor: CustomColors.secondary },
                    headerTitleStyle: {color: CustomColors.white}
                }}
            />
            <Stack.Screen
                name='Create'
                component={Create}
                options={{
                    // headerShown: false
                    headerStyle: { backgroundColor: CustomColors.secondary },
                    headerTitleStyle: {color: CustomColors.white}
                }}
            />
            <Stack.Screen
                name='Delete'
                component={Delete}
                options={{
                    // headerShown: false
                    headerStyle: { backgroundColor: CustomColors.secondary },
                    headerTitleStyle: {color: CustomColors.white}
                }}
            />
            <Stack.Screen
                name='Edit'
                component={Edit}
                options={{
                    // headerShown: false,
                    headerStyle: { backgroundColor: CustomColors.secondary },
                    headerTitleStyle: {color: CustomColors.white}
                }}
            />
            <Stack.Screen
                name='EditPrices'
                component={EditPrices}
                options={{
                    // headerShown: false
                    headerStyle: { backgroundColor: CustomColors.secondary },
                    headerTitleStyle: {color: CustomColors.white}
                }}
            />
        </Stack.Navigator>
    )
}

export default function Navigation() {
    return (
        <AppProvider>
            <NavigationContainer>
                <MisPaginas />
            </NavigationContainer>
        </AppProvider>
    )
}