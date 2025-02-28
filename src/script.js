console.log("Script carregado!")

export function teste() {
  return console.log("Função executada com sucesso!")
}

export function teste2(texto) {
  return console.log(`Função executada com sucesso! ${texto}`)
}

module.exports = { teste, teste2 }

// async function processarDocumentos() {
//   const localErrors = localStorage.getItem("log");
//   if (localErrors) {
//     localStorage.removeItem("log");
//   }
//   for (const [index, doc] of documentos.entries()) {
//     const chave = Object.keys(doc)[0];
//     const valor = doc[chave];
//     // document.getElementById("1").value = chave;
//     document.getElementById("2").value = valor;
//     document.getElementById("3").click();
//     await new Promise(resolve => setTimeout(resolve, 500));
//     console.log(chave, valor)

//     const errorDiv = document.getElementById("errormsg");
//     if (errorDiv && errorDiv.innerText.trim() !== "") {
//       const mensagemErro = errorDiv.textContent;;

//       const errosAnteriores = JSON.parse(localStorage.getItem("log")) || [];
//       errosAnteriores.push({ documento: doc, erro: mensagemErro });
//       localStorage.setItem("log", JSON.stringify(errosAnteriores));
//       document.getElementById("0").click();
//       await new Promise(resolve => setTimeout(resolve, 500));
//     }
//     if (index === documentos.length - 1) {
//       const erros = JSON.stringify(localStorage.getItem("log"));
//       const blob = new Blob([localStorage.getItem("log")], { type: 'application/json' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a")
//       a.href = url;
//       document.body.appendChild(a)
//       a.download = `relatorio_erros.txt`
//       a.click()
//       document.body.removeChild(a)
//       URL.revokeObjectURL(url)

//     }
//   }
// }
// processarDocumentos();




