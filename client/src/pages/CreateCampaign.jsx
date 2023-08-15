import React, { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { ethers } from "ethers"
import { money } from '../assets'
import { useStateContext } from '../context'
import CustomButton from "../components/CustomButton"
import FormField from '../components/FormField'
import { checkIfImage } from "../utils"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../Contract';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { account } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (FieldName, e) => {
    setForm({ ...form, [FieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      checkIfImage(form.image, async (exists) => {
        if (exists) {
          setIsLoading(true)
          await contract.createCampaign(
            account,
            form.title,
            form.description,
            ethers.utils.parseUnits(form.target, 18) ,
            new Date(form.deadline).getTime(),
            form.image
          )
          setIsLoading(false);
          navigate('/');
        } else {
          alert('Provide valid image URL')
          setForm({ ...form, image: '' });
        }
      })
      return contract;
    }

    else console.log("HEERE")

    // checkIfImage(form.image, async (exists) => {
    //   if (exists) {
    //     setIsLoading(true)
    //     await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
    //     setIsLoading(false);
    //     navigate('/');
    //   } else {
    //     alert('Provide valid image URL')
    //     setForm({ ...form, image: '' });
    //   }
    // })

  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && "...loader"}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName="Your Name *"
            PlaceHolder="Enter Your Name"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            PlaceHolder="Enter a Title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          labelName="Story"
          PlaceHolder="Enter Your Name"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName="Goal"
            PlaceHolder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date"
            PlaceHolder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>

    </div>
  )
}

export default CreateCampaign