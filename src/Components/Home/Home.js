import React from 'react'
import { HomeContainer ,WelcomeBox} from '../Styles/HomeStyles';

const Home = () => {
  return (
    <HomeContainer>

      <img src="/images/home_main.svg" alt="" className='main_img' />
      
          <WelcomeBox>
            <h1> EPS

            </h1>
                        <p> A  simple and reliable solution for protecting your valuable evidence. Our system ensures the security and integrity of your evidence, providing you with peace of mind and the confidence to handle critical information effectively.</p>
          </WelcomeBox>




    </HomeContainer>
  )
}

export default Home