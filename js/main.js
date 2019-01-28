const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

  // const tag = t => {
  //   if(typeof t === 'string') {
  //     return tagAttrs({ tag: t })
  //   }
  //   return tagAttrs(t)
  // }

const tag = t => 
  typeof t === 'string' ? tagAttrs({tag: t}) : tagAttrs(t)


// const attrToString = (obj = {}) => {
//   const keys = Object.keys(obj)
//   const attrs = []
//   keys.map(e=>{
//     attrs.push(`${e}="${obj[e]}"`)
//     }
//   )
//   return attrs.join('')
// }

const attrToString = (obj = {}) => 
  Object.keys(obj)
  .map(attr => `${attr}="${obj[attr]}"`)
  .join('')


const tagAttrs = obj => (content = " ") => 
  `<${obj.tag}${obj.attrs ? ' ' : ''}${attrToString(obj.attrs)}>${content}</${obj.tag}>`


const tableRowTag = tag('tr')
const tableRow = items => compose(tableRowTag, tableCells)(items)
// const tableRows = items => tableRowTag(tableCells(items))

const tableCell = tag('td')
const tableCells = items => items.map(tableCell).join('')

const trashIcon = tag({tag: 'i', attrs: {class: 'fas fa-trash-alt'}})()

const $description = document.getElementById('description')
const $calories = document.getElementById('calories')
const $carbs = document.getElementById('carbs')
const $proteins = document.getElementById('proteins')

let list = []

$description.addEventListener('keypress', element => {
  element.srcElement.classList.remove('is-invalid')
})

$calories.addEventListener('keypress', element => {
  element.srcElement.classList.remove('is-invalid')
})

$carbs.addEventListener('keypress', element => {
  element.srcElement.classList.remove('is-invalid')
})

$proteins.addEventListener('keypress', element => {
  element.srcElement.classList.remove('is-invalid')
})


const validateInputs = () => { 

  $description.value ? '' : $description.classList.add('is-invalid')
  $calories.value ? '' : $calories.classList.add('is-invalid')
  $carbs.value ? '' : $carbs.classList.add('is-invalid')
  $proteins.value ? '' : $proteins.classList.add('is-invalid')

  
  $description.value && $calories.value && $carbs.value && $proteins.value && add()

}

const add = () => {
  const newItem = {
    description: $description.value,
    calories: parseInt($calories.value),
    carbs: parseInt($carbs.value),
    proteins: parseInt($proteins.value)
  }
  list.push(newItem)
  console.log(list);
  cleanInputs()
  updateTotals()
  renderItems()
}

const updateTotals =  () => {
  let calories = 0, carbs = 0, proteins =  0  
  list.map(item  => {
    calories += item.calories,
    carbs += item.carbs,
    proteins += item.proteins
  })

  document.getElementById('totalCalories').textContent = calories
  document.getElementById('totalCarbs').textContent = carbs
  document.getElementById('totalProteins').textContent = proteins
}

const renderItems = () => {

  const listWrapper = document.querySelector('tbody')
  // while(listWrapper.firstChild) listWrapper.removeChild(listWrapper.firstChild)
  listWrapper.innerHTML = ""  

  list.map((item, index) => {    
    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-danger',
        onclick: `removeItem(${index})`
      }
    })(trashIcon)
    listWrapper.innerHTML += tableRow([item.description, item.calories, item.carbs, item.proteins, removeButton])
  })
}

const removeItem = index => {
  list.splice(index, 1)

  updateTotals()
  renderItems()
}

const cleanInputs = () => {
  $description.value = ''
  $calories.value = ''
  $carbs.value = ''
  $proteins.value = ''
}

