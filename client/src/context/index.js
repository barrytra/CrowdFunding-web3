import React, { useContext, createContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../Contract';
import { ethers } from "ethers";
import CustomButton from "../components/CustomButton";

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const [inputs, setInputs] = useState({});
    const [account, setAccount] = useState('')

    // const publishCampaign = async (e) => {
    //     e.preventDefault()

    //     const { ethereum } = window;
    //     if (ethereum) {
    //         const provider = new ethers.providers.Web3Provider(ethereum);
    //         const signer = provider.getSigner();
    //         const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    //         await contract.createCampaign(inputs.amount, 0, inputs.period, false);
    //         return contract;
    //     }

    //     else console.log("HEERE")
    // }

    const connect = async () => {
        if (typeof window.ethereum !== "undefined") {
            const { ethereum } = window;
            try {
                await ethereum.request({ method: "eth_requestAccounts" })
            } catch (error) {
                console.log(error)
            }
            
            const accounts = await ethereum.request({ method: "eth_accounts" })
            console.log(accounts)
            window.location.reload(false);
        } else {
            alert("Please install MetaMask");
        }
    }

    const Address = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const chain = await window.ethereum.request({ method: "eth_chainId" });
        let chainId = chain;
        console.log("chain ID:", chain);
        console.log("global Chain Id:", chainId);
        if (accounts.length !== 0) {
            setAccount(accounts[0]);
            console.log("Found an authorized account:", accounts );
            
        } else {
            console.log("No authorized account found");
        }
    }

    useEffect(()=> {
        Address();
        console.log(account);
    }, [])

    // const publishCampaign = async (form) => {
    //     try {
    //         const data = await contract.createCampaign({
    //             args: [
    //                 account, // owner
    //                 form.title, // title
    //                 form.description, // description
    //                 form.target,
    //                 new Date(form.deadline).getTime(), // deadline,
    //                 form.image,
    //             ],
    //         });

    //         console.log("contract call success", data)
    //     } catch (error) {
    //         console.log("contract call failure", error)
    //     }
    // }

    return (
        <StateContext.Provider
            value={{
                account,
                connect
            }}
        >
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext);
