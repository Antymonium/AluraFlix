import React, { useState, useEffect } from 'react';
import './NovoVideo.css'; // Estilos específicos para a página
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function NovoVideo({ onVideoCreated, newVideoAlert }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    video: '',
    image: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    category: false,
    video: false,
    image: false,
    description: false,
  });

  const [alertVisible, setAlertVisible] = useState(false); // Controle de visibilidade do alerta "Novo vídeo adicionado"
  const [alertTimeout, setAlertTimeout] = useState(null); // Timeout para esconder o alerta

  const navigate = useNavigate(); // Hook para navegação

  // Verifica quando o alerta de "Novo vídeo adicionado" desaparecer e resetar os campos
  useEffect(() => {
    if (newVideoAlert && newVideoAlert.isVisible) {
      setAlertVisible(true);
      setAlertTimeout(
        setTimeout(() => {
          setAlertVisible(false);
        }, 30000) // O alerta desaparecerá após 30 segundos
      );
    }
  }, [newVideoAlert]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value.trim() !== '') {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleBlur = (name) => {
    if (formData[name].trim() === '') {
      setErrors({ ...errors, [name]: true });
    }
  };

  const handleClear = () => {
    setFormData({ title: '', category: '', video: '', image: '', description: '' });
    setErrors({ title: false, category: false, video: false, image: false, description: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
  
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === '') {
        newErrors[key] = true;
        isValid = false;
      }
    });
  
    setErrors(newErrors);
  
    if (isValid) {
      const newVideo = {
        id: Date.now().toString(),
        titulo: formData.title,
        descricao: formData.description,
        url: formData.video,
        imagem: formData.image,
        category: formData.category,
      };
  
      console.log('Novo vídeo salvo:', newVideo);
      if (onVideoCreated) onVideoCreated(newVideo);
      handleClear();
  
      // Adicionar um ID único para o video card
      const videoId = `video-${newVideo.id}`;
      
      // Aqui, estamos usando setTimeout para garantir que o novo vídeo tenha sido renderizado
      setTimeout(() => {
        const newVideoElement = document.getElementById(videoId);
        if (newVideoElement) {
          newVideoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  };

  const handleClickViewNow = () => {
    // Navegar até a página inicial
    navigate('/');

    // Rolar até a categoria do novo vídeo
    setTimeout(() => {
      const element = document.getElementById(newVideoAlert.category);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // Esperar a navegação antes de rolar até a categoria
  };

  return (
    <div className="app-container novo-video-page">
      <div className="novo-video-header">
        <h1 className="novo-video-title">Novo Vídeo</h1>
        <p className="novo-video-text">Complete o formulário para criar um novo card de vídeo.</p>
      </div>

      <form className="novo-video-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label" htmlFor="title-field">
            Título
            <input
              id="title-field"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              onBlur={() => handleBlur('title')}
              placeholder="Adicione um título"
              className={`form-input ${errors.title ? 'error' : ''}`}
            />
            {errors.title && <span className="form-error">Esse campo é obrigatório</span>}
          </label>

          <label className="form-label" htmlFor="category-field">
            Categoria
            <select
              id="category-field"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              onBlur={() => handleBlur('category')}
              className={`form-input ${errors.category ? 'error' : ''}`}
            >
              <option value="">Selecione uma categoria</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Ciência de Dados">Ciência de Dados</option>
              <option value="Inovação">Inovação</option>
              <option value="Gestão">Gestão</option>
            </select>
            {errors.category && <span className="form-error">Esse campo é obrigatório</span>}
          </label>
        </div>

        <label className="form-label" htmlFor="video-field">
          URL do Vídeo
          <input
            id="video-field"
            type="text"
            name="video"
            value={formData.video}
            onChange={handleInputChange}
            onBlur={() => handleBlur('video')}
            placeholder="Adicione a URL do vídeo"
            className={`form-input ${errors.video ? 'error' : ''}`}
          />
          {errors.video && <span className="form-error">Esse campo é obrigatório</span>}
        </label>

        <label className="form-label" htmlFor="image-field">
          Imagem de Capa
          <input
            id="image-field"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            onBlur={() => handleBlur('image')}
            placeholder="Adicione o link da imagem"
            className={`form-input ${errors.image ? 'error' : ''}`}
          />
          {errors.image && <span className="form-error">Esse campo é obrigatório</span>}
        </label>

        <label className="form-label" htmlFor="description-field">
          Descrição
          <textarea
            id="description-field"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            onBlur={() => handleBlur('description')}
            placeholder="Sobre o que é esse vídeo?"
            className={`form-input ${errors.description ? 'error' : ''}`}
          />
          {errors.description && <span className="form-error">Esse campo é obrigatório</span>}
        </label>

        <div className="form-buttons">
          <button type="submit" className="form-button">Salvar</button>
          <button type="button" className="form-button" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </form>

      {alertVisible && newVideoAlert && newVideoAlert.isVisible && (
        <div className="new-video-alert">
          <span>
            Novo vídeo adicionado. <a href="#" onClick={handleClickViewNow} style={{ color: '#00c86f', textDecoration: 'none' }}>Ver agora</a>
          </span>
        </div>
      )}
    </div>
  );
}

export default NovoVideo;
