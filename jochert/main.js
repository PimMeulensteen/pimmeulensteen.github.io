function read() {
    if(index == max) {
        index = 0
    }
    charToRead = pi.charAt(index)

    if(charToRead == "."){
        audio[10].play();
    }else {
        number = charToRead * 1;
        audio[number].play();
    }
    main_el.innerHTML = pi.slice(0,index) + "<span id='hl'>" + pi.charAt(index) + "</span>" + pi.slice(index+1,-1) 
    main_el.style.left = -(24) * (index - 4)+ "px"
    index++;
}


let audio = []
for (let x = 0; x < 10; x++) {
    audio.push(new Audio("audio/" + x + ".mp3"))
}
audio.push(new Audio("audio/coma.mp3"))


let max = pi.length;
const main_el = document.getElementsByTagName("main")[0];
let index = 0
setInterval(read, 600)