# Meus Projetos

Central independente para escolher projetos e consultar suas versões.

- MyOffice: catálogo em https://neillhidden.github.io/MyOffice/versoes/ . O catálogo é atualizado pelo workflow do próprio MyOffice, sem necessidade de atualizar esta central.
- BANCADA.az: histórico em https://neillhidden.github.io/MeusProjetos/bancada/ . Consulta os commits públicos diretamente no GitHub a cada acesso e pelo botão Atualizar histórico, sem precisar de novos commits na central. A loja usa Node/SQLite; a visualização do sistema ainda precisa de hospedagem própria.

## Manual para trabalhar sem o chat

Consulta o [manual completo](docs/MANUAL.md): commits, publicação, versões antigas, reversões, permissões, dados locais e preparação da Bancada.

## Publicação

O conteúdo estático está em `site/`. Nenhuma dependência ou serviço pago é necessário. Em Settings → Pages, selecionar GitHub Actions. Cada push para `main` publica a central. Endereço publicado: https://neillhidden.github.io/MeusProjetos/ .

Os sistemas e seus snapshots continuam em seus próprios repositórios. Este repositório guarda apenas a página central e a histórico dinâmico da Bancada. Não contém dados de utilizadores.

Para testar, servir `site/` com um servidor HTTP local. Links relativos permitem publicar no GitHub Pages ou usar qualquer outra hospedagem estática.

## Verificação do histórico

`node --check site/bancada/commits.js` verifica a sintaxe. Servir `site/` localmente e executar `node tests/history-browser.mjs` com `HUB_TEST_URL`, `PLAYWRIGHT_MODULE` e `CHROMIUM_PATH` apropriados. O teste verifica links do commit, atualização, pesquisa, texto seguro, fallback de limite da API e telefone; `COMMITS_FIXTURE` aceita uma resposta pública do GitHub guardada localmente.
