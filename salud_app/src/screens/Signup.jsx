import { View, Text, TextInput, TouchableOpacity, Button, Pressable, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CustomColors from '../stylus/colors'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const Signup = () => {

  const navigation = useNavigation();

  const [password, setPassword] = useState(false);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: CustomColors.white
    }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 2 }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginVertical: 2,
            color: CustomColors.black
          }}>
            Registrarse ✏️
          </Text>

          <Text style={{
            fontSize: 16,
            color: CustomColors.black
          }}>Conectarse con la red de información institucional !</Text>
        </View>



        <View style={{ marginBottom: 2 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 2
          }}>Carnet de Identidad</Text>

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
              placeholder='Carnet de Identidad'
              placeholderTextColor={CustomColors.grey}
              keyboardType='default'
              style={{
                width: "100%"
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 2 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 2
          }}>Nombre Completo</Text>

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
              placeholder='Nombre Completo'
              placeholderTextColor={CustomColors.grey}
              keyboardType='default'
              style={{
                width: "100%"
              }}
            />
          </View>
        </View>



        <View style={{ marginBottom: 2 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 2
          }}>Correo Electrónico</Text>

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
              placeholder='Ingrese su correo electrónico'
              placeholderTextColor={CustomColors.grey}
              keyboardType='email-address'
              style={{
                width: "100%"
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 2 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 2
          }}>Número de Celular</Text>

          <View style={{
            width: "100%",
            height: 40,
            borderColor: CustomColors.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='+591'
              placeholderTextColor={CustomColors.black}
              keyboardType='numeric'
              style={{
                width: "12%",
                borderRightWidth: 1,
                borderLeftColor: CustomColors.grey,
                height: "100%"
              }}
            />

            <TextInput
              placeholder='Ingrese su número celular'
              placeholderTextColor={CustomColors.grey}
              keyboardType='numeric'
              style={{
                width: "80%"
              }}
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

        {/* Button Sing up */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => { }}
        >
          <Text style={styles.text}>Registrarse</Text>
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
          <Text style={{ fontSize: 14 }}>Registrese con</Text>
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

        {/*
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
              source={require('../assets/images/facebook.png')}
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
              source={require('../assets/images/google.png')}
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
        */}

        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 2
        }}>
          <Text style={{ fontSize: 16, color: CustomColors.black }}>Si ya esta registrado </Text>
          <Pressable
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{
              fontSize: 16,
              color: CustomColors.primary,
              fontWeight: "bold",
              marginLeft: 6
            }}>Ingrese</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: CustomColors.primary,
    marginTop: 10,
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

export default Signup