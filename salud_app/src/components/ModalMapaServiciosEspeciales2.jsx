import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet, Button, Modal,TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import CustomColors from '../stylus/colors';

const ModalMapaServiciosEspeciales2 = ({ data }) => {
    const [lat, setLat] = useState(-21.53321721426035);
    const [lng, setLng] = useState(-64.73444402762838);

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderizarItem = ({ item }) => (
    <View style={styles.container}>
        {/*<Text onPress={() => handleItemClick(item)}>{item.srv_solicitud}</Text>*/}
        <TouchableOpacity
            onPress={() => {
                handleItemClick(item)
            }}
            activeOpacity={0.5}
        >
            <View key={item.srv_id}>
                <Text style={styles.title}>Solicitado {item.srv_fec_solicitud}</Text>
                <View style={styles.article}>
                    <Text style={styles.text}>{item.srv_solicitud}</Text>
                    <Text style={styles.text}>Costo {item.srv_costo}</Text>
                    <Text style={styles.text}>{item.srv_punto}</Text>
                </View>
                <Text style={styles.footer}>Publicado {item.srv_registrado}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );

  const handleItemClick = (item) => {
    setSelectedItem(item);
    const p = item.srv_punto.split(',');
    setLat(parseFloat(p[0]));
    setLng(parseFloat(p[1]));
    console.log('0 >>>>', lat);
    console.log('1 >>>>', lng);
    setModalVisible(true);
  };

  return (
    <View>
      <View style={styles.containerTip}>
          <Text style={styles.titleTip}>AVISO</Text>
          <View style={styles.article}>
              <Text style={styles.textTip}>Listado de todas "Servicios Especiales" registradas y su estado actual.</Text>
          </View>
      </View>

      <FlatList
        data={data}
        renderItem={renderizarItem}
        keyExtractor={(item) => item.srv_id.toString()}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.containerModal}>
          <View style={{ height: '60%', backgroundColor: styles.secondary }}>
            <Text style={styles.title}>Solicitado {selectedItem && selectedItem.srv_fec_solicitud}</Text>
            <Text style={styles.text}>{selectedItem && selectedItem.srv_solicitud}</Text>
            <MapView
              style={{ flex: 1, width: '100%', height: '80%' }}
              initialRegion={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,
              }}
              zoomEnabled={true}
              zoomControlEnabled={true}
              zoomLevel={18}
            >
                <Marker coordinate={{ latitude: lat, longitude: lng }} />
            </MapView>

            <Button
              title="Cerrar"
              onPress={() => setModalVisible(false)}
              style={styles.button}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    backgroundColor: CustomColors.grey,
    borderRadius: 10,
  },
  containerModal: {
    flex: 1,
    justifyContent: 'flex-end',
    height:'50%',
    backgroundColor: CustomColors.white,
  },
  containerTip: {
    padding: 10, margin:10, backgroundColor: CustomColors.quartery, borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    color: CustomColors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleTip: {
    textAlign: 'center',
    color: CustomColors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5
  },
  text: {
    marginBottom: 5,
    paddingRight: 5,
  },
  button: {
    backgroundColor: CustomColors.secondary,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: CustomColors.quartery,
  },
  footer: {
    fontSize: 9, fontStyle: 'italic'
  }
});

export default ModalMapaServiciosEspeciales2;


