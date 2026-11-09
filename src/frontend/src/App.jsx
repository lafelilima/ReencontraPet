import React, { useState, useEffect } from 'react';

export default function App() {
  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem('reencontrapet_data');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        nome: 'Jeffinho',
        especie: 'Cão',
        bairro: 'Centro (Lavras)',
        data: '2026-11-09',
        descricao: 'Vira-lata caramelo.',
        contato: '35999998888',
        status: 'Perdido',
        imagem: 'https://ufla.br/images/noticias/2025/04_ABR/C%C3%A3o_Comunit%C3%A1rio_2.png'
      }
    ];
  });

  const [view, setView] = useState('lista'); // 'lista' | 'cadastrar' | 'detalhes'
  const [selectedPet, setSelectedPet] = useState(null);

  // Formulário
  const [formData, setFormData] = useState({
    nome: '', especie: 'Cão', bairro: '', data: '', descricao: '', contato: '', imagem: ''
  });

  useEffect(() => {
    localStorage.setItem('reencontrapet_data', JSON.stringify(pets));
  }, [pets]);

  const handleCadastro = (e) => {
    e.preventDefault();
    const novoPet = {
      ...formData,
      id: Date.now().toString(),
      status: 'Perdido',
      imagem: formData.imagem || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400'
    };
    setPets([novoPet, ...pets]);
    setFormData({ nome: '', especie: 'Cão', bairro: '', data: '', descricao: '', contato: '', imagem: '' });
    setView('lista');
  };

  const alternarStatus = (id) => {
    setPets(pets.map(p => p.id === id ? { ...p, status: p.status === 'Perdido' ? 'Encontrado' : 'Perdido' } : p));
    if (selectedPet && selectedPet.id === id) {
      setSelectedPet(prev => ({ ...prev, status: prev.status === 'Perdido' ? 'Encontrado' : 'Perdido' }));
    }
  };

  const abrirWhatsApp = (pet) => {
    const texto = `*ReencontraPet Lavras*\nAjude a encontrar o pet *${pet.nome}* (${pet.especie}) perdido no bairro *${pet.bairro}*.\nStatus atual: [${pet.status}]\nContato do tutor: ${pet.contato}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`, '_blank');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #eee', pb: '10px' }}>
        <h1 style={{ fontSize: '1.4rem', color: '#2b6cb0', margin: 0 }} onClick={() => setView('lista')}>🐾 ReencontraPet</h1>
        <button 
          onClick={() => setView(view === 'cadastrar' ? 'lista' : 'cadastrar')}
          style={{ padding: '8px 14px', borderRadius: '6px', backgroundColor: '#2b6cb0', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          {view === 'cadastrar' ? 'Ver Lista' : '+ Cadastrar Pet'}
        </button>
      </header>

      {/* TELA 1: LISTA DE CASOS */}
      {view === 'lista' && (
        <main>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Animais Registados em Lavras</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {pets.map(pet => (
              <div key={pet.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <img src={pet.imagem} alt={pet.nome} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{pet.nome}</h3>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold',
                      backgroundColor: pet.status === 'Perdido' ? '#fed7d7' : '#c6f6d5',
                      color: pet.status === 'Perdido' ? '#9b2c2c' : '#22543d'
                    }}>
                      [{pet.status}]
                    </span>
                  </div>
                  <p style={{ margin: '6px 0', fontSize: '0.9rem', color: '#4a5568' }}>📍 <strong>Bairro:</strong> {pet.bairro}</p>
                  <p style={{ margin: '4px 0', fontSize: '0.85rem', color: '#718096' }}>{pet.descricao}</p>
                  
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button 
                      onClick={() => { setSelectedPet(pet); setView('detalhes'); }}
                      style={{ flex: 1, padding: '6px', border: '1px solid #cbd5e0', background: '#f7fafc', borderRadius: '4px', cursor: 'pointer' }}>
                      Ver Página Única
                    </button>
                    <button 
                      onClick={() => alternarStatus(pet.id)}
                      style={{ padding: '6px 10px', border: 'none', background: pet.status === 'Perdido' ? '#38a169' : '#e53e3e', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>
                      Mudar P/ {pet.status === 'Perdido' ? 'Encontrado' : 'Perdido'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TELA 2: FORMULÁRIO DE CADASTRO */}
      {view === 'cadastrar' && (
        <main>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Cadastrar Animal Perdido</h2>
          <form onSubmit={handleCadastro} style={{ display: 'grid', gap: '10px' }}>
            <input required type="text" placeholder="Nome do pet" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} style={inputStyle} />
            <select value={formData.especie} onChange={e => setFormData({...formData, especie: e.target.value})} style={inputStyle}>
              <option value="Cão">Cão</option>
              <option value="Gato">Gato</option>
              <option value="Outro">Outro</option>
            </select>
            <input required type="text" placeholder="Bairro onde desapareceu" value={formData.bairro} onChange={e => setFormData({...formData, bairro: e.target.value})} style={inputStyle} />
            <input required type="date" value={formData.data} onChange={e => setFormData({...formData, data: e.target.value})} style={inputStyle} />
            <input required type="tel" placeholder="Telefone de Contato (ex: 35999998888)" value={formData.contato} onChange={e => setFormData({...formData, contato: e.target.value})} style={inputStyle} />
            <textarea placeholder="Descrição (cor da pelagem, coleira, sinais particulares)" value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} style={{...inputStyle, height: '70px'}} />
            <button type="submit" style={{ padding: '10px', background: '#3182ce', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Publicar Caso e Gerar Página
            </button>
          </form>
        </main>
      )}

      {/* TELA 3 & 4: PÁGINA PÚBLICA / LINK ÚNICO E ALTERAÇÃO DE STATUS */}
      {view === 'detalhes' && selectedPet && (
        <main>
          <button onClick={() => setView('lista')} style={{ marginBottom: '12px', background: 'none', border: 'none', color: '#3182ce', cursor: 'pointer' }}>← Voltar à Lista</button>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fff' }}>
            <span style={{ 
              display: 'inline-block', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px',
              backgroundColor: selectedPet.status === 'Perdido' ? '#fed7d7' : '#c6f6d5',
              color: selectedPet.status === 'Perdido' ? '#9b2c2c' : '#22543d'
            }}>
              Status Atual: {selectedPet.status}
            </span>
            <img src={selectedPet.imagem} alt={selectedPet.nome} style={{ width: '100%', borderRadius: '8px', height: '240px', objectFit: 'cover' }} />
            <h2 style={{ marginTop: '12px', marginBottom: '4px' }}>{selectedPet.nome}</h2>
            <p><strong>Bairro:</strong> {selectedPet.bairro}</p>
            <p><strong>Espécie:</strong> {selectedPet.especie}</p>
            <p><strong>Contato do Responsável:</strong> {selectedPet.contato}</p>
            <p style={{ background: '#f7fafc', padding: '10px', borderRadius: '6px' }}>{selectedPet.descricao}</p>

            <div style={{ display: 'grid', gap: '8px', marginTop: '16px' }}>
              <button 
                onClick={() => abrirWhatsApp(selectedPet)}
                style={{ padding: '10px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                📲 Compartilhar no WhatsApp
              </button>
              <button 
                onClick={() => alternarStatus(selectedPet.id)}
                style={{ padding: '10px', background: selectedPet.status === 'Perdido' ? '#38a169' : '#e53e3e', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                Marcar como {selectedPet.status === 'Perdido' ? 'ENCONTRADO' : 'PERDIDO'}
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #cbd5e0',
  width: '100%',
  boxSizing: 'border-box'
};