import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import ABI from "../ABI.json"
import { ethers } from "ethers";
import CustomButton from "../components/CustomButton";

export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);

    return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage;
};

export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;

    if (img.complete) callback(true);

    img.onload = () => callback(true);
    img.onerror = () => callback(false);
};

export function ConnectWallet() {
    const navigate = useNavigate();
    const [currentAccount, setCurrentAccount] = useState("");

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);


        } catch (error) {
            console.log(error);
        }

        const contractAddress = "0x44d376a8874e76F991ea90b114070B7FBec6CDe4"

        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ABI, signer);

            await contract.newUser(currentAccount);
        }
    };

    const checkIfWalletIsConnected = async () => {
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
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account);
        } else {
            console.log("No authorized account found");
        }

        //   const mintAddress = "0x5e74e338F76fa60fD91081010564080B8932DEe7"

        //   if (ethereum) {
        //       const provider = new ethers.providers.Web3Provider(ethereum);
        //       const signer = provider.getSigner();
        //       const contract = new ethers.Contract(mintAddress, ContractABI2, signer);

        //       await contract.newUser(currentAccount);
        //   }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);


    return (
        <div>
            {/* {currentAccount === "" ? <div to="/" onClick={connectWallet}> Connect Wallet</div> : <h3>{currentAccount}</h3>}
             */}
            {(currentAccount) === "" ?
            <CustomButton
                btnType="button"
                title='Connect'
                styles='bg-[#8c6dfd]'
                onClick={connectWallet}
                /> :
                <CustomButton
                    btnType="button"
                    title='Create a campaign' 
                    styles='bg-[#1dc071]' 
                    handleClick={() => { navigate('create-campaign') }}
                />
            }
                
        </div>
    )
}