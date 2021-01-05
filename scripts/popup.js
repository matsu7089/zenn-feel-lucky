const WEB_HOST = 'https://zenn.dev'
const API_HOST = 'https://api.zenn.dev'

window.addEventListener('load', () => {
  const count = 9
  const order = Math.random() < 0.5 ? 'daily' : 'latest'
  const page = Math.floor(Math.random() * 50)
  const params = new URLSearchParams({ count, order, page })

  fetch(`${API_HOST}/articles?${params}`, { mode: 'no-cors' })
    .then((response) => response.json())
    .then((data) => createItems(data))
})

const createItems = (data) => {
  const container = document.getElementById('container')

  const baseItem = document.createElement('a')
  baseItem.className = 'item'
  baseItem.target = '_blank'
  baseItem.rel = 'noopener'

  const articles = data.articles || []

  while (articles.length) {
    const i = Math.floor(Math.random() * articles.length)
    const article = articles.splice(i, 1)[0]

    const username = article.user.username
    const slug = article.slug

    const item = baseItem.cloneNode()
    item.href = `${WEB_HOST}/${username}/articles/${slug}`
    item.textContent = article.emoji

    container.appendChild(item)
  }

  twemoji.parse(container)
}
