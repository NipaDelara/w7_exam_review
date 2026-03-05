import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({setIsAuthenticated }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [accountType, setAccountType] = useState("");
  
    const navigate = useNavigate();

    const handleSignup = async() =>{
        try {
            const response = await fetch("/api/users/signup", {
                method: "POST",
                headers:{
                    "content-type": "application/json",
                },
                body: JSON.stringify({email, password, fullName, phoneNumber, gender, dateOfBirth, accountType}),
            });

            if (response.ok){
                const user =await response.json();
                localStorage.setItem("user",JSON.stringify(user));
                console.log("Signup successful");
                setIsAuthenticated(true);
                navigate("/");
            }
        } catch(error) {
            console.error("Signup failed:", error);
        }
    } 

  return (
    <div className='form-container'>
    <h2>Sign Up</h2>
    <label>
        Full name :
        <input type="text" 
        value={fullName} 
        onChange={(e) => 
        setFullName(e.target.value)} />
    </label>

    <label>
        Email :
        <input type="email" 
        value={email} 
        onChange={(e) => 
        setEmail(e.target.value)} 
        placeholder="Enter your email"
        />
    </label>

    <label>
        Password :
        <input type="password" 
        value={password} 
        onChange={(e) => 
        setPassword(e.target.value)} 
        placeholder="Enter your password"
        />
    </label>

    <label>
        Phone number :
        <input type="number" 
        value={phoneNumber} 
        onChange={(e) => 
        setPhoneNumber(e.target.value)} 
        placeholder="Enter your phone number"
        />
    </label>

    <label>
        Gender :
        <select value={gender} 
        onChange={(e) => 
        setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
    </label>

    <label>
        Date of birth :
        <input type="date" 
        value={dateOfBirth} 
        onChange={(e) => 
        setDateOfBirth(e.target.value)} />
    </label>

    <label>
        Account type :
        <select value={accountType} 
        onChange={(e) => 
        setAccountType(e.target.value)}>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
        </select>
    </label>
    <button className='signup-button' onClick={handleSignup}>Sign Up</button>
    </div>
  )
}

export default Signup
