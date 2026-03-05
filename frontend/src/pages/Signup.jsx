import { useNavigate } from 'react-router-dom';
import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";

function Signup({setIsAuthenticated }) {
    const email = useField("email");
    const password = useField("password");
    const fullName = useField("text");
    const phoneNumber = useField("tel");
    const gender = useField("text");
    const dateOfBirth = useField("date");
    const accountType = useField("text");
  
    const navigate = useNavigate();

    const { signup, isLoading, error } = useSignup("/api/users/signup");
    
    const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = await signup({ 
         email: email.value, password: password.value, fullName: fullName.value, phoneNumber: phoneNumber.value, gender: gender.value, dateOfBirth: dateOfBirth.value, accountType: accountType.value });
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className='form-container'>
    <h2>Sign Up</h2>
    <form onSubmit={handleFormSubmit}>
    <label>
        Full name :
        <input {...fullName} placeholder="Enter your full name" />
    </label>

    <label>
        Email :
        <input {...email} placeholder="Enter your email" />
    </label>

    <label>
        Password :
        <input {...password} placeholder="Enter your password" />
    </label>

    <label>
        Phone number :
        <input {...phoneNumber} placeholder="Enter your phone number" />
    </label>

    <label>
        Gender :
        <select {...gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
    </label>

    <label>
        Date of birth :
        <input type="date" 
        {...dateOfBirth} />
    </label>

    <label>
        Account type :
        <select {...accountType}>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
        </select>
    </label>
    <button className='signup-button' type="submit">Sign Up</button>
    </form>
    </div>
  )
}

export default Signup;
