import { Cpu, ShoppingCart, CircleUserRound, Search } from "lucide-react";
import { Link, NavLink } from "react-router";

function definirClasseDaNavegacao({ isActive }) {
  const classesBase =
    "rounded px-2 py-1 font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#adc6ff]";

  return isActive
    ? `${classesBase} text-[#adc6ff]`
    : `${classesBase} text-[#c1c6d7] hover:text-[#adc6ff]`;
}

function Cabecalho({
  valorBusca = "",
  aoAlterarBusca,
  idLista = "lista-produtos",
  mostrarBusca = true,
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#222a3d] bg-[#0b1326]/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6 lg:flex-nowrap">
        <Link
          to="/"
          aria-label="Ir para o início"
          className="flex shrink-0 items-center gap-2 text-[#dae2fd] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#adc6ff]"
        >
          <Cpu size={24} aria-hidden="true" />
          <span className="text-xl font-bold">GPU CORE</span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="order-4 flex w-full items-center justify-center gap-6 border-t border-[#222a3d] pt-4 text-sm text-[#c1c6d7] sm:gap-10 lg:order-0 lg:w-auto lg:border-0 lg:pt-0 lg:text-base"
        >
          <NavLink to="/" end className={definirClasseDaNavegacao}>
            Início
          </NavLink>

          <NavLink to="/produtos" className={definirClasseDaNavegacao}>
            Produtos
          </NavLink>

          <NavLink to="/ranking" className={definirClasseDaNavegacao}>
            Ranking
          </NavLink>
        </nav>

        {mostrarBusca && (
          <div className="relative order-3 w-full sm:flex-1 lg:order-0 lg:ml-auto lg:w-64 lg:flex-none">
            <label htmlFor="busca-gpus" className="sr-only">
              Buscar GPUs
            </label>
            <Search
              size={18}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b90a0]"
            />

            <input
              id="busca-gpus"
              type="search"
              value={valorBusca}
              onChange={(evento) => aoAlterarBusca(evento.target.value)}
              placeholder="Buscar GPUs..."
              aria-controls={idLista}
              className="w-full rounded-lg border border-[#414755] bg-[#171f33] py-2 pl-10 pr-4 text-sm text-[#dae2fd] outline-none placeholder:text-[#8b90a0] focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff]"
            />
          </div>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-4 text-[#dae2fd] lg:ml-0">
          <NavLink
            to="/carrinho"
            aria-label="Abrir carrinho"
            title="Carrinho"
            className={({ isActive }) =>
              `relative rounded transition hover:text-[#adc6ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#adc6ff] ${
                isActive ? "text-[#adc6ff]" : "text-[#dae2fd]"
              }`
            }
          >
            <ShoppingCart size={22} aria-hidden="true" />
          </NavLink>

          <button
            type="button"
            aria-label="Abrir conta do usuário"
            title="Conta"
            className="rounded transition hover:text-[#adc6ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#adc6ff]"
          >
            <CircleUserRound size={22} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Cabecalho;
