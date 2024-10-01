import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) { //cadastrar filme
    if (req.method === 'POST') {

        try {
            const corpo = await req.json();
            console.log(corpo)

            const { capa, titulo, diretor, imdb, ano, data, genero } = corpo;

            const novoFilme = await prisma.filme.create({ //cria novo filme no banco
                data: {
                    capa,
                    titulo,
                    diretor,
                    imdb: parseFloat(imdb),
                    ano: Number(ano),
                    data,
                    genero,
                },
            });

            return new Response(JSON.stringify(novoFilme), { status: 201 });

        } catch (error) {
            console.error('Erro ao salvar o filme: ', error);
            return new Response(JSON.stringify({ error: 'Erro ao salvar o filme' }), { status: 500 });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}

export async function GET(req) { //busca todos os filme cadastrados
    if (req.method === 'GET') {
        try{
            const filmes = await prisma.filme.findMany();
            return new Response(JSON.stringify(filmes), {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error){
            console.error('Erro ao salvar o filme:', error);
        }
        
    }
}
