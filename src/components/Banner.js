import React from 'react';

function Banner({ video }) {
  const getTagColor = (category) => {
    switch (category) {
      case 'Frontend':
        return '#6bd1ff';
      case 'Backend':
        return '#00c86f';
      case 'Ciência de Dados':
        return '#ffab00';
      case 'Inovação':
        return '#e50914';
      case 'Gestão':
        return '#9c27b0';
      default:
        return '#ccc'; // Cor padrão para categorias desconhecidas
    }
  };

  return (
    <section
      style={{
        ...styles.banner,
        backgroundImage: `url(${video?.image || ''})`,
      }}
    >
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div
          style={{
            ...styles.tag,
            backgroundColor: getTagColor(video?.tagName),
          }}
        >
          <span style={styles.tagText}>{video?.tagName || 'Categoria'}</span>
        </div>
        <h1 style={styles.title}>{video?.title || 'Título não disponível'}</h1>
        <p style={styles.description}>
          {video?.description || 'Descrição do vídeo em destaque.'}
        </p>
        <a
          href={video?.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.button}
        >
          Assista agora
        </a>
      </div>
    </section>
  );
}

const styles = {
  banner: {
    position: 'relative',
    width: '100%',
    height: '500px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    padding: '20px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'left',
    width: '80%', // Ajuste a largura do conteúdo para 80%
    maxWidth: '800px', // Limite de largura para evitar que o conteúdo ultrapasse
  },
  tag: {
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  tagText: {
    fontSize: '24px',
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 700,
    color: '#fff',
  },
  title: {
    fontSize: '36px',
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 500,
    marginBottom: '10px',
  },
  description: {
    fontSize: '18px',
    fontFamily: '"Roboto", sans-serif',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  button: {
    padding: '12px 24px', // Aumentei um pouco o padding para dar mais espaçamento
    backgroundColor: '#E50914',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 500,
    transition: 'background-color 0.3s ease',
    display: 'inline-block',
    marginTop: '10px',
  },
};

export default Banner;
