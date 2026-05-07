import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Welcome/Navbar";
import Footer from "../components/Welcome/Footer";
import HomeSection from "../components/Welcome/HomeSection";
import ServiceSection from "../components/Welcome/ServiceSection";
import AboutSection from "../components/Welcome/AboutSection";
import ContactSection from "../components/Welcome/ContactSection";
import { useSelector } from "react-redux";


function Welcome() {
  const [activeSection, setActiveSection] = useState('home');
  const {userData} = useSelector(state=>state.user);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Navbar */}
      <Navbar userData={userData}/>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 bg-gradient-to-br from-orange-400/20 via-amber-400/20 to-red-400/20">
        <HomeSection scrollToSection={scrollToSection}/>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-white/50 backdrop-blur-sm">
        <ServiceSection/>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-red-500/10">
        <AboutSection/>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-white/60 backdrop-blur-sm">
        <ContactSection/>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Welcome;