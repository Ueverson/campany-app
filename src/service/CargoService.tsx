export async function cadastrarCargo(fun_nome: string): Promise<boolean> {
  const url = 'https://cardapio-digital-api.onrender.com/actions/cadastrarFuncao';

  let retorno: boolean = false;

  if (fun_nome !== '') {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fun_nome,
        }),
      });

      if (response.ok) {
        retorno = true;
      }
      return retorno;
    } catch (error) {
      return retorno;
    }
  } else {
    return retorno;
  }
}

export async function listarCargo() {
  const url = 'https://cardapio-digital-api.onrender.com/actions/listarFuncoes';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Erro ao buscar dados');
    }
    const dadosJson = await response.json();
    return dadosJson;
  } catch (error) {
    throw new Error('Erro ao buscar dados');
  }
}