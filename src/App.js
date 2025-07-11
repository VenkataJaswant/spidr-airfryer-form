import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    costGuess: '',
    spidrPin: '',
  });

  const [showToast, setShowToast] = useState(false);
  const [showPin, setShowPin] = useState(false); //  PIN visibility toggle

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'spidrPin') {
      let formatted = value.replace(/\D/g, '').slice(0, 16);
      formatted = formatted.replace(/(.{4})/g, '$1-').slice(0, 19);
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.clear();
    const { spidrPin, ...safeData } = formData;
    console.log('📝 Spidr Air Fryer Interest Form Submission');
    console.table({ ...safeData, spidrPin: '••••-••••-••••-••••' });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      costGuess: '',
      spidrPin: '',
    });
  };

  return (
    <>
      <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
        <div className={`toast align-items-center text-bg-success border-0 ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              ✅ Form submitted successfully!
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)}></button>
          </div>
        </div>
      </div>

      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div className="glass-card p-4">
          <h2 className="text-center mb-4">Spidr Air Fryer Interest Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
              <label>First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
              <label>Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="tel" className="form-control" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
              <label>Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <label>Email</label>
            </div>
            <div className="form-floating mb-3">
              <input type="number" className="form-control" name="costGuess" placeholder="Guess the cost" value={formData.costGuess} onChange={handleChange} required />
              <label>Guess the Air Fryer’s Cost</label>
            </div>

            <div className="form-floating mb-4 position-relative">
              <input
                type={showPin ? 'text' : 'password'}
                className="form-control"
                name="spidrPin"
                placeholder="####-####-####-####"
                autoComplete="off"
                value={formData.spidrPin}
                onChange={handleChange}
                required
              />
              <label>Secret Spidr PIN</label>
              <span className="toggle-eye" onClick={() => setShowPin(!showPin)}>
                {showPin ? '🙈' : '👁️'}
              </span>
            </div>

            <button type="submit" className="btn btn-outline-light w-100">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
