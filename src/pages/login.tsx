import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";

interface NewUserRequestBody {
  name: string;
  email: string;
  photo: string;
  gender?: string;
  role: string;
  dob?: string;
  _id: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const userData: Partial<{
        name: string;
        email: string;
        photo: string;
        role: string;
        _id: string;
        gender: string; // Make gender non-optional
        dob: string; // Make dob non-optional
      }> = {
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        role: "user",
        _id: user.uid,
      };
  
  
      // Include gender if it's not empty
      if (gender) {
        userData.gender = gender;
      }
  
      // Include date of birth if it's not empty
      if (date) {
        userData.dob = date;
      }
  
      const res = await login(userData as NewUserRequestBody);
  

      if ("data" in res) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data?.user!));
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExist());
      }
    } catch (error) {
      toast.error("Sign In Fail");
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Already Signed In Once</p>
          <button onClick={loginHandler}>
            <FcGoogle /> <span>Quick Sign in</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
