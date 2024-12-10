// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Register.css";

// function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     dateOfBirth: "",
//     gender: "",
//     role: "STUDENT"  // Default role
//   });
//   const [error, setError] = useState({
//     name: "",
//     email: "",
//     password: "",
//     dateOfBirth: "",
//     gender: "",
//     role: ""
//   });
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//     setError({ ...error, [name]: "" });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formErrors = {};
//     if (formData.name.trim() === "") {
//       formErrors.name = "Enter Name";
//     }
//     if (formData.email.trim() === "") {
//       formErrors.email = "Enter Email";
//     }
//     if (formData.password.trim() === "") {
//       formErrors.password = "Enter Password";
//     }
//     if (formData.dateOfBirth.trim() === "") {
//       formErrors.dateOfBirth = "Enter Date of Birth";
//     }
//     if (formData.gender.trim() === "") {
//       formErrors.gender = "Select Gender";
//     }
//     if (formData.role.trim() === "") {
//       formErrors.role = "Select Role";
//     }
//     if (Object.keys(formErrors).length > 0) {
//       setError(formErrors);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8080/api/users/createUser",
//         formData
//       );
//       console.log('Registration Response:', response.data); // Log the response
//       alert("Successfully Registered");
//       navigate("/");
//     } catch (error) {
//       console.error('Registration Error:', error.response?.data || error.message); // Log the error
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-form">
//         <h1>Register</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="register-form-group">
//             <label className="register-label">Name:</label>
//             <input
//               type="text"
//               name="name"
//               className="register-input"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             {error.name && <span className="register-error">{error.name}</span>}
//           </div>

//           <div className="register-form-group">
//             <label className="register-label">Email:</label>
//             <input
//               type="email"
//               name="email"
//               className="register-input"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             {error.email && <span className="register-error">{error.email}</span>}
//           </div>

//           <div className="register-form-group">
//             <label className="register-label">Password:</label>
//             <input
//               type="password"
//               name="password"
//               className="register-input"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             {error.password && <span className="register-error">{error.password}</span>}
//           </div>

//           <div className="register-form-group">
//             <label className="register-label">Date of Birth:</label>
//             <input
//               type="date"
//               name="dateOfBirth"
//               className="register-input"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//             />
//             {error.dateOfBirth && <span className="register-error">{error.dateOfBirth}</span>}
//           </div>

//           <div className="register-form-group">
//             <label className="register-label">Gender:</label>
//             <select
//               name="gender"
//               className="register-select"
//               value={formData.gender}
//               onChange={handleChange}
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             {error.gender && <span className="register-error">{error.gender}</span>}
//           </div>

//           <div className="register-form-group">
//             <label className="register-label">Role:</label>
//             <select
//               name="role"
//               className="register-select"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option value="STUDENT">Student</option>
//               <option value="FACULTY">Faculty</option>
//             </select>
//             {error.role && <span className="register-error">{error.role}</span>}
//           </div>

//           <button type="submit" className="register-button">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    role: "STUDENT"  // Default role
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation logic
    const formErrors = {};
    if (formData.name.trim() === "") formErrors.name = "Enter Name";
    if (formData.email.trim() === "") formErrors.email = "Enter Email";
    if (formData.password.trim() === "") formErrors.password = "Enter Password";
    if (formData.dateOfBirth.trim() === "") formErrors.dateOfBirth = "Enter Date of Birth";
    if (formData.gender.trim() === "") formErrors.gender = "Select Gender";

    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/users/createUser",
        formData
      );
      console.log('Registration Response:', response.data); // Log the response
      alert("Successfully Registered");
      navigate("/");
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message); // Log the error
      alert("Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label className="register-label">Name:</label>
            <input
              type="text"
              name="name"
              className="register-input"
              value={formData.name}
              onChange={handleChange}
            />
            {error.name && <span className="register-error">{error.name}</span>}
          </div>
          
          <div className="register-form-group">
            <label className="register-label">Email:</label>
            <input
              type="email"
              name="email"
              className="register-input"
              value={formData.email}
              onChange={handleChange}
            />
            {error.email && <span className="register-error">{error.email}</span>}
          </div>
          
          <div className="register-form-group">
            <label className="register-label">Password:</label>
            <input
              type="password"
              name="password"
              className="register-input"
              value={formData.password}
              onChange={handleChange}
            />
            {error.password && <span className="register-error">{error.password}</span>}
          </div>
          
          <div className="register-form-group">
            <label className="register-label">Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              className="register-input"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {error.dateOfBirth && <span className="register-error">{error.dateOfBirth}</span>}
          </div>
          
          <div className="register-form-group">
            <label className="register-label">Gender:</label>
            <select
              name="gender"
              className="register-select"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {error.gender && <span className="register-error">{error.gender}</span>}
          </div>
          
          <div className="register-form-group">
            <label className="register-label">Role:</label>
            <select
              name="role"
              className="register-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
            </select>
            {error.role && <span className="register-error">{error.role}</span>}
          </div>

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
