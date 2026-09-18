import { useEffect, useState } from "react";
import {
  BadgeDollarSign,
  Clapperboard,
  Gauge,
  Gamepad2,
  Laptop,
  MemoryStick,
} from "lucide-react";
import { Link } from "react-router";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import { detalhesDosProdutos } from "../data/detalhesProdutos";
import { produtos } from "../data/produtos";

const formatadorDePreco = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const estilosDoPodio = [
  {
    artigo:
      "border-[#ca8100] bg-gradient-to-r from-[#ca8100]/15 via-[#171f33] to-[#131b2e]",
    faixa: "bg-[#ca8100]",
    posicao: "border-[#ca8100] bg-[#ca8100]/15 text-[#ffb95f]",
    nota: "text-[#ffb95f]",
  },
  {
    artigo:
      "border-[#c1c6d7]/70 bg-gradient-to-r from-[#c1c6d7]/15 via-[#171f33] to-[#131b2e]",
    faixa: "bg-[#c1c6d7]",
    posicao: "border-[#c1c6d7] bg-[#c1c6d7]/15 text-[#dae2fd]",
    nota: "text-[#adc6ff]",
  },
  {
    artigo:
      "border-[#a0522d]/80 bg-gradient-to-r from-[#a0522d]/15 via-[#171f33] to-[#131b2e]",
    faixa: "bg-[#a0522d]",
    posicao: "border-[#a0522d] bg-[#a0522d]/15 text-[#d9865a]",
    nota: "text-[#ffb95f]",
  },
];

function normalizarTexto(texto) {
  return texto
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function Ranking() {
  const [termoBusca, definirTermoBusca] = useState("");

  useEffect(() => {
    document.title = "Ranking de Performance | GPU Core";
  }, []);

  const termoNormalizado = normalizarTexto(termoBusca.trim());
  const produtosOrdenados = [...produtos]
    .sort((primeiro, segundo) => segundo.nota - primeiro.nota)
    .filter((produto) =>
      normalizarTexto(`${produto.nome} ${produto.fabricante}`).includes(
        termoNormalizado,
      ),
    );

  const categorias = [
    { nome: "Games", icone: Gamepad2, ativa: true },
    { nome: "Custo-benefício", icone: BadgeDollarSign },
    { nome: "Edição e Renderização", icone: Clapperboard },
    { nome: "Uso Geral", icone: Laptop },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0b1326] text-[#dae2fd]">
      <Cabecalho
        valorBusca={termoBusca}
        aoAlterarBusca={definirTermoBusca}
        idLista="lista-ranking"
      />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-12 sm:px-6">
        <section>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Ranking de Performance
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c1c6d7]">
            A posição no ranking é calculada utilizando diferentes critérios
            técnicos e pesos de acordo com a finalidade selecionada.
          </p>
        </section>

        <section
          aria-label="Categoria selecionada para o ranking"
          className="flex flex-wrap gap-3"
        >
          {categorias.map((categoria) => {
            const Icone = categoria.icone;

            return (
              <span
                key={categoria.nome}
                className={`etiqueta-tecnica inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold ${
                  categoria.ativa
                    ? "border-[#adc6ff] bg-[#adc6ff] text-[#002e69] shadow-[0_4px_14px_rgba(173,198,255,0.2)]"
                    : "border-[#414755] bg-[#171f33] text-[#dae2fd]"
                }`}
              >
                <Icone size={17} aria-hidden="true" />
                {categoria.nome}
              </span>
            );
          })}
        </section>

        <section id="lista-ranking" aria-label="Lista do ranking">
          <div className="flex flex-col gap-4">
            {produtosOrdenados.map((produto) => {
              const posicao = produtos
                .slice()
                .sort((primeiro, segundo) => segundo.nota - primeiro.nota)
                .findIndex((item) => item.id === produto.id) + 1;
              const estilo = estilosDoPodio[posicao - 1];
              const detalhes = detalhesDosProdutos[produto.id];

              return (
                <article
                  key={produto.id}
                  className={`group relative flex flex-col items-center gap-5 overflow-hidden rounded-xl border bg-[#131b2e] p-5 transition duration-300 hover:-translate-y-0.5 md:flex-row ${
                    estilo?.artigo ?? "border-[#414755]/40"
                  }`}
                >
                  {estilo && (
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 w-1 ${estilo.faixa}`}
                    />
                  )}

                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full border text-xl font-semibold ${
                      estilo?.posicao ??
                      "border-[#414755] text-[#8b90a0]"
                    }`}
                    aria-label={`${posicao}º lugar`}
                  >
                    {posicao}
                  </div>

                  <div className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#414755]/30 bg-[#f4f6fb] p-3 md:w-48">
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      loading="lazy"
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex w-full flex-1 flex-col items-center gap-3 text-center md:items-start md:text-left">
                    <h2 className="text-2xl font-semibold">{produto.nome}</h2>
                    <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                      <span className="etiqueta-tecnica inline-flex items-center gap-1.5 rounded bg-[#222a3d] px-2 py-1 text-xs text-[#c1c6d7]">
                        <MemoryStick size={14} aria-hidden="true" />
                        {produto.vram} GB {produto.tipoMemoria}
                      </span>
                      <span className="etiqueta-tecnica inline-flex items-center gap-1.5 rounded bg-[#222a3d] px-2 py-1 text-xs text-[#c1c6d7]">
                        <Gauge size={14} aria-hidden="true" />
                        {detalhes.clockBoost}
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full shrink-0 flex-col items-center gap-3 md:w-auto md:items-end">
                    <div className="text-center md:text-right">
                      <span className="etiqueta-tecnica block text-xs uppercase tracking-wider text-[#c1c6d7]">
                        Nota (Games)
                      </span>
                      <strong
                        className={`block text-2xl ${
                          estilo?.nota ?? "text-[#dae2fd]"
                        }`}
                      >
                        {(produto.nota * 10).toFixed(1)}
                      </strong>
                    </div>
                    <strong className="text-2xl">
                      {formatadorDePreco.format(produto.preco)}
                    </strong>
                    <Link
                      to={`/produtos/${produto.id}`}
                      className="rounded-lg border border-[#414755] px-5 py-2 text-sm font-semibold transition hover:border-[#adc6ff] hover:text-[#adc6ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#adc6ff]"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {produtosOrdenados.length === 0 && (
            <div className="rounded-xl border border-dashed border-[#414755] bg-[#131b2e] px-6 py-14 text-center">
              <h2 className="text-xl font-semibold">Nenhuma GPU encontrada</h2>
              <p className="mt-2 text-[#c1c6d7]">
                Limpe a busca para visualizar novamente o ranking.
              </p>
            </div>
          )}
        </section>
      </main>

      <Rodape />
    </div>
  );
}

export default Ranking;
