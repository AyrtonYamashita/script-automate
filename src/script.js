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

  let y = 20; // Define a posição inicial de y
  const pageHeight = doc.internal.pageSize.height;

  // Título do Relatório
  doc.setFontSize(16);
  doc.text(`Relatório de Documentos`, 10, y);

  y += 10; // Avança para a próxima linha

  // Fatura com tamanho de fonte padrão (maior)
  doc.setFontSize(10);
  doc.text(`Fatura: ${(data[0].fatura === "0" ? "Não faturado" : data[0].fatura)}`, 10, y);
  doc.text(`Valor Faturado: ${(data[1].valor_faturado === "" ? "R$ 0,00" : "R$ " + data[1].valor_faturado)}`, 20 + doc.getTextWidth(`Fatura: ${(data[0].fatura === "0" ? "Não faturado" : data[0].fatura)}`), y);
  doc.text(`Total de documentos não faturados: ${log.length}`, 120, y)

  y += 10; // Move para a próxima linha após o título e informações da fatura

  const checkPageOverflow = () => {
    if (y >= pageHeight - 20) {
      doc.addPage();
      y = 20; // Reseta o valor de y para o topo da nova página
    }
  };

  // Itera sobre os itens do log
  log.forEach((item, index) => {
    const documento = Object.keys(item)[0];
    const mensagem = item[documento];

    // Define o tamanho da fonte para os documentos
    doc.setFontSize(12);
    doc.text(`Documento: ${documento}`, 10, y);
    y += 5;

    // Formata a mensagem
    const formatMessage = doc.splitTextToSize(`Mensagem: ${mensagem}`, 180);
    doc.text(formatMessage, 10, y);
    y += formatMessage.length * 5; // Ajusta a posição vertical após o texto

    // Linha separadora
    doc.line(10, y + 5, 200, y + 5);

    y += 15; // Move para a próxima linha

    checkPageOverflow();
  });

  // Salva o arquivo PDF
  doc.save(`${data[0].fatura}.pdf`);
}

