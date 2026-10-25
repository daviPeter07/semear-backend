# 🌱 SemeAR — Front-end

> O registro do plantio, feito por **ELAS** — feito por quem planta.

Front-end do SemeAR, o sistema de registro de plantio das agricultoras ligadas à Amazon Carbon, em Rio Preto da Eva (AM).
Feito em **React + Vite**, pensado primeiro para o **celular** e para **internet lenta** (cerca de 62 KB comprimido).

Equipe **vertex**: Alice Quely, João Ribeiro, Karolayne Diniz, Maria Helena e Maria Luana.

---

## 📱 Telas (wireframe v1)

| Nº | Tela | Endereço | Requisito |
|---|---|---|---|
| 01 | Cadastro | `/cadastro` | RF01 |
| 02 | Login | `/login` | RF02 |
| 03 | Meus plantios (com filtros) | `/plantios` | RF06 |
| 04 | Cadastrar / editar / excluir plantio | `/plantios/novo` e `/plantios/:id/editar` | RF03, RF04, RF05 |
| 05 | Calendário agrícola | `/calendario` | RF07 |
| 06 | Dashboard da comunidade | `/comunidade` | RF08, RF09 |
| 07 | Validação de dados | dentro da tela 04 | RN02, RN03 |
| 08 | Responsável pela comunidade | `/coordenadora` | perfil de quem cuida da comunidade |
| 08b | Agricultoras da comunidade | `/coordenadora/agricultoras` | lista para a responsável |

---

## 🚀 Como rodar

Pré-requisitos: **Node.js 18 ou mais novo** e o **semear-backend** rodando em `http://localhost:3000`.

```bash
# 1. Instalar as dependências
npm install

# 2. Criar o arquivo de configuração a partir do modelo
cp .env.example .env        # no Windows: copy .env.example .env

# 3. Rodar em modo desenvolvimento (abre em http://localhost:5173)
npm run dev

# Gerar a versão final (pasta dist/)
npm run build
```

---

## 🗂️ Estrutura de pastas

```
semear-frontend/
├── .env.example              # modelo das variáveis (endereço da API)
├── .gitignore
├── index.html                # página única; carrega fontes e o React
├── package.json
├── vite.config.js
├── README.md
├── public/                   # arquivos servidos como estão
│   ├── icone.png             # ícone do app (também é o favicon)
│   ├── logo-horizontal.png   # logo para cabeçalhos
│   └── logo-vertical.png     # logo para telas de abertura
└── src/
    ├── main.jsx              # ponto de entrada do React
    ├── App.jsx               # mapa de rotas (URL → tela)
    ├── config/
    │   └── dados.js          # comunidades, espécies, tipos de cultivo, calendário de referência
    ├── context/
    │   └── AuthContext.jsx   # login/logout disponível em todas as telas
    ├── services/             # conversa com a API
    │   ├── api.js            # função central de requisição + token
    │   ├── authService.js
    │   ├── plantioService.js
    │   ├── calendarioService.js
    │   └── dashboardService.js
    ├── utils/
    │   ├── validacoes.js     # RN02, RN03, contato, senha...
    │   └── formatadores.js   # datas, m², nomes
    ├── components/           # peças reutilizáveis
    │   ├── Aviso.jsx         # faixa de erro/sucesso/info
    │   ├── Cabecalho.jsx     # "‹ voltar" ou "Olá, Nome"
    │   ├── Campo.jsx         # rótulo + campo + erro
    │   ├── Carregando.jsx
    │   ├── GraficoBarras.jsx # gráfico de espécies (sem biblioteca)
    │   ├── Icone.jsx         # ícones em SVG
    │   ├── Layout.jsx        # moldura das telas internas
    │   ├── Logo.jsx
    │   ├── MenuInferior.jsx  # Plantios · Calendário · Comunidade
    │   ├── PlantioCard.jsx
    │   └── RotaProtegida.jsx # bloqueia telas sem login
    ├── pages/                # uma tela por arquivo
    │   ├── Cadastro.jsx      # Tela 01
    │   ├── Login.jsx         # Tela 02
    │   ├── MeusPlantios.jsx  # Tela 03
    │   ├── FormPlantio.jsx   # Telas 04 e 07
    │   ├── Calendario.jsx    # Tela 05
    │   ├── Dashboard.jsx     # Tela 06
    │   ├── Coordenadora.jsx  # Tela 08
    │   └── NaoEncontrada.jsx # página 404
    └── styles/
        └── global.css        # cores e fontes da identidade visual
```

