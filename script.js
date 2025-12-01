// Capturando os elementos e definindo constantes.
const input1 = document.querySelector("#value-1")
const input2 = document.querySelector("#value-2")
const operations = document.querySelector("#operations")
const button = document.querySelector("#btnResult")
const result = document.querySelector("#result")
const hiddenInputs = document.querySelector(".inputs")
const label = document.querySelector("#label-op")

let calculationD = false

// Função para limpar todo o conteúdo que não seja binário dos inputs. 
function cleanBinary(event) {
  const input = event.target
  input.value = input.value.replace(/[^01]/g, '')
}

// Executando a função de limpar inputs.
input1.addEventListener('input', cleanBinary);
input2.addEventListener('input', cleanBinary);

// Função para fazer a execução.
function calculateBinary() {
  const bin1 = input1.value
  const bin2 = input2.value

  // Verifica se o cálculo já foi feito.
  if(calculationD) {
    reset()
    return
  }

  if (!bin1 || !bin2) {
    alert("Todos os campos devem ser preenchidos!")
    return
  }

  // Conversão para decimal.
  const dec1 = parseInt(bin1, 2)
  const dec2 = parseInt(bin2, 2)

  const selectedOp = operations.value

  // Variável para definir cálculo dos valores.
  let decResult

  // Estrutura para definir a operação que será feita dependendo da escolha do usuário. 
  switch (selectedOp) {
    case '+':
      decResult = dec1 + dec2
      break
    case '-':
      decResult = dec1 - dec2
      break
    case '*':
      decResult = dec1 * dec2
      break
    case '/':
      if (dec2 === 0) {
        alert('ERRO: Divisão por zero em binário!')
        calculationD = true
        return
      }
      decResult = Math.floor(dec1 / dec2)
      break
    default:
      alert('ERRO: Operação Inválida!')
      calculationD = true
      return
  }

  // Conversão dos valor decimal final para binário.
  const finalBinResult = decResult.toString(2)

  // Exibição do resultado.
  result.innerHTML = 
    `
      <h2>Resultado do Cálculo:</h2>
      <div>${[...finalBinResult].join(' ')}</div>
    ` 

  hiddenInputs.classList.add("hidden")
  result.classList.remove("hidden")
  operations.classList.add("hidden")
  label.classList.add("hidden")

  button.textContent = 'Calcular Novamente'

  calculationD = true
}

// Função para resetar inputs para calcular novamente.
function reset() {
  input1.value = '';
  input2.value = '';

  hiddenInputs.classList.remove("hidden")
  result.classList.add("hidden")
  operations.classList.remove("hidden")
  label.classList.remove("hidden")
  button.textContent = 'Calcular'

  calculationD = false
}

button.addEventListener('click', calculateBinary)
