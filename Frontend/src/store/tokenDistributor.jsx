/* this file is made to share data through out the react website by providing the context of what is to be shown where with some wrapper function that will also supply the value using value attribute just wrapp the element to get the value 
<context.Provider> //the instanciated object context  is created by 
    <element>//children to be wrapped
</context.Provider>
*/
import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
//use context hook



export const TokenContext = createContext();

export const TokenProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
const [showAdmin , setShowAdmin] = useState(false);
    const isLoggedIn = Boolean(token);
    
    const AuthorizationToken = `Bearer ${token}`;
    const API_URL = import.meta.env.VITE_API_URL;
    /*
        useCallback is a React Hook that lets you cache a function definition between re-renders.
    
    */
    const storeTokenInLS = useCallback((serverToken) => {
        
        setToken(serverToken);
        
        
        
        localStorage.setItem('token', serverToken);
        userAuthentication();
        return token;
    },[]);
    
    console.log("isLoggedIn inside of token distributor :", isLoggedIn);
    

    
        
        
        const LogoutUser = useCallback(() => {
            setToken(null);
            setUser(null);
            setShowAdmin(false);
            
            
            return localStorage.removeItem('token');
        },[])
        
        const userAuthentication = useCallback(async() => {
            if (!isLoggedIn) return; 
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${API_URL}/api/users/user`,
                    {
                        method: "GET",
                        headers:{
                            "Authorization" : AuthorizationToken
                        },
                    }
                );
                if(response.ok){
                    const data = await response.json();
                    console.log("user data inside user authentication in token distributor : ", data.data);
                    setUser(data.data);
                    setShowAdmin(data.data.isAdmin);
                }
                else{
                    console.error("Failed to fetch user data:", response.statusText);
                }
                
            } catch (error) {
                console.error("Error in user authentication:", error);
            }finally {
                setIsLoading(false);
            }
        },[isLoggedIn, AuthorizationToken, API_URL]);

        const ensureAdminExists = useCallback(async() => {
            if(!isLoggedIn)return;
            setIsLoading(true);
            try{
                const response = await fetch(
                `${API_URL}/api/admin/checkAdminhealth`,
                {
                    method:"GET",
                    headers: {
                        'Authorization': AuthorizationToken,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if(response.ok){
                const data = await response.json();
                console.log("admin data inside admin exists or not check in token distributor : ", data);
            }
            else{
                console.error(response.status,"Failed to fetch admin data:", response.statusText);
            }
            }catch(error){
                console.error("error occured when checking data of the admin's existence");
            }finally{
                setIsLoading(false);
            }

            
        },[isLoggedIn, AuthorizationToken, API_URL])
        
        const getServices = useCallback(async() => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${API_URL}/api/data/service`,
                    {
                        method:"GET"
                    }
                );
                
                if(response.ok){
                    const data = await response.json();
                    console.log("response data inside of get services in token distributor : ",data);
                    
                    setServices(data.message);
                    setIsLoading(false);
                }
                else{
                    console.error("Error fetching services data in token distributor in services");
                    
                }
            } catch (error) {
                console.error(`services loading error in tokenDistributor ${error}`);
            }finally {
                setIsLoading(false);
            }
        }, [API_URL])
        
        
        
        
        
        
        
        
        
        useEffect(() => {
            getServices();//
        },[getServices]);
        useEffect(() => {
            if (isLoggedIn) {
                userAuthentication(); 
                console.log("show admin : ",showAdmin);
            }
        }, [isLoggedIn, userAuthentication]); 
        

        useEffect(() => {
            if (isLoggedIn && user) {
                ensureAdminExists();
            }
        }, [isLoggedIn, user, ensureAdminExists]);    
    


const contextValue = useMemo(() => ({
        
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        AuthorizationToken,
        API_URL,
        isLoading,
        showAdmin,
        ensureAdminExists
    }), [isLoggedIn, storeTokenInLS, LogoutUser, user, services, AuthorizationToken, API_URL, isLoading, showAdmin, ensureAdminExists]);

     return (
            <TokenContext.Provider value={contextValue}>
                {children}
            </TokenContext.Provider>
        );


    
    
}
export const useToken = () => {
    
    const TokenContextValue = useContext(TokenContext);
    if(!TokenContextValue){
        throw new Error("useToken must be used within a TokenProvider. explaination:- the element is not wrapped in which value is to be provided or useToken used outside of Provider");
    }
    return TokenContextValue;
}