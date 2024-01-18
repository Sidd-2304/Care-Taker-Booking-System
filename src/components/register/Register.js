import React, { useState } from 'react';
import {} from '../register/Register.css';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { hashSync } from 'bcryptjs';

function Register() {
  const [registrationType, setRegistrationType] = useState('users');
  let { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();

  function onRegisterFormSubmit(newUser) {
    // hash password
    let hashedpassword = hashSync(newUser.password, 5);
    newUser.password = hashedpassword;

    // make post request based on registration type
    fetch(`http://localhost:4000/${registrationType}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(res => {
        if (res.status === 201) {
          navigate('/login');
        }
      })
      .catch(err => console.log('err in registration', err));
  }

  return (
    <div className='abc'>
      <div className=' p-3'>
        <div className=' text-center m-5'>
          <div className='de d-block mx-auto w-75 container rounded-5 pt-4 pb-4 shadow-lg mx-5 my-5'>
            <h1 className='display-2 text-dark fw-semibold'>Register</h1>
            <div className='d-flex justify-content-center mb-3'>
              {/* Volunteer button */}
              <button
                className={`btn ${registrationType === 'caretakers' ? 'btn-dark' : 'btn-secondary'} fs-5 fw-medium m-3`}
                onClick={() => setRegistrationType('caretakers')}
              >
                As CareTaker
              </button>
              {/* User button */}
              <button
                className={`btn ${registrationType === 'users' ? 'btn-dark' : 'btn-secondary'} fs-5 fw-medium m-3`}
                onClick={() => setRegistrationType('users')}
              >
                As User
              </button>
            </div>
            <form className='w-50 mx-auto' onSubmit={handleSubmit(onRegisterFormSubmit)}>
              {/* username */}
              <div className='mb-3'>
                <label htmlFor='username' className='form-label'></label>
                <input type='text' {...register('username', { required: true })} id='username' className='form-control fs-5' placeholder='Username' />
              </div>
              {errors.username?.type === 'required' && <h5 className='mx-4 text-start text-danger'>Username is required</h5>}
              {/* password */}
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'></label>
                <input type='password' {...register('password', { required: true })} id='password' className='form-control fs-5 ' placeholder='Password' />
              </div>
              {errors.password?.type === 'required' && <h5 className='mx-4 text-start text-danger'>Password is required</h5>}
              {/* email */}
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'></label>
                <input type='email' {...register('email', { required: true })} id='email' className='form-control fs-5' placeholder='E-mail' />
              </div>
              {errors.email?.type === 'required' && <h5 className='mx-4 text-start text-danger'>Email is required</h5>}
              <button type='submit' className='btn btn-dark fs-5 fw-medium m-3'>
                Register
              </button>
              <p className='lead text-center fw-semibold fs-3'>
                Already registered !!
                <Link to='/login' className='fs-4 fw-semibold'>
                  <p className='lead fw-medium'>Login Here!</p>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
