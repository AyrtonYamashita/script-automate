const script_jsPDF = document.createElement("script");
script_jsPDF.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js";
document.head.appendChild(script_jsPDF);

const script_automate = document.createElement("script");
script_automate.src = "https://cdn.jsdelivr.net/gh/AyrtonYamashita/script-automate@v1.0.7/dist/script.min.js";
document.head.appendChild(script_automate);
(async () => {
  let documentos = [{ "JGS": "01974046" }, { "GYN": "01490856" }, { "POA": "11811458" }];

  const { startAutomate } = await import("https://cdn.jsdelivr.net/gh/AyrtonYamashita/script-automate@v1.0.7/dist/script.min.js");

  startAutomate(documentos, false);
})();