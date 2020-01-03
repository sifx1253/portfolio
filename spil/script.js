let point;
let liv;
let gameTimer;
let erSpilletStoppet = false;
let myRan;

window.addEventListener("load", sidenVises);


function sidenVises() {
    console.log("sidenVises");
    //startskærm vises
    document.querySelector("#start_screen").classList.remove("hide");
    document.querySelector("#rules").classList.add("hide");
    //startknap klikbar
    document.querySelector("#play_knap").addEventListener("click", rules);
}

function rules() {
    document.querySelector("#rules").classList.remove("hide");

    document.querySelector("#rules_play").addEventListener("click", startSpil);
}

function startSpil() {
    console.log("startSpil");
    //gemmer startskærm igen
    //sætter den boolean variabel til false (spillet er ikke slut)
    erSpilletStoppet = false;
    // Resetter timeren så tiden starter forfra
    clearTimeout(gameTimer);
    document.querySelector("#tid_sprite").classList.add("shrink");
    document.querySelector("#tid_sprite").addEventListener("animationend", checkStatus);


    document.querySelector("#start_screen").style.display = "none";
    document.querySelector("#game_over").style.display = "none";
    document.querySelector("#level_complete").style.display = "none";
    //nulstil point og liv
    point = 0;


    document.querySelector("#liv1").classList.remove("hide");
    document.querySelector("#liv2").classList.remove("hide");
    document.querySelector("#liv3").classList.remove("hide");
    liv = 3;
    document.querySelector("#score").textContent = "Point " + point;
    //billederne vises på telefonerne
    document.querySelector("#hand1").classList.add("fade_in", "vennebillede1");
    document.querySelector("#hand1").classList.add("vennebillede");


    document.querySelector("#hand2").classList.add("fade_in", "nakedbillede1");
    document.querySelector("#hand2").classList.add("nakedbillede");


    document.querySelector("#hand3").classList.add("fade_in", "nakedbillede6");
    document.querySelector("#hand3").classList.add("nakedbillede");


    document.querySelector("#hand4").classList.add("fade_in", "vennebillede4");
    document.querySelector("#hand4").classList.add("vennebillede");

    document.querySelector("#hand5").classList.add("fade_in", "vennebillede3");
    document.querySelector("#hand5").classList.add("vennebillede");

    document.querySelector("#hand1").addEventListener("click", hand);
    document.querySelector("#hand2").addEventListener("click", hand);
    document.querySelector("#hand3").addEventListener("click", hand);
    document.querySelector("#hand4").addEventListener("click", hand);
    document.querySelector("#hand5").addEventListener("click", hand);

    document.querySelector("#hand1").addEventListener("animationend", genstartHand);
    document.querySelector("#hand2").addEventListener("animationend", genstartHand);
    document.querySelector("#hand3").addEventListener("animationend", genstartHand);
    document.querySelector("#hand4").addEventListener("animationend", genstartHand);
    document.querySelector("#hand5").addEventListener("animationend", genstartHand);


}

function hand() {
    console.log("hand");
    this.classList.remove("fade_in");
    this.offsetHeight;
    this.classList.add("disappear");
    //billede fader ind og ud
    if (this.classList.contains("vennebillede")) {
        loseLife();
        console.log('nyloseLife');
    } else {
        getPoint();
        console.log('nygetPoint');
    }
    this.addEventListener("animationend", genstartHand);

    //this.classList = "";

}

function getPoint() {
    console.log("getPoint");
    //lyd
    if (Math.random() < 0.5) {
        //Spil den ene lyd
        document.querySelector("#goodClick1").play();
    } else {
        document.querySelector("#goodClick2").play();
    }
    //    document.querySelector("#goodClick1").play();
    //giver point
    point++;
    console.log("point:" + point);
    //Vis samlet antal point
    document.querySelector("#score").textContent = "Point " + point
    //Gå til gendtartHand
    this.addEventListener("animationend", genstartHand);


}

function loseLife() {
    console.log("loseLife");
    //mister liv
    document.querySelector("#liv" + liv).classList.add("hide");
    liv--;
    if (liv == 0) {
        gameOver();
    }
    //lyd
    if (Math.random() < 0.5) {
        //Spil den ene lyd
        document.querySelector("#badClick1").play();
    } else {
        document.querySelector("#badClick2").play();
    }
}

function genstartHand() {
    console.log("genstartHand");

    this.classList = "";
    //this.classList.remove("disappear");
    //genstart animationer med random billeder
    myRan = Math.floor(Math.random() * 10) + 1;
    //this.classList = "nøgenbillede" + myRan;
    this.offsetLeft;
    this.classList.add("fade_in");

    if (Math.random() < 0.5) {
        //vennebilleder


        this.classList.add("vennebillede");
        this.classList.add("vennebillede" + myRan);

        // tilføj vennebillede(unden nr)


    } else {
        //nakedbilleder

        this.classList.add("nakedbillede");
        this.classList.add("nakedbillede" + myRan);
    }
}

function checkStatus() {
    console.log("checkStatus")
    //if/else status
    if (erSpilletStoppet == false) {
        if (point >= 10) {
            levelComplete();
        } else {
            gameOver();
        }
    }
    //Sluk alle eventlistnere
}

function levelComplete() {
    console.log("levelComplete")
    //Levelcomplete skærm vises
    document.querySelector("#level_complete").style.display = "inLine";
    document.querySelector("#level_complete").classList.remove("hide");
    document.querySelector("#tid_sprite").classList.remove("shrink");
    document.querySelector("#tid_sprite").removeEventListener("animationend", checkStatus);
    erSpilletStoppet = true;
    //lyd
    document.querySelector("#godStil").play();
    document.querySelector("#replay2").addEventListener("click", startSpil);

}

function gameOver() {
    console.log("gameOver")
    //gameover skærm vises
    document.querySelector("#game_over").style.display = "inLine";
    document.querySelector("#game_over").classList.remove("hide");


    document.querySelector("#tid_sprite").classList.remove("shrink");
    document.querySelector("#tid_sprite").removeEventListener("animationend", checkStatus);
    erSpilletStoppet = true;
    //lyd
    document.querySelector("#daarligStil").play();
    document.querySelector("#replay1").addEventListener("click", startSpil);
}
