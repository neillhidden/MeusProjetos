const repo = 'https://github.com/neillhidden/BANCADA.az';
const endpoint = 'https://api.github.com/repos/neillhidden/BANCADA.az/commits';
const list = document.querySelector('#commits');
const status = document.querySelector('#status');
const search = document.querySelector('#search');
const refresh = document.querySelector('#refresh');
const more = document.querySelector('#more');
let commits = [], page = 0, hasMore = false, busy = false;
function render() {
  list.replaceChildren();
  const query = search.value.trim().toLocaleLowerCase('pt');
  const visible = commits.filter(c => `${c.commit.message} ${c.sha}`.toLocaleLowerCase('pt').includes(query));
  for (const c of visible) {
    const card = document.createElement('article'); card.className = 'card';
    const title = document.createElement('h2'); title.textContent = c.commit.message;
    const meta = document.createElement('p'); meta.className = 'meta';
    const date = new Date(c.commit.author?.date || c.commit.committer?.date);
    meta.textContent = `${c.sha.slice(0, 7)} · ${Number.isNaN(date.getTime()) ? 'Data não disponível' : new Intl.DateTimeFormat('pt-PT', {dateStyle:'medium', timeStyle:'short', timeZone:'Africa/Lagos'}).format(date)}`;
    const actions = document.createElement('div'); actions.className = 'actions';
    for (const [label, url] of [['Ver código desta versão', `${repo}/tree/${c.sha}`], ['Ver alterações', `${repo}/commit/${c.sha}`]]) {
      const link = document.createElement('a'); link.textContent = label; link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; actions.append(link);
    }
    card.append(title, meta, actions); list.append(card);
  }
  status.textContent = !commits.length ? 'Ainda não há commits publicados.' : !visible.length ? 'Nenhum commit corresponde à pesquisa.' : `${visible.length} de ${commits.length} commits carregados.`;
  more.hidden = !hasMore;
}
async function load(reset = false) {
  if (busy) return;
  busy = true; refresh.disabled = more.disabled = true;
  status.textContent = 'A consultar o histórico no GitHub…';
  const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const next = reset ? 1 : page + 1;
    const response = await fetch(`${endpoint}?per_page=100&page=${next}`, {cache:'no-store', signal:controller.signal, headers:{Accept:'application/vnd.github+json'}});
    if (response.status === 409 && next === 1) { commits = []; hasMore = false; page = 1; render(); return; }
    if (!response.ok) throw new Error(response.status === 403 || response.status === 429 ? 'O GitHub limitou temporariamente as consultas. Tenta mais tarde ou abre o histórico no GitHub.' : 'Não foi possível consultar os commits. Tenta novamente ou abre o histórico no GitHub.');
    const received = await response.json();
    if (!Array.isArray(received) || received.some(c => !/^[a-f0-9]{40}$/.test(c.sha) || typeof c.commit?.message !== 'string')) throw new Error('O GitHub devolveu um histórico inválido.');
    const seen = new Set(reset ? [] : commits.map(c => c.sha));
    commits = [...(reset ? [] : commits), ...received.filter(c => {if (seen.has(c.sha)) return false; seen.add(c.sha); return true;})];
    page = next; hasMore = received.length === 100; render();
  } catch (error) {
    status.textContent = error.name === 'AbortError' ? 'A consulta demorou demasiado. Tenta novamente ou abre o histórico no GitHub.' : error instanceof TypeError || error instanceof SyntaxError ? 'Não foi possível consultar o GitHub. Tenta novamente ou abre o histórico no GitHub.' : error.message;
  } finally { clearTimeout(timeout); busy = false; refresh.disabled = more.disabled = false; }
}
search.addEventListener('input', render);
refresh.addEventListener('click', () => void load(true));
more.addEventListener('click', () => void load());
void load(true);
