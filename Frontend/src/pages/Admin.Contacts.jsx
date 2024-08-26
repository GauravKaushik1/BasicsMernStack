import { useEffect, useState } from "react";
import { useToken } from "../store/tokenDistributor";
import { toast } from "react-toastify";

export const AdminContacts = () => {
    const [ contactData, setContactData] = useState([]);
    const { AuthorizationToken, API_KEY } = useToken();
    const getContactsData = async() => {
        
        try {
            const response = await fetch(
                `${API_KEY}/api/admin/contacts`,
                {
                    method:"GET",
                    headers:{
                        "Authorization" : AuthorizationToken,
                    },
                }
            );
            if(response.ok){
                const data = await response.json();
                console.log("contact data in admin contacts get contacts data: ", data);
                setContactData(data);
            }
            else{
                toast.error('Failed to fetch contact data.');
            }
        } catch (error) {
            toast.error('Error fetching contact data.');
            console.error("error in admin contacts in get contacts data",error);
        }
    }
    const deleteContactById = async (id) => {
        try{
            console.log("id of contact to be deleted via admin",id);
            const response = await fetch(
            `${API_URL}/api/admin/contacts/delete/${id}`,
            {
                method:"DELETE",
                headers:{
                    "Authorization" :AuthorizationToken,
                },
            }
        );
        
        if(response.ok){
            const data = await response.json();
            console.log(`contacts after delete ${data}`);
            console.log(data);
            await getContactsData();
            toast.success("the contact deleted successfully");
        }
        else{
            toast.error('Failed to delete contact.');
        }
        }
        catch(error){
            console.error("error in delete contactById in admin contacts",error);
            toast.error('Error deleting contact.');
        }
    }
    useEffect(() => {
        getContactsData();
    },[]);

    return (
        <>
            <section className="admin-contacts-section" >

                <h1>Admin Contact Data</h1>
                <div className="container admin-users">

                    {//map method always uses index in react
                        contactData.map((curContactData, index) => {
                            const { username, email, message, _id} = curContactData;

                            return (
                                <div key={`${_id}-${index}`}>
                                    <p><strong>{username}</strong></p>
                                    <p><strong>{email}</strong></p>
                                    <p><strong>{message}</strong></p>
                                    <button className="delete" onClick={() => deleteContactById(_id)} >delete</button>
                                </div>
                                );
                        })
                    }
                </div>
            </section>
        </>
    );
}