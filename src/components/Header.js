import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import aluraLogo from '../assets/alura-logo.png';

function Header() {
  const [activePage, setActivePage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{ ...styles.header, ...(isScrolled ? styles.scrolledHeader : {}) }}>
      <img src={aluraLogo} alt="Logo AluraFlix" style={styles.logo} />
      <nav style={styles.nav}>
        <Link
          to="/"
          style={{
            ...styles.button,
            ...(activePage === 'home' ? styles.activeButton : {}),
          }}
          onClick={() => setActivePage('home')}
        >
          Página Inicial
        </Link>
        <Link
          to="/novo-video"
          style={{
            ...styles.button,
            ...(activePage === 'newVideo' ? styles.activeButton : {}),
          }}
          onClick={() => setActivePage('newVideo')}
        >
          Novo Vídeo
        </Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#262626',
    color: '#fff',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: 900,
    fontSize: '16px',
    borderBottom: '1px solid #2271D1B2',
    boxShadow: '0px 4px 8px #2271D1B2',
    transition: 'all 0.3s ease-in-out', // Adicionando transição suave
  },
  scrolledHeader: {
    padding: '0.5rem 1rem',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', // Sombra reduzida ao rolar
  },
  logo: {
    height: '70px',
    transition: 'height 0.3s ease-in-out', // Suavizar a transição do tamanho da logo
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '0.5rem 1rem',
    border: '1px solid #FFFFFF',
    backgroundColor: '#262626',
    borderRadius: '15px',
    color: '#FFFFFF',
    textDecoration: 'none',
    cursor: 'pointer',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: 900,
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
  activeButton: {
    color: '#206ac4',
    backgroundColor: '#000000',
    border: '1px solid #206ac4',
    boxShadow: 'inset 0 0 10px #206ac4',
  },
};

export default Header;
