const OPEN_API_KEY = "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"; 
// para gerar sua chave acesse: https://platform.openai.com

let txtPergunta = document.querySelector("#txtPergunta");
let resposta = document.querySelector("#resposta");

txtPergunta.addEventListener("keypress", (e) => {
  if (txtPergunta.value && e.key === "Enter") {
    EnviarPergunta();
  }
});

function EnviarPergunta() {
  var pergunta = txtPergunta.value;

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPEN_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: pergunta,
      max_tokens: 2048,
      temperature: 0.5,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (resposta.value) resposta.value += "\n";

      if (json.error?.message) {
        resposta.value += `Erro: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        let text = json.choices[0].text || "Sem resposta";

        resposta.value += "Chat GPT: " + text;
      }

      resposta.scrollTop = resposta.scrollHeight;
    })
    .catch((error) => console.log("Erro: ", error))
    .finally(() => {
      txtPergunta.disabled = false;
      txtPergunta.value = "";
      txtPergunta.focus();
    });

  if (resposta.value) resposta.value += "\n\n\n";

  resposta.value += `Eu: ${pergunta}`;
  txtPergunta.value = "Carregando...";
  txtPergunta.disabled = true;


  resposta.scrollTop = resposta.scrollHeight;
}