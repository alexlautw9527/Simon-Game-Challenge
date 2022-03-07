const colorMap = {
    0: "green",
    1:"red",
    2:"yellow",
    3:"blue"
 }



let clickSeq = []
let gameSeq = []
let gameState = 'ready'

GoNextSeq = function(){
    clickSeq = []
    let newColor = colorMap[Math.floor(Math.random()*4)]
    let newColorID = "#" + newColor

    playSound(newColor)

    $(newColorID).fadeOut(200).fadeIn(200)
    gameSeq.push(newColor)
    $("#level-title").text("Level "+ gameSeq.length)
    /*
    for(let i=0; i<gameSeq.length; i++){
        let ColorID = "#" + gameSeq[i]
        setTimeout(function(){$(ColorID).fadeOut(100).fadeIn(100)}, 500)
    }
    */
}

playSound = function(color){
    let sound = new Audio("sounds/" +color+".mp3");
    sound.play();
}

newStart = function(){
    clickSeq = []
    gameSeq= []
}

checkSeq = function(){
    if (JSON.stringify(clickSeq) != JSON.stringify(gameSeq.slice(0,clickSeq.length))){
        gameState = 'ready'
        console.log('wrong, press any key to start')
        $("body").addClass("game-over")
        setTimeout(function(){$("body").removeClass("game-over")}, 200)
        playSound('wrong')
        $("#level-title").text("Game over, press a key to restart'")
        newStart()
    } 
    else if(JSON.stringify(clickSeq)===JSON.stringify(gameSeq)){
        console.log('good, next')
        setTimeout(GoNextSeq, 500)
        console.log(gameSeq)
    } 
    else {
        console.log('keep')
    }
}


$(document).keypress(
    function(){
        if(gameState==='ready'){
            gameState='start'
            newStart()
            setTimeout(GoNextSeq, 200)
            console.log(gameSeq)
        }    
    }
    
)

$(".btn").click( 
    function() {      
        let clickValue = $(this).attr('id')
        let ele = $(this)      
        playSound(clickValue)

        if(gameState==='start'){
            ele.addClass("pressed")
            setTimeout(function(){ele.removeClass("pressed")}, 200)
            
            clickSeq.push(clickValue)
            console.log(clickSeq)  
            checkSeq()

        }
    }
)


