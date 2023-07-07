'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";

import useRentModal from '@/app/hooks/useRentModal';

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import Categoryinput from '../inputs/Categoryinput';
import CountrySelect from "../inputs/CountrySelect";
import { categories } from '../Navbar/Categories';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../Heading';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] =useState(false);

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
   
      patientCount: 1,
      bedCount: 1,
  
      imageSrc: '',
      price: null,
      title: '',
      description: '',
      address:'',
    }
  });

  const location = watch('location');
  const category = watch('category');
  const patientCount = watch('patientCount');

  const bedCount = watch('bedCount');
  const imageSrc = watch('imageSrc');

  


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
      
    })
  }


  //on clicking the back option it should  go to the last prop
  const onBack = () => {
    setStep((value) => value - 1);
  }
// on lcicking the next buttton it should go to the next prop

  const onNext = () => {
    setStep((value) => value + 1);
  }

  // this is the submit button 
  // handle submit funciton will acceot the feild values 
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    
    setIsLoading(true);
//post call
 
    axios.post('/api/listings', data)
    .then(() => {
      toast.success(' Hospital created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step]);
//using let keyword because the bodycontent will be changeing depending upon the step
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="In which field do you specialize in providing expert care to patients?"
        subtitle="
        Choose an area of expertise."
      />
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <Categoryinput
              onClick={(category) => 
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
          
        ))}
  
      </div>
      <hr />
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your Hospital located?"
          subtitle="Help patients find you!"
        />
        <CountrySelect 
          value={location} 
          onChange={(value) => setCustomValue('location', value)} 
        />

      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Highlight Key Features of Your Hospital"
          subtitle="Providing Quality Care and Cutting-Edge Services"
        />
        <Counter 
          onChange={(value) => setCustomValue('patientCount', value)}
          value={patientCount}
          title="Patients" 
          subtitle="How many Patients can visit?"
        />
     
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('bedCount', value)}
          value={bedCount}
          title="Beds" 
          subtitle="How many available beds you have"
        />
        <hr />

      </div>
    )
  }
if(step===STEPS.IMAGES){
bodyContent=(
<div className=' flex flex-col gap-8'>
  <Heading
  
  title='
  Upload an image representing your hospital'
  subtitle='Get a glimpse of the ambiance and facilities at our hospital'
  
  />
<ImageUpload
value = {imageSrc}
onChange={(value)=>setCustomValue('imageSrc',value)}

/>
<hr />

</div>

)

}

if(step ===STEPS.DESCRIPTION){

bodyContent= (

<div className="flex   flex-col  gap-8"  >

<Heading

title = "How would you characterize your hospital?"
subtitle = "Tell us about the unique features and services of your hospital." 

/>
<Input 
id ="title"
label='Title'
disabled={isLoading}
register={register}
errors={errors}
required

/>

<Input 

id ="description"
label='Description'
disabled={isLoading}
register={register}
errors={errors}
required

/>
<Input 

id ="address"
label='Address'
disabled={isLoading}
register={register}
errors={errors}
required

/>
<hr />
</div>

)

}



if(step===STEPS.PRICE)
{
bodyContent = (

<div className="flex flex-col gap-8">

<Heading

title="Now, Set your  price"
subtitle='How much do you charge for a visit'

/>

<Input
 id="price"
 label = "Price"
 formatPrice={true}

 type = "number"
 disabled={isLoading}
 register ={register}
 errors= { errors}
 required




/>
<hr />
</div>

)
}


  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Healing lives, one prescription at a time!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}

export default RentModal;
