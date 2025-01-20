let header = document.querySelector("header");
    let play = document.querySelector("#play");
    let main = document.querySelector("main");
    let betMoney = document.querySelector("#betmoney")
    let hit = document.querySelector("#hit");
    let stand = document.querySelector("#stand");
    if(localStorage.getItem("money") == null){
        localStorage.setItem("money", "1000")
    }
    let money = localStorage.getItem("money");
    let deck = [];
    let dealer = [main.querySelector("#dealer"),0,0] // html,value of cards, number of aces
    let player = [main.querySelector("#player"),0,0]
    //---------------------------------------
    play.addEventListener("click", function(){
        play.style.setProperty("display","none");
        header.innerHTML = ""
        //bet();
        draw(player);
        draw(player);
        draw(dealer);
        game()
    })
    hit.addEventListener("click",function(){
        draw(player)
        if(ifBusted(player)){
            l()
        }
    })
    stand.addEventListener("click",function(){
        dealer[0].querySelector("sect").remove()
        standed()
    })
    //---------------------------------------
    function game(){
        let back = document.createElement("sect");
        back.classList.add("card");
        dealer[0].appendChild(back)
        setTimeout(function(){
            hit.style.setProperty("display","block");
            stand.style.setProperty("display","block");
        },1000)
    }
    function standed(){
        draw(dealer)
        if(dealer[1] < 17 ||  dealer[1]-dealer[2]*10 < 17){
            setTimeout(function(){
                standed()
            },1000)
            
        }
        else{
            if(ifBusted(dealer)){
            w();
            }
            else{
                compare()
            }
        }
    }
    function w(){
        setTimeout(function(){
        alert("WYGRAŁÆŚ")
        },1000)
    }
    function l(){
        setTimeout(function(){
            alert("PRZEGRAŁÆŚ")
        },1000)
    }
    function compare(){
        if(dealer[1]-dealer[2]*10 > player[1]-player[2]*10){
            l();
        }
        else{
            w();
        }
    }
    function bet(){
        header.innerHTML = "Obstaw pieniądze"
        header.style.setProperty("display","block")
        betMoney.style.setProperty("display","block")
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
