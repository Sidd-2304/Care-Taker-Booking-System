import React, { useEffect, useState } from 'react';
import {} from '../userdashboard/UserDashBoard.css';

function UserDashBoard() {
  const [userDetails, setUserDetails] = useState({});
  const [caretakers, setCaretakers] = useState([]);

  useEffect(() => {
    // Fetch user details from the server or API
    fetch('http://localhost:4000/users')
      .then(response => response.json())
      .then(data => {
        setUserDetails(data[0]); // Assuming the user details are in an array, adjust accordingly
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });

    // Fetch caretakers data from the server or API
    fetch('http://localhost:4000/caretakerslist')
      .then(response => response.json())
      .then(data => {
        setCaretakers(data);
      })
      .catch(error => {
        console.error('Error fetching caretakers:', error);
      });
  }, []);

  const handleBookNow = (caretakerId) => {
    // Handle 'Book Now' button click, e.g., initiate a booking process
    console.log(`Book Now clicked for caretaker with ID ${caretakerId}`);
  };

  const availableCaretakers = caretakers.filter(caretaker => caretaker.bookingDetails.availableForBooking === 'yes');
  const noOfAvailableCaretakers = availableCaretakers.length;

  return (
    <div className="container mt-5">
      <div className='d-flex container bg-dark bg-gradient text-white justify-content-between align-items-center p-3 rounded-5 mb-5'>
        <h1 className="">Welcome, {userDetails.username}!</h1>
        <h1 className='fs-5 fw-medium'>Email: {userDetails.email}</h1>
      </div>
      <h2 className="mb-4 fw-bold">Available Caretakers : </h2>
      <div className="row">
        {noOfAvailableCaretakers !== 0 ? (
          availableCaretakers.map(caretaker => (
            <div key={caretaker.id} className="col-md-4 mb-4">
              <div className="card border-black border-3 rounded-3">
                <img
                  src={caretaker.image} // Assuming you have an image URL in the caretaker data
                  className="card-img-top img-fluid rounded"
                  alt={caretaker.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center fw-bold fs-3 display-5">{caretaker.name}</h5>
                  <p className="card-text">
                    <strong>Address:</strong> {caretaker.address.street}, {caretaker.address.city}, {caretaker.address.state} - {caretaker.address.zipCode}
                  </p>
                  <p className="card-text">
                    <strong>Date of Birth:</strong> {caretaker.dob}
                  </p>
                  <p className="card-text">
                    <strong>Gender:</strong> {caretaker.gender}
                  </p>
                  <p className="card-text">
                    <strong>Mobile Number:</strong> {caretaker.mobileNumber}
                  </p>
                  <div className="d-flex justify-content-around mt-3">
                    <button
                      className="btn btn-dark fw-medium"
                      onClick={() => handleBookNow(caretaker.id)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-danger w-75 d-block mx-auto display-5 fs-5 fw-medium" role="alert">
            No caretakers available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashBoard;












