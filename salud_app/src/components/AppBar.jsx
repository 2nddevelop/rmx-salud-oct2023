import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Constants from 'expo-constants';
import CustomColors from "../stylus/colors";

const AppBar = () => {
    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 40,
                fontWeight: 800,
                color: CustomColors.white
            }}>
                EMAT
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: CustomColors.secondary,
        paddingTop: Constants.statusBarHeight + 10,
        paddingLeft: 10,
        paddingBottom: 10
    },
    text: {
        color: 'black',
        fontSize: 25
    }
})

export default AppBar;