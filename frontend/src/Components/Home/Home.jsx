import React from 'react'
import "./Home.css";
import Carousel from 'react-bootstrap/Carousel';
import cat from "../Images/cat.jpg"
import dog from "../Images/dog.jpg"
import hedgehog from "../Images/hedgehog.png"
import color from "../Images/color.png"
import border from "../Images/petBorder2.png"
import About from '../About/About';


const Home = () => {

  return (
    <>
    
    {/* MOBILE & TABLET VIEW  */}
    <Carousel className='home-carousel'>
      <Carousel.Item>
        <img src={cat} className='home-image' alt='FAILED TO LOAD'></img>
        <Carousel.Caption>
          <div className='home-text'>
          <h3 className='headerTitles'>Welcome to our shop</h3>
          <p>A delightful digital heaven for pet lovers and their furry friends. 
            As you navigate through our vibrant website, you'll encounter a vast 
            selection of quality pet supplies. 
            Whether you're a proud cat connoisseur, a dedicated dog enthusiast, 
            or an admirer of the more exotic members of the animal kingdom, 
            our shop promises an easy and informative shopping experience. 
          </p>
          </div>
       
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <img src={hedgehog} className='home-image' alt='FAILED TO LOAD'></img>
        <Carousel.Caption>
          <div className='home-text'>
          <h3 className='headerTitles'>Who are we?</h3>
          <p>We're a team of passionate pet enthusiasts committed to enriching 
            the lives of animals and their human companions. 
            Our mission extends beyond mere commerce, it's about creating a 
            community where pet welfare is paramount, and where every product 
            is chosen with love and care. 
            Our website is not just a storefront, but a comprehensive hub for 
            pet care.
          </p>
          </div>
      </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <img src={dog} className='home-image' alt='FAILED TO LOAD'></img>
        <Carousel.Caption>
        <div className='home-text'>
          <h3 className='headerTitles'>Our products</h3>
          <p>Our products are meticulously curated to uphold the highest 
            standards of pet care, offering everything from organic feeds 
            to veterinarian-approved toys and accessories. 
            We believe that every pet deserves the best! 
            On our platform, you’ll find a range of products designed to 
            cater to the unique needs of different breeds and species, 
            ensuring personalized care for your pets. 
          </p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
 
  {/*DESKTOP VIEW */}
  <div className='homepage-desktop'> 
  <img src={hedgehog} className='home-imagea' alt='FAILED TO LOAD'></img>

     <img src={color} className='home-colorImg1'  alt='FAILED TO LOAD'></img>
     <img src={color} className='home-colorImg5'  alt='FAILED TO LOAD'></img>

  <img src={dog} className='home-imageb' alt='FAILED TO LOAD'></img>

    <img src={color} className='home-colorImg2' alt='FAILED TO LOAD'></img>

    <img src={color} className='home-colorImg3' alt='FAILED TO LOAD'></img>

  <img src={cat} className='home-imagec' alt='FAILED TO LOAD'></img> 

    <img src={color} className='home-colorImg4' alt='FAILED TO LOAD'></img>
    <img src={color} className='home-colorImg6' alt='FAILED TO LOAD'></img>


  <Carousel className='home-carousel1' >
      <Carousel.Item>
        <img src={border} className='home-image1' alt='FAILED TO LOAD'></img>
        <Carousel.Caption>
          <div className='home-text'>
          <h3 className='headerTitles'>Welcome to our shop</h3>
          <p>A delightful digital heaven for pet lovers and their furry friends. 
            As you navigate through our vibrant website, you'll encounter a vast 
            selection of quality pet supplies. 
            Whether you're a proud cat connoisseur, a dedicated dog enthusiast, 
            or an admirer of the more exotic members of the animal kingdom, 
            our shop promises an easy and informative shopping experience.</p>
          </div> 
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <img src={border} className='home-image1' alt='FAILED TO LOAD'></img>
        <Carousel.Caption>
          <div className='home-text'>
          <h3 className='headerTitles'>Who are we?</h3>
          <p>We're a team of passionate pet enthusiasts committed to enriching 
            the lives of animals and their human companions. 
            Our mission extends beyond mere commerce, it's about creating a 
            community where pet welfare is paramount, and where every product 
            is chosen with love and care. 
            Our website is not just a storefront, but a comprehensive hub for 
            pet care.</p>
          </div>
      </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <img src={border} className='home-image1' alt='FAILED TO LOAD'></img>
        <Carousel.Caption>
        <div className='home-text'>
          <h3 className='headerTitles'>Our products</h3>
          <p>
          Our products are meticulously curated to uphold the highest 
            standards of pet care, offering everything from organic feeds 
            to veterinarian-approved toys and accessories. 
            We believe that every pet deserves the best! 
            On our platform, you’ll find a range of products designed to 
            cater to the unique needs of different breeds and species, 
            ensuring personalized care for your pets. 
          </p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  </div>
  <hr></hr>

    <About></About>
    </>
  )
}

export default Home