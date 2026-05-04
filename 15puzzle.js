document.addEventListener("DOMContentLoaded",function(){
    let canvas = document.querySelector("#canvas");
    canvas.width = window.innerHeight
    canvas.height = window.innerHeight
    let c = canvas.getContext("2d");
    let diagonal = 4
    let board = []
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
    let img = new Image()
    img.onload = function(){
        let proby = 1000
        generate();
        for(let i = 0;i<1000;i++)
        move({offsetX:canvas.width*Math.random(),offsetY:canvas.height*Math.random()})
        while(board[diagonal-1][diagonal-1] != 0){
            move({offsetX:canvas.width*Math.random(),offsetY:canvas.height*Math.random()})
            proby++
        }
    }
    img.src = "antoni_programista.png"
    canvas.addEventListener("click",(x)=>{
        move(event)
    })
    function generate(){
        c.clearRect(0,0,canvas.width,canvas.height)
        for(let i = 0;i<diagonal;i++){
        for(let j = 0;j<diagonal;j++){
            if(board[i][j] != 0){
                let xy = {x:(board[i][j]-1)%diagonal,y:parseInt((board[i][j]-1)/diagonal)}
                c.drawImage(img,xy.x*img.width/diagonal,xy.y*img.height/diagonal,img.width/diagonal,img.height/diagonal,j*canvas.height*1/diagonal,i*canvas.height*1/diagonal,canvas.height*1/diagonal,canvas.height*1/diagonal)
                c.font = "20px Arial";
                c.fillText(board[i][j],(j+0.5)*canvas.height*1/diagonal,(i+0.5)*canvas.height*1/diagonal);
            }
        }
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
            generate()
        }
    }
})
