const elements = document.querySelectorAll('.element_wrapper')
const backdrop = document.querySelector('.backdrop')
const modal = document.querySelector('.modal')
let elementsArr = [];

fetch('./scripts/elements.json')
  .then(res => res.json())
  .then(data => elementsArr = data)

elements.forEach(el => el.addEventListener('click', () => {
  backdrop.classList.add('active')
  el.classList.add("no_hover")
  const element = elementsArr.filter(elem => elem.symbol === el.children[1].textContent)
  let html = `<h2>${element[0].name}</h2>`
  Object.entries(element[0]).forEach(([key, value]) => {
    html += `
      <p>${key}: <strong>${value}</strong></p>
    `
  })
  modal.innerHTML = html
}))
backdrop.addEventListener('click', () => {
  backdrop.classList.remove('active')
  elements.forEach(el => el.classList.remove("no_hover"))
})
modal.addEventListener('click', (e) => {
  e.stopPropagation()
})