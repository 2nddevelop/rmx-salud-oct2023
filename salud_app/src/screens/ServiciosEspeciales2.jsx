import React from 'react';
import { View } from 'react-native';
import ModalMapaServiciosEspeciales2 from '../components/ModalMapaServiciosEspeciales2';
import dataServiciosEspeciales from '../data/serviciosEspeciales/serviciosEspeciales';

const ServiciosEspeciales2 = () => {
  const jsonData = dataServiciosEspeciales;

  return (
    <View>
      <ModalMapaServiciosEspeciales2 data={jsonData} />
    </View>
  );

};

export default ServiciosEspeciales2;
