import React, { useContext, useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    Text,
    View,
    StatusBar,
    ScrollView,
} from "react-native";
import {
    Avatar,
    Button,
    Header,
    Image,
    Input,
    ListItem,
    Overlay,
} from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { TextInput } from "react-native";
import axios from "axios";
import { ContextStore } from "../Context/ContextStore";
import { urlEndPoint } from "../config/vars";


export default function ProfilePage() {
    const {contextStore, setContextStore} = useContext(ContextStore)
    const {profile, account} = contextStore
    axios.defaults.headers.common['x-auth-accountAddress'] = account
    const [input, setInput] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
    });
    const onSubmit = () => {
        console.log(contextStore.account)
        axios.post(`${urlEndPoint}/api/seller`,{...input, accountAddress: contextStore.account}).then(res => {
            console.log(res.data)
            setContextStore({...contextStore, profile: res.data})
        })
    }
    useEffect(() => {
        if(profile){
            setInput({...profile})
        }
    },[])
    return (
        <SafeAreaView style={styles.container}>
            <Header
                centerComponent={{
                    text: `Profile Page`,
                    style: { color: "#fff" },
                }}
                rightComponent={{
                    icon: "home",
                    color: "#fff",
                    onPress: () => {
                        console.log('hi')
                    },
                }}
            />
            <ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value = {input.name}
                        placeholder={"name"}
                        onChangeText={(text) => {
                            setInput({ ...input, name: text });
                        }}
                    ></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={"address"}
                        value = {input.address}
                        onChangeText={(text) => {
                            setInput({ ...input, address: text });
                        }}
                    ></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={"phone"}
                        value = {input.phone}
                        onChangeText={(text) => {
                            setInput({ ...input, phone: text });
                        }}
                    ></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={"email"}
                        value = {input.email}
                        onChangeText={(text) => {
                            setInput({ ...input, email: text });
                        }}
                    ></TextInput>
                </View>
                <Button
                title="Submit"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                onPress = {onSubmit}
            />
            <Button
                title="Scan Qr Code"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                onPress = {() => {
                    if(profile){
                        Actions.qrcode()
                    }
                }}
            />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "#4aa1e8",
    },
    pickerContainer: {
        padding: 10,
    },
    textInput: {
        backgroundColor: "#77b4e6",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
    },
    inputContainer: {
        padding: 10,
    },
    listItem: {
        backgroundColor: "#b7f0a3",
        marginTop: 20,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
    },
    topBar: {
        backgroundColor: "#5bba3a",
    },
    topBarTitle: {
        fontSize: 32,
    },
    itemTitle: {
        fontSize: 32,
        textAlign: "auto",
    },
    image: {
        height: 300,
        width: 300,
        margin: 10,
    },
});
