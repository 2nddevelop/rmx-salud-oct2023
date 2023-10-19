import { View, Text, TextInput, TouchableOpacity, Button, Image, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomColors from '../stylus/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const handleConfirm = () => {
        {
            email === 'Admin' && password === 'Admin' ?

                Alert.alert('Alert', 'Access allowed, handle with care', [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => navigation.navigate('Manage') },
                ])
                :
                Alert.alert('Alert', 'No Access, try again', [
                    // {
                    //     text: 'Cancel',
                    //     onPress: () => console.log('Cancel Pressed'),
                    //     style: 'cancel',
                    // },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ])
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: CustomColors.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: CustomColors.black
                    }}>
                        Hola ! 👋
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: CustomColors.black
                    }}>Hola nuevamente, lo esperamos!</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Correo electrónico</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: CustomColors.gray,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Ingrese su correo electrónico'
                            placeholderTextColor={CustomColors.gray}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            value={email}
                            onChangeText={(value) => setEmail(value)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 2 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 2
                    }}>Clave</Text>

                    <View style={{
                        width: "100%",
                        height: 40,
                        borderColor: CustomColors.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                        placeholder='Ingrese su clave'
                        placeholderTextColor={CustomColors.grey}
                        secureTextEntry={password}
                        style={{
                            width: "100%"
                        }}
                        />

                        <TouchableOpacity
                        onPress={() => setPassword(!password)}
                        style={{
                            position: "absolute",
                            right: 12
                        }}
                        >
                        {
                            password == true ? (
                            <Ionicons name="eye-off" size={24} color={CustomColors.black} />
                            ) : (
                            <Ionicons name="eye" size={24} color={CustomColors.primary} />
                            )
                        }

                        </TouchableOpacity>
                    </View>
                </View>

                {/* Button Log in */}
                <TouchableOpacity
                    style={styles.button}
                    // onPress={() => { navigation.navigate('Manage') }}
                    onPress={handleConfirm}
                >
                    <Text style={styles.text}>Ingresar</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: CustomColors.grey,
                            marginHorizontal: 10
                        }}
                    />
                    {/*
                    <Text style={{ fontSize: 14 }}>Ingresar con</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: CustomColors.grey,
                            marginHorizontal: 10
                        }}
                    />
                    */}
                </View>

                {/*}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: CustomColors.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/images/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: CustomColors.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/images/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>
                {*/}

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: CustomColors.black }}>Aún no tiene cuenta? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: CustomColors.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Registrese</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: CustomColors.primary,
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
        elevation: 5,
        borderWidth: 1,
        borderColor: CustomColors.grey
    },
    text: {
        color: CustomColors.white,
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }

})

export default Login