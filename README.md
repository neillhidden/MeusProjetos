# Meus Projetos

Central independente para escolher projetos e consultar suas versões.

- MyOffice: catálogo em https://neillhidden.github.io/MyOffice/versoes/ . O catálogo é atualizado pelo workflow do próprio MyOffice, sem necessidade de atualizar esta central.
- BANCADA.az: ainda em desenvolvimento, sem código/versões publicadas. Quando o catálogo estiver disponível, atualizar o link do cartão em `site/index.html`.

## Manual para trabalhar sem o chat

Consulta o [manual completo](docs/MANUAL.md): commits, publicação, versões antigas, reversões, permissões, dados locais e preparação da Bancada.

## Publicação

O conteúdo estático está em `site/`. Nenhuma dependência ou serviço pago é necessário. Em Settings → Pages, selecionar GitHub Actions. Cada push para `main` publica a central. Endereço publicado: https://neillhidden.github.io/MeusProjetos/ .

Os sistemas e seus snapshots continuam em seus próprios repositórios. Este repositório guarda apenas a página central e a página informativa da Bancada. Não contém dados de utilizadores.

Para testar, servir `site/` com um servidor HTTP local. Links relativos permitem publicar no GitHub Pages ou usar qualquer outra hospedagem estática.
