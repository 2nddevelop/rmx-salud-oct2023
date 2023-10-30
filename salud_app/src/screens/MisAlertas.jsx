import React from 'react';
import { View } from 'react-native';
import ModalMapaMisAlertas from '../components/ModalMapaMisAlertas';
import dataMisAlertas from '../data/alertas/misAlertas';

const MisAlertas = () => {
  const jsonData = dataMisAlertas;

  return (
    <View>
      <ModalMapaMisAlertas data={jsonData} />
    </View>
  );

};

export default MisAlertas;
