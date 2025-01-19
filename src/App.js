import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import VideoCard from './components/VideoCard';
import NovoVideo from './components/NovoVideo';
import Modal from './components/Modal';

function App() {
  const [videos, setVideos] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null); // Armazena o vídeo atualmente selecionado para editar
  const [newVideoAlert, setNewVideoAlert] = useState(null);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false); 
  const [deletedVideo, setDeletedVideo] = useState(null); // Estado para armazenar o vídeo excluído
  const [undoTimeout, setUndoTimeout] = useState(null); // Para o tempo de desfazer exclusão

  // Carrega os vídeos ao montar o componente
  useEffect(() => {
    axios
      .get('http://localhost:3001/videos')
      .then((response) => {
        const videoList = response.data;
        setVideos(videoList);

        if (videoList.length > 0) {
          const randomVideo = videoList[Math.floor(Math.random() * videoList.length)];
          setFeaturedVideo(randomVideo);
        }
      })
      .catch((error) => console.error('Erro ao buscar vídeos:', error));
  }, []);

  const handleVideoCreated = async (newVideo) => {
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (_) {
        return false;
      }
    };

    if (!isValidUrl(newVideo.url) || !isValidUrl(newVideo.imagem)) {
      alert('As URLs fornecidas não são válidas.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/videos', newVideo);
      setVideos((prevVideos) => [...prevVideos, response.data]);
      setNewVideoAlert({ ...response.data, isVisible: true });

      setTimeout(() => {
        setNewVideoAlert(null);
        setSuccessAlertVisible(true);
        setTimeout(() => {
          setSuccessAlertVisible(false);
        }, 5000);
      }, 30000);
    } catch (error) {
      console.error('Erro ao adicionar o vídeo:', error);
      alert('Não foi possível adicionar o vídeo.');
    }
  };

  const handleDelete = async (id) => {
    const videoToDelete = videos.find((video) => video.id === id);
    if (videoToDelete) {
      // Remove o vídeo da lista antes de enviar a requisição para a API
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
      setDeletedVideo(videoToDelete); // Salva o vídeo deletado para possibilitar o desfazer

      const timeout = setTimeout(async () => {
        try {
          await axios.delete(`http://localhost:3001/videos/${id}`);
        } catch (error) {
          console.error('Erro ao excluir vídeo:', error);
          alert('Não foi possível excluir o vídeo.');
          setVideos((prevVideos) => [...prevVideos, videoToDelete]);
        }
      }, 30000);

      setUndoTimeout(timeout); // Armazena o timeout para limpar o estado posteriormente
    }
  };

  const handleUndoDelete = () => {
    if (deletedVideo) {
      setVideos((prevVideos) => [...prevVideos, deletedVideo]);
      setDeletedVideo(null); // Limpa o vídeo deletado
      clearTimeout(undoTimeout); // Limpa o timeout
    }
  };

  const handleEdit = (video) => {
    setCurrentVideo(video); // Passa o vídeo para o estado currentVideo
    setIsModalOpen(true); // Abre o modal
  };

  const handleSave = async (updatedVideo) => {
    try {
      await axios.put(`http://localhost:3001/videos/${updatedVideo.id}`, updatedVideo);
      setVideos((prevVideos) =>
        prevVideos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video))
      );
      alert('Vídeo atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar vídeo:', error);
      alert('Não foi possível atualizar o vídeo.');
    }
    setIsModalOpen(false);
  };

  const scrollToCategory = (category) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              {featuredVideo && (
                <Banner
                  video={{
                    title: featuredVideo.titulo,
                    image: featuredVideo.imagem,
                    url: featuredVideo.url,
                    tagName: featuredVideo.category || 'Geral',
                    tagColor:
                      featuredVideo.category === 'Frontend'
                        ? '#6bd1ff'
                        : featuredVideo.category === 'Backend'
                        ? '#00c86f'
                        : featuredVideo.category === 'Ciência de Dados'
                        ? '#ffab00'
                        : '#e50914',
                    description: featuredVideo.descricao,
                  }}
                />
              )}
              <div style={{ marginTop: '1rem', padding: '0 2rem' }}>
                {Object.entries(
                  videos.reduce((acc, video) => {
                    const category = video.category || 'Sem Categoria';
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(video);
                    return acc;
                  }, {})
                ).map(([category, videos]) => (
                  <div key={category} id={category} style={{ marginBottom: '2rem' }}>
                    <div
                      style={{
                        backgroundColor:
                          category === 'Frontend'
                            ? '#6bd1ff'
                            : category === 'Backend'
                            ? '#00c86f'
                            : category === 'Ciência de Dados'
                            ? '#ffab00'
                            : category === 'Inovação'
                            ? '#e50914'
                            : category === 'Gestão'
                            ? '#9c27b0'
                            : '#ccc',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                      }}
                    >
                      {category}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {videos.map((video) => (
                        <VideoCard
                          key={video.id}
                          video={video}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {newVideoAlert && newVideoAlert.isVisible && (
                <div style={alertStyles.container}>
                  <span style={alertStyles.message}>
                    Novo vídeo adicionado.{' '}
                    <a
                      href="#"
                      onClick={() => scrollToCategory(newVideoAlert.category)} // Modificado para rolar até a categoria
                      style={alertStyles.link}
                    >
                      Ver agora
                    </a>
                  </span>
                  <button style={alertStyles.closeButton} onClick={() => setNewVideoAlert(null)}>
                    X
                  </button>
                </div>
              )}
              {deletedVideo && (
                <div style={undoAlertStyles.container}>
                  <span style={undoAlertStyles.message}>
                    Vídeo excluído. Deseja desfazer?
                  </span>
                  <button style={undoAlertStyles.button} onClick={handleUndoDelete}>
                    Desfazer
                  </button>
                  <button style={undoAlertStyles.closeButton} onClick={() => setDeletedVideo(null)}>
                    X
                  </button>
                </div>
              )}
            </div>
          }
        />
        <Route
          path="/novo-video"
          element={<NovoVideo onVideoCreated={handleVideoCreated} newVideoAlert={newVideoAlert} />}
        />
      </Routes>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={currentVideo} // Passa o vídeo atual para o Modal
        />
      )}
      <Footer />
    </Router>
  );
}

const alertStyles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    zIndex: 1000,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  message: {
    fontSize: '14px',
  },
  link: {
    color: '#00c86f',
    textDecoration: 'none',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
};

const undoAlertStyles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    backgroundColor: '#ff5733',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    zIndex: 1000,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  message: {
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#00c86f',
    border: 'none',
    color: '#fff',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default App;
