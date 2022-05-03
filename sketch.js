//Sons do jogo
let raquetada;
let ponto;
let trilha;

//Variáveis da Bola
let xBola = 300;
let yBola = 200;
let dBola = 13;
let raio = dBola / 2;

//Variáveis da Raquete
let xRaq = 5;
let yRaq = 150;
let largRaq = 10;
let altRaq = 90;
let bdRaq = 10;

//Varíaveis do Oponente
let xOpRaq = 585; 
let yOpRaq = 150;
let velocidadeYOp;

let colidiu = false;

//Velocidade da Bola
let velocidadeXBola = 6;
let velocidadeYBola = 6;

//Placar do Jogo
let meusPontos = 0;
let pontosOponente = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  movBola();
  verfBorda();
  mostRaq(xRaq, yRaq);
  movRaq();
  //verfColRaq();
  verificacolisaoRaquete(xOpRaq,yOpRaq);
  mostRaq(xOpRaq, yOpRaq);
  movOpRaq();
  verificacolisaoRaquete(xRaq,yRaq);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBola(){
  circle(xBola,yBola,dBola)
}

function movBola(){
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
  
}

function verfBorda(){
    if (xBola + raio > width ||
      xBola - raio < 0){
   velocidadeXBola *= -1; 
  }
  if (yBola + raio > height ||
     yBola - raio < 0){
    velocidadeYBola *= -1;
  }
}

function mostRaq(x,y){
  rect(x, y, largRaq, altRaq, bdRaq)
}

function movRaq(){
  if (keyIsDown(87)){
    yRaq -= 10;
  }
  if (keyIsDown(83)){
    yRaq += 10;
  }
}

function movOpRaq(){
    if (keyIsDown(UP_ARROW)){
    yOpRaq -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yOpRaq += 10;
  }
}

function verfColRaq(){
  if (xBola - raio < xRaq + bdRaq && yBola - raio < yRaq + altRaq && yBola + raio > yRaq){
    velocidadeXBola *= -1;
  }
}

function verificacolisaoRaquete(x,y){
    colidiu =
    collideRectCircle(x, y, bdRaq, altRaq, xBola, yBola, raio);
    if (colidiu){
      velocidadeXBola *= -1;
      raquetada.play();
    }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
    fill(color(255, 0, 255))
    rect(150, 10, 40, 20)
   fill(255);
  text(meusPontos, 170, 26);
   fill(color(255, 0, 255))
    rect(450, 10, 40, 20)
   fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBola > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBola + raio < 0){
    console.log('bolinha ficou presa');
    xBola = 300;
    }
}