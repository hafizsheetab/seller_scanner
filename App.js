import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { privateKey, urlEndPoint, fungibleTokenAbi, fungibleTokenAddress, nonFungbleTokenAddress, nonFungileTokenAbi, supplyChainContractAddress, supplyChainSmartContractAbi, ganacheUrlEndPoint } from "./config/vars";
import { ContextStore } from "./Context/ContextStore";
import Routes from "./Routes";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

export default function App() {
    const [contextStore, setContextStore] = useState({});
    useEffect(() => {
        const provider = new ethers.providers.JsonRpcProvider(
            `${ganacheUrlEndPoint}`
        );
        const signer = new ethers.Wallet(privateKey, provider);

        const erc20 = new ethers.Contract(
            fungibleTokenAddress,
            fungibleTokenAbi,
            signer
        );
        const erc721 = new ethers.Contract(
            nonFungbleTokenAddress,
            nonFungileTokenAbi,
            signer
        );
        const supplyChain = new ethers.Contract(
            supplyChainContractAddress,
            supplyChainSmartContractAbi,
            signer
        );
        supplyChain.productStatus("QmUQ3p8ELuBJ1L65ygndyqXPVbN3iWZhpgp5PpYjK21RDs").then(result => {
          console.log(result)
        })
        let account = "0xe2B6577e17317e56b6D007056Cc6ed449443C1dF";
        axios.defaults.headers.common['x-auth-accountAddress'] = account
        axios.get(`${urlEndPoint}/api/seller/`).then((res) => {
            console.log(res.data);
            if (!res.data.errors) {
                let profile = res.data;
                setContextStore({ ...contextStore, account, profile, erc20, erc721, supplyChain });
            } else {
                setContextStore({ ...contextStore, account, erc20, erc721, supplyChain });
            }
        });
    }, []);
    return (
        <ContextStore.Provider
            hideNavBar={true}
            value={{ contextStore, setContextStore }}
        >
            <Routes />
        </ContextStore.Provider>
    );
}
