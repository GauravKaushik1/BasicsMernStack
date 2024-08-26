import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useToken } from "../store/tokenDistributor";
import { toast } from "react-toastify";
import "./Register.css";
export const Register = () => {  
  const [file, setFile] = useState(null);
  const imgSizeLimitMB  = 4;

  const default_User = {
    username: "anonymus",
    
    email: "not@given.com",
    phone: "88877766612",

    password: "notgivenpassword",
    firstName: "notgiven",
    
    
    middleName: "",
    lastName: "",
    profile_Pic: "",
    refreshToken: "",
  };

  const [user, setUser] = useState(default_User);

const navigate = useNavigate();
const { storeTokenInLS, API_URL} = useToken();
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  console.log("the event in handle file change in Register form : ",e);
  console.dir(e.target);
  console.log("selected file in handle file change in register : ",selectedFile);
  if (selectedFile) {
    if (selectedFile.size > imgSizeLimitMB  * 1024 * 1024) { 
      toast.error(`File size should be less than ${imgSizeLimitMB} MB`);
      setFile(null);
      return;
    }
    if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
      toast.error("Only JPEG and PNG files are allowed");
      setFile(null);
      return;
    }
  }
  setFile(selectedFile);
};
const handleInput = (e) => {
  
  console.log("event in handleInput in Register",e);
  const name = e.target.name;
  const value = e.target.value;
  


  
  
  
  
  
  
  
  
  setUser({
    ...user,
    
    [name]: value,
  });
};





  const handleSubmit = async (e) => {

    e.preventDefault();  
    console.log("handle submit Register user : ",user);

    try{
      const formData = new FormData();
      

      
      
      
      
      
      
      
      Object.keys(user).forEach(key => {
        if (user[key]) formData.append(key, user[key]);
      });
      if (file) {
        console.log("file in handle submit register form",file);
        formData.append('profile_Pic', file);
      }
      
      const response = await fetch(
        `${API_URL}/api/users/register`,
        {
        method:"POST",
        
          
        
        
        body: formData,
        },
    );
    console.log("user is stringified in handle submit in register form",JSON.stringify(user));
    console.log("the response inside handle submit in register form",response);
    
    if (response.ok) {
      const res_Data = await response.json();
      console.log("response.data in handle submit in register : ",res_Data);
      console.log("res from server inside of handl submit in register form : ", res_Data.message, res_Data.extraDetails);
      
      storeTokenInLS(res_Data.data.token);
      console.log("res data in handle submit in register form",res_Data);
      
      toast.success("registration successful");
      setUser(default_User);
      setFile(null);
      navigate("/");
    } else {
      toast.error(response.extraDetails || response.message || "Registration failed");
    }
  }catch(err){
    toast.error("registeration error :",err);
  }
  };

  return (
  
    <>
      <section>
        <main>
          <div className="section-registration">
    
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
    
    
                <img
                  src="http://media.licdn.com/dms/image/C5612AQEOFiLt9SDYdg/article-cover_image-shrink_600_2000/0/1625018820978?e=2147483647&v=beta&t=yhwfHVXZSjKdpVU14-lN_2uTOKyc4o4zjhS8D_qTfbk"
                  alt="Registration Image"
                  width={400}
                  height={500}

                />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit} encType="multipart/form-data" >
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="firstName">firstName</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="off"
                      value={user.firstName}
                      onChange={handleInput}
                      placeholder="firstName"
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="middleName">middleName</label>
                    <input
                      type="text"
                      name="middleName"
                      id="middleName"
                      autoComplete="off"
                      value={user.middleName}
                      onChange={handleInput}
                      placeholder="middleName"
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="lastName">lastName</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="off"
                      value={user.lastName}
                      onChange={handleInput}
                      placeholder="lastName"
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="profile_Pic">Profile Pic</label>
                      <input 
                        type="file" 
                        name="profile_Pic" 
                        accept="image/jpeg, image/png"
                        
                        onChange={handleFileChange}
                        />
                        {file && <p>Selected file: {file.name}</p>}
                        
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};