const formulario = document.querySelector("form");

formulario.addEventListener("submit", function (evento) {
  // Evita refresh na página
  evento.preventDefault();

  //url da Pesquisa
  let urlForm = " https://pokeapi.co/api/v2/pokemon/";

  // Valor do input Name
  let nome = document.getElementById("name");

  //concatenar url  com input name
  urlForm = urlForm + this.name.value;

  // Transformar os valores em minúsculo;
  urlForm = urlForm.toLowerCase();

  let imagem = document.getElementById("pokemon__imagens");

  let descricao = document.getElementById("pokemon__descricao");

  let resposta = " ";
  let erro = " ";

  fetch(urlForm)
    .then((descricao) => descricao.json())
    .then(function (data) {
      console.log(data);
      resposta = `Nome:   ${maiuscula(data.name)} <br>`;
      resposta = resposta + `Tipo: "  ${maiuscula(data.types[0].type.name)}`;
      descricao.innerHTML = resposta;

      imagem.innerHTML =
        "<img src='" +
        data.sprites.front_default +
        "'><img src ='" +
        data.sprites.back_default +
        "'>";
    })
    .catch(function (errorMessage) {
      console.log(errorMessage);
      if (
        errorMessage ==
        `SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON`
      ) {
        resposta = "Pokemon não encontrado :( ";
      } else if (
        errorMessage ==
        `TypeError: Cannot read properties of undefined (reading '0')`
      ) {
        resposta = "Por favor, insira um nome ou um número.";
      } else {
        resposta = errorMessage;
      }
      descricao.innerHTML = resposta;
    });
});

function maiuscula(val) {
  return val[0].toUpperCase() + val.substr(1);
}
