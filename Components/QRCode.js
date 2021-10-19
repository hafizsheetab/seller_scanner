import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { ContextStore } from "../Context/ContextStore";
import { Actions } from "react-native-router-flux";
import { urlEndPoint } from "../config/vars";

export default function QRCode() {
    const {contextStore, setContextStore} = useContext(ContextStore)
    const {product, account} = contextStore
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    axios.defaults.headers.common['x-auth-accountAddress'] = account

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        axios.defaults.headers.common['x-auth-accountAddress'] = account
        axios.get(`${urlEndPoint}/api/product/${data}`).then(res => {
            console.log(res.data)
            setContextStore({...contextStore, product: res.data, cid: data})
            Actions.product()
        }).catch(err => {
            console.log(err)
        })
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "#4aa1e8",
    },
    buttonContainer: {
        padding: 5,
        backgroundColor: "#b7f0a3",
        borderRadius: 0,
    },
    button: {
        backgroundColor: "#138a1b",
    },
});
