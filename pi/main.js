function read() {
    if(index == max) {
        index = 0
    }
    main_el.innerHTML ="<span id='one_char'>3</span>"+ pi.slice(0,index) + "<span id='focus'>" + pi.charAt(index) + "</span>" + pi.slice(index+1,-1) 
    one_char_width = document.getElementById("one_char").offsetWidth;
    main_el.style.left = -(one_char_width) * (index - 4)+ "px"
    charToRead = pi.charAt(index)

    if(charToRead == "."){
        audio[10].play();
    }else {
        number = charToRead * 1;
        audio[number].play();
    }

    index++;
}

let audio = []
for (let x = 0; x < 10; x++) {
    audio.push(new Audio("audio/" + x + ".mp3"))
}
audio.push(new Audio("audio/coma.mp3"))


let max = pi.length;
let one_char_width;
const main_el = document.getElementsByTagName("main")[0];
let index = 0
setInterval(read, 600)