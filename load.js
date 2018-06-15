let obj = JSON.parse(items);

let head = document.getElementsByTagName("main")[0];


let l = obj.items.length;

for (i = 0; i < 10; i++) {
    console.log(i);
    
    id = obj.items[i].id;
    name = obj.items[i].title;
    date = obj.items[i].created;
    desc = obj.items[i].desc_short;

    article = document.createElement("article");


    

    im = document.createElement("img");
    im.setAttribute("src", "/media/" + id + ".jpg");
    im.setAttribute("alt", desc);
    im.classList = "front";


    h2 = document.createElement("h2");
    h2.innerHTML = name;

    d = document.createElement("p");
    d.innerHTML = date;
    d.classList = "date";

    p = document.createElement("p");
    p.innerHTML = desc;

    b = document.createElement("section");
    b.classList = "back"
    b.appendChild(h2);
    b.appendChild(d);
    b.appendChild(p);
    article.setAttribute("onclick", "location.href='/" + id + "/'");
    article.appendChild(im);
    article.appendChild(b);
    head.appendChild(article);

}
