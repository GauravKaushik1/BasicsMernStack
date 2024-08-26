import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Footer.css"
export const Footer = () => {
    return (
        <footer className="section-footer">
  <div className="footer-content">
    <div className="logo-section">
      <NavLink to="/" aria-label='Homepage' className="flex items-center">
        <img
          src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
          alt="Logo"
          height="100"
          width="150"
        />
      </NavLink>
    </div>
    <div className="links-section">
      <div className="resources">
        <h2>Resources</h2>
        <ul>
          <li><NavLink to="/" aria-label='home' className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
          <li><NavLink to="/about" aria-label='About'>About</NavLink></li>
        </ul>
      </div>
      <div className="social">
        <h2>Follow Us</h2>
        <ul>
          <li><a href="#" aria-label='Github'>Github</a></li>
          <li><a href="#" aria-label='Discord'>Discord</a></li>
        </ul>
      </div>
      <div className="legal">
        <h2>Legal</h2>
        <ul>
          <li><a href="#" aria-label='Privacy Policy'>Privacy Policy</a></li>
          <li><a href="#" aria-label='Terms & Conditions'>Terms &amp; Conditions</a></li>
        </ul>
      </div>
    </div>
    <hr />
    <div className="footer-bottom">
      <span className="copy-info">
        &copy; 2024 Gaurav Kaushik
      </span>
      <div className="social-links">
        <a href="#" aria-label='Facebook page'>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 8 19"
            height="50"
            width="100"
          >
            <path
              fillRule="evenodd"
              d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Facebook page</span>
        </a>
        <a href="#" aria-label='Discord community'>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 21 16"
            height="50"
            width="100"
          >
            <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
          </svg>
          <span>Discord community</span>
        </a>
        <a href="#" aria-label='Twitter account'>
        <svg
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  viewBox="0 0 20 17"
  height="50"
  width="100"
>
  <path
    fillRule="evenodd"
    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.834 2.847A8.206 8.206 0 0 1 0 15.336a11.638 11.638 0 0 0 6.283 1.84c7.542 0 11.676-6.496 11.676-12.144 0-.187-.005-.372-.013-.556A8.47 8.47 0 0 0 20 1.892Zm-7.752 4.238c0 .206-.07.407-.197.566a.8.8 0 0 1-.573.234.768.768 0 0 1-.773-.777c0-.236.094-.458.266-.621a.86.86 0 0 1 .577-.222c.226 0 .43.084.591.244a.796.796 0 0 1 .207.578Zm1.752 7.84c-.078.14-.208.244-.361.304a.56.56 0 0 1-.236.05.616.616 0 0 1-.372-.145.726.726 0 0 1-.205-.375c-.05-.139-.071-.29-.057-.44a.776.776 0 0 1 .194-.421.522.522 0 0 1 .384-.189c.237 0 .463.081.64.227a.627.627 0 0 1 .241.436c.033.146.041.303.025.456-.01.144-.057.292-.137.423Z"
    clipRule="evenodd"
  />
</svg>

          <span>Twitter account</span>
        </a>
      </div>
    </div>
  </div>
</footer>

  );
}