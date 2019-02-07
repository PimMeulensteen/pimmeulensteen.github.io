const obj = JSON.parse('{"items":[ \
	{"id":"lissajous",\
	"title":"Lissajous",\
	"created":"7 februari 2019",\
	"format":"png",\
	"desc_short":"Animatie van Lissajoustranformaties met p5.js"},\
	{"id":"matrix",\
	"title":"Matrix",\
	"created":"30 oktober 2018",\
	"format":"png",\
	"desc_short":"Animatie van <i>the matrix</i> met behulp van een HTML5 canvas en javascript."},\
	\
	{"id":"3d",\
	"title":"3D effecten",\
	"created":"2 november 2018",\
	"format":"png",\
	"desc_short":"3D roterende text met behulp van CSS animaties."},\
	\
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
	"format":"svg",\
	"desc_short":"Een tesseract (een hyperkubus in de 4e dimensie) ziet er interssant uit wanneer deze woordt gedraaid. Gemaakt in Javascript"},\
	\
	{"id":"pi",\
	"title":"Jochem die Pi voorlees ",\
	"created":"5 september 2018",\
	"format":"svg",\
	"desc_short":"Jochem die 1 000 000 getallen van Pi voorlees. Gemaakt van 11 losse audiobestanden."},\
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
	{"id":"voice",\
	"title":"Analyze van de Voice",\
	"created":"21 februari 2018",\
	"format":"jpg",\
	"desc_short":"Een project voor <i>ICT in de wolken</i> met behulp van twitterdata een winnaar van <i>The Voice</i> te voorspellen."},\
	\
	{"id":"shapes",\
	"title":"Vormen in CSS",\
	"created":"17 mei 2017",\
	"format":"svg",\
	"desc_short":"Het is niet altijd makkelijk om vormen te maken in CSS. Dit zijn twee korte animaties die laten zien heo het kan."},\
	\
	{"id":"excel",\
	"title":"Afbeeldingen met Excel",\
	"created":"15 juni 2018",\
	"format":"png",\
	"desc_short":"Met behulp van conditionele opmaak en een heel groot excel bestand kan je afbeeldingen weergeven in Excel."}\
	]\
}')


function load(i) {
	let id = obj.items[i].id;
	let desc = obj.items[i].desc_short;

	//Maak een artcile element
	let article = document.createElement("article");

	//Maak een afbeelding met attributen.
	let im = document.createElement("img");
	if (window.innerWidth < 620) {
		im.setAttribute("src", "/media_big/" + id + "." + obj.items[i].format);

	} else {
		im.setAttribute("src", "/media_nor/" + id + "." + obj.items[i].format);

	}
	last_size = window.innerWidth
	im.setAttribute("alt", desc);

	//Als de afb. geladen is, vehoog de teller van geladen afbeeldingen met een 
	//en run de check 'lc()'
	im.addEventListener("load", function (event) {
		ic++;
		lc()
	});
	im.setAttribute("class", "front");

	//Maak een h2 element en vul deze
	let h2 = document.createElement("h2");
	h2.innerHTML = obj.items[i].title;

	//Maak een p element, vul deze met de datumen geef de class 'date'
	let d = document.createElement("p");
	d.innerHTML = obj.items[i].created;
	d.setAttribute("class", "date");

	//Maak een p element en vul deze met de bescrhrijving
	let p = document.createElement("p");
	p.innerHTML = desc;

	//Maak een section element en geeft deze de class back
	let b = document.createElement("section");
	b.setAttribute("class", "back");

	//Plaats de losse elementen in het section-element
	b.appendChild(h2);
	b.appendChild(d);
	b.appendChild(p);

	//Maak het section-element klinkbaar.
	b.setAttribute("onclick", "location.href='/" + id + "/'");

	//Plaats de afbeeling en de section in het article.
	article.appendChild(im);
	article.appendChild(b);

	//Plaats het article op de pagina
	head.appendChild(article);
	return true;
}

function lc() {
	//Deze functie evaluuert of alle afbeeldingen die moeten laden geladen zijn.
	if (ic == q) {
		//Als dit het geval is, laad de rest van de afbeeldingen
		for (let i = q; i < l; i++) {
			load(i)
		}
	}
}

const head = document.getElementsByTagName("main")[0];
let ic = 0; //Varibalie die het aantal geladen afbeeldinge bijhoudt.
const l = obj.items.length;

//Loop die alle items uit het JSON-object op de pagina plaatst.
for (let i = 0; i < q; i++) {
	load(i)
}

//Code die naar de event window resize luistert.
let articles = document.getElementsByTagName("article")
window.addEventListener("resize", function () {
	//Als het scherm groter of kleiner is geworden dan het breakpoint
	if ((last_size <= 620 && window.innerWidth > 620) || (last_size >= 620 && window.innerWidth < 620)) {
		last_size = window.innerWidth
		//Als kleiner dan het breakpoint
		if (window.innerWidth < 620) {
			//Verander alle src images naar de goede grote
			for (n = 0; n < articles.length; n++) {
				current_src = articles[n].firstChild.getAttribute("src").slice(11, articles[n].firstChild.getAttribute("src").length)
				articles[n].firstChild.setAttribute("src", "/media_big/" + current_src)
			}
		} //Als NIET kleiner dan het breakpoint
		else {
			//Verander alle src images naar de goede grote
			for (n = 0; n < articles.length; n++) {
				current_src = articles[n].firstChild.getAttribute("src").slice(11, articles[n].firstChild.getAttribute("src").length)
				articles[n].firstChild.setAttribute("src", "/media_nor/" + current_src)
			}
		}
		 //helper variable voor groter/kleiner worden
	}
})