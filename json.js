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
	{"id":"voice",\
	"title":"Analyze van de Voice",\
	"created":"21 februari 2018",\
	"format":"jpg",\
	"desc_short":"Een project voor <i>ICT in de wolken</i> met behulp van twitterdata een winnaar van <i>The Voice</i> te voorspellen."},\
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


function load(i){
	let id = obj.items[i].id;
	let desc = obj.items[i].desc_short;

	//Maak een artcile element
	let article = document.createElement("article");

	//Maak een afbeelding met attributen.
	let im = document.createElement("img");
	im.setAttribute("src", "/media/" + id + "." + obj.items[i].format);
	im.setAttribute("alt", desc);

	//Als de afb. geladen is, vehoog de teller van geladen afbeeldingen met een 
	//en run de check 'lc()'
	im.addEventListener("load",function(event){ic++;lc()});
	im.classList = "front";

	//Maak een h2 element en vul deze
	let h2 = document.createElement("h2");
	h2.innerHTML = obj.items[i].title;

	//Maak een p element, vul deze met de datumen geef de class 'date'
	let d = document.createElement("p");
	d.innerHTML = obj.items[i].created;
	d.classList = "date";

	//Maak een p element en vul deze met de bescrhrijving
	let p = document.createElement("p");
	p.innerHTML = desc;

	//Maak een section element en geeft deze de class back
	let b = document.createElement("section");
	b.classList = "back"

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

function lc(){
	//Deze functie evaluuert of alle afbeeldingen die moeten laden geladen zijn.
	if (ic==q){
		//Als dit het geval is, laad de rest van de afbeeldingen
		for (let i = 3; i < l; i++) {
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
