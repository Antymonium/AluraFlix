import React from 'react';
import lixeira from '../assets/lixeira.svg';
import lapis from '../assets/lapis.svg';

function VideoCard({ video, onEdit, onDelete }) {
  const borderColor = video.category === 'Frontend' ? '#6bd1ff' :
                      video.category === 'Backend' ? '#00c86f' :
                      video.category === 'Ciência de Dados' ? '#ffab00' :
                      video.category === 'Inovação' ? '#e50914' :
                      video.category === 'Gestão' ? '#9c27b0' :
                      '#ccc';

  return (
    <div style={{ ...styles.card, borderColor, borderWidth: '3px', borderStyle: 'solid' }}>
      <a href={video.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
        <img
          src={video.imagem}
          alt={video.titulo}
          style={{ ...styles.image, borderColor, boxShadow: `inset 0 0 10px ${borderColor}` }}
        />
      </a>
      <div style={styles.info}>
        <a href={video.url} target="_blank" rel="noopener noreferrer" style={styles.titleLink}>
          <h3 style={styles.title}>{video.titulo}</h3>
        </a>
        <p style={styles.description}>{video.descricao}</p>
      </div>
      <div style={{ ...styles.footer, borderColor }}>
        <button style={styles.button} onClick={() => onEdit(video)}>
          <img src={lapis} alt="Editar" style={styles.icon} />
          Editar
        </button>
        <button style={styles.button} onClick={() => onDelete(video.id)}>
          <img src={lixeira} alt="Excluir" style={styles.icon} />
          Excluir
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: '300px',
    height: '100%',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    margin: '10px',
  },
  image: {
    width: '100%',
    height: '170px',
    objectFit: 'cover',
    borderWidth: '3px',
    borderStyle: 'solid',
    borderRadius: '8px 8px 0 0',
  },
  info: {
    padding: '10px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '0px',
    marginTop: '0px'
  },
  titleLink: {
    textDecoration: 'none',
    color: '#0066ff',
    transition: 'color 0.3s',
  },
  description: {
    fontSize: '14px',
    color: '#555',
    marginTop: '1px',
    marginBottom: '1px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#000',
    border: '1.5px solid',
    borderRadius: '0 0 8px 8px',
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  icon: {
    width: '15px',
    height: '15px',
    marginRight: '5px',
  },
};

export default VideoCard;
