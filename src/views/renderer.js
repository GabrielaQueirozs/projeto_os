
/*
Processo de Redenrização
Tela principal
*/
console.log("Processo de renderização")

function cliente(){
   // console.log("Teste botão cliente")
   // usdo do api
   api.clientWindow()
}
function os(){
  //  console.log("Teste botão os")
  api.osWindow()
}

// Troca do ícone do banco de dados (Usando a api do preload.js)
api.dbStatus((event, message)=>{
  // Teste do recebimento da mensagem do main
  console.log(message)
  if(message==="conectado"){
      document.getElementById('statusdb').src="../public/img/dbon.png"
  } else{
      document.getElementById('statusdb').src="../public/img/dboff.png"        
  }
})
