// elements to create
let main = document.querySelector("main");
let bg = document.createElement("div");bg.classList.add("bg");
let warning = document.createElement("div");warning.id = "warning";
let static = document.createElement("div");static.id = "static";
let cmrglitch = document.createElement("div");cmrglitch.id = "cmrglitch";
let glitchbar = document.createElement("div");glitchbar.id = "glitchbar";
let menu = document.createElement("div");menu.id = "menu";
let menuTitle = document.createElement("div");menuTitle.id = "menutitle";menu.appendChild(menuTitle);
let stars = document.createElement("div");stars.id = "stars";menu.appendChild(stars);
let modes = document.createElement("section");modes.id = "modes";menu.appendChild(modes);
let newgame = document.createElement("div");newgame.id = "newgame";modes.appendChild(newgame);
let contgame = document.createElement("div");contgame.id = "continue";modes.appendChild(contgame);
let sixnight = document.createElement("div"); sixnight.id = "sixnight";
let cnight = document.createElement("div"); cnight.id = "cnight";
let pointer = document.createElement("sectiom"); pointer.id = "pointer";newgame.appendChild(pointer);
let cnightmenu = document.createElement("div");cnightmenu.id = "cnightmenu";
//created elements
let fnaf1but = document.querySelector("button");
// sounds
let audioParent = document.querySelector("#audio")
let menuTheme = document.querySelector("#menutheme");
let blip = document.querySelector("#blip");
let staticSound = document.querySelector("#staticsound");
// variables
if(localStorage.getItem("night") == null){
    localStorage.setItem("night","1");
}
let curnight = /*localStorage.getItem("night")*/ 7;
fnaf1but.addEventListener("click",function(){
    document.body.requestFullscreen();
    fnaf1but.remove();
    warning.id = "warning";
    main.appendChild(warning);
})
warning.addEventListener("animationend",function(){
    warning.remove();
    setTimeout(() => {
        mainmenu();
        warning.removeEventListener("animationend",function(){});
    }, 2000);
})
function mainmenu(){
    sounds(menuTheme,1);
    sounds(staticSound,1);
    if(curnight>=5){
        stars.style.setProperty("width",(70*(curnight-5))+"px");
        modes.appendChild(sixnight);
        if(curnight>6){
            modes.appendChild(cnight);
        }
    }
    main.appendChild(bg);
    main.appendChild(static);
    main.appendChild(cmrglitch);
    main.appendChild(glitchbar);
    main.appendChild(menu);
    bg.style.setProperty("background-image","url(graphics/menu/1.png)");
    static.style.setProperty("opacity","50%");
    cmrglitch.style.setProperty("opacity","20%");
    freddyAnim();
    menuhover();
    cmrglitches();
}
function freddyAnim(){
    let ifmenu = document.querySelector("#menu");
    if(ifmenu){
        let rand = parseInt(Math.random()*2);
        if(rand){
            bg.style.setProperty("background-image","url(graphics/menu/2.png)");
            setTimeout(() =>{
                bg.style.setProperty("background-image","url(graphics/menu/1.png)");
            },100)
        }
        else{
            bg.style.setProperty("background-image","url(graphics/menu/3a.png)");
            setTimeout(() =>{
                bg.style.setProperty("background-image","url(graphics/menu/3b.png)");
            },50)
            setTimeout(() =>{
                bg.style.setProperty("background-image","url(graphics/menu/1.png)");
            },100)
        }
        setTimeout(() =>{
            freddyAnim();
        },parseInt(Math.random()*2000+1000))
    } 
}
function menuhover(){
    let arr = modes.querySelectorAll("div");
    let nght = document.createElement("section");nght.id = "continuen";
    let numb = document.createElement("section");numb.id = "continuenumb";
    for(let i = 0;i<arr.length;i++){
        arr[i].addEventListener("mouseenter",function(){
            if(pointer.parentElement != arr[i]){
                sounds(blip,1);
                arr[i].appendChild(pointer);
            }
            if(i == 1){
                arr[1].appendChild(nght);
                arr[1].appendChild(numb);
                if(curnight < 5){
                    numb.style.setProperty("background-image",`url(graphics/numb/${curnight}.png)`);
                }
                else{
                    numb.style.setProperty("background-image",`url(graphics/numb/5.png)`);
                }
            }
            else{
                if(arr[1].querySelector("#continuen")){
                arr[1].removeChild(nght);
                arr[1].removeChild(numb);
                }
            }
        });
    }
    for(let i = 0;i<arr.length;i++){
    arr[i].addEventListener("click",function(){
            console.log(arr);
            start(i);
        });
    }
}
function cmrglitches(){
    let ifmenu = document.querySelector("#menu")
    if(ifmenu){
        let glitch = parseInt(Math.random()*2);
        let temp = parseInt(Math.random()*3);
        if(!glitch){
            cmrglitch.style.setProperty("background-image",`url(graphics/cmrglitch/${parseInt(Math.random()*11+1)}.png`);
        }
        else{
            cmrglitch.style.setProperty("background-image",`none`);
        }
        bg.style.setProperty("opacity",parseInt(Math.random()*51+50)+"%");
        static.style.setProperty("opacity",parseInt(Math.random()*30+40)+"%");
        setTimeout(() =>{
            cmrglitches();
        },200)
    }
}
function sounds(sound,play){
    if(play){
        sound.load();
        sound.play();
    }else
    sound.pause();
}
function start(type){
    let nightplayed;
    if(type){
    menu.remove();
    glitchbar.remove();
    bg.style.setProperty("background-image","none");
    static.style.setProperty("opacity","0%");
    cmrglitch.style.setProperty("background-image","none");
    }
    switch(type){
        case 0:
            nightplayed = 1;
            let newspapper = document.createElement("div");newspapper.classList.add("bg");
            main.appendChild(newspapper);
            newspapper.style.setProperty("background-image","url(graphics/start/helpwanted.png)");
            newspapper.style.setProperty("animation","appear 15s cubic-bezier(0.5,1,1,1)");
            setTimeout(() => {
                menu.remove();
                glitchbar.remove();
                bg.style.setProperty("background-image","none");
                static.style.setProperty("opacity","0%");
                cmrglitch.style.setProperty("background-image","none");
            }, 5000);
            newspapper.addEventListener("animationend",function(){
                newspapper.remove();
                game(0,0,0,0,1);
            })
            break;
        case 1:
            if(curnight<5){
                nightplayed = curnight;
                switch(nightplayed){
                    case 2: game(0,3,1,1,2);break;
                    case 3: game(1,0,5,2,3);break;
                    case 4: game(parseInt(Math.random()*2+1),2,4,6,4);break;
                }
            }
            else{
                nightplayed = 5;
                game(3,5,7,5,5);
            }
            break;
        case 2:
            nightplayed = 6;
            game(4,10,12,16,6)
            break;
        case 3:
            nightplayed = 7;
            main.appendChild(cnightmenu);
            cnmenu()
            
    }
    function cnmenu(){
        cnightmenu.appendChild(document.createElement("div"));
        let cnoptions = document.createElement("div");
        let buttons = [];
        let numbers = [];
        let ailevel = [0,0,0,0];
        for(let i = 0;i<4;i++){
            let temp = cnoptions.appendChild(document.createElement("section"));
            temp.style.setProperty("display","flex")
            for(let i = 0;i<4;i++){
                let tempdiv = document.createElement("div");
                temp.appendChild(tempdiv);
                switch(temp.childElementCount){
                    case 1: buttons.push([tempdiv,"left"]);
                    tempdiv.classList.add("cnarrow");
                    tempdiv.style.setProperty("background-image","url(graphics/start/arleft.png)");break;
                    case 2: numbers.push(tempdiv);
                    tempdiv.classList.add("cnnumb");break;
                    case 3: numbers.push(tempdiv);
                    tempdiv.classList.add("cnnumb");
                    tempdiv.style.setProperty("background-image","url(graphics/numb/0.png)");break;
                    case 4: buttons.push([tempdiv,"right"]);
                    tempdiv.classList.add("cnarrow");
                    tempdiv.style.setProperty("background-image","url(graphics/start/arright.png)");break;
                }
            }

        }
        for(let i = 0;i<buttons.length;i++){
            buttons[i][0].addEventListener("click",function(){
                let temp = parseInt(i/2); //current animatronic
                switch(buttons[i][1]){
                    case "left": if(ailevel[temp] > 0){
                        console.log(ailevel[temp]);
                        ailevel[temp] -= 1;
                    }break;
                    case "right": if(ailevel[temp] < 20){
                        ailevel[temp] += 1;
                    }
                }

                let curnumb = ailevel[temp];
                console.log(curnumb);
                numbers[temp*2+1].style.setProperty("background-image",`url(graphics/numb/${curnumb%10}.png)`);
                if(curnumb-curnumb%10 == 0){
                    numbers[temp*2].style.setProperty("background-image",`none`);
                }
                else{
                    numbers[temp*2].style.setProperty("background-image",`url(graphics/numb/${(curnumb-curnumb%10)/10}.png)`);
                }
            })
        }
        cnightmenu.appendChild(cnoptions);
let bottom = document.createElement("div");
bottom.appendChild(document.createElement("div"));
let ready = document.createElement("div");ready.id="cnready";
bottom.appendChild(ready);
cnightmenu.appendChild(bottom);
ready.addEventListener("click",function(){
    cnightmenu.remove();
    game(ailevel[0],ailevel[1],ailevel[2],ailevel[3],7)
})
    }
    function game(freddy,bonnie,chica,foxy,n){
        sounds(menuTheme,0);
        sounds(staticSound,0);
        sounds(blip,1);
        cmrglitch.style.setProperty("opacity","100%");
        let temp = 5;
        let interval = setInterval(function(){
            if(temp){
                cmrglitch.style.setProperty("background-image",`url(graphics/cmrglitch/${parseInt(Math.random()*10+6)}.png`);
                temp--;
            }
            else{
                cmrglitch.style.setProperty("background-image",`none`);
                clearInterval(interval);
            }
        },20)
        let nightshow = document.createElement("div");nightshow.id = "nightshow";main.appendChild(nightshow);
        nightshow.style.setProperty("background-image",`url(graphics/start/n${n}.png)`);
        setTimeout(function(){
            nightshow.remove();
            let office = document.createElement("div");office.id="office";main.appendChild(office);
            let officel = document.createElement("div");officel.id="officel";office.appendChild(officel);
            let officem = document.createElement("div");officem.id="officem";office.appendChild(officem);
            let officer = document.createElement("div");officer.id="officer";office.appendChild(officer);
            let lookl = document.createElement("div");lookl.classList.add("look");main.appendChild(lookl);lookl.style.setProperty("left","0px");
            let lookr = document.createElement("div");lookr.classList.add("look");main.appendChild(lookr);lookr.style.setProperty("right","0px");
            let wdth = parseInt(window.getComputedStyle(office).getPropertyValue("right"));
            console.log(wdth);
            lookr.addEventListener("mouseenter",function(){
                let x = parseInt(window.getComputedStyle(office).getPropertyValue("left"));
                let interval = setInterval(function(){
                    if(x-10 > wdth){
                    x-=10;
                    office.style.setProperty("left",`${x}px`);
                    console.log(x);
                }
                lookr.addEventListener("mouseleave",function(){
                    clearInterval(interval);
                })
                },20)
                

            })
            lookl.addEventListener("mouseenter",function(){
                let x = parseInt(window.getComputedStyle(office).getPropertyValue("left"));
                let interval = setInterval(function(){
                    if(x+10 < 0){
                    x+=10;
                    office.style.setProperty("left",`${x}px`);
                    console.log(x);
                }
                lookl.addEventListener("mouseleave",function(){
                    clearInterval(interval);
                })
                },20)
                

            })
        },3000)
    }
    
}
