const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sIdade = document.querySelector('#m-idade')
const sQualificação = document.querySelector('#m-qualificacao')


const btnCadastrar = document.querySelector('#btnCadastrar')



let itens
let id

function openModal(edit = false, index = 0) 
{
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) 
    {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sIdade.value = itens[index].idade
    sQualificação.value = itens[index].qualificacao


    id = index
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sIdade.value = ''
    sQualificação.value = ''

  }
  
}

function editItem(index) 
{

  openModal(true, index)
}

function deleteItem(index) 
{
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) 
{
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.idade}</td>
    <td>R$ ${item.qualificacao}</td>

    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnCadastrar.onclick = e => 
{
    if (sNome.value == '' || sFuncao.value == '' || sIdade.value == '' || sQualificação.value == '') 
    {
      return
    }

  e.preventDefault();

  if (id !== undefined) 
  {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sIdade.value
    itens[id].salario = sQualificação.value
  } 
  
  else 
  {
    itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'idade': sIdade.value, 'qualificacao': sQualificação.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

  function loadItens() 
{
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => 
  {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
