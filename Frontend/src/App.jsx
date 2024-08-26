import { ThemeProvider } from './store/ThemeContext.jsx';import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from 'react';
import {Error404} from "./pages/Error404Page.jsx";
import { BackToTopButton } from "./components/BackToTopButton.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { TFooter } from "./components/TFooter.jsx";
import { Footer } from "./components/Footer.jsx";
//in case of export default lazy imports are like this
const Home = React.lazy(() => import('./pages/Homepage.jsx'));
const Service = React.lazy(() => import('./pages/Service.jsx'));const About = React.lazy(() => import('./pages/About.jsx').then(module => ({ default: module.About })));
const Contact = React.lazy(() => import('./pages/Contact.jsx').then(module => ({ default: module.Contact })));
const Register = React.lazy(() => import('./pages/Register.jsx').then(module => ({ default: module.Register })));
const Login = React.lazy(() => import('./pages/Login.jsx').then(module => ({ default: module.Login })));
const Logout = React.lazy(() => import('./pages/Logout.jsx').then(module => ({ default: module.Logout })));
const AdminLayout = React.lazy(() => import('./components/layouts/Admin.Layout').then(module => ({ default: module.AdminLayout })));
const AdminUsers = React.lazy(() => import('./pages/Admin.Users').then(module => ({ default: module.AdminUsers })));
const AdminContacts = React.lazy(() => import('./pages/Admin.Contacts').then(module => ({ default: module.AdminContacts })));
const AdminUpdate = React.lazy(() => import('./pages/Admin.Update').then(module => ({ default: module.AdminUpdate })));import ErrorBoundary from "./components/ErrorBoundary.jsx";
function App() {
return (
    <>
     <ThemeProvider>     <Router>{/* BrowserRouter */}
        <ErrorBoundary>
          <Navbar />
          <Suspense fallback={<div>Loading... </div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/service" element={<Service />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              {/* using the wildcard to show error resource not found page or default fallback page */}              <Route path="*" element={<Error404 />} />
              
                            <Route path="/admin" element={<AdminLayout />} >
                <Route path="users" element={<AdminUsers />} />
                <Route path="contacts" element={<AdminContacts />} />
                <Route path={"users/:id/edit"} element={< AdminUpdate />} / >
                {/* secure admin route on frontend */}
              </Route>            </Routes>
          </Suspense>
          <BackToTopButton />
          <Footer />
          
          
          <TFooter />
        </ErrorBoundary>
      </Router>
    </ThemeProvider>    </>  )
}export default App;
