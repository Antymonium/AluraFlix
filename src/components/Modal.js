import React, { useState, useEffect } from 'react';

function Modal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    video: '',
    image: '',
    description: ''
  });

  // Usando useEffect para atualizar os dados quando initialData for passado
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        title: initialData.title,
        category: initialData.category,
        video: initialData.video,
        image: initialData.image,
        description: initialData.description
      });
    }
  }, [isOpen, initialData]); // Atualiza quando o modal abre ou os dados iniciais mudam

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({ title: '', category: '', image: '', video: '', description: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Chama a função de salvamento passada como prop
    onClose(); // Fecha o modal
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>Editar Card</h2>
        <button style={styles.closeButton} onClick={onClose}>
          Fechar
        </button>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Campo Título */}
          <label style={styles.label}>
            Título
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </label>

          {/* Campo Categoria */}
          <label style={styles.label}>
            Categoria
            <select
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
              style={styles.input}
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Ciência de Dados">Ciência de Dados</option>
              <option value="Inovação">Inovação</option>
              <option value="Gestão">Gestão</option>
            </select>
          </label>

          {/* Campo Imagem */}
          <label style={styles.label}>
            URL da Imagem
            <input
              type="text"
              name="image"
              value={formData.image || ''}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </label>

          {/* Campo Vídeo */}
          <label style={styles.label}>
            URL do Vídeo
            <input
              type="text"
              name="video"
              value={formData.video || ''}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </label>

          {/* Campo Descrição */}
          <label style={styles.label}>
            Descrição
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              style={styles.textarea}
              required
            />
          </label>

          {/* Botões */}
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.saveButton}>
              Salvar
            </button>
            <button type="button" style={styles.clearButton} onClick={handleClear}>
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#03122F',
    padding: '2rem',
    borderRadius: '15px',
    width: '500px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Source Sans Pro, sans-serif',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '16px',
    color: '#fff',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    marginBottom: '0.5rem',
    color: '#FFFFFF',
    fontFamily: 'Source Sans Pro, sans-serif',
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  },
  textarea: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'none',
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    width: '100%',
  },
  saveButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#03122F',
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
  },
  clearButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#03122F',
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
  },
  saveButtonHover: {
    backgroundColor: 'black',
    color: '#2271D1',
    borderColor: '#2271D1',
    boxShadow: 'inset 0 0 5px #2271D1',
  },
  clearButtonHover: {
    backgroundColor: 'black',
    color: '#2271D1',
    borderColor: '#2271D1',
    boxShadow: 'inset 0 0 5px #2271D1',
  },
};

export default Modal;
