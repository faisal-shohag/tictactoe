var playerOneSymbole = "";
var playerTwoSymbole = "";
var playerOneColor = "";
var playerTwoColor = "";
var lastWon = "";

var playerOneTurns = [];
var playerTwoTurns = [];

var oyshi = ['ঐশী', 'ডাইনি', 'পেতনি', 'পৃথিবীটা', 'হৃদয়টা', 'দুনিয়াটা', 'জানটা', 'প্রাণটা'];


$('.rstbtn').click(function(){
  playerOneTurns=[];
  playerTwoTurns=[];
  db.ref('playerWonShow').update({won: 0});
  Swal.fire({
    title: 'এই তুমি শিওর, রিসেট করতে চাও?',
    confirmButtonText: 'তো?',
    cancelButtonText: 'না তো!',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
    icon: 'warning'
  }).then((result) => {
    if (result.isConfirmed) {
      for(let i=0; i<9; i++){
        db.ref('mIndex/'+i).update({s: ""});
      }
      

      Swal.fire(
        'হুম...',
        'রিসেট হয়া গেসে!',
        'success'
      )
    }
  });
})

db.ref('playerWon').on('value', lw=>{
 lastWon = lw.val().won;
})

db.ref('playerWonShow').on('value', pw=>{
  playerOneTurns=[];
  playerOneTurns=[];
  let rn =  Math.floor(Math.random() * 8)
  if(pw.val().won === 1){
    setTimeout(function(){
      db.ref('playerWonShow').update({won: 0});
      Swal.fire({
        title: `${oyshi[rn]} জিতসে!`,
        confirmButtonText: 'Okk!'
      }).then((result) => {
        if (result.isConfirmed) {
          //gameReset();
        }
      });
     }, 1000);
  }

  if(pw.val().won === 2){
    setTimeout(function(){
      db.ref('playerWonShow').update({won: 0});
      Swal.fire({
        title: 'ফয়সাল জিতসে!',
        confirmButtonText: 'Okk!'
      }).then((result) => {
        if (result.isConfirmed) {

        }
      })
     }, 1000);
  }

  if(pw.val().won === 3){
    setTimeout(function(){
      db.ref('playerWonShow').update({won: 0});
      Swal.fire({
        title: 'তুমিও হারসো আমিও হারসি!',
        confirmButtonText: 'Okk!',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {

        }
      })
     }, 1000);
  }
})



db.ref('mIndex').on('value',mi=>{
  iarr = mi.val();
  for(let i=0; i<iarr.length; i++){
     $('#'+i).html(`<span>${iarr[i].s}</span>`)
  }
})

db.ref('playerSymbole').on('value', ps=> {
   playerOneSymbole = ps.val().one;
   playerTwoSymbole = ps.val().two;
   playerOneColor = ps.val().clOne;
   playerTwoColor = ps.val().clTwo;
});


db.ref('playerWon').on('value', pw=> {
 let rn =  Math.floor(Math.random() * 8);
 $('.who').html(`<div class="animate__animated animate__backInDown"><span who class="pname">${oyshi[rn]}</span> তোমার চাল!</div>`);
  if(pw.val().won === 2) $('.who').html(`<div class="animate__animated animate__backInDown"><span class="pname who animate__animated animate__backInRight">ফয়সালের</span> চাল!</div>`);
});


