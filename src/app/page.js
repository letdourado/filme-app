'use client'
import Link from "next/link";
import '../app/globals.css';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/originals/2f/88/a9/2f88a9427474343f7275e3b8f6fcc2e1.jpg')", opacity: 0.88 }}>
      
      <header className="header-padrao">
        <Link href="/"><button className="botao-padrao">Pagina Inicial</button></Link>
        <h2 className='text-2xl'>CineCult</h2>
        <button className="botao-padrao">Sobre</button>
      </header>
      
      <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="w-350 h-300 bg-[#6495ed] border-gray-700 shadow-lg p-8">
          
          <main className="flex flex-col items-center gap-2">
            <h1 className="text-6xl text-white font-bold">CineCult</h1>
            <p className="text-base text-white">O melhor catálogo de filmes para os amantes do cinema</p>
            <Link href="/catalogo"><button className="botao-padrao bg-white">Catálogo</button></Link>
          </main>

        </div>
      </div>
      
    </div>
  )
}