// =============================================================
// components/AgricultoraCard.jsx — Cartão de uma agricultora
// na lista da responsável pela comunidade.
//   [MS]  Maria Souza
//         3 plantios · 80 m²
//         92 99999-0000
// =============================================================
import { formatarArea } from '../utils/formatadores';

/** "Maria Souza" → "MS" (iniciais para o círculo colorido). */
function iniciais(nome = '') {
  return nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join('');
}

export default function AgricultoraCard({ agricultora }) {
  const total = Number(agricultora.totalPlantios) || 0;

  return (
    <article className="agricultora-card">
      <span className="agricultora-card__avatar" aria-hidden="true">
        {iniciais(agricultora.nome)}
      </span>
      <div>
        <p className="agricultora-card__nome">{agricultora.nome}</p>
        <p className="agricultora-card__detalhe">
          {total} {total === 1 ? 'plantio' : 'plantios'} · {formatarArea(agricultora.areaTotal)}
        </p>
        {agricultora.contato && (
          <p className="agricultora-card__contato">{agricultora.contato}</p>
        )}
      </div>
    </article>
  );
}
