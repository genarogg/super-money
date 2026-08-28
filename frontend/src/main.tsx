import './assets/css/index.css';
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Hero from './components/view/Hero';
import Install from './components/view/Install';
import Nav from './components/view/Nav';
import Demo from './components/view/Demo';
import Footer from './components/view/Footer';
import initMoneyInputs from './func/inputMoney';

function App() {
  useEffect(() => {
    initMoneyInputs();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white text-slate-900">
        <Nav />
        <main>
          <Hero />
          <Install />
          <Demo />
        </main>
        <Footer />
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)