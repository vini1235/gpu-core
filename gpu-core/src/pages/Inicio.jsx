import { useEffect, useState } from "react";
import { Link } from "react-router";
import Cabecalho from "../components/Cabecalho";
import CardProduto from "../components/CardProduto";
import Rodape from "../components/Rodape";
import { produtos } from "../data/produtos";
import {
  ArrowRight,
  Gamepad2,
  BadgeDollarSign,
  Clapperboard,
  Laptop,
} from "lucide-react";
import CardCategoria from "../components/CardCategoria";

function Inicio() {
  const [termoBusca, definirTermoBusca] = useState("");
  const termoNormalizado = termoBusca.trim().toLocaleLowerCase("pt-BR");
  const produtosFiltrados = produtos.filter((produto) => {
    const textoDoProduto = `${produto.nome} ${produto.fabricante} ${produto.vram} GB`;

    return textoDoProduto.toLocaleLowerCase("pt-BR").includes(termoNormalizado);
  });

  useEffect(() => {
    document.title = "GPU Core | Encontre a GPU certa";
  }, []);

  return (
    <div
      id="inicio"
      className="flex min-h-screen flex-col bg-[#0f172a] text-slate-200"
    >
      <Cabecalho valorBusca={termoBusca} aoAlterarBusca={definirTermoBusca} />

      <main className="flex-1">
        <section className="bg-[#131b2e] rounded-b-3xl">
          <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-16">
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-[#dae2fd] sm:text-5xl">
              Encontre a GPU certa para o seu uso.
            </h1>

            <p className="text-lg text-[#c1c6d7] max-w-3xl mx-auto mb-8">
              As avaliações utilizam especificações técnicas, benchmarks de
              referência e critérios definidos para cada categoria.
            </p>

            <Link
              to="/produtos"
              className="inline-flex rounded-lg bg-[#adc6ff] px-6 py-3 font-semibold text-[#002e69] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#adc6ff]"
            >
              <span className="flex items-center gap-2">
                Explorar catálogo <ArrowRight size={18} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </section>
        <section
          id="categorias"
          className="mx-auto max-w-7xl scroll-mt-40 px-4 py-12 sm:px-6 sm:py-16 lg:scroll-mt-24"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#dae2fd]">
              Escolha por categoria
            </h2>

            <p className="text-[#c1c6d7] mt-2">
              Encontre as melhores GPUs de acordo com o seu tipo de uso.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <CardCategoria
              titulo="Games"
              etiqueta="MÁXIMO FPS"
              Icone={Gamepad2}
              cor="azul"
            />

            <CardCategoria
              titulo="Custo-benefício"
              etiqueta="ESCOLHA INTELIGENTE"
              Icone={BadgeDollarSign}
              cor="verde"
            />

            <CardCategoria
              titulo="Edição e Render"
              etiqueta="CRIATIVIDADE"
              Icone={Clapperboard}
              cor="amarelo"
            />

            <CardCategoria
              titulo="Uso Geral"
              etiqueta="EQUILÍBRIO"
              Icone={Laptop}
              cor="roxo"
            />
          </div>
        </section>
        <section
          id="produtos"
          className="mx-auto max-w-7xl scroll-mt-40 px-4 py-12 sm:px-6 sm:py-16 lg:scroll-mt-24"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#dae2fd]">Destaques</h2>

              <p className="mt-2 text-[#c1c6d7]">
                As GPUs mais bem avaliadas do momento.
              </p>
            </div>

            <p aria-live="polite" className="text-sm text-[#8b90a0]">
              {produtosFiltrados.length}{" "}
              {produtosFiltrados.length === 1
                ? "produto encontrado"
                : "produtos encontrados"}
            </p>
          </div>

          <div
            id="lista-produtos"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {produtosFiltrados.map((produto) => (
              <CardProduto
                key={produto.id}
                nome={produto.nome}
                fabricante={produto.fabricante}
                preco={produto.preco}
                vram={produto.vram}
                nota={produto.nota}
                imagem={produto.imagem}
              />
            ))}
          </div>

          {produtosFiltrados.length === 0 && (
            <div className="rounded-xl border border-dashed border-[#414755] bg-[#171f33] px-6 py-12 text-center">
              <p className="text-lg font-semibold text-[#dae2fd]">
                Nenhuma GPU encontrada.
              </p>
              <p className="mt-2 text-[#c1c6d7]">
                Tente buscar por modelo, fabricante ou quantidade de VRAM.
              </p>
              <button
                type="button"
                onClick={() => definirTermoBusca("")}
                className="mt-6 rounded-lg border border-[#414755] px-4 py-2 font-semibold text-[#adc6ff] transition hover:border-[#adc6ff] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#adc6ff]"
              >
                Limpar busca
              </button>
            </div>
          )}
        </section>
      </main>

      <Rodape />
    </div>
  );
}

export default Inicio;
