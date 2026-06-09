import { useEffect } from 'react';
import Hero from './components/Hero';
import Install from './components/Install';
import Nav from './components/Nav';
import Demo from './components/Demo';
import Footer from './components/Footer';
import initMoneyInputs from './func/inputMoney';
// import MoneyInputDemo from './components/proyect/MoneyInputDemoReact';

function App() {
  useEffect(() => {
    initMoneyInputs();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* <MoneyInputDemo /> */}
      <Nav />
      <main>
        <Hero />
        <Install />
        <Demo />
      </main>
      <Footer />
    </div>
  );
}

export default App;
