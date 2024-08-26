import { useEffect, useState } from "react";
import { useToken } from '../store/tokenDistributor';
import { toast } from "react-toastify";
import "./Contact.css";
export const Contact = () => {
  const { user, API_URL, isLoading, userAuthentication } = useToken();
  
  const [contact, setContact] = useState({
    username: (user && user.username)?user.username : "",
    email: (user && user.email )?user.email : "",
    message: "",
  });
  
  
   useEffect(() => {
    if (user && user.username && user.email) {
      setContact({
        username: user.username || "",
        email: user.email || "",
        message: contact.message 
      });
    
    }
  }, [user]);
    if (isLoading) return <div>Loading...</div>;
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    
    setContact({
      ...contact,
      [name]:value,
    });
    
    
    
    
    
    
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    
    try{
      console.log("contact form handle submit for the contact : ",contact);
      const response = await fetch(
        `${API_URL}/api/form/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        }
      );
      const responseData = await response.json();
      if(response.ok){
        console.log("contact form handle submit response Data : ",responseData);
        toast.success("Contact Form submission successful");
        
        setContact({
          username: user?.username || "",
          email: user?.email || "",
          message: ""
        });
      }
      else{
        console.error("Error found inside the response in  contact form", responseData.error);
        toast.error(responseData.error);
      }
    
    }
    catch(error){
      console.error("error in contacts form handle submit", error);
      toast.error('An error occurred while submitting the form');
    }
  
  }
    return (
  
    <>
      <main>
        <section className="section-contact">
          <div className="contact-content container">
            <h1 className="main-heading mb-3">Contact Us</h1>
    
          </div>
          <div className="container grid grid-two-cols">
    
            <div className="contact-img">
              <img src="https://nsfasteners.in/wp-content/uploads/2023/03/contact-us-Mod-3.jpg" alt="contact image" width={400} height={500}/>
            </div>
                        <section className="section-form">
              <form onSubmit={handleSubmit}>
    
                <div>
    
                  <label htmlFor="username">UserName</label>            
                  <input type="text" 
                    value = {contact.username}
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
                    value={contact.email}
                    onChange={handleInput}
                    name="email"
                    placeholder="abc@xyz.com"
                    id="email"
                    autoComplete="off"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message">Message</label>
                  <textarea 
                    name="message" 
                    id="message"
                    autoComplete="off"
                    value={contact.message}
                    onChange={handleInput}
                    required
                    cols="30"
                    rows="6"
                  ></textarea>
                </div>
                <div>
                  <button type="submit">submit</button>
                </div>
              </form>
            </section>
          </div>
          <section className="iframe-map mb-3">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.3283551613!2d77.20898509999996!3d28.527352200000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1722933057978!5m2!1sen!2sin" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          
          </section>
        </section>
      </main>
    </>
  );
};