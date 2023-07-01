'use client'

import Container from "../Container"
import{RiMentalHealthFill} from "react-icons/ri"
import{ TbMedicineSyrup} from 'react-icons/tb'
import{GiCaveEntrance, GiFamilyTree,  GiMicroscope, GiScalpel} from 'react-icons/gi'
import{MdChildCare, MdLocalHospital, MdOutlineEmergencyShare, MdOutlineHealthAndSafety,  MdPregnantWoman} from 'react-icons/md'
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"
import {FaBrain, FaEyeDropper, FaLungsVirus, FaXRay} from 'react-icons/fa'
import {BsSnow,BsGem} from 'react-icons/bs'



export const categories =[
{
    label: 'Allergy and immunology',
    icon:FaLungsVirus,
    description:'Specialists in allergy and immunology work with both adult and pediatric patients suffering from allergies and diseases of the respiratory tract or immune system.'
},

{
    label: 'Diagnostic radiology',
    icon :FaXRay,
    description:'Physicians specializing in diagnostic radiology are trained to diagnose illnesses in patients through the use of x-rays, radioactive substances, sound waves in ultrasounds, or the body’s natural magnetism in magnetic resonance images (MRIs).'
},

{
    label: 'Emergency',
    icon :MdOutlineEmergencyShare,
    description:'Physicians specializing in emergency medicine provide care for adult and pediatric patients in emergency situations. These specialists provide immediate decision making and action to save lives and prevent further injury.'
},
{
    label: 'Family Medicine',
    icon :GiFamilyTree,
    description:'While many medical specialties focus on a certain function of the body or particular organ, family medicine focuses on integrated care and treating the patient as a whole. '
},
{
    label: 'Preventive medicine',
    icon :MdOutlineHealthAndSafety,
    description:'Physicians specializing in preventative medicine work to prevent disease by promoting patient health and well-being. Their expertise goes far beyond preventative practices in clinical medicine, covering elements of biostatistics, epidemiology, environmental and occupational medicine, and even the evaluation and management of health services and healthcare organizations.'
},
{
    label: 'Neurology',
    icon :FaBrain,
    description:'Neurology is the specialty within the medical field pertaining to nerves and the nervous system. Neurologists diagnose and treat diseases of the brain, spinal cord, peripheral nerves, muscles, autonomic nervous system, and blood vessels. '
},
{
    label: 'Gynecology',
    icon :MdPregnantWoman,
    description:'Obstetrician/gynecologists (OB/GYNs) care for the female reproductive system and associated disorders. This field of medicine encompasses a wide array of care, including the care of pregnant women, gynecologic care, oncology, surgery, and primary health care for women.'
},
{
    label: 'Ophthlmology',
    icon :FaEyeDropper,
    description:'Physicians specializing in ophthalmology develop comprehensive medical and surgical care of the eyes. Ophthalmologists diagnose and treat vision problems. '
},

{
    label: 'Pathology',
    icon :GiMicroscope,
    description:'A physician specializing in pathology studies the causes and nature of diseases. Through microscopic examination and clinical lab tests, pathologists work to diagnose, monitor, and treat diseases.'
},
{
    label: 'Pediatrics',
    icon :MdChildCare,
    description:'Physicians specializing in pediatrics work to diagnose and treat patients from infancy through adolescence. Pediatricians practice preventative medicine and also diagnose common childhood diseases, such as asthma, allergies, and croup.'
},
{
    label: 'Surgery',
    icon :GiScalpel,
    description:'Physicians specializing in surgery can choose to become general surgeons or pursue a subspecialty in a specific area of the body, type of patient, or type of surgery. '
},
{
    label: 'Psychiatry',
    icon :RiMentalHealthFill,
    description:'Physicians specializing in psychiatry devote their careers to mental health and its associated mental and physical ramifications. Understanding the connections between genetics, emotion, and mental illness, is important while psychiatrists also conduct medical laboratory and psychological tests to diagnose and treat patients.'
},
{
    label: 'Urology',
    icon :GiCaveEntrance,
    description:'Urology is the health care segment that cares for the male and female urinary tract, including kidneys, ureters, bladder, and urethra. It also deals with the male sex organs.  '
},
{
    label: 'Internal medicine ',
    icon :TbMedicineSyrup,
    description:'An internist is a physician who treats diseases of the heart, blood, kidneys, joints, digestive, respiratory, and vascular systems of adolescent, adult, and elderly patients. '
},

]

const Categories = () => {

    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname();
    const isMainPage = pathname =='/'

if(!isMainPage){
    return null;

}

  return (
   <Container>
    <div className="
    
    flex
    flex-row
    items-center
    justify-between
    overflow-x-auto
    
    ">
{categories.map((item)=>(
    <CategoryBox

    key= {item.label}
    label = {item.label}
    selected = { category ==item.label}
    icon = {item.icon}
    />
))}
    </div>
   </Container>
  )
}

export default Categories
