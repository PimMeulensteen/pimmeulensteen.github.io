function load() {
    var obj = JSON.parse(items);

    var head = document.getElementsByTagName("main")[0];


    var l = obj.items.length;


    for (i = 0; i < l; i++) {
        var id = obj.items[i].id;
        var desc = obj.items[i].desc_short;

        var article = document.createElement("article");

        var im = document.createElement("img");
        im.setAttribute("src", "/media/" + id + "." + obj.items[i].format);
        im.setAttribute("alt", desc);
        im.classList = "front";

        var h2 = document.createElement("h2");
        h2.innerHTML = obj.items[i].title;

        var d = document.createElement("p");
        d.innerHTML = obj.items[i].created;
        d.classList = "date";

        var p = document.createElement("p");
        p.innerHTML = desc;

        var b = document.createElement("section");
        b.classList = "back"
        b.appendChild(h2);
        b.appendChild(d);
        b.appendChild(p);
        b.setAttribute("onclick", "location.href='/" + id + "/'");
        article.appendChild(im);
        article.appendChild(b);
        head.appendChild(article);
    }
}
load()