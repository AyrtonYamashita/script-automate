console.log("Script carregado!")
export async function startAutomate(documentos, useOrigin) {
  //Verifica se existe log já existente e remove para iniciar um novo.
  const localErrors = localStorage.getItem("log");
  const data = localStorage.getItem("data")
  if (localErrors || data) {
    localStorage.removeItem("log");
    localStorage.removeItem("data")
  }

  for (const [index, doc] of documentos.entries()) {
    const origem = Object.keys(doc)[0];
    const ctrc = doc[origem];
    if (useOrigin) document.getElementById("1").value = origem;
    document.getElementById("2").value = ctrc;
    document.getElementById("3").click();
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Documento identificado: ${origem, ctrc}`);

    const errorLabel = document.getElementById("errormsglabel");
    if (errorLabel && errorLabel.innerText.trim() !== "") {
      const error = errorLabel.textContent;
      const errorLog = JSON.parse(localStorage.getItem("log")) || [];
      errorLog.push({ [ctrc]: error });
      localStorage.setItem("log", JSON.stringify(errorLog));
      document.getElementById("0").click();
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (index === documentos.length - 1) {
      const fatura = document.querySelector("#nro_fatura");
      const vlr_faturado = document.querySelector("#vlr");
      const errorLog = JSON.parse(localStorage.getItem("log")) || [];
      localStorage.setItem("data", JSON.stringify([{ fatura: fatura.value }, { valor_faturado: vlr_faturado.value }]));
      alert(`Automação encerrada!\nDocumentos processados: ${documentos.length - errorLog.length}\nDocumentos não processados: ${errorLog.length}\nTotal de documentos lidos: ${documentos.length}`)
      generateFile(errorLog, JSON.parse(localStorage.getItem("data")))
    }
  }
}
function generateFile(log, data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(JSON.stringify(log), 10, 10);
  doc.text(JSON.stringify(data), 20, 20);
  doc.save(`${data[0].fatura}`)
}

