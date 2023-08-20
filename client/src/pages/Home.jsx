import React, { useState, useEffect } from 'react'
import DisplayCampaigns from '../components/DisplayCampaigns';
import { useStateContext } from "../context/index"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../Contract';
import { ethers } from "ethers"


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { account } = useStateContext();

  const getCampaigns = async (e) => {

    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const campaigns = await contract.getCampaigns();

      const parsedCampaings = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i
      }));

      // console.log(campaigns);
      return parsedCampaings
    }
  }

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
    console.log(campaigns);

  }

  useEffect(()=>{
    fetchCampaigns();
  }, [account]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home