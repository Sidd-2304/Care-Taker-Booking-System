import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {} from '../caretakerdashboard/CareTakerDashBoard.css'

function CareTakerDashBoard() {
  const { name } = useParams();

  const [caretakerDetails, setCaretakerDetails] = useState({
    name: name || "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    dob: "",
    gender: "",
    mobileNumber: "",
    image: null,
    bookingDetails: {
      availableForBooking: "yes",
      timings: "",
      ownVehicle: "yes",
      vehicleOptions: "",
      additionalDetails: "",
    },
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCaretakerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCaretakerDetails((prevDetails) => ({
      ...prevDetails,
      address: {
        ...prevDetails.address,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCaretakerDetails((prevDetails) => ({
      ...prevDetails,
      image: file,
    }));
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setCaretakerDetails((prevDetails) => ({
      ...prevDetails,
      bookingDetails: {
        ...prevDetails.bookingDetails,
        [name]: value,
      },
    }));
  };

  const handleFormSubmit = () => {
    // Prepare the data for POST request
    const dataToSend = {
      name: caretakerDetails.name,
      address: {
        street: caretakerDetails.address.street,
        city: caretakerDetails.address.city,
        state: caretakerDetails.address.state,
        zipCode: caretakerDetails.address.zipCode,
      },
      dob: caretakerDetails.dob,
      gender: caretakerDetails.gender,
      mobileNumber: caretakerDetails.mobileNumber,
      image: caretakerDetails.image,
      bookingDetails: {
        availableForBooking: caretakerDetails.bookingDetails.availableForBooking,
        timings: caretakerDetails.bookingDetails.timings,
        ownVehicle: caretakerDetails.bookingDetails.ownVehicle,
        vehicleOptions: caretakerDetails.bookingDetails.vehicleOptions,
        additionalDetails: caretakerDetails.bookingDetails.additionalDetails,
      },
    };
  
    // Check if caretaker already exists
    fetch(`http://localhost:4000/caretakerslist?name=${caretakerDetails.name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const existingDetails = data[0];
  
          // Compare and update only changed fields
          const updatedDetails = {
            ...existingDetails,
            ...Object.keys(dataToSend).reduce((acc, key) => {
              if (key === 'address' || key === 'bookingDetails') {
                // Handle nested 'address' field
                acc[key] = {
                  ...existingDetails[key],
                  ...Object.keys(dataToSend[key]).reduce((nestedAcc, nestedKey) => {
                    nestedAcc[nestedKey] =
                      dataToSend[key][nestedKey] !== ''
                        ? dataToSend[key][nestedKey]
                        : existingDetails[key][nestedKey];
                    return nestedAcc;
                  }, {}),
                };
              } else if (dataToSend[key] !== '') {
                acc[key] = dataToSend[key];
              } else {
                acc[key] = existingDetails[key]; // Retain unchanged details
              }
              return acc;
            }, {}),
          };
  
          // Set timings to empty string if availableForBooking is 'no'
          if (updatedDetails.bookingDetails.availableForBooking === 'no') {
             updatedDetails.bookingDetails.timings = '';
          }

          // Update the details
          fetch(`http://localhost:4000/caretakerslist/${existingDetails.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDetails),
          })
            .then((response) => response.json())
            .then((updatedData) => {
              console.log('Caretaker details updated successfully:', updatedData);
              setSuccessMessage('Caretaker details updated successfully!');
            })
            .catch((error) => {
              console.error('Error updating caretaker details:', error);
              setSuccessMessage('Error updating caretaker details. Please try again.');
            });
        } else {
          // Caretaker does not exist, add a new record
          fetch('http://localhost:4000/caretakerslist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          })
            .then((response) => response.json())
            .then((newData) => {
              console.log('Caretaker details added successfully:', newData);
              setSuccessMessage('Caretaker details added successfully!');
            })
            .catch((error) => {
              console.error('Error adding caretaker details:', error);
              setSuccessMessage('Error adding caretaker details. Please try again.');
            });
        }
      })
      .catch((error) => {
        console.error('Error checking caretaker details:', error);
        setSuccessMessage('Error checking caretaker details. Please try again.');
      });
  };
    
  useEffect(() => {
    setCaretakerDetails((prevDetails) => ({
      ...prevDetails,
      name: name || "",
    }));
  }, [name]);

  const timingOptions = [
    "Morning (8:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 4:00 PM)",
    "Evening (4:00 PM - 8:00 PM)",
    "Night (8:00 PM - 12:00 AM)",
    "Any",
  ];

  const vehicleOptions = [
    'Car',
    'Bike',
    'Both',
  ];

  return (
    <div className="container mt-4">
      <div className="container bg-dark bg-gradient text-white mb-4 text-center rounded-5 p-3">
          <h1 className="fw-bold">Welcome, {caretakerDetails.name}!</h1>
      </div>
          {successMessage && <div className="alert alert-success w-75 d-block mx-auto">{successMessage}</div>}
      {/* </div> */}
      <div className="row">
        {/* Personal Details Container */}
        <div className="col-md-6">
          <div className="container shadow-lg bg-dark-subtle p-4 mb-3 rounded-5">
            <h1 className="mb-4 fw-bold">Personal Details</h1>
            <form>
              {/* Address */}
              <div className="mb-3">
                <label className="form-label">Address:</label>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Street:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="street"
                      value={caretakerDetails.address.street}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={caretakerDetails.address.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">State:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={caretakerDetails.address.state}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Zip Code:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zipCode"
                      value={caretakerDetails.address.zipCode}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
              </div>
              {/* Date of Birth */}
              <div className="mb-3">
                <label className="form-label">Date of Birth:</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={caretakerDetails.dob}
                  onChange={handleInputChange}
                />
              </div>
              {/* Gender */}
              <div className="mb-3">
                <label className="form-label">Gender:</label>
                <select
                  className="form-select"
                  name="gender"
                  value={caretakerDetails.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {/* Mobile Number */}
              <div className="mb-3">
                <label className="form-label">Mobile Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="mobileNumber"
                  value={caretakerDetails.mobileNumber}
                  onChange={handleInputChange}
                />
              </div>
              {/* Upload Image */}
              <div className="mb-3">
                <label className="form-label">Upload Image (JPEG, PNG only):</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".jpeg, .jpg, .png"
                  onChange={handleImageChange}
                />
              </div>
            </form>
          </div>
        </div>
        {/* Booking Details Container */}
        <div className="col-md-6">
          <div className="container shadow-lg abcd bg-dark-subtle p-4 mb-5 rounded-5">
            <h1 className="mb-4 fw-bold">Booking Details</h1>
            {/* Available for Booking */}
            <div className="mb-3">
              <label className="form-label">Available for Booking :</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="availableForBooking"
                  value="yes"
                  checked={caretakerDetails.bookingDetails.availableForBooking === "yes"}
                  onChange={handleBookingInputChange}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="availableForBooking"
                  value="no"
                  checked={caretakerDetails.bookingDetails.availableForBooking === "no"}
                  onChange={handleBookingInputChange}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
            {/* Timings */}
            <div className="mb-3">
              <label className="form-label">Timings:</label>
              <select
                className="form-select"
                name="timings"
                value={caretakerDetails.bookingDetails.timings}
                onChange={handleBookingInputChange}
                disabled={caretakerDetails.bookingDetails.availableForBooking === "no"}
              >
                <option value="">Select Timings</option>
                {timingOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {/* Own Vehicle */}
            <div className="mb-3">
              <label className="form-label">Own Vehicle :</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ownVehicle"
                  value="yes"
                  checked={caretakerDetails.bookingDetails.ownVehicle === "yes"}
                  onChange={handleBookingInputChange}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ownVehicle"
                  value="no"
                  checked={caretakerDetails.bookingDetails.ownVehicle === "no"}
                  onChange={handleBookingInputChange}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
            {/* Vehicle Options */}
            <div className="mb-3">
              <label className="form-label">Vehicle Options:</label>
              <select
                className="form-select"
                name="vehicleOptions"
                value={caretakerDetails.bookingDetails.vehicleOptions}
                onChange={handleBookingInputChange}
                disabled={caretakerDetails.bookingDetails.ownVehicle === "no"}
              >
                <option value="">Select Vehicle</option>
                {vehicleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {/* Additional Details */}
            <div className="mb-3">
              <label className="form-label">Additional Details:</label>
              <textarea
                className="form-control"
                name="additionalDetails"
                value={caretakerDetails.bookingDetails.additionalDetails}
                onChange={handleBookingInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary mx-auto d-block mt-2 mb-4"
        onClick={handleFormSubmit}
      >
        Update Details
      </button>
    </div>
  );
}

export default CareTakerDashBoard;





