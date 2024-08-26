import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useToken } from "../store/tokenDistributor";
import { toast } from "react-toastify";//toast container is imported and used in main.jsx along with the css of toast container

export const Login = () => {
  const {storeTokenInLS, API_URL} = useToken();
  const [user, setUser] = useState({
    email: "not@given.com",
    password: "notgivenpassword",
  });


const navigate = useNavigate();


const handleInput = (e) => {
  
  
  let name = e.target.name;
  let value = e.target.value;
  
  setUser({
    ...user,
    [name]: value//for dynamic data
  });
};

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login handle submit user : ",user);
    try {
      const response = await fetch(
        `${API_URL}/api/users/login`,
        {
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const res_Data = await response.json();
      console.log("handleSubmit login response data:", res_Data);
      if(response.ok){
        
        
        storeTokenInLS(res_Data.data.token);
        
        toast.success("loggedin successfully!");
        setUser({email: "", password: ""});
        navigate('/');
      }
      else{
        console.error("invalid credentials in login form", error);
        toast.error(res_Data.extraDetails || res_Data.message || "Login failed.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Login error:", error);
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvNvodCz_QRBmcnADmvLP8OpGysWGv-hqRA&s"
                  alt="Login Image"
                  width={400}
                  height={500}
                />
              </div>
            
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
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
                  <button type="submit" className="btn btn-submit">
                    Login now
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