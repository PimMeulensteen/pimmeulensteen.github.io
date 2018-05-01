function name_div_width() { document.getElementById('container').style.width = (window.innerWidth > window.innerHeight ? window.innerHeight : "100%"); return 1 }
window.onresize = name_div_width;