# Manual dos teus projetos — GitHub, commits e versões

Atualizado em 7 de outubro de 2026. Guarda este manual para trabalhar sem depender do chat.

## 1. Os teus endereços

| O que queres fazer | Link |
| --- | --- |
| Escolher um projeto | https://neillhidden.github.io/MeusProjetos/ |
| Usar o MyOffice atual | https://neillhidden.github.io/MyOffice/ |
| Escolher uma versão do MyOffice | https://neillhidden.github.io/MyOffice/versoes/ |
| Abrir o código do MyOffice | https://github.com/neillhidden/MyOffice |
| Ver os commits do MyOffice | https://github.com/neillhidden/MyOffice/commits/main/ |
| Ver a publicação do MyOffice | https://github.com/neillhidden/MyOffice/actions |
| Abrir o código da central | https://github.com/neillhidden/MeusProjetos |
| Ver a publicação da central | https://github.com/neillhidden/MeusProjetos/actions |
| Abrir o repositório da Bancada | https://github.com/neillhidden/BANCADA.az |

Podes guardar a central nos favoritos do navegador. O site funciona sem manter o chat ou o teu computador ligados, enquanto o GitHub Pages e os repositórios permanecerem disponíveis.

## 2. As palavras que precisas conhecer

- **Repositório:** a pasta do projeto no GitHub, com os ficheiros e o histórico.
- **Commit:** um registo das alterações guardadas. Tem uma mensagem, uma data e um código identificador.
- **Branch:** uma linha de desenvolvimento. A branch `main` é a usada para publicar estes sites.
- **Push:** enviar commits do teu computador ou ambiente de desenvolvimento para o GitHub.
- **Build/compilar:** transformar o código em ficheiros que o navegador consegue executar. Não significa simplesmente abrir o site.
- **Preview/pré-visualização:** abrir e testar o site.
- **Deploy/publicação:** colocar o site compilado na hospedagem.
- **GitHub Actions:** o sistema automático que executa os testes e publica.
- **GitHub Pages:** a hospedagem que serve os sites nos links acima.

O fluxo normal é: alterar os ficheiros → fazer commit → enviar para `main` → aguardar o Actions → abrir o site atualizado.

## 3. O que existe em cada repositório

### MyOffice

Guarda a aplicação, os testes, a documentação e a estrutura SQL preparada para uma futura base de dados. O workflow publica o site atual e guarda pré-visualizações dos commits.

Existe também uma branch `pages-archive`, com os ficheiros compilados das versões e o manifesto `versions.json`. Não a apagues: ela conserva as pré-visualizações para as próximas publicações.

### MeusProjetos

Guarda apenas a central de escolha dos projetos:

- `site/index.html`: página principal da central e os cartões dos projetos.
- `site/bancada/index.html` e `commits.js`: histórico automático dos commits públicos da Bancada, pesquisa, atualização e links para código/alterações.
- `.github/workflows/deploy-pages.yml`: publicação automática da central.
- `docs/MANUAL.md`: este manual.

A central liga ao catálogo do MyOffice; não precisa de um commit novo quando o MyOffice muda. Os antigos endereços `/MyOffice/projetos/` e `/MyOffice/projetos/bancada/` encaminham para a central independente.

### BANCADA.az

Ainda está em desenvolvimento. Confirmaste que o código será publicado futuramente. Por enquanto, o repositório não tem a aplicação nem pré-visualizações. Não basta acrescentar um cartão à central para gerar versões: o projeto precisa do seu próprio build e publicação.

## 4. Como fazer um commit pelo GitHub

Para editar um ficheiro:

1. Abre o repositório e confirma que estás na branch `main`.
2. Abre o ficheiro e clica no lápis de edição.
3. Faz a alteração e clica em **Commit changes**.
4. No primeiro campo, escreve uma mensagem clara.
5. Se a alteração já está pronta para publicar, escolhe guardar diretamente em `main` e confirma.

