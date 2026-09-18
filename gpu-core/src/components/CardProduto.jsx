import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const formatadorDePreco = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function CardProduto({ nome, fabricante, preco, vram, nota, imagem }) {
  function definirCorNota(nota) {
    if (nota < 6) {
      return "bg-red-500/10 text-red-300";
    }

    if (nota < 8) {
      return "bg-amber-500/10 text-amber-300";
    }

    return "bg-emerald-500/10 text-emerald-300";
  }

  return (
    <article className="h-full overflow-hidden rounded-xl border border-[#2d3449] bg-[#171f33] transition duration-200 hover:-translate-y-1 hover:border-[#414755]">
      <div className="bg-[#131b2e] h-52 flex items-center justify-center p-6">
        <img
          src={imagem}
          alt={nome}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex min-h-64 flex-col p-6">
        <span className="text-sm text-[#8b90a0]">{fabricante}</span>

        <h3 className="text-xl font-semibold text-[#dae2fd] mt-1">{nome}</h3>

        <div className="flex items-center gap-3 mt-4">
          <span className="bg-[#222a3d] text-[#c1c6d7] text-xs px-2 py-1 rounded">
            {vram} GB VRAM
          </span>

          <span
            className={`${definirCorNota(nota)} text-xs font-semibold px-2 py-1 rounded`}
          >
            Nota {nota}/10
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="text-xl font-bold text-[#dae2fd]">
            {formatadorDePreco.format(preco)}
          </span>

          <Link
            to={`/produtos?busca=${encodeURIComponent(nome)}`}
            aria-label={`Ver produto ${nome}`}
            className="flex items-center gap-2 text-right font-semibold text-[#adc6ff] transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#adc6ff]"
          >
            Ver no catálogo
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CardProduto;
