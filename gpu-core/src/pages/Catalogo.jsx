import { useEffect, useState } from "react";
import { ArrowUpDown, FilterX, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router";
import Cabecalho from "../components/Cabecalho";
import CardProdutoCatalogo from "../components/CardProdutoCatalogo";
import Rodape from "../components/Rodape";
import { produtos } from "../data/produtos";

function normalizarTexto(texto) {
  return texto
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function Catalogo() {
  const [parametrosBusca, definirParametrosBusca] = useSearchParams();
  const [termoBusca, definirTermoBusca] = useState(
    () => parametrosBusca.get("busca") ?? "",
  );
  const [fabricantesSelecionados, definirFabricantesSelecionados] = useState(
    [],
  );
  const [precoMinimo, definirPrecoMinimo] = useState("");
  const [precoMaximo, definirPrecoMaximo] = useState("");
  const [vramSelecionada, definirVramSelecionada] = useState(null);
  const [ordenacao, definirOrdenacao] = useState("relevancia");

  useEffect(() => {
    document.title = "Catálogo de GPUs | GPU Core";
  }, []);

  const fabricantesDisponiveis = [
    ...new Set(produtos.map((produto) => produto.fabricante)),
  ].sort();
  const capacidadesVram = [
    ...new Set(produtos.map((produto) => produto.vram)),
  ].sort((primeira, segunda) => primeira - segunda);

  function alterarBusca(valor) {
    definirTermoBusca(valor);

    const novosParametros = new URLSearchParams(parametrosBusca);

    if (valor.trim()) {
      novosParametros.set("busca", valor);
    } else {
      novosParametros.delete("busca");
    }

    definirParametrosBusca(novosParametros, { replace: true });
  }

  function alternarFabricante(fabricante) {
    definirFabricantesSelecionados((fabricantesAtuais) =>
      fabricantesAtuais.includes(fabricante)
        ? fabricantesAtuais.filter((item) => item !== fabricante)
        : [...fabricantesAtuais, fabricante],
    );
  }

  function limparFiltros() {
    definirFabricantesSelecionados([]);
    definirPrecoMinimo("");
    definirPrecoMaximo("");
    definirVramSelecionada(null);
  }

  const buscaNormalizada = normalizarTexto(termoBusca.trim());
  const valorMinimo = precoMinimo === "" ? 0 : Number(precoMinimo);
  const valorMaximo = precoMaximo === "" ? Infinity : Number(precoMaximo);

  const produtosFiltrados = produtos.filter((produto) => {
    const textoDoProduto = normalizarTexto(
      `${produto.nome} ${produto.fabricante} ${produto.vram} GB ${produto.tipoMemoria}`,
    );
    const correspondeBusca = textoDoProduto.includes(buscaNormalizada);
    const correspondeFabricante =
      fabricantesSelecionados.length === 0 ||
      fabricantesSelecionados.includes(produto.fabricante);
    const correspondePreco =
      produto.preco >= valorMinimo && produto.preco <= valorMaximo;
    const correspondeVram =
      vramSelecionada === null || produto.vram === vramSelecionada;

    return (
      correspondeBusca &&
      correspondeFabricante &&
      correspondePreco &&
      correspondeVram
    );
  });

  const produtosOrdenados = [...produtosFiltrados].sort(
    (primeiroProduto, segundoProduto) => {
      if (ordenacao === "menor-preco") {
        return primeiroProduto.preco - segundoProduto.preco;
      }

      if (ordenacao === "maior-preco") {
        return segundoProduto.preco - primeiroProduto.preco;
      }

      if (ordenacao === "melhor-avaliacao") {
        return segundoProduto.nota - primeiroProduto.nota;
      }

      return primeiroProduto.id - segundoProduto.id;
    },
  );

  const haFiltrosAtivos =
    fabricantesSelecionados.length > 0 ||
    precoMinimo !== "" ||
    precoMaximo !== "" ||
    vramSelecionada !== null;

  return (
    <div className="flex min-h-screen flex-col bg-[#0b1326] text-[#dae2fd]">
      <Cabecalho
        valorBusca={termoBusca}
        aoAlterarBusca={alterarBusca}
        idLista="grade-catalogo"
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
        <div className="mb-8 flex flex-col justify-between gap-6 border-b border-[#414755]/30 pb-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4edea3]">
              Hardware selecionado
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#dae2fd] sm:text-5xl">
              Catálogo de GPUs
            </h1>
            <p className="mt-3 max-w-2xl text-[#c1c6d7]">
              Compare desempenho, memória e preço para encontrar a placa de
              vídeo adequada ao seu fluxo de trabalho.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <label htmlFor="ordenacao-catalogo" className="sr-only">
              Ordenar catálogo
            </label>
            <ArrowUpDown
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8b90a0]"
            />
            <select
              id="ordenacao-catalogo"
              value={ordenacao}
              onChange={(evento) => definirOrdenacao(evento.target.value)}
              className="w-full appearance-none rounded-lg border border-[#414755] bg-[#2d3449] py-3 pl-10 pr-4 text-sm text-[#dae2fd] outline-none transition focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff]"
            >
              <option value="relevancia">Ordenar: relevância</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
              <option value="melhor-avaliacao">Melhor avaliação</option>
            </select>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-xl border border-[#414755]/40 bg-[#131b2e] p-6 lg:sticky lg:top-28">
            <div className="mb-6 flex items-center justify-between border-b border-[#414755]/30 pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={19}
                  aria-hidden="true"
                  className="text-[#adc6ff]"
                />
                <h2 className="text-xl font-semibold">Filtros</h2>
              </div>

              {haFiltrosAtivos && (
                <button
                  type="button"
                  onClick={limparFiltros}
                  aria-label="Limpar todos os filtros"
                  title="Limpar filtros"
                  className="rounded p-1 text-[#8b90a0] transition hover:text-[#adc6ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#adc6ff]"
                >
                  <FilterX size={18} aria-hidden="true" />
                </button>
              )}
            </div>

            <fieldset className="mb-7">
              <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#c1c6d7]">
                Fabricante
              </legend>
              <div className="flex flex-col gap-3">
                {fabricantesDisponiveis.map((fabricante) => (
                  <label
                    key={fabricante}
                    className="flex cursor-pointer items-center gap-3 text-sm text-[#dae2fd]"
                  >
                    <input
                      type="checkbox"
                      checked={fabricantesSelecionados.includes(fabricante)}
                      onChange={() => alternarFabricante(fabricante)}
                      className="size-4 rounded border-[#414755] bg-[#2d3449] accent-[#adc6ff]"
                    />
                    {fabricante}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-7">
              <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#c1c6d7]">
                Faixa de preço
              </legend>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                <label>
                  <span className="sr-only">Preço mínimo</span>
                  <input
                    type="number"
                    min="0"
                    value={precoMinimo}
                    onChange={(evento) => definirPrecoMinimo(evento.target.value)}
                    placeholder="Mín."
                    className="w-full rounded border border-[#414755] bg-[#2d3449] px-3 py-2 text-sm outline-none placeholder:text-[#8b90a0] focus:border-[#adc6ff]"
                  />
                </label>
                <span className="text-[#8b90a0]">—</span>
                <label>
                  <span className="sr-only">Preço máximo</span>
                  <input
                    type="number"
                    min="0"
                    value={precoMaximo}
                    onChange={(evento) => definirPrecoMaximo(evento.target.value)}
                    placeholder="Máx."
                    className="w-full rounded border border-[#414755] bg-[#2d3449] px-3 py-2 text-sm outline-none placeholder:text-[#8b90a0] focus:border-[#adc6ff]"
                  />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#c1c6d7]">
                Capacidade de VRAM
              </legend>
              <div className="flex flex-wrap gap-2">
                {capacidadesVram.map((capacidade) => {
                  const estaSelecionada = vramSelecionada === capacidade;

                  return (
                    <button
                      key={capacidade}
                      type="button"
                      aria-pressed={estaSelecionada}
                      onClick={() =>
                        definirVramSelecionada(
                          estaSelecionada ? null : capacidade,
                        )
                      }
                      className={`rounded border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#adc6ff] ${
                        estaSelecionada
                          ? "border-[#adc6ff] bg-[#adc6ff] text-[#002e69]"
                          : "border-[#414755] bg-[#2d3449] text-[#c1c6d7] hover:border-[#adc6ff] hover:text-[#adc6ff]"
                      }`}
                    >
                      {capacidade} GB
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </aside>

          <section aria-labelledby="titulo-resultados">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 id="titulo-resultados" className="text-lg font-semibold">
                GPUs disponíveis
              </h2>
              <p aria-live="polite" className="text-sm text-[#8b90a0]">
                {produtosOrdenados.length}{" "}
                {produtosOrdenados.length === 1 ? "resultado" : "resultados"}
              </p>
            </div>

            <div
              id="grade-catalogo"
              className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {produtosOrdenados.map((produto) => (
                <CardProdutoCatalogo key={produto.id} produto={produto} />
              ))}
            </div>

            {produtosOrdenados.length === 0 && (
              <div className="rounded-xl border border-dashed border-[#414755] bg-[#131b2e] px-6 py-14 text-center">
                <h2 className="text-xl font-semibold">Nenhuma GPU encontrada</h2>
                <p className="mt-2 text-[#c1c6d7]">
                  Altere a busca ou remova alguns filtros para ver mais
                  resultados.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    alterarBusca("");
                    limparFiltros();
                  }}
                  className="mt-6 rounded-lg bg-[#adc6ff] px-5 py-2.5 font-semibold text-[#002e69] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#adc6ff]"
                >
                  Limpar busca e filtros
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Rodape />
    </div>
  );
}

export default Catalogo;
