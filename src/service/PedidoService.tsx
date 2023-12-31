interface Pedido {
  ped_id: number;
  cli_id: number;
  pro_id: number;
  ped_status: string;
  ped_quantidade: number;
  pro_nome: string;
  mes_id: number;
  ped_observacao: string;
}

export async function buscarPedidos(status: string): Promise<Pedido[]> {
  const url = 'https://api-lcvn.onrender.com/actions/buscarPedidos';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: status,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function buscarPedidosParaPagamento(status: string): Promise<Pedido[]> {
  const url = 'https://api-lcvn.onrender.com/actions/buscarPedidosParaPagamento';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: status
    })
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err.message)

  return response;
}

export async function AtualizarStatusPagamentoPedidos(ped_status : string, cli_id : number): Promise<Pedido[]>{

  const url = 'https://api-lcvn.onrender.com/actions/atualizarStatusPagementoPedido';
 
  const response = await fetch(url,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          ped_status : ped_status,
          cli_id: cli_id
      })
  })
  .then((response)=>{
      return response.json();
  })
  .catch((err) => err.message)

  return response;
}

export async function AtualizarStatusPedidos(
  ped_status: string,
  ped_id: number
): Promise<Pedido[]> {
  const url = 'https://api-lcvn.onrender.com/actions/atualizarPedido';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ped_status: ped_status,
        ped_id: ped_id,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }


}
