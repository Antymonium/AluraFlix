import aluraLogo from '../assets/alura-logo.png';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © 2025 <span style={styles.name}>Thaíssa Klotz</span>
        <img src={aluraLogo} alt="Logo AluraFlix" style={styles.logo} />
        Todos os Direitos Reservados.
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#141414',
    color: '#fff',
    fontFamily: '"Roboto", sans-serif',
    display: 'flex',
    justifyContent: 'center', // Centraliza os elementos
    alignItems: 'center',
    flexWrap: 'wrap', // Permite que o conteúdo se reorganize em telas menores
    borderTop: '1px solid #2271D1B2',
    boxShadow: '0px -4px 8px #2271D1B2',
  },
  text: {
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o texto horizontalmente
    gap: '10px',
    flexWrap: 'wrap', // Ajusta o texto para caber em telas menores
  },
  logo: {
    height: '50px', // Reduz o tamanho do logo para telas pequenas
    margin: '0 5px',
  },
  name: {
    fontWeight: 'bold',
  },
  '@media (max-width: 600px)': {
    footer: {
      flexDirection: 'column', // Empilha os elementos verticalmente
    },
    text: {
      justifyContent: 'center',
      textAlign: 'center', // Garantia extra de centralização
    },
    logo: {
      height: '40px', // Logo ainda menor em telas menores
    },
  },
};

export default Footer;
