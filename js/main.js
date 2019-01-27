const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const tag = t => content => `<${t}>${content}</${t}>`


const attrToString = (obj = {}) => {
  const keys = Object.keys(obj)
  const attrs = []
  keys.map(e=>{
    attrs.push(`${e}="${obj[e]}"`)
    }
  )
  return attrs.join('')
}

const tagAttrs = obj => (content = " ") => 
  `<${obj.tag}${obj.attrs ? ' ' : ''}${attrToString(obj.attrs)}>${content}</${obj.tag}>`

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
}

const cleanInputs = () => {
  $description.value = ''
  $calories.value = ''
  $carbs.value = ''
  $proteins.value = ''
}

