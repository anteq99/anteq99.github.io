document.addEventListener("DOMContentLoaded",function(){
    let canvas = document.querySelector("#canvas");
    canvas.width = window.innerHeight
    canvas.height = window.innerHeight
    let c = canvas.getContext("2d");
    c.font = "100pt Arial"
    c.fillText("ŁADOWANIE",0,(canvas.height)/2,canvas.width);
    let diagonal = 3
    let board = []
    if(localStorage.getItem("15puzzle") == null) newgame()
    else {  
        diagonal = localStorage.getItem("15puzzle").split("|").length
        localStorage.getItem("15puzzle").split("|").forEach(el=>{
            let temp = []
            el.split(";").forEach(e=>{
                 temp.push(parseInt(e))
            })
            board.push(temp)
        })
    }
    let img = new Image()
    img.onload = function(){
        document.querySelector("#loading").remove()
        generate()
    }
    img.src = "antoni_programista.png"
    canvas.addEventListener("click",(x)=>{
        move(event)
        generate()
        if(wincheck()){
            setTimeout(() => {
                alert("WYGRANA")
                newgame()
                generate()
            }, 500);
        }
    })
    function newgame(){
        diagonal++
        for(let i = 0;i<diagonal;i++){
        let temp = []
        for(let j = 0;j<diagonal;j++){
            if(i != diagonal-1 || j!= diagonal-1){
                let numb = i*diagonal+j+1
                temp.push(numb)
            }
            else{
                temp.push(0)
            }
        }
        board.push(temp)
        }
        for(let i = 0;i<Math.pow(diagonal,4);i++)
        move({offsetX:canvas.width*Math.random(),offsetY:canvas.height*Math.random()})
        do{
            move({offsetX:canvas.width*Math.random(),offsetY:canvas.height*Math.random()})
        }while(board[diagonal-1][diagonal-1] != 0)
    }
    function generate(){
        let temp = ""
        c.clearRect(0,0,canvas.width,canvas.height)
        for(let i = 0;i<diagonal;i++){
        for(let j = 0;j<diagonal;j++){
            if(board[i][j] != 0){
                let xy = {x:(board[i][j]-1)%diagonal,y:parseInt((board[i][j]-1)/diagonal)}
                c.drawImage(img,xy.x*img.width/diagonal,xy.y*img.height/diagonal,img.width/diagonal,img.height/diagonal,j*canvas.height*1/diagonal,i*canvas.height*1/diagonal,canvas.width*1/diagonal,canvas.height*1/diagonal)
                c.font = `${canvas.height*0.25/diagonal}pt Arial`;
                c.strokeStyle = "White"
                c.strokeText(board[i][j],(j+0.25)*canvas.height*1/diagonal,canvas.height*1/diagonal*(i+0.625),canvas.width*0.5/diagonal);
                c.fillText(board[i][j],(j+0.25)*canvas.height*1/diagonal,canvas.height*1/diagonal*(i+0.625),canvas.width*0.5/diagonal);
                temp+=board[i][j]
            }
            else{
                temp+="0"
            }
            if(j!= diagonal-1) temp+=";"
        }
        if(i!= diagonal-1) temp+="|"
        localStorage.setItem("15puzzle",temp)
    }
    }
    function move(x){
        let xy = {x:parseInt(x.offsetX/canvas.width*diagonal),y:parseInt(x.offsetY/canvas.height*diagonal)}
        let move = false
        for(let i = 0;i<diagonal;i++){
            if(board[xy.y][i] == 0 && i != xy.x) {
                move = `x${i-xy.x}` 
            }
            if(board[i][xy.x] == 0 && i != xy.y){
                move = `y${i-xy.y}` 
            }
        }
        if(move){
            if(parseInt(move.substring(1)) > 0){
                for(let i = Math.abs(move.substring(1)-1);i>=0;i--){
                    if(move[0] == "x"){
                        board[xy.y][xy.x+i+1] = board[xy.y][xy.x+i]
                        board[xy.y][xy.x+i] = 0
                    }
                    if(move[0]=="y"){
                        board[xy.y+i+1][xy.x] = board[xy.y+i][xy.x]
                        board[xy.y+i][xy.x] = 0
                    }
                }
            }
            else{
                for(let i = parseInt(move.substring(1))+1;i<=0;i++){
                    if(move[0] == "x"){
                        board[xy.y][xy.x+i-1] = board[xy.y][xy.x+i]
                        board[xy.y][xy.x+i] = 0
                    } 
                    if(move[0] == "y"){
                        board[xy.y+i-1][xy.x] = board[xy.y+i][xy.x]
                        board[xy.y+i][xy.x] = 0
                    } 
                }
            }
        }
    }
    function wincheck(){
        if(board[diagonal-1][diagonal-1] != 0) return false
        let win = true
        for(let i = 0;i<board.length;i++){
            for(let j = 0;j<board.length;j++){
                if(board[i][j] != diagonal*i+j+1 && board[i][j]!=board[diagonal-1][diagonal-1]) win = false
                console.log(win)
            }
            
        }
        return win
    }
})
