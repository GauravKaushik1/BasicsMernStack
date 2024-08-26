import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";
import { useToken } from "../store/tokenDistributor";
import './About.css';
export const About = () => {
  const { user } = useToken();


  return( 
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
          <h1 className="main-heading mb-3">About Us</h1>
            <div className="hero-content">
              <p>Welcome {(user && user.firstName)?`${user.firstName}, `:" "}to our website</p>
              <h2>Why Choose Us?</h2>
              
              <p className="Expertise"><strong>Expertise:</strong> We are passionate writers and industry experts dedicated to providing high-quality content on various topics. Our team has years of experience in writing and journalism, ensuring that every post is both informative and engaging.</p>
              <p className="Customization"><strong>Customization:</strong> We believe in customizing our content to suit the diverse interests of our readers. Whether you're looking for in-depth articles, quick reads, or how-to guides, we tailor our posts to meet your needs and preferences.</p>
              <p className="Customer-Centeric"><strong>Customer Centric:</strong> Our readers are at the heart of everything we do. We strive to create content that resonates with you and adds value to your life. Your feedback is crucial, and we continually work to improve based on your suggestions.</p>
              <p className="Affordability"><strong>Affordability:</strong> Our blog is completely free to access. We believe in providing valuable information without any cost, making it accessible to everyone. Enjoy our content and share it with others who might benefit from it.</p>
              <p className="Reliability"><strong>Reliability:</strong> You can count on us for reliable and well-researched articles. We take pride in delivering content that you can trust, backed by thorough research and credible sources.</p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn">Connect Now</button>
                </NavLink>
                <NavLink to="/services">
                  <button className="btn secondary-btn">Learn More</button>
                </NavLink>
              </div>
            </div>
            <div className="hero-image">               
              <img 
                src="https://www.blogtyrant.com/wp-content/uploads/2011/02/best-about-us-pages.png" 
                
                alt="About Us" 
                width={400} 
                height={500} 
              />
            </div>
          </div>
        </section>
      </main>
      {/* analytics Section */}
        <Analytics />
    </>
    );
  };