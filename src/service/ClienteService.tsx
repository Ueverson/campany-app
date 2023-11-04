
  export async function criarCliente(mesId: number){
    const url = "https://cardapio-digital-api.onrender.com/cliente";
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mes_id: mesId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
  
      const dadosJson = await response.json();
      return dadosJson;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }