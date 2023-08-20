import React, { useState, useEffect } from 'react'
import DisplayCampaigns from '../components/DisplayCampaigns';
import { useStateContext } from "../context/index"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../Contract';
import { ethers } from "ethers"


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { account } = useStateContext();

  const getUserCampaigns = async (e) => {

    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const allCampaigns = await contract.getCampaigns();

      const parsedCampaings = allCampaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i
      }));

      const filteredCampaigns = parsedCampaings.filter((campaign) => campaign.owner.toLowerCase() === account);
      console.log(parsedCampaings[0].owner, account);
      return filteredCampaigns
    }
  }

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
    console.log(campaigns);
  }

  useEffect(() => {
    fetchCampaigns();
  }, [account]);

  return (
    <DisplayCampaigns
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home