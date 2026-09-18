import { useEffect } from "react";
import {
  LockKeyhole,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import { produtos } from "../data/produtos";

const formatadorDePreco = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const itensDoCarrinho = [
  {
    produto: produtos[0],
    etiqueta: "Linha Enthusiast",
    classeEtiqueta: "border-[#adc6ff]/30 bg-[#adc6ff]/10 text-[#adc6ff]",
  },
  {
    produto: produtos[1],
    etiqueta: "Linha Premium",
    classeEtiqueta: "border-[#ffb95f]/30 bg-[#ffb95f]/10 text-[#ffb95f]",
  },
];

function Carrinho() {
  useEffect(() => {
    document.title = "Seu Carrinho | GPU Core";
  }, []);

  const subtotal = itensDoCarrinho.reduce(
    (total, item) => total + item.produto.preco,
    0,
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#0b1326] text-[#dae2fd]">
      <Cabecalho mostrarBusca={false} />

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:py-16">
        <header className="lg:col-span-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Seu Carrinho
          </h1>
          <p className="mt-3 text-lg text-[#c1c6d7]">
            Revise os componentes selecionados antes de continuar.
          </p>
        </header>

        <section
          aria-label="Itens do carrinho"
          className="flex flex-col gap-4 lg:col-span-8"
        >
          {itensDoCarrinho.map((item) => (
            <article
              key={item.produto.id}
              className="group flex flex-col gap-6 rounded-lg border border-[#414755]/40 bg-[#131b2e] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:flex-row sm:items-center sm:p-6"
            >
              <div className="flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded border border-[#414755]/30 bg-[#f4f6fb] p-3 sm:w-32">
                <img
                  src={item.produto.imagem}
                  alt={item.produto.nome}
                  className="h-full w-full object-contain opacity-90 transition group-hover:opacity-100"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <span
                      className={`etiqueta-tecnica inline-flex rounded border px-2 py-1 text-xs font-semibold ${item.classeEtiqueta}`}
                    >
                      {item.etiqueta}
                    </span>
                    <h2 className="mt-3 text-2xl font-semibold">
                      {item.produto.nome}
                    </h2>
                    <p className="mt-1 text-[#c1c6d7]">
                      {item.produto.fabricante}, {item.produto.vram} GB{" "}
                      {item.produto.tipoMemoria}
                    </p>
                  </div>

                  <strong className="shrink-0 text-2xl text-[#adc6ff]">
                    {formatadorDePreco.format(item.produto.preco)}
                  </strong>
                </div>

                <div className="flex items-end justify-between gap-4 border-t border-[#414755]/20 pt-4 sm:border-0 sm:pt-0">
                  <div
                    aria-label="Quantidade: 1"
                    className="flex items-center rounded border border-[#414755]/40 bg-[#2d3449] px-2 py-1"
                  >
                    <button
                      type="button"
                      aria-label={`Diminuir quantidade de ${item.produto.nome}`}
                      className="rounded p-1.5 text-[#c1c6d7] transition hover:text-[#adc6ff]"
                    >
                      <Minus size={15} aria-hidden="true" />
                    </button>
                    <span className="etiqueta-tecnica w-8 text-center text-sm">1</span>
                    <button
                      type="button"
                      aria-label={`Aumentar quantidade de ${item.produto.nome}`}
                      className="rounded p-1.5 text-[#c1c6d7] transition hover:text-[#adc6ff]"
                    >
                      <Plus size={15} aria-hidden="true" />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-2 rounded px-2 py-1 text-sm text-[#c1c6d7] transition hover:bg-[#93000a]/15 hover:text-[#ffb4ab]"
                  >
                    <Trash2 size={17} aria-hidden="true" />
                    Remover
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="lg:col-span-4">
          <div className="rounded-lg border border-[#414755]/40 bg-[#131b2e] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:sticky lg:top-28">
            <h2 className="border-b border-[#414755]/30 pb-4 text-2xl font-semibold">
              Resumo do pedido
            </h2>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#c1c6d7]">
                  Subtotal ({itensDoCarrinho.length} itens)
                </span>
                <span>{formatadorDePreco.format(subtotal)}</span>
              </div>

              <div className="border-y border-[#414755]/20 py-4">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-[#c1c6d7]">Frete estimado</span>
                  <span>Calcular</span>
                </div>
                <div className="flex gap-2">
                  <label className="flex-1">
                    <span className="sr-only">CEP</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="CEP"
                      className="w-full rounded border border-[#414755]/40 bg-[#2d3449] px-3 py-2 outline-none placeholder:text-[#8b90a0] focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff]"
                    />
                  </label>
                  <button
                    type="button"
                    className="rounded border border-[#414755] bg-[#2d3449] px-4 py-2 text-sm font-semibold transition hover:border-[#adc6ff] hover:text-[#adc6ff]"
                  >
                    Calcular
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[#c1c6d7]">Impostos estimados</span>
                <span>A calcular</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#414755]/30 pt-5">
              <strong className="text-2xl">Total</strong>
              <strong className="text-3xl text-[#adc6ff]">
                {formatadorDePreco.format(subtotal)}
              </strong>
            </div>

            <button
              type="button"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-[#adc6ff] px-5 py-4 text-lg font-semibold text-[#002e69] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition hover:brightness-110"
            >
              <LockKeyhole size={20} aria-hidden="true" />
              Finalizar compra
            </button>

            <p className="etiqueta-tecnica mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-[#c1c6d7]">
              <ShieldCheck size={15} aria-hidden="true" />
              Ambiente de compra seguro
            </p>
          </div>
        </aside>
      </main>

      <Rodape />
    </div>
  );
}

export default Carrinho;
