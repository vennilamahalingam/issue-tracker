import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import AdbIcon from '@mui/icons-material/Adb';
import '../Style/profileStyle.css';
import 'react-toastify/dist/ReactToastify.css';
import { TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions";
import OAuth from "../components/OAuth";
import axios from "axios";


const SignIn = () =>
{
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state);
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const {email,password} = formData;
    const navigate = useNavigate();
    const onChange = (e) =>
    {
        setShowError(false);
        setFormData((prevValue)=>({...prevValue, [e.target.id]: e.target.value}))
    }
    async function onSubmit ()
        {
            axios.post('http://localhost:3000/auth/login', {  email,
            password })

            .then(response => {
                console.log(response.data)
                localStorage.setItem("token", "Bearer "+response.data.token);// Handle the response data
                navigate("/")
            })
            .catch(error => {

                console.error('Error:', error); // Handle any errors
                setShowError(true);
                toast.error("Bad credentials!")

            });
            
    }
    const handleDemoUser = () => {
        onSubmit('demouser@gmail.com', '123456');
    }
    return (
        <>
        {console.log({userDetails})}
        <div className="pageContainer">
            <header>
                <p className="pageHeader">
                   <AdbIcon/> Ticketing tool Login
                </p>
            </header>
            <form className="formCont" >
                {showError && <div className="badCreds">Bad credentials !</div>} 

                <TextField
                id="email"
                label="Email id"
                value={email}
                onChange={onChange}
                variant="standard"
                />
                <TextField
                    id="password"
                    label="Password"
                    value={password}
                    type="password"
                    onChange={onChange}
                    variant="standard"
                    />
                <div className="passwordInputDiv">
                    
                    {/*<img src={visibilityIcon} alt="show password" onClick={()=>setShowPassword((prev)=>!prev)} className="showPassword" />*/}
                </div>
                
                <div className="button" onClick={() => onSubmit()}>
                        Sign in with credentials
                </div>
            </form>

            <div className="bottomLinks">
                <div className="demoUserLink" onClick={handleDemoUser}>Sign in as a Demo User</div>
                <div>Forgot your <Link to="/profile/forgotPassword" className="">password?</Link></div>                
                <div>Create an account? <Link to="/profile/signup" className="">Sign Up</Link></div>
            </div>
        </div>
        </>
    )
}

export default SignIn;