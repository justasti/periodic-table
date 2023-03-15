const elements = document.querySelectorAll('.element_wrapper')
const backdrop = document.querySelector('.backdrop')
const modal = document.querySelector('.modal')
const wrapper = document.querySelector('.wrapper')
let elementsArr = [];

fetch('./scripts/elements.json')
  .then(res => res.json())
  .then(data => elementsArr = data)


elements.forEach(el => el.addEventListener('click', () => {
  backdrop.classList.add('active')
  el.classList.add("no_hover")

  const element = elementsArr.find(elem => elem.symbol === el.children[1].textContent)
  wrapper.classList.add(el.classList[1])
  let html = ``
  let oxStates;

  if (typeof element.oxidationStates === 'string') {
    oxStates = element.oxidationStates.split(',').map(state => state.trim())
  } else if (typeof element.oxidationStates === 'number') {
    oxStates = [element.oxidationStates]
  }

  let oxStatesHtml = ``
  oxStates.forEach(state => {
    if (state === 'unknown') return
    oxStatesHtml += `
    <p>${state}</p>
  `})

  html = `
      <div class="top_row">
        <p class="atomic_number">${element.atomicNumber}</p>
        <p class='atomic_mass'>${element.atomicMass}</p>
      </div>
      <div class="oxidation_states">
        ${oxStatesHtml}
      </div>
      <h2 class="element">${element.symbol}</h2>
      <p class="element_name">${element.name}</p>
      <p class="element_group">Group: ${element.groupBlock}</p>
      <p class="element_year">Year discovered: ${element.yearDiscovered}</p>
    `

  modal.children[0].innerHTML = html
}))
backdrop.addEventListener('click', () => {
  backdrop.classList.remove('active')
  elements.forEach(el => el.classList.remove("no_hover"))
  wrapper.classList.remove('dark_blue', 'light_blue', 'red', 'purple', 'actinoids', 'lanthanoids', 'green', 'yellow', 'pink', 'grey')
})
modal.addEventListener('click', (e) => {
  e.stopPropagation()
})