import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "../store/tokenDistributor";
import { toast } from "react-toastify";
export const AdminUpdate = () => {
    
    const [data, setData] = useState({
        username:"",
        email:"",
        phone:"",
        password:"",
        firstName:"",
        middleName:"",
        lastName:"",
        profile_Pic:"",
        refreshToken:"",
        
        
    });
    const { id } = useParams(); 
    console.log("params id in single user in admin update : ", id);
    const { AuthorizationToken, API_URL } = useToken();
    useEffect(() => {
        
        const getSingleUserData = async () => {
        
        try{
            console.log("Id in admin update in get single user data",id);
            const response = await fetch(
            `${API_URL}/api/admin/users/${params.id}`,
            {
                method:"GET",
                headers:{
                    "Authorization" : AuthorizationToken,
                },
            }
        );
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(` admin update get users single data: ${data}`);
        console.log(data);
        setData(data);
        
        }
        catch(error){
            console.error("error in get single user data : ",error);
            
            toast.error("Failed to fetch user data");
        }
    }
        getSingleUserData();
    }, [id, API_URL, AuthorizationToken]);
    const handleInput = (e) => {
        const { name, value } = e.target;

        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
        
     
    };
    const handleSubmit = async(e) => {
        e.preventDefault();//to hold page refresh
        try{
            console.log("params.id in handleSubmit in admin update : ",id);
            
            const response = await fetch(
                `${API_URL}/api/admin/users/update/${params.id}`,
                {
                    method:"PATCH",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization" :AuthorizationToken,
                    },
                    body: JSON.stringify(data),
                }
            );
            if(response.ok){
                toast.success("UserData Updated Successfully");
            }
            else{
                toast.error("not Updated");
            }
        }
        catch(error){
            console.error("error in handlesubmit in admin update",error);
            toast.error("Failed to update user data");
        }

    }
    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading mb-3">Update User Data</h1>
                </div>
                <div className="container grid grid-two-cols">

                    <section className="section-form">
                        <form onSubmit={handleSubmit} >
            
                            <div>
            
                                <label htmlFor="username">UserName</label>            
                                <input type="text" 
                                    value = {data.username}
                                    onChange= {handleInput}
                                    name="username"
                                    placeholder="appledroid1"
                                    id="username"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" 
                                    value={data.email}
                                    onChange={handleInput}
                                    name="email"
                                    placeholder="abc@xyz.com"
                                    id="email"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">Mobile</label>
                                <input type="phone" 
                                    value={data.phone}
                                    onChange={handleInput}
                                    name="phone"
                                    placeholder="2138329412"
                                    id="phone"
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div>
                                <button type="submit">Update</button>
                            </div>
                        </form>
                    </section>
                </div>
            </section>
        </>
    );
}