---

## 🎨 Identidade visual aplicada

| Cor | Hex | Uso no app |
|---|---|---|
| Verde-Mata | `#355E3B` | botões principais, títulos, cabeçalho da tabela |
| Verde-Broto | `#86AE3E` | plantios orgânicos, carregamento |
| Terra | `#6E4B2A` | plantios convencionais, avisos informativos |
| Rosa-Ipê | `#BE3E73` | erros, destaque "ELAS", aba ativa |
| Areia | `#F4ECDD` | fundo do app |
| Verde-Boiuna | `#68A771` | detalhes e hover |

Fontes: **Baloo 2** (títulos) e **Work Sans** (textos). Campos e botões com 52 px de altura para facilitar o toque.

---

## 🔌 Integração com o back-end

Rotas do `semear-backend` usadas pelo front:

| Método | Rota | Usada em |
|---|---|---|
| POST | `/auth/cadastro` | Cadastro |
| POST | `/auth/login` | Login |
| GET | `/plantios?especie=&dataInicio=` | Meus plantios |
| POST | `/plantios` | Novo plantio |
| PUT | `/plantios/:id` | Editar plantio |
| DELETE | `/plantios/:id` | Excluir plantio |
| GET | `/calendario/:especie` | Calendário |

### ⚠️ Pendências para combinar com o back-end (Karol e João)

O front já funciona com a API atual, mas estes pontos dependem do back-end:

1. **Comunidades** — criar `GET /comunidades` (lista `[{ id, nome }]`). Enquanto não existir, o cadastro usa a lista fixa de `src/config/dados.js`, cujos IDs **precisam existir no banco**.
1. **Agricultoras da comunidade** — criar `GET /coordenadora/agricultoras` (login de COORDENADORA), devolvendo `{ comunidade: { id, nome }, agricultoras: [{ id, nome, contato, totalPlantios, areaTotal }] }`. Usada na área da responsável e na lista de agricultoras.
2. **Painel da comunidade** — o front já chama `GET /dashboard/comunidade`. Enquanto essa rota não existir, a tela mostra os números da própria agricultora. Formato esperado:
   ```json
   {
     "areaTotal": 312,
     "agricultorasAtivas": 18,
     "especies": [{ "especie": "Milho", "area": 120, "quantidade": 5 }]
   }
   ```
3. **Calendário completo** — o front consulta espécie por espécie. Ideal: criar `GET /calendario` listando todas. Os nomes das espécies em `src/config/dados.js` devem ser **iguais** aos da tabela `CalendarioAgricola`.
4. **RN03 (data até 12 meses no futuro)** — validada no front; recomenda-se validar também na API.
5. **Banco de dados** — os documentos citam MySQL/XAMPP, mas o `schema.prisma` atual usa PostgreSQL. Vale alinhar com a equipe.

---

## ✅ Regras de validação

- **RN02** — área plantada só aceita valor positivo (aceita vírgula: `12,5`).
- **RN03** — data de plantio até 12 meses no futuro.
- Datas inexistentes (ex.: 31/02) são recusadas.
- Senha com no mínimo 6 caracteres; contato precisa ser telefone ou e-mail.
- Com erro: campos ficam destacados em rosa + "Corrija os campos destacados para continuar".
- Com sucesso: volta para a lista com "Plantio salvo com sucesso".
