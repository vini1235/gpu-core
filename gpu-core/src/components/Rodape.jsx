import { Cpu } from "lucide-react";
import { Link } from "react-router";

function Rodape() {
  return (
    <footer className="mt-auto border-t border-[#414755]/30 bg-[#060e20]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xl font-bold text-[#dae2fd] transition hover:text-[#adc6ff]"
          >
            <Cpu size={22} aria-hidden="true" />
            GPU CORE
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#c1c6d7]">
            Hardware de alta performance avaliado com critérios técnicos e
            informação clara.
          </p>
          <p className="mt-5 text-xs text-[#8b90a0]">
            © {new Date().getFullYear()} GPU CORE. Hardware de precisão.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé" className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8b90a0]">
            Navegação
          </span>
          <Link to="/" className="text-sm text-[#c1c6d7] hover:text-[#adc6ff]">
            Início
          </Link>
          <Link
            to="/produtos"
            className="text-sm text-[#c1c6d7] hover:text-[#adc6ff]"
          >
            Produtos
          </Link>
          <Link
            to="/ranking"
            className="text-sm text-[#c1c6d7] hover:text-[#adc6ff]"
          >
            Ranking
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Rodape;
