let tamanho = 16;

function aumentarFonte(){
tamanho += 2;
document.body.style.fontSize = tamanho + "px";
}

function diminuirFonte(){
tamanho -= 2;
document.body.style.fontSize = tamanho + "px";
}

function alternarTema(){
document.body.classList.toggle("temaEscuro");
}

function lerTexto(){

let texto = document.body.innerText;

let fala = new SpeechSynthesisUtterance(texto);

fala.lang = "pt-BR";

speechSynthesis.speak(fala);
}

let pontos = 0;

function ganharPontos(){

if(pontos < 100){
pontos += 10;
document.getElementById("nivel").style.width = pontos + "%";
}
}

function respostaCorreta(){
document.getElementById("resultado").innerHTML =
"✅ Correto! Você ganhou 10 pontos.";
ganharPontos();
}

function respostaErrada(){
document.getElementById("resultado").innerHTML =
"❌ Essa atitude prejudica o meio ambiente.";
}

function calcular(){

let energia =
parseInt(document.getElementById("energia").value);

if(energia <= 150){
document.getElementById("ecoResultado").innerHTML =
"🌱 Excelente consumo!";
}
else{
document.getElementById("ecoResultado").innerHTML =
"⚠️ Considere economizar energia.";
}
}

function responder(){

let pergunta =
document.getElementById("pergunta").value.toLowerCase();

let resposta = "";

if(pergunta.includes("reciclagem")){
resposta =
"A reciclagem reduz resíduos e preserva recursos naturais.";
}
else if(pergunta.includes("água")){
resposta =
"Economizar água é essencial para um futuro sustentável.";
}
else if(pergunta.includes("energia")){
resposta =
"Utilize lâmpadas LED e desligue aparelhos sem uso.";
}
else{
resposta =
"Ótima pergunta! Sustentabilidade envolve equilíbrio entre sociedade, economia e meio ambiente.";
}

document.getElementById("chat").innerHTML +=
"<p><b>Você:</b> " + pergunta + "</p>";

document.getElementById("chat").innerHTML +=
"<p><b>EcoBot:</b> " + resposta + "</p>";
}