import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router";

const formatadorDePreco = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function definirCorDoFabricante(fabricante) {
  if (fabricante === "AMD") {
    return "text-[#ffb4ab]";
  }

  if (fabricante === "Intel") {
    return "text-[#adc6ff]";
  }

  return "text-[#4edea3]";
}

function CardProdutoCatalogo({ produto }) {
  const notaEmCinco = (produto.nota / 2).toFixed(1);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#414755]/50 bg-[#131b2e] shadow-[0_12px_30px_-18px_rgba(0,0,0,0.9)] transition duration-200 hover:-translate-y-1 hover:border-[#8b90a0]">
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#f4f6fb] p-5">
        <img
          src={produto.imagem}
          alt={produto.nome}
          loading="lazy"
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md border border-[#414755]/60 bg-[#131b2e]/90 px-2 py-1 text-xs text-[#dae2fd] backdrop-blur">
          <Star
            size={14}
            aria-hidden="true"
            className="fill-[#ffb95f] text-[#ffb95f]"
          />
          <span>{notaEmCinco}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span
            className={`${definirCorDoFabricante(produto.fabricante)} etiqueta-tecnica text-xs font-semibold uppercase tracking-wider`}
          >
            {produto.fabricante}
          </span>
          <span className="etiqueta-tecnica rounded border border-[#414755]/50 bg-[#2d3449] px-2 py-1 text-xs text-[#dae2fd]">
            {produto.vram} GB {produto.tipoMemoria}
          </span>
        </div>

        <h2 className="text-xl font-semibold leading-7 text-[#dae2fd]">
          {produto.nome}
        </h2>

        <div className="mt-auto border-t border-[#414755]/20 pt-6">
          <span className="block text-xs text-[#8b90a0]">Preço</span>
          <strong className="mt-1 block text-2xl text-[#adc6ff]">
            {formatadorDePreco.format(produto.preco)}
          </strong>

          <div className="mt-5 flex gap-2">
            <Link
              to={`/produtos/${produto.id}`}
              className="flex-1 rounded-lg border border-[#414755] px-4 py-2 text-center text-sm font-semibold text-[#dae2fd] transition hover:border-[#adc6ff] hover:text-[#adc6ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#adc6ff]"
            >
              Ver detalhes
            </Link>
            <button
              type="button"
              disabled
              aria-label={`Adicionar ${produto.nome} ao carrinho`}
              title="O carrinho será implementado em uma etapa futura"
              className="cursor-not-allowed rounded-lg bg-[#4b8eff] p-2.5 text-[#00285c] opacity-70"
            >
              <ShoppingCart size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CardProdutoCatalogo;
