import { View, Text, StyleSheet, ScrollView, TextInput, Switch, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import apiObject from '../api/DBfirestore'
import CustomColors from '../stylus/colors'
import appFirebase from '../../Credenciales';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const db = getFirestore(appFirebase);

const EditPrices = ({ route }) => {

  const navigation = useNavigation();

  const region = route.params.region
  const shed = route.params.shed

  const [prices, setPrices] = useState({
    name: '',
    elegida_kl: '',
    hojeada_esp: '',
    hojeada: '',
    mediana_esp: '',
    mediana: '',
    comun: '',
    chimi: '',
    choqueta: '',
    view: false
  })

  const handleChanges = (name, value) => {
    setPrices({ ...prices, [name]: value })
  }

  const [loading, setLoading] = useState(true)

  const [aux, setAux] = useState(true);

  const getPrices = async (region, shed) => {
    const docRef = doc(db, `departments/${region}/galpones`, `${shed}`);
    const docSnap = await getDoc(docRef);
    setPrices({ ...docSnap.data() });
    setLoading(false);
    setAux(!aux)
  }

  useEffect(() => {
    if (setAux) {
      getPrices(region, shed);
    }
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size={'large'} color={CustomColors.primary} />
      </View>
    )
  }

  const handleUpdate = (region, state) => {
    apiObject.updateShed(region, state)
    navigation.navigate('Edit')
  }

  return (
    <ScrollView style={{ padding: 10, backgroundColor: 'white' }}>
      <Text style={styles.title}>{prices?.name}</Text>
      <View style={styles.container}>
        <Text style={styles.text1}>Shed</Text>
        <TextInput
          style={styles.input}
          placeholder='galpon'
          value={prices.name}
          onChangeText={(value) => handleChanges('name', value)}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text1}>Elegida Kl</Text>
        <TextInput
          style={styles.input}
          placeholder='Elegida Especial'
          keyboardType='numeric'
          value={`${prices?.elegida_kl}`}
          onChangeText={(value) => handleChanges('elegida_kl', value)}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text1}>Hojeada Especial</Text>
        <TextInput
          style={styles.input}
          placeholder='Hojeada Especial'
          keyboardType='numeric'
          value={`${prices?.hojeada_esp}`}
          onChangeText={(value) => handleChanges('hojeada_esp', value)}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text1}>Hojeada</Text>
        <TextInput
          style={styles.input}
          placeholder='Hojeada'
          keyboardType='numeric'
          value={`${prices?.hojeada}`}
          onChangeText={(value) => handleChanges('hojeada', value)}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text1}>Mediana Especial</Text>
        <TextInput
          style={styles.input}
          placeholder='Mediana Especial'
          keyboardType='numeric'
          value={`${prices?.mediana_esp}`}
          onChangeText={(value) => handleChanges('mediana_esp', value)}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text1}>Mediana</Text>
        <TextInput
          style={styles.input}
          placeholder='Mediana'
          keyboardType='numeric'
          value={`${prices?.mediana}`}
          onChangeText={(value) => handleChanges('mediana', value)}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text1}>Comun</Text>
        <TextInput
          style={styles.input}
          placeholder='Comun'
          keyboardType='numeric'
          value={`${prices?.comun}`}
          onChangeText={(value) => handleChanges('comun', value)}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text1}>Chimi</Text>
        <TextInput
          style={styles.input}
          placeholder='Chimi'
          keyboardType='numeric'
          value={`${prices?.chimi}`}
          onChangeText={(value) => handleChanges('chimi', value)}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text1}>Choqueta</Text>
        <TextInput
          style={styles.input}
          placeholder='Choqueta'
          keyboardType='numeric'
          value={`${prices?.choqueta}`}
          onChangeText={(value) => handleChanges('choqueta', value)}
        />
      </View>
      <View style={styles.switch}>
        <Text style={styles.text1}>Preview</Text>
        <Switch
          trackColor={{ false: CustomColors.grey, true: CustomColors.primary }}
          value={prices?.view}
          onValueChange={(value) => handleChanges('view', value)}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleUpdate(region, prices)}
        >
          <Text style={styles.text2}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    // flex: 1
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    color: CustomColors.primary
  },
  input: {
    flex: 1,
    margin: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: CustomColors.primary,
    borderRadius: 10,
    height: 40
  },
  switch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    backgroundColor: CustomColors.secondary,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: CustomColors.grey
  },
  text1: {
    color: CustomColors.primary,
    fontSize: 15,
    fontWeight: 'bold'
  },
  text2: {
    color: CustomColors.white,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default EditPrices