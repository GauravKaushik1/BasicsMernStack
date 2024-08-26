import { useState ,useEffect } from "react";
import { useToken } from "../store/tokenDistributor";
import { Link } from "react-router-dom";
export const AdminUsers = () => {
    const [user, setUser] = useState([]);
    const { AuthorizationToken, API_URL } = useToken();
    
    const getAllUsersData = async () => {

        try {
            const response = await fetch(
                `${API_URL}/api/admin/users`,
                {
                    method:"GET",
                    headers:{
                        "Authorization" :AuthorizationToken,
                    },
        
        
                }
            );
            const res_data = await response.json();
            console.log("response data in admin users get all user data : ",res_data);
            if(response.ok){
                console.log(`the response was ok in admin users get all users data users ${res_data}`);
                setUser(res_data.data);
            }
            else{
                console.log("admin user get all users data",res_data.extraDetails || res_data.message || "admin data fetch failed");
            }
        } catch (error) {
            console.error("error in admin get all users data",error);
        }
    
    }

    
    const deleteUser = async (id) => {
        try{
            console.log("id in admin user delete User",id);
            const response = await fetch(
            `${API_URL}/api/admin/users/delete/${id}`,
            {
                method:"DELETE",
                headers:{
                    "Authorization" :AuthorizationToken,
                },
    
    
            }
        );
        const data = await response.json();
        console.log(`users after delete ${data}`);
        console.log(data);
        if(response.ok){
            console.log('the response was ok in admin users delete user data :',data);
            getAllUsersData();
        }
        else{
            console.log("admin user get all users data",res_data.extraDetails || res_data.message || "admin data fetch failed");
        }
        }
        catch(error){
            console.error("error in deleteUser in admin users",error);
        }
    }
    
    useEffect(() => {
        getAllUsersData();
    }, [API_URL, AuthorizationToken]);

    return (
        
        <>
            <section>
                <div className="container">
                    <h1>Admin Users Data</h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Phone
                                </th>
                                <th>
                                    Update
                                </th>
                                <th>
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(user) && user.length > 0 ? (
                                user.map((curUser, index) => (
                                    
                                    <tr key={`${curUser._id}-${index}`}>
                                        <td>{curUser.username}</td>
                                        <td>{curUser.email}</td>
                                        <td>{curUser.phone}</td>
                                        <td>
                                            <Link to = {`/admin/users/${curUser._id}/Edit`} >
                                                <button>Edit</button>
                                            </Link>
                                                </td>
                                        <td><button className="delete" onClick={() => {deleteUser(curUser._id)}}>Delete</button></td>
                                        {/* <td><button className="delete" onClick={() => {deleteUser._id}}>Delete</button></td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No users available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
            </div>
        </section>
        </>
    );
}