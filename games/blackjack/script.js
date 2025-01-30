
let header = document.querySelector("header");
let play = document.querySelector("#play");
let main = document.querySelector("main");
let betBar = document.querySelector("#betbar")
let betAccept = document.querySelector("#betaccept")
let hit = document.querySelector("#hit");
let stand = document.querySelector("#stand");
if(localStorage.getItem("money") == null){
    localStorage.setItem("money", "1000")
}
let betMoney = 0;
let deck = [];
let dealer, player, money; 
//---------------------------------------
play.addEventListener("click", function(){
    play.style.setProperty("display","none");
    money = localStorage.getItem("money");
    dealer = [main.querySelector("#dealer"),0,0] // html,value of cards, number of aces
    player = [main.querySelector("#player"),0,0]
    bet();
})
hit.addEventListener("click",function(){
    draw(player)
    if(ifBusted(player)){
        end("l")
    }
})
stand.addEventListener("click",function(){
    dealer[0].querySelector("sect").remove()
    hit.style.setProperty("display","none");
    stand.style.setProperty("display","none");
    standed()
})
betAccept.addEventListener("click",function(){
    let temp = parseInt(betBar.value)
    console.log(temp)
    if(temp <= money && temp > 0){
        betMoney = temp;
        header.style.setProperty("display","none")
        betAccept.style.setProperty("display","none")
        betBar.style.setProperty("display","none")
        game()
    }
    if(money == 0 && temp == -69){
        localStorage.setItem("money", "1000")
    }
})
//---------------------------------------
function game(){
    draw(player);
    draw(player);
    draw(dealer);
    let back = document.createElement("sect");
    back.classList.add("card");
    back.style.setProperty("right","10vw")
    let right = -20
    let anim = setInterval(function(){
        right+=0.5
        back.style.setProperty("top",right+"vw")
        if(right==0){
            clearInterval(anim);
        }
    },20)
    
    dealer[0].appendChild(back)
    setTimeout(function(){
        hit.style.setProperty("display","block");
        stand.style.setProperty("display","block");
    },1000)
}
function standed(){
    draw(dealer)
    while(dealer[1]>21 && dealer[2] > 0){
        dealer[1] -= 10;
        dealer[2] -=1;
    }
    while(player[1]>21 && player[2] > 0){
        player[1] -= 10;
        player[2] -=1;
    }
    console.log(dealer[1],player[1]);
    setTimeout(function(){
        if(dealer[1] >= 17){
            if(ifBusted(dealer)){
                end("w")
            }else{
                if(dealer[1] > player[1]){
                    end("l");
                }
                if(dealer[1] < player[1]){
                    end("w");
                }
                if(dealer[1] == player[1]){
                    end("d");
                }
            }
        }
        else{
            standed()
        }
    },1000)
    
}
function end(wl){
    if(wl=="w"){
        setTimeout(function(){
            alert("WYGRANA")
            localStorage.setItem("money",parseInt(money)+parseInt(betMoney))
        },1000)
    }
    if(wl=="l"){
        setTimeout(function(){
            alert("PRZEGRANA")
            localStorage.setItem("money",money-betMoney)
        },1000)
    }
    if(wl=="d"){
        setTimeout(function(){
            alert("REMIS")
        },1000)
    }
    setTimeout(function(){
        while(dealer[0].querySelectorAll(".card").length>0){
            dealer[0].removeChild(dealer[0].querySelector(".card"));
        }
        while(player[0].querySelectorAll(".card").length>0){
            player[0].removeChild(player[0].querySelector(".card"));
        }
        hit.style.setProperty("display","none");
        stand.style.setProperty("display","none");
        play.style.setProperty("display","block")
        header.style.setProperty("display","block")
        header.innerHTML = "Zagraj ponownie"
    },2000)
    
}
function bet(){
    header.innerHTML = "Obstaw pieniądze<br><span style='font-size:3vw;'>Twoje saldo: "+ money + "</span>"
    betAccept.style.setProperty("display","block");
    betBar.style.setProperty("display","block");
}
function draw(dest){
    let numb, type, cardId;
    do{
    numb = parseInt(Math.random()*13+1)
    type = parseInt(Math.random()*4)
    cardId = type*13 + numb;
    }while(ifCardUsed(cardId))
    deck[deck.length] = cardId
    switch(type){
        case 0: type = "c"
            break;
        case 1: type = "d"
            break;
        case 2: type = "h"
            break;
        case 3: type = "s"
            break;
    }
    let card = document.createElement("div");
    dest[0].appendChild(card)
    card.classList.add("card");
    card.style.setProperty("right",dest[0].querySelectorAll(".card").length*5+"vw")
    card.innerHTML = numb
    spin(card,numb,type);
    updValue(dest,card)
}
function ifBusted(dest){
    let val = dest[1]
    if(val <= 21){
        return false
    }
    if(val > 21){
        if((val-dest[2]*10) < 21){
            return false
        }
        return true
    }
}
function ifCardUsed(id){
    for(let i = 0;i<deck.length;i++){
        if(deck[i] == id){
            return true
        }
    }
    return false;
}
function updValue(dest,card){
        let numb = parseInt(card.innerHTML)
        switch(numb){
            case 1: dest[1] += 11; dest[2]+=1; break
            case 11: case 12: case 13: dest[1] += 10;break;
            default: dest[1] += numb;break;
            
        }
    }
function spin(card,n,t){
    let angle = 0;
    let int = setInterval(
        function(){
            angle+=5;
            card.style.setProperty("transform","rotateY("+ angle+"deg)")
            if(angle==90){
                card.style.setProperty("background-image",`url(cards/${t}${n}.png)`)
                angle = -90
            }
            if(angle==0){
                clearInterval(int)
            }
        }
    ,20)
}
