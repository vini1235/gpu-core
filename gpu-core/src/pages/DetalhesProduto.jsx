import { useEffect } from "react";
import {
  BarChart3,
  Box,
  CircleCheck,
  Gauge,
  MemoryStick,
  ShoppingCart,
  Sparkles,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { Navigate, useParams } from "react-router";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import { detalhesDosProdutos } from "../data/detalhesProdutos";
import { produtos } from "../data/produtos";

const formatadorDePreco = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const coresDasAvaliacoes = {
  azul: {
    texto: "text-[#adc6ff]",
    barra: "bg-[#adc6ff]",
  },
  verde: {
    texto: "text-[#4edea3]",
    barra: "bg-[#4edea3]",
  },
  amarelo: {
    texto: "text-[#ffb95f]",
    barra: "bg-[#ffb95f]",
  },
};

function DetalhesProduto() {
  const { id } = useParams();
  const produto = produtos.find((item) => String(item.id) === id);
  const detalhes = produto ? detalhesDosProdutos[produto.id] : null;

  useEffect(() => {
    document.title = produto
      ? `${produto.nome} | GPU Core`
      : "Produto não encontrado | GPU Core";
  }, [produto]);

  if (!produto || !detalhes) {
    return <Navigate to="/produtos" replace />;
  }

  const especificacoes = [
    {
      nome: "VRAM",
      valor: `${produto.vram} GB`,
      detalhe: produto.tipoMemoria,
      icone: MemoryStick,
    },
    {
      nome: "TGP / TDP",
      valor: detalhes.tdp,
      detalhe: detalhes.fonteRecomendada,
      icone: Zap,
    },
    {
      nome: "Clock (Boost)",
      valor: detalhes.clockBoost,
      detalhe: detalhes.clockBase,
      icone: Gauge,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0b1326] text-[#dae2fd]">
      <Cabecalho mostrarBusca={false} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-16 px-4 py-10 sm:px-6 md:py-16">
        <section className="grid items-center gap-10 md:grid-cols-2 lg:gap-12">
          <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-[#414755]/30 bg-[#171f33] p-8 shadow-lg sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#adc6ff]/5 to-[#00a572]/5" />
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="relative z-10 h-full w-full object-contain transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <span className="etiqueta-tecnica inline-flex rounded border border-[#4edea3]/30 bg-[#4edea3]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#4edea3]">
                {produto.fabricante}
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {produto.nome}
              </h1>
              <p className="mt-5 text-lg leading-8 text-[#c1c6d7]">
                {detalhes.descricao}
              </p>
            </div>

            <div>
              <strong className="text-3xl">
                {formatadorDePreco.format(produto.preco)}
              </strong>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#c1c6d7]">
                <span className="size-2 rounded-full bg-[#00a572] shadow-[0_0_8px_rgba(0,165,114,0.7)]" />
                Em estoque — pronto para envio
              </div>
            </div>

            <div className="mt-2 border-t border-[#414755]/30 pt-6">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-lg border-t border-white/10 bg-[#4b8eff] px-5 py-4 text-lg font-semibold text-[#00285c] shadow-sm transition hover:bg-[#adc6ff]"
              >
                <ShoppingCart size={21} aria-hidden="true" />
                Adicionar ao carrinho
              </button>
              <button
                type="button"
                className="mt-3 w-full rounded-lg border border-[#414755] px-5 py-3 font-semibold transition hover:border-[#adc6ff] hover:text-[#adc6ff]"
              >
                Comparar
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="border-b border-[#414755]/30 pb-3 text-3xl font-bold">
            Especificações Técnicas
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {especificacoes.map((especificacao) => {
              const Icone = especificacao.icone;

              return (
                <article
                  key={especificacao.nome}
                  className="rounded-lg border border-[#414755]/30 bg-[#131b2e] p-6 transition hover:bg-[#222a3d]/60"
                >
                  <div className="etiqueta-tecnica flex items-center gap-2 text-xs uppercase tracking-wider text-[#c1c6d7]">
                    <Icone size={19} aria-hidden="true" />
                    {especificacao.nome}
                  </div>
                  <strong className="mt-4 block text-2xl">
                    {especificacao.valor}
                  </strong>
                  <span className="etiqueta-tecnica mt-3 inline-flex rounded bg-[#2d3449] px-2 py-1 text-xs text-[#c1c6d7]">
                    {especificacao.detalhe}
                  </span>
                </article>
              );
            })}
          </div>

          <div className="mt-6 grid overflow-hidden rounded-lg border border-[#414755]/30 bg-[#171f33] md:grid-cols-2 md:divide-x md:divide-[#414755]/30">
            {detalhes.recursos.map((recurso, indice) => {
              const Icone = indice === 0 ? Box : Sparkles;

              return (
                <article
                  key={recurso.titulo}
                  className="flex items-start gap-4 border-b border-[#414755]/30 p-6 last:border-b-0 md:border-b-0"
                >
                  <Icone
                    size={22}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#adc6ff]"
                  />
                  <div>
                    <h3 className="font-semibold">{recurso.titulo}</h3>
                    <p className="mt-1 text-sm text-[#c1c6d7]">
                      {recurso.descricao}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-2xl font-semibold">Avaliação por Categoria</h2>
            <p className="mt-3 text-[#c1c6d7]">
              Métricas detalhadas baseadas em uma suíte de testes de referência.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              {detalhes.avaliacoes.map((avaliacao) => {
                const cores = coresDasAvaliacoes[avaliacao.cor];

                return (
                  <div key={avaliacao.nome}>
                    <div className="etiqueta-tecnica mb-2 flex justify-between gap-4 text-sm">
                      <span>{avaliacao.nome}</span>
                      <strong className={cores.texto}>
                        {avaliacao.nota.toFixed(1)}
                      </strong>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#2d3449]">
                      <div
                        className={`h-full rounded-full ${cores.barra}`}
                        style={{ width: `${avaliacao.nota * 10}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-[#414755]/40 bg-[#060e20] p-7 md:col-span-7">
            <div className="pointer-events-none absolute right-0 top-0 size-36 rounded-bl-full bg-[#adc6ff]/5" />
            <h2 className="relative flex items-center gap-3 text-2xl font-semibold">
              <BarChart3 size={22} aria-hidden="true" className="text-[#adc6ff]" />
              Por que essa nota?
            </h2>

            <div className="relative mt-7 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="etiqueta-tecnica border-l-2 border-[#adc6ff] pl-2 text-sm uppercase tracking-wider text-[#c1c6d7]">
                  Pontos fortes
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {detalhes.pontosFortes.map((ponto) => (
                    <li key={ponto} className="flex items-start gap-2 text-sm">
                      <CircleCheck
                        size={18}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-[#adc6ff]"
                      />
                      {ponto}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="etiqueta-tecnica border-l-2 border-[#ffb95f] pl-2 text-sm uppercase tracking-wider text-[#c1c6d7]">
                  Pontos de atenção
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {detalhes.pontosDeAtencao.map((ponto) => (
                    <li key={ponto} className="flex items-start gap-2 text-sm">
                      <TriangleAlert
                        size={18}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-[#ffb95f]"
                      />
                      {ponto}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Rodape />
    </div>
  );
}

export default DetalhesProduto;
