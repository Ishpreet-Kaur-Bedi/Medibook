'use client'
import {signIn} from "next-auth/react"
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import{FcGoogle} from 'react-icons/fc'
import { useCallback,useState } from 'react'
import{
    FieldValues,SubmitHandler,
    useForm
} from 'react-hook-form'
import Heading from '../Heading'


import useRegisterModal from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Input from '../inputs/Input';
import {toast} from 'react-hot-toast'
import Button from '../Button'
import useLoginModal from '@/app/hooks/useLoginModal'
import { sign } from "crypto"
import { useRouter } from "next/navigation"


const LoginModal = () => {


    const router = useRouter();
    const registerModal = useRegisterModal();

    const loginModal = useLoginModal();
    // loading status
    const [isLoading,setIsLoading]= useState(false);


// now we eill write the useforms here

const{
    register,
    handleSubmit,
    formState:{
        errors,
    }
} = useForm<FieldValues>({
 
    defaultValues:{
     
        email:"",
        password:"",

    }
});

const onSubmit:SubmitHandler<FieldValues>
=(data)=>{setIsLoading(true);

   signIn('credentials',{...data, redirect:false}, )

   .then((callback)=>{
    setIsLoading(false);
 if(callback?.ok){
toast.success('Logged In');
router.refresh();
// and then we want to close the modal

loginModal.onClose();
 }

 if (callback?.error){
    toast.error(callback.error);
 }



   })
}

const bodyContent = (
    <div className='flex flex-col gap-4'  >
<Heading 
title ="Welcome back"
subtitle='Login to your account !'/>

<Input id='email'
label='Email'
disabled = {isLoading}
register = { register}
errors = {errors}
required 

/>



<Input id='password'
label='Password'
type="password"
disabled = {isLoading}
register = { register}
errors = {errors}
required 

/>

    </div>
)
const FooterContent=(
<div className=' flex flex-col gap-4 mt-3'>
<hr />
<Button
outline 
label="Continue with Google"
icon={FcGoogle}
onClick={()=>{}}

/>
<Button
outline 
label="Continue with Github"
icon={AiFillGithub}
onClick={()=>{}}

/>


<div className="text-neutral-500 text-center 
mt-4
font-light
">
<div className=' justify-center  flex flex-row items-center gap-2'>
    <div>
        Already have an account ?
        
    </div>
    <div
    onClick={registerModal.onClose
    }
    className='text-neutral-800
    cursor-pointer
    hover:underline'>
        Log in
    </div>
</div>

</div>
</div>



)



return (<Modal

    // we have to refrain the user to make any changes in the form while it is loading 
    disabled={isLoading}
    isOpen = {loginModal.isOpen}
    title="Login"
    actionLabel='Continue'
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer= {FooterContent}



    />
  )
}

export default LoginModal
