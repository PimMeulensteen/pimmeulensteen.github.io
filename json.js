const obj = JSON.parse('{"items":[ \
	{"id":"dag",\
	"title":"One-minute: Dag",\
	"created":"8 februari 2018",\
	"format":"jpg",\
	"desc_short":"Dag is het resultaat van een filmopdracht voor het vak CKV"},\
\
	{"id":"jd",\
	"title":"Unkown Pleasures",\
	"created":"2 mei 2018",\
	"format":"png",\
	"desc_short":"Animatie van de albumcover van Joy Divisions Unkonw Pleasures."},\
	\
	{"id":"4d",\
	"title":"Roteren van een Tesseract ",\
	"created":"1 mei 2018",\
	"format":"png",\
	"desc_short":"Een tesseract (een hyperkubus in de 4e dimensie) ziet er interssant uit wanneer deze woordt gedraaid. Gemaakt in Javascript"},\
	\
	{"id":"cloud",\
	"title":"Cloudservice",\
	"created":"25 mei 2017",\
	"format":"png",\
	"desc_short":"Klein project in JavaScript/CSS om een laadicoon te maken."},\
	\
	{"id":"hg",\
	"title":"Zandloper",\
	"created":"26 mei 2017",\
	"format":"png",\
	"desc_short":"Klein project in om een laadicoon te maken, met alleen HTML en CSS3."},\
	\
	{"id":"frac",\
	"title":"Fractals Genereren",\
	"created":"20 maart 2018",\
	"format":"png",\
	"desc_short":"Meerdere scripts in Python verschillende fractals te genereren, inclusief de mogelijkheid voor video\'s."},\
	\
	{"id":"sin",\
	"title":"Maken van een sinusgolf",\
	"created":"8 september 2017",\
	"format":"png",\
	"desc_short":"Projectje in Javascript om het maken van sinusgolven de illustreren."},\
	\
	{"id":"shapes",\
	"title":"Vormen in CSS",\
	"created":"17 mei 2017",\
	"format":"png",\
	"desc_short":"Het is niet altijd makkelijk om vormen te maken in CSS. Dit zijn twee korte animaties die laten zien heo het kan."},\
	\
	{"id":"excel",\
	"title":"Afbeeldingen met Excel",\
	"created":"15 juni 2018",\
	"format":"png",\
	"desc_short":"Met behulp van conditionele opmaak en een heel groot excel bestand kan je afbeeldingen weergeven in Excel."}\
	]\
}')

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