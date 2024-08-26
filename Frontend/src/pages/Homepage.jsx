import { Analytics } from "../components/Analytics";
import { NavLink } from "react-router-dom";

const Home = ()=>{
  return(
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            
            <div className="hero-content">
              <p>This project was made by Gaurav Kaushik.</p>  
              <h1>Welcome to MyBlog</h1>
              <p>
                Are you overburdened with the thoughts, negativity or just have a plain uncontrollable urge to spill the tea, this is the site for you.
                At myBlog you can chat with friend post articles and upload files for others to enjoy, you may collaborate the beginning of new gossip rag with lots of giggles.
                MyBlog provides the access to various modern day sites it was made as a slap on facebook where we are to go and improve upon the knowledge base needed to conform to everything or not.
              </p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn">connect now</button>
                </NavLink>
                <NavLink to="/service">
                  <button className="btn secondary-btn">learn more</button>
                </NavLink>
              </div>
            </div>
            
            <div className="hero-image">
              <img src="https://www.schudio.com/wp-content/uploads/2017/06/school-website-blog-banner.png" alt="hero image" width={400} height={500}/>
            </div>
          </div>
        </section>
      </main>
      
      <Analytics />
      
      <section className="section-hero">
          <div className="container grid grid-two-cols">
            
            <div className="hero-image">
              <img src="https://www.schudio.com/wp-content/uploads/2017/06/school-website-blog-banner.png" alt="hero image" width={400} height={500}/>
            </div>
            <div className="hero-content">
              <p>This project was made by Gaurav Kaushik.</p>
              
              <h1>Welcome to MyBlog</h1>
              <p>
                Are you ready to exprience the goodness of millions of hearts in likes and comments ?
                Get on my blog and lets spill some tea and put some light on the new shed of light on some topics.
              </p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn">connect now</button>
                </NavLink>
                <NavLink to="/service">
                  <button className="btn secondary-btn">learn more</button>
                </NavLink>
              </div>
              
            </div>
          </div>
        </section>
    </>
  );
}
export default Home;