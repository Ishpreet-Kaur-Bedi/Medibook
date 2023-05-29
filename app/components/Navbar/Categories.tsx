'use client'

import Container from "../Container"
import{TbBeach, TbMountain, TbPool} from 'react-icons/tb'
import{GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi'
import{MdOutlineVilla} from 'react-icons/md'
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"
import {FaSkiing} from 'react-icons/fa'
import {BsSnow,BsGem} from 'react-icons/bs'



export const categories =[
{
    label: 'Beach',
    icon:TbBeach,
    description:'This Restraunt is near the beach'
},

{
    label: 'Windmills',
    icon :GiWindmill,
    description:'This Restraunt has windmills'
},

{
    label: 'Modern',
    icon :MdOutlineVilla,
    description:'This Restraunt is near the windmill'
},
{
    label: 'Countryside',
    icon :TbMountain,
    description:'This Restraunt is near the countryside'
},
{
    label: 'Pools',
    icon :TbPool,
    description:'This Restraunt is near the pool'
},
{
    label: 'Islands',
    icon :GiIsland,
    description:'This Restraunt is on the island'
},
{
    label: 'Lake',
    icon :GiBoatFishing,
    description:'This Restraunt is near a lake'
},
{
    label: 'Skiing',
    icon :FaSkiing,
    description:'This Restraunt has skiing activities '
},
{
    label: 'Castles',
    icon :GiCastle,
    description:'This Restraunt in in castle '
},
{
    label: 'Camping',
    icon :GiForestCamp,
    description:'This Restraunt has camping activiites '
},
{
    label: 'Arctic',
    icon :BsSnow,
    description:'This Restraunt has camping activiites '
},
{
    label: 'Cave',
    icon :GiCaveEntrance,
    description:'This Restraunt has camping activiites '
},
{
    label: 'Desert',
    icon :GiCactus,
    description:'This Restraunt has camping activiites '
},
{
    label: 'Barns',
    icon :GiBarn,
    description:'This Restraunt has camping activiites '
},
{
    label: 'lux',
    icon :BsGem,
    description:'This Restraunt has camping activiites '
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
