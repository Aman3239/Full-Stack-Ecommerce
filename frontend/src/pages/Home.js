import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HoriZontalCardProduct from '../components/HoriZontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
       <CategoryList/>
       <BannerProduct/>
       <HoriZontalCardProduct category={"airdopes"} heading={"Tops Airpodes"}/>
       <HoriZontalCardProduct category={"earphones"} heading={"Popular Earphones"}/>
       <VerticalCardProduct category={"mobiles"} heading={"Popular Mobiles"}/>
       <VerticalCardProduct category={"Mouse"} heading={"Popular Mouses"}/>
       <VerticalCardProduct category={"televisions"} heading={"Popular Televisions"}/>
       <VerticalCardProduct category={"camera"} heading={"Cameras & Photography"}/>
       <VerticalCardProduct category={"watches"} heading={"Top Watches "}/>
       <VerticalCardProduct category={"speakers"} heading={"Popular Speakers"}/>
       <VerticalCardProduct category={"refrigerator"} heading={"Top Refrigerator"}/>
       <VerticalCardProduct category={"trimmers"} heading={"Popular Trimmers"}/> 
    </div>
  )
}

export default Home
