import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { compareSync } from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [loginType, setLoginType] = useState('users');
  let { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();

  // form submission
  function onSignInFormSubmit(userCredentialsObject) {
    fetch(`http://localhost:4000/${loginType}?username=${userCredentialsObject.username}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(userObjArray => {
        if (userObjArray.length === 0) {
          alert('Invalid Username');
        } else {
          // compare passwords
          let result = compareSync(userCredentialsObject.password, userObjArray[0].password);
          // if passwords are matched
          if (result === true) {
            // navigate to dashboard based on login type
            navigate(`/${loginType === 'users' ? 'User' : 'CareTaker'}-dashboard/${userCredentialsObject.username}`, { state: userObjArray[0] });
          } else {
            alert('Invalid password');
          }
        }
      });
  }

  return (
    <div className='abc p-3'>
      <div className=''>
        <div className='p-3'>
          <div className=' text-center m-5'>
            <div className='de d-block mx-auto w-75 container rounded-5 pt-4 pb-4 shadow-lg mx-5 my-5'>
              <h1 className='display-2 text-dark fw-semibold'>Login</h1>
              <div className='d-flex justify-content-center mb-3'>
                {/* Volunteer button */}
                <button
                  className={`btn ${loginType === 'caretakers' ? 'btn-dark' : 'btn-secondary'} fs-5 fw-medium m-3`}
                  onClick={() => setLoginType('caretakers')}
                >
                  As CareTaker
                </button>
                {/* User button */}
                <button
                  className={`btn ${loginType === 'users' ? 'btn-dark' : 'btn-secondary'} fs-5 fw-medium m-3`}
                  onClick={() => setLoginType('users')}
                >
                  As User
                </button>
              </div>
              <form className='w-50 mx-auto' onSubmit={handleSubmit(onSignInFormSubmit)}>
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
                <button type='submit' className='btn btn-dark fs-5 fw-medium m-3'>
                  Login
                </button>
                <p className='lead text-center fw-semibold fs-3'>
                  New {loginType === 'users' ? 'User' : 'CareTaker'} !!
                  <Link to='/register' className='fs-4 fw-semibold'>
                    <p className='lead fw-medium'> Register Here!</p>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
