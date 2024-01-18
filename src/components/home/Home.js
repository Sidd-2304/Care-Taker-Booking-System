import React from 'react'
import {} from '../home/Home.css'
import { useNavigate } from 'react-router-dom'

function Home() {

    let navigate=useNavigate()
  function handleRegisterClick(){
    navigate('/register')
  }
  function handleLoginClick(){
    navigate('/login')
  }
  return (
    <div>
      <div style={{minHeight:'45vh'}} className='bg-danger-subtle bg-gradient d-flex justify-content-between align-items-center'>
      <div>
        <img src='https://nemacare.com/images/resource/4.jpg' alt='' className='img2 ' />
      </div>
      <div className='text-center mx-4 fs-5 display-3'>
        <p className='ab mx-5 display-5 fs-4 fw-medium'>Welcome to the "<span className='fw-bold text-danger'> Elderly Care Services </span>" - where compassion meets commitment. We are dedicated to enhancing the lives of seniors by providing personalized care solutions that prioritize their well-being and foster a warm, supportive community.</p>
            <div className='mt-3'>
            <button className='btn btn-dark mx-3 fw-semibold' onClick={handleRegisterClick}>Register</button>
            <button className='btn btn-dark mx-3 fw-semibold' onClick={handleLoginClick}>Login</button>
            </div>
      </div>
    </div>
    <div className=''>
      <h1 className='about display-3 text-center mt-4 fw-semibold'>About Us!</h1>
      <div className='row mx-5 mt-4'>
        <div className='p-3 col-sm-4 bg-secondary-subtle'>
          <h4 className='text-center fw-semibold'>Values that guide us</h4>
          <p className=''>Our core values revolve around compassion, respect, and a commitment to creating a warm and supportive community for seniors. We prioritize not only their physical well-being but also their emotional and mental health, recognizing that a holistic approach is key to a fulfilling life.</p>
        </div>
        <div className='p-3 col-sm-4'>
          <h4 className='text-center fw-semibold'>Our Mission</h4>
          <p>At Elderly Care, our mission is to enhance the quality of life for seniors by providing comprehensive and personalized care solutions. We are dedicated to bridging the gap in proper assistance and emotional support, ensuring that every elderly person feels valued and cherished.</p>
        </div>
        <div className='p-3 bg-secondary-subtle col-sm-4'>
          <h4 className='text-center fw-semibold'>Unique Approach to Aging</h4>
          <p>Elderly Care stands out for its unwavering dedication to redefining the aging experience. Through a team of dedicated caregivers, cutting-edge technology, and a profound sense of empathy, we emphasize open communication and transparency.</p>
        </div>
      </div>
      <div className='row mx-5 mb-5'>
        <div className='p-3 col-sm-4 '>
          <h4 className='text-center fw-semibold'>Community Connection</h4>
          <p className=''>At Elderly Care, we foster a sense of community where the unique needs and experiences of older individuals are valued. Join us in creating a warm, supportive environment where seniors can thrive, and every moment matters.</p>
        </div>
        <div className='p-3 col-sm-4 bg-secondary-subtle'>
          <h4 className='text-center fw-semibold'>Holistic Care Solutions</h4>
          <p>We believe in a holistic approach to care, addressing not only the physical needs of seniors but also their emotional and social well-being. Our comprehensive care solutions aim to provide comfort, dignity, and companionship during the golden years of life.</p>
        </div>
        <div className='p-3 col-sm-4'>
          <h4 className='text-center fw-semibold'>Making a difference together</h4>
          <p>We invite you to join us on this impactful journey towards creating a world where elderly individuals age with grace and joy. Whether you are seeking care for a loved one or looking to contribute as a caregiver, Elderly Care is here to make a positive difference in the lives of seniors and their families.</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home