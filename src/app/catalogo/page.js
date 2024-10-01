'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function sucesso() {
  toast.success('Filme excluído com sucesso');
}

function erro() {
  toast.error('Erro. Filme não atualizado.')
}

export default function Catalogo() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function fetchFilmes() { //funcao que irá  procurar os filmes
      try {
        const response = await fetch('/api/gravar-banco', { //chamada da api
          method: 'GET',
        });
        const data = await response.json(); //conversão para .json
        console.log(data)
        setFilmes(data);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    }

    fetchFilmes();
  }, []);

  useEffect(() => {
        async function fetchGeneros() { //busca dos generos
            try {
                const response = await fetch('/api/genero', { method: 'GET' });
                const data = await response.json();
                setGeneros(data);  // Definindo os dados dos gêneros no estado
            } catch (error) {
                console.error('Erro ao buscar gêneros: ', error);
            }
        }

        fetchGeneros();
    }, []);

  async function deletar(id) { //funcao de deletar filme
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este filme?');
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/gravar-banco/${id}`, { //chamada da api delete
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          sucesso();
          setTimeout(() => {
            window.location.reload(); // Atualiza a página após o atraso
          }, 2000);

        } else {
          throw new Error('Erro ao deletar o filme');
        }
      } catch (error) {
        console.error('Erro ao deletar filme:', error);
        erro();
        setTimeout(() => {
          window.location.reload(); // Atualiza a página após o atraso
        }, 2000);
      }
    }
  }

  return (
    <div className="bg-[#e5ebff] min-h-screen">

      <header className="header-padrao"> {/*header*/}
        <Link href="/"><button className="botao-padrao">Pagina Inicial</button></Link>
        <h2 className='text-2xl'>CineCult</h2>
        <Link href="/sobre"><button className="botao-padrao">Sobre</button></Link>
      </header>

      <div className="flex justify-center space-x-4 mt-8">
        <Link href="/cadastrar">
          <button className="botao-padrao mt-8 block mx-auto font-[family-name:var(--font-geist-sans)]">
            Cadastrar Filme
          </button>
        </Link>

        <Link href="/cadastrar-genero">
          <button className="botao-padrao mt-8 block mx-auto font-[family-name:var(--font-geist-sans)]">
            Cadastrar Gênero
          </button>
        </Link>
      </div>

      <div className="bg-[#e5ebff] min-h-screen">
        <h1 className="text-center text-3xl mt-8">Catálogo de Filmes</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-6">
          {filmes.length > 0 ? (
            filmes.map((filme) => (
              <div className="form-group col-md-6 mb-4" key={filme.id}>
                <li className="p-4 bg-white shadow-md rounded mb-4 flex bg-[#f9f9f9]">
                  <img src={filme.capa} width="150px" height="100px" className="mr-4" />
                  <div>
                    <h2 className="text-xl font-bold">{filme.titulo}</h2>
                    <p>★ Imdb: {filme.imdb}/10</p>
                    <p>Diretor(a): {filme.diretor}</p>
                    <p>Ano: {filme.ano}</p>
                    <p>Genêro: {filme.genero}</p>
                    <div className="flex justify-center items-center space-x-4 mt-4 ml-8">
                      <Link href={`/atualizar/${filme.id}`}> {/*Botao de editar que redirecionar para a pagina de edicao */}
                        <FiEdit className='text-2xl text-blue-500' />
                      </Link>
                      <button onClick={() => deletar(filme.id)}> {/*Botao de excluir que chamará a funcao deletar */}
                        <FaTrash className='text-2xl text-red-500' />
                      </button>
                    </div>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <p>Nenhum filme encontrado.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>


  );
}