db.ref('tictac').on('value', snap=>{
var gameData = snap.val();
  if(gameData.permission.one === 1 && gameData.permission.two === 1){
    playGame();
}




function playGame(){
console.log("Game Started!");
whosTurn();
function whosTurn(){
  db.ref('whosTurn').on('value', wt=>{
    let rn =  Math.floor(Math.random() * 8)
    if(wt.val().state===1){ 
      $('.who').html(`<div class="animate__animated animate__backInDown"><span who class="pname">${oyshi[rn]}</span> তোমার চাল!</div>`);
      playerOneTurn();
    }
    if(wt.val().state===2){ 
      $('.who').html(`<div class="animate__animated animate__backInDown"><span who class="pname animate__animated animate__backInRight">ফয়সালের</span> চাল!</div>`);
      playerTwoTurn();
    }
  });

}



 function playerOneTurn(){
    $('.slc').off().click(function(){
      let indx = $(this)[0].id;
      playerOneTurns.push(parseInt(indx));
      db.ref('mIndex/'+indx).update({s: playerOneSymbole});
         db.ref('whosTurn').update({state: 2});
         winner(1, playerOneTurns);
         whosTurn();
    })
  }


 function  playerTwoTurn(){
    $('.slc').off().click(function(){
      let indx = $(this)[0].id;
      db.ref('mIndex/'+indx).update({s: playerTwoSymbole});
      playerTwoTurns.push(parseInt(indx));
         db.ref('whosTurn').update({state: 1});
         winner(2, playerTwoTurns);
         whosTurn();
    });

  }

/*
        ///WINNING COMBINATIONS

               0 1 2
               3 4 5
               6 7 8
               0 3 6
               1 4 7
               2 5 8
               2 4 6
               0 4 8
               2 4 6

*/

function winner(p, t1){
  if(t1.includes(0) && t1.includes(1) && t1.includes(2)){
  $('#0 span').addClass('w');
  $('#1 span').addClass('w');
  $('#2 span').addClass('w');

  }
  if(t1.includes(3) && t1.includes(4) && t1.includes(5)){
    $('#3 span').addClass('w');
    $('#4 span').addClass('w');
    $('#5 span').addClass('w');
  }
  if(t1.includes(6) && t1.includes(7) && t1.includes(8)){
    $('#6 span').addClass('w');
  $('#7 span').addClass('w');
  $('#8 span').addClass('w');
  }
  if(t1.includes(0) && t1.includes(3) && t1.includes(6)){
    $('#0 span').addClass('w');
    $('#3 span').addClass('w');
    $('#6 span').addClass('w');
  }
  if(t1.includes(1) && t1.includes(4) && t1.includes(7)){
    $('#1 span').addClass('w');
  $('#4 span').addClass('w');
  $('#7 span').addClass('w');
  }
  if(t1.includes(2) && t1.includes(5) && t1.includes(8)){
    $('#2 span').addClass('w');
    $('#5 span').addClass('w');
    $('#8 span').addClass('w');
  }
  if(t1.includes(2) && t1.includes(4) && t1.includes(6)){
    $('#2 span').addClass('w');
  $('#4 span').addClass('w');
  $('#6 span').addClass('w');
  }
  if(t1.includes(0) && t1.includes(4) && t1.includes(8)){
    $('#0 span').addClass('w');
  $('#4 span').addClass('w');
  $('#8 span').addClass('w');
  }


  if(
    (t1.includes(0) && t1.includes(1) && t1.includes(2)) ||
    (t1.includes(3) && t1.includes(4) && t1.includes(5)) ||
    (t1.includes(6) && t1.includes(7) && t1.includes(8)) ||
    (t1.includes(0) && t1.includes(3) && t1.includes(6)) ||
    (t1.includes(1) && t1.includes(4) && t1.includes(7)) ||
    (t1.includes(2) && t1.includes(5) && t1.includes(8)) ||
    (t1.includes(2) && t1.includes(4) && t1.includes(6)) ||
    (t1.includes(0) && t1.includes(4) && t1.includes(8))
  ){
     
    if(p===1){
      db.ref('playerWon').update({won: 1});
      db.ref('playerWonShow').update({won: 1});
      db.ref('whosTurn').update({state: 1});
      setTimeout(function(){gameReset();}, 2000);
    }else if(p===2){
      db.ref('playerWon').update({won: 2});
      db.ref('playerWonShow').update({won: 2});
      db.ref('whosTurn').update({state: 2});
      setTimeout(function(){gameReset();}, 2000);
    }


  }
    if(playerOneTurns.length===5 || playerTwoTurn.length===5){
      db.ref('playerWon').update({won: lastWon});
      db.ref('playerWonShow').update({won: 3});
      setTimeout(function(){gameReset();}, 2000);
    }

  //console.log(t1);



}

function gameReset(){
  playerOneTurns=[];
  playerTwoTurns=[];
  $('.slc span').removeClass('w');
  $('.slc span').html('');
  playGame();

  for(let i=0; i<9; i++){
    db.ref('mIndex/'+i).update({s: ""});
  }
}
}
});





