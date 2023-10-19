import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Button, ImageBackground, RefreshControl } from 'react-native';
//import apiObject from '../api/DBfirestore';
import apiRest from '../api/RestService';
import CustomColors from '../stylus/colors';
import ModalPrices from './ModalPrices';
import { SafeAreaView } from 'react-native-safe-area-context';

const Sheds = ({ fecha, region }) => {
    const [sheds, setSheds] = useState([]); // Utiliza el estado para almacenar los datos

    //let sheds = apiRest.useSheds(fecha, region);
    console.log('Area >>> ', region);
    console.log('Datos >>> ', sheds);

    const fetchData = async() => {
        try {
          const data = await apiRest.useSheds(fecha, region);
          setSheds(data);
          console.log('.:: Lectura de datos ::.');
          console.log('Region: ', region);
          console.log('Fecha: ', fecha);
          console.log(data);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
    
    const [info, setInfo] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const handleShowInfo = (shed) => {
        setInfo(shed)
        setShowInfo(!showInfo);
    }

    //refreshing
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setTimeout( () => {
          fetchData(); // Espera a que se complete la solicitud
          console.log('.::Refresh::.');
          setRefreshing(false); // Establece refreshing en false cuando la actualización ha terminado
        }, 1000);
        setRefreshing(true);
      };
    
    fetchData();

    return (
        <SafeAreaView style={styles.container}>
        {/*<Button title="RR" onPress={fetchData}>Refrescar</Button>*/}
            <FlatList
                data={sheds}
                renderItem={({ item: shed }) => (
                    <>
                        {
                                <View key={shed.reg_id} style={styles.wrap}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleShowInfo(shed)
                                        }}
                                        activeOpacity={0.5}
                                    >
                                        <ImageBackground
                                            style={styles.image}
                                            source={require('../assets/icons/hoja.png')}
                                        >
                                            <Text style={styles.text}>{shed.gp_descripcion}</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                        }
                    </>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        progressBackgroundColor={CustomColors.secondary}
                        colors={[CustomColors.white, CustomColors.primary]}
                    />
                }
            />
            <ModalPrices showInfo={showInfo} setShowInfo={setShowInfo} shed={info} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        backgroundColor: CustomColors.white,
        justifyContent: 'center'
    },
    wrap: {
        height: 100,
        width: 350,
        overflow: 'hidden',
        alignItems: 'center',
        textAlign: 'center'
    },
    image: {
        width: 300,
        height: 100,
        resizeMode: 'cover',
        textAlign: 'center',
        alignItems: 'center'
    },
    text: {
        // position: 'absolute',
        left: '0%',
        top: '30%',
        color: CustomColors.white,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})

export default Sheds;