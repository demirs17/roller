require("readline").emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

var game = {
    width: 10,
    height: 10,
    visitedPlaces: [],
}
var roller = {
    width: 1,
    height: 2,
    pos: 48,// roller ın ana parçasının pozisyon
    tailPos: -1,// roller ın diğer parçasının ana parçaya göre pozisyonu
    horizontal: true,
    vertical: false,
    setAsVertical: () => {
        roller.vertical = true;
        roller.horizontal = false;
    },
    setAsHorizontal: () => {
        roller.vertical = false;
        roller.horizontal = true;
    },
    setTailPosToZero: () => {
        roller.tailPos = 0;
        roller.vertical = false;
        roller.horizontal = false;
    }
};





game.visitedPlaces.push(roller.pos, roller.pos + roller.tailPos);
print();





process.stdin.on("keypress", (char, evt) => {
    if(char === "w"){
        if((roller.pos - roller.pos%game.width) / game.height != 0){
            if(roller.tailPos == 0){
                roller.pos -= game.width;
                roller.tailPos = -1 * game.width;
                roller.setAsVertical();
            }else if(roller.vertical){
                // ihtimaller: 
                //      tail usttedir
                //      tail alttadır
                if(roller.tailPos < 0){ // kuyruk üstte
                    roller.pos -= 2 * game.width;
                }else{ // kuyruk altta
                    roller.pos -= game.width;
                }
                roller.setTailPosToZero();
            }else if(roller.horizontal){
                roller.pos -= game.width;
            }
            game.visitedPlaces.push(roller.pos, roller.pos + roller.tailPos);
            print();
        }
    }else if(char === "a"){
        if(roller.pos%game.width != 0){
            if(roller.tailPos == 0){
                roller.pos -= 2;
                roller.tailPos = 1;
                roller.setAsHorizontal();
            }else if(roller.vertical){
                roller.pos -= 1;
            }else if(roller.horizontal){
                if(roller.tailPos < 0){ // kuyruk solda
                    roller.pos -= 2;
                }else{ // kuyruk sağda
                    roller.pos -= 1;
                }
                roller.setTailPosToZero();
            }
            game.visitedPlaces.push(roller.pos, roller.pos + roller.tailPos);
            print();
        }
    }else if(char === "s"){
        // oyun alanının kenarlarından çıkmasın 
        if((roller.pos - roller.pos%game.width) / game.height != game.height - 1){
            // ihtimaller diktir(tek parça üzerine diğeri gelir tailPos = 0)
            // vertical (|) duruyordur
            // horizontal (-) duruyordur
            if(roller.tailPos == 0){
                roller.pos += game.width;
                roller.tailPos = game.width;
                roller.setAsVertical();
            }else if(roller.vertical){
                // ihtimaller: 
                //      tail usttedir
                //      tail alttadır
                if(roller.tailPos < 0){ // kuyruk üstte
                    roller.pos += game.width;
                }else{ // kuyruk altta
                    roller.pos += 2 * game.width;
                }
                roller.setTailPosToZero();
            }else if(roller.horizontal){
                roller.pos += game.width;
            }
            game.visitedPlaces.push(roller.pos, roller.pos + roller.tailPos);
            print();
        }
    }else if(char === "d"){
        if(roller.pos%game.width != game.width - 1){
            if(roller.tailPos == 0){
                roller.pos += 1;
                roller.tailPos = 1;
                roller.setAsHorizontal();
            }else if(roller.vertical){
                roller.pos += 1;
            }else if(roller.horizontal){
                if(roller.tailPos < 0){ // kuyruk solda
                    roller.pos += 1;
                }else{ // kuyruk sağda
                    roller.pos += 2;
                }
                roller.setTailPosToZero();
            }
            game.visitedPlaces.push(roller.pos, roller.pos + roller.tailPos);
            print();
        }
    }
    if (char === "q") process.exit();
});

function print(){
    console.clear();
    for(var i = 0;i<game.height;i++){
        var row = "";
        for(var j = 0;j<game.width;j++){
            if((roller.pos == i * game.width + j)){
                row += "o ";
            }
            else if(roller.pos + roller.tailPos == i * game.width + j){
                row += "o ";
            }else if(game.visitedPlaces.includes(i * game.width + j)){
                row += "_ ";
            }else{
                row += ". ";
            }
        }
        console.log(row);
    }
}
