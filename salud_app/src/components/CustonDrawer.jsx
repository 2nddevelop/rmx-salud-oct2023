import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import CustomColors from '../stylus/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const CustonDrawer = (props) => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: CustomColors.white }}
            >
                <SafeAreaView>
                    <View style={{
                        height: 80,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomColor: '#f4f4f4',
                        borderBottomWidth: 1,
                    }}>
                        <Image
                            source={require('../assets/images/usuario.png')}
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 65,
                                backgroundColor: CustomColors.white
                            }}
                        />
                        <Text style={{
                            fontSize: 16,
                            color: CustomColors.secondary,
                            // fontFamily: 'digital'
                        }}>
                            Usuario
                        </Text>
                    </View>
                </SafeAreaView>
                <View style={{ flex: 1, backgroundColor: CustomColors.white, paddingTop: 2, marginVertical:2 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{
                padding: 5, borderTopWidth: 1, borderTopColor: '#f4f4f4'
            }}>
                <TouchableOpacity
                    style={{ paddingVertical: 5, marginVertical: 5 }}
                    onPress={() => { 
                        navigation.navigate('Login');
                     }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="login" size={24} color={CustomColors.secondary} />
                        <Text style={{
                            marginLeft: 10,
                            fontWeight: '600',
                            color: CustomColors.secondary
                         }}>Ingresar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustonDrawer