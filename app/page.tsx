// We are telling it to look in the current folder ('./')
// then go into the 'components' folder.
import Hero from '../components/Hero'; 
import AboutUs from '../components/AboutUs'; 
import Sponsors from '../components/Sponsors';
import Footer from '../components/Footer';
export default function Home() {

// const response = await fetch('api/login', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//   },  
//   body: JSON.stringify({
//     email: '',
//     password: '',
//   })
// });

  return (
    <main>
      <Hero />
      <AboutUs />
      <Sponsors />
      <Footer/>
      {/* Navbar component will go here next */}
      {/* You can import and use the Navbar component like this: */}
      {/* <Navbar /> */}
      {/* Make sure to import it at the top of this file */}
      {/* Sponsors component will go here next */}
    </main>
  );
}
