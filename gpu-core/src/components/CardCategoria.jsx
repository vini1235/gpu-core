function CardCategoria({ titulo, etiqueta, Icone, cor }) {
  const cores = {
    azul: "bg-blue-500/10 text-blue-300",
    amarelo: "bg-amber-500/10 text-amber-300",
    roxo: "bg-purple-500/10 text-purple-300",
    verde: "bg-emerald-500/10 text-emerald-300",
  };

  const classeDaCor = cores[cor] ?? cores.azul;

  return (
    <article className="min-h-44 rounded-xl border border-[#2d3449] bg-[#171f33] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#414755] hover:bg-[#1b2438]">
      <div className="flex items-start justify-between">
        <span
          className={`${classeDaCor} rounded px-2 py-1 text-xs font-semibold`}
        >
          {etiqueta}
        </span>

        <Icone size={30} aria-hidden="true" className="text-[#8b90a0]" />
      </div>

      <h3 className="text-xl font-semibold text-[#dae2fd] mt-5">{titulo}</h3>
    </article>
  );
}

export default CardCategoria;
