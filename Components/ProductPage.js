import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { ContextStore } from "../Context/ContextStore";
import { Header, Button } from "react-native-elements";
import { Image } from "react-native-elements";
import { urlEndPoint, wareHouseAddress } from "../config/vars";
import decodeProductStatus from "../utils/decodeProductStatus";

export default function ProductPage() {
    const { contextStore, setContextStore } = useContext(ContextStore);
    const { product, supplyChain, cid, profile, account } = contextStore;
    axios.defaults.headers.common['x-auth-accountAddress'] = account
    const [imgUri, setImgUri] = useState(null)
    const [state, setState] = useState({
        productStatus: ""
    })
    const onClickAddProduct = () => {
        supplyChain.addProduct(cid).then(result => {
            console.log(result)
            supplyChain.productStatus(cid).then(result => {
                // console.log(`https://gateway.ipfs.io/ipfs/${product.imgUri}`)
                console.log(decodeProductStatus(Number(result)))
                setState({...state, productStatus: decodeProductStatus(Number(result))})
                axios.post(`${urlEndPoint}/api/product/addProduct`,{cid}).then(res => {
                    console.log(res.data)
                })
            })

        })
    }
    const onClickShipProduct = () => {
        supplyChain.shipToWareHouse(cid, wareHouseAddress).then(result => {
            console.log(result)
            supplyChain.productStatus(cid).then(result => {
                // console.log(`https://gateway.ipfs.io/ipfs/${product.imgUri}`)
                console.log(decodeProductStatus(Number(result)))
                setState({...state, productStatus: decodeProductStatus(Number(result))})
            })
        })
    }
    useEffect(() => {
        console.log('hi')
        supplyChain.productStatus(cid).then(result => {
            // console.log(`https://gateway.ipfs.io/ipfs/${product.imgUri}`)
            console.log(decodeProductStatus(Number(result)))
            setState({...state, productStatus: decodeProductStatus(Number(result))})
        })
        
    },[])
    return (
        <SafeAreaView style={styles.container}>
            <Header
                backgroundColor={"#911616"}
                centerComponent={{
                    text: `Scan QR Code`,
                    style: { color: "#fff" },
                }}
                rightComponent={{
                    icon: "home",
                    color: "#fff",
                    onPress: () => {
                        console.log("hi");
                    },
                }}
            />
            <Image
                rounded
                source={{uri: `https://gateway.ipfs.io/ipfs/${product.imgUri}`}}
                style={{ height: 300, width: 300 }}
            />
            <View style={styles.inputContainer}>
                <Text>Name: {product.name}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text>Description: {product.description}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text>price: {product.price}</Text>
            </View>
            {product.seller && (
                <View>
                    <View style={styles.inputContainer}>
                        <Text>seller: {product.seller.name}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>price: {product.seller.email}</Text>
                    </View>
                </View>
            )}

            <Button
                disabled = {state.productStatus === "Added" || state.productStatus === "Shipped"}
                title="Add This Product"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                onPress={onClickAddProduct}
            />
            <Button
                disabled = {state.productStatus === "Shipped"}
                title="Ready To ship"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                onPress={onClickShipProduct}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "#ba2727",
    },
    buttonContainer: {
        padding: 5,
        backgroundColor: "#b7f0a3",
        borderRadius: 0,
    },
    button: {
        backgroundColor: "#138a1b",
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: "#777",
    },
    textBold: {
        fontWeight: "500",
        color: "#000",
    },
    buttonText: {
        fontSize: 21,
        color: "rgb(0,122,255)",
    },
    buttonTouchable: {
        padding: 16,
    },
    inputContainer: {
        padding: 10,
    },
});