Para enviar ficheiros: na página **Code**, escolhe **Add file → Upload files**, envia os ficheiros e escreve a mensagem do commit. Para alterações maiores, é preferível uma branch e um pull request; a publicação acontece quando as alterações entram em `main`.

Exemplos de mensagens:

- `Adicionar botão para alternar entre Pessoal e Business`
- `Melhorar o menu no telefone`
- `Corrigir o cálculo do transporte`
- `Adicionar Bancada à central de projetos`

Cada commit tem a sua mensagem. Usa uma alteração coerente por commit para facilitar a compreensão e o regresso a versões anteriores.

**Atenção às pastas:** ao atualizar o MyOffice, os ficheiros da aplicação devem ficar na raiz desse repositório, sem criar uma pasta adicional `MyOffice/MyOffice`. Na central, os ficheiros publicados ficam em `site/`.

## 5. Como verificar se o site foi atualizado

1. Abre **Actions** no repositório que alteraste.
2. Abre a execução mais recente e confirma que corresponde ao teu commit.
3. Aguarda o resultado: em curso/amarelo significa que ainda está a trabalhar; verde/**Success** significa que terminou; vermelho/**Failure** significa que ocorreu um erro.
4. Após sucesso, abre o site. Se ainda aparecer a versão antiga, atualiza a página; no computador, tenta `Ctrl + Shift + R` ou uma janela privada.

Um commit apenas local não atualiza o site. Um commit noutra branch também não publica automaticamente por esta configuração. É preciso chegar à `main` e o workflow terminar com sucesso.

No MyOffice, o workflow testa e compila a aplicação, prepara o catálogo e as versões, conserva o arquivo e publica. Na central, publica os ficheiros estáticos de `site/`.

## 6. Como consultar os commits e abrir versões antigas

### Ver o código que mudou

No GitHub, abre **Code** e procura o link/contador de commits acima da lista de ficheiros. Também podes usar o link direto da secção 1. Clica num commit para ver as alterações. **Browse files** mostra os ficheiros naquela versão; não abre o site interativo.

### Usar o site como estava num commit

1. Abre a central **MeusProjetos**.
2. Escolhe **MyOffice**.
3. Pesquisa pela descrição, data ou código do commit.
4. Clica em **Abrir versão** para testar o sistema daquela época.
5. Usa **Voltar às versões** e **Todos os projetos** para regressar.

**Ver alterações** abre o commit no GitHub. Commits anteriores à aplicação ou que não puderam ser compilados aparecem sem pré-visualização. O código antigo mantém os comportamentos e os problemas que tinha naquela época.

Abrir uma versão antiga não muda o site principal e não desfaz commits. Cada pré-visualização usa dados próprios no navegador.

## 7. Como voltar uma alteração no site principal

Consultar uma versão antiga e restaurar o principal são ações diferentes. Para restaurar o principal, precisas de um novo commit que desfaça a alteração e de uma publicação bem-sucedida.

Para uma pequena alteração pelo navegador, usa o histórico para consultar o conteúdo antigo, edita o ficheiro atual, repõe o conteúdo pretendido e faz um novo commit, por exemplo `Restaurar o menu anterior`.

Se já usas Git no computador, podes reverter um commit:

```sh
git switch main
git pull --ff-only origin main
git revert CODIGO_DO_COMMIT
git push origin main
```

Substitui `CODIGO_DO_COMMIT` pelo identificador da alteração a desfazer. O comando cria uma correção no histórico. Se houver conflitos, resolve-os antes de enviar. Reverter vários commits, ou um merge, pode exigir análise adicional.

Evita `push --force` e apagar o histórico para regressar: a reversão permite preservar o registo da evolução.

## 8. Commits são backup de quê?

O histórico permite recuperar os **ficheiros que foram incluídos e enviados nos commits**. Ficheiros ainda não enviados, ficheiros ignorados e dados guardados no navegador não ficam protegidos por esse histórico.

No MyOffice atual, os dados operacionais ficam em **localStorage no navegador**. Não existe uma base de dados remota ativa. O esquema PostgreSQL guardado em `database/` é uma preparação para o futuro; não armazena os teus dados atuais.

Limpar os dados do navegador, mudar de navegador/dispositivo ou usar uma janela privada pode deixar-te sem os dados locais habituais. O histórico Git e as pré-visualizações não são backup desses dados.

Os prefixos de armazenamento separam os testes de cada versão dos dados do principal. Isso não é autenticação nem uma barreira de segurança: as páginas estão no mesmo domínio. Nunca coloques dados reais, palavras-passe, tokens ou ficheiros `.env` em commits públicos.

## 9. Como descarregar e testar no computador

No repositório, abre **Code → Download ZIP**, extrai a pasta e guarda uma cópia. O ZIP contém os ficheiros da branch escolhida, não todo o histórico Git. Para descarregar um commit antigo, abre o commit, escolhe **Browse files** e usa a opção de download disponível nessa vista.

### MyOffice

Instala Node.js compatível e Bun. Abre um terminal na pasta extraída, onde está `package.json`, e executa:

```sh
bun install --frozen-lockfile
npm run dev
```

Abre o endereço que o terminal indicar. Para verificar alterações antes de enviar:

```sh
npm test
npm run lint
npm run build
```

O build gera `dist/`; não precisas de enviar essa pasta manualmente para o MyOffice, porque o workflow já a gera. O aviso conhecido sobre tamanho do bundle não é, por si só, uma falha de publicação.

### Central MeusProjetos

É HTML estático e não precisa de instalar dependências. Se tens Python, na pasta do repositório:

```sh
python -m http.server 8000 --directory site
```

Abre no navegador o endereço local indicado pelo servidor. Esta visualização depende do teu computador; o endereço público no GitHub Pages não depende dele.

## 10. Codex e Google AI Studio

Podes continuar a usar ambos. São ferramentas para trabalhar nos ficheiros; o repositório GitHub é o ponto comum para guardar a evolução.

Antes de mudar de ferramenta, envia as alterações e confirma o commit no GitHub. Na outra ferramenta, abre/importa a versão atual do repositório com o método que ela disponibilizar. As opções de exportação e integração do Google AI Studio podem mudar: não assumas que uma alteração feita lá já foi enviada para o GitHub.

Se a ferramenta só permitir exportar o projeto, compara os ficheiros antes de os enviar. Evita substituir trabalho novo por uma cópia antiga.

No MyOffice, consulta `AGENTS.md` e `docs/CURRENT_STATE.md`. Esses documentos orientam outras ferramentas sobre a arquitetura e o ponto de continuação. Planos gratuitos, quotas de IA e disponibilidade dos produtos são separados da hospedagem no Pages; verifica os limites de cada serviço.

## 11. Como configurar um novo repositório e o Pages

1. Abre https://github.com/new .
2. Define o nome e a visibilidade. No plano GitHub Free, o Pages destes projetos usa repositórios públicos. Pages em repositórios privados exige plano compatível.
3. Se vais enviar um projeto Git já preparado, cria o repositório vazio, sem README, licença ou `.gitignore`, para evitar conflitos iniciais.
4. Envia o código e o workflow adequado ao projeto.
5. Em **Settings → Pages → Build and deployment → Source**, escolhe **GitHub Actions**.
6. Em **Actions**, abre o workflow e usa **Run workflow** se estiver disponível e for necessário iniciar a publicação.
7. Aguarda sucesso e consulta o endereço apresentado pelo Pages.

O botão de teste gratuito de 30 dias que viste era do **GitHub Enterprise**; não era uma contagem regressiva do Pages público. O Pages está sujeito às regras e limites do serviço. O arquivo de versões aumenta com o tempo; acompanha o tamanho antes de atingir o limite de publicação.

### Permissões do Codex

Se a integração não puder aceder a um repositório novo, abre https://github.com/settings/installations , encontra a integração utilizada pelo Codex, escolhe **Configure** e autoriza esse repositório.

Acesso para enviar código e permissão para criar repositórios/alterar Pages são diferentes. Se a integração recusar uma dessas configurações, podes realizá-la manualmente no GitHub. Não precisas de enviar tokens pelo chat.

## 12. Quando a Bancada tiver código

1. Publica o código no repositório https://github.com/neillhidden/BANCADA.az .
2. Confirma como a aplicação é executada e compilada.
3. Prepara o workflow de testes e publicação adequado a esse framework.
4. Se for um front-end estático compatível, configura Pages e os caminhos de assets para `/BANCADA.az/`.
5. Prepara um catálogo e snapshots das versões. A configuração do MyOffice serve como referência, mas não deve ser copiada sem conferir o framework e os comandos.
6. Em `MeusProjetos/site/index.html`, altera o link do cartão Bancada para o catálogo real e atualiza o estado/descrição.
7. Faz commit na central e aguarda a publicação.

Se a Bancada precisar de um servidor ou backend, o GitHub Pages não executa esse servidor. A hospedagem correspondente terá de ser definida nessa fase.

## 13. Problemas comuns

| Problema | O que verificar |
| --- | --- |
| Fiz commit e o site não mudou | O commit chegou à `main` do repositório correto? O Actions terminou com sucesso? |
| Actions ficou vermelho | Abre a execução, o job e a etapa que falhou. Lê a mensagem antes de alterar ficheiros. |
| Pages não está ativo | Em Settings → Pages, verifica Source = GitHub Actions e o workflow de publicação. |
| Site abre mas falta CSS ou JavaScript | Confere a base/caminho de publicação. No MyOffice, o build Pages usa `/MyOffice/`; previews usam o caminho do commit. |
| A versão antiga não tem botão para abrir | Pode não ter aplicação ou o build histórico pode ter falhado. Consulta o código pelo commit. |
| A Bancada não abre um sistema | O histórico mostra código/alterações. A loja tem servidor Node/SQLite e precisa de hospedagem própria para abrir como site. |
| Perdi os dados depois de limpar o navegador | Dados locais não são commits nem backups. Não assumas que voltar o código recupera esses dados. |
| Codex não pode enviar para um repositório novo | Verifica o acesso da integração nas instalações do GitHub. |
| Quero mudar o título de uma versão futura | Escreve a mensagem pretendida ao fazer o commit. |

## 14. Rotina para trabalhar sozinho

1. Abre o projeto atualizado e verifica o último commit.
2. Faz uma alteração de cada vez e testa o que mudou.
3. Usa uma mensagem de commit clara.
4. Envia para o repositório correto.
5. Acompanha o Actions até sucesso.
6. Abre o principal e confirma o resultado.
7. Usa a central para comparar com versões anteriores.
8. Mantém a documentação atualizada quando mudares a estrutura ou as configurações.

## 15. Histórico automático da BANCADA.az

O primeiro commit foi publicado em 09/10/2026. Abre a central, escolhe BANCADA.az e consulta os commits. A página lê o repositório público diretamente no GitHub, sem senha/token/API paga; futuros commits aparecem ao abrir/atualizar a página. Usa **Atualizar histórico** se a página já estiver aberta, pesquisa pelo nome/código e **Carregar commits anteriores** para páginas adicionais (100 por consulta). Se houver falha ou limite temporário da API, o link **Ver histórico no GitHub** continua disponível.

**Ver código desta versão** abre os ficheiros daquele commit; **Ver alterações** abre o diff. A atual BANCADA usa Node 24 e SQLite e não funciona apenas com GitHub Pages. A publicação da loja e das pré-visualizações interativas exige uma hospedagem com esse servidor e dados separados por versão; ainda não está configurada. A consulta de commits não altera o projeto ou a base de dados.
