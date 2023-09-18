var db = "http://20.23.23.75:8082";
//var db = "http://localhost:8082";

function menu(){
	var a= document.getElementById("menudiv").innerHTML=
	`<a href=index.html> Kookgerei </a> <a href=receptentabelfrontend.html> Recepten </a> <a href=recensie.html> Recensies </a> <a href=tempingredient.html> Ingredienten </a> <a href=toevoegenrecept.html> Recept Toevoegen </a>`;
	
}

 //GET methods
 function toonEntiteit(getMap){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4){
			var alleEntiteit = JSON.parse(this.responseText);
			var eindString = "<table border=1>";
			for(var x = 0;x<alleEntiteit.length;x++){
				eindString += 
					"<tr><td>" + alleEntiteit[x].naam+
					"</td><td>"+alleEntiteit[x].type+
					"</td><td>"+alleEntiteit[x].materiaal+
					"</td><td>"+alleEntiteit[x].prijs+
					"</td><td>"+alleEntiteit[x].webshopLink+
					"</td><td><button onclick=verwijderen("
					+alleEntiteit[x].kookgereiID+
					")>verwijder</button></td></tr>";
			}
			eindString += "</table>";
			document.getElementById("alleKookgereiTabel").innerHTML = eindString;
		}
	}
	xhr.open("GET",db+"/alle"+getMap,true);
	xhr.send();
}


//zoek op type(naam, prijs) en input zoekopdracht 
function zoeken(zoekopdracht){
	
	var xhr = new XMLHttpRequest();
	var eindString = "<table border=1>";
	xhr.onreadystatechange = function(){
		if(this.readyState == 4){
			var gezocht = JSON.parse(this.responseText)
			var columns = [];
			for (var i=0;i<gezocht.length;i++){
				var columnsIn = gezocht[i];
				
				for (var key in columnsIn){
					//console.log(key);
					columns.push(key);
				}

			}
			console.log(columns);
			
			
			for(var a=1; a<=columns.length; a++){
				console.log(a);
				eindString+="<tr><td>";
				
				for(x=1;x<gezocht.length;x++){
					eindString+="</td><td>"+gezocht.columns[x];
				}
				eindString+="</td></tr>";
				
			}

			


			// for(var x = 0;x<gezocht.length;x++){
			// 	eindString += 
			// 		"<tr><td>" +gezocht[x].naam+
			// 		"</td><td>"+gezocht[x].type+
			// 		"</td><td>"+gezocht[x].materiaal+
			// 		"</td><td>"+gezocht[x].prijs+
			// 		"</td><td>"+gezocht[x].webshopLink+
			// 		"</td></tr>";
			// }
		
		
		
		eindString += "</table>";
		document.getElementById("gezochtTabel").innerHTML = eindString;
		}
	}
	xhr.open("GET",db+ "/zoeknaam/"+zoekopdracht, true);
	xhr.send();
	console.log(zoekopdracht);
	console.log(document.getElementById("inputzoekkookgerei").type);
}


//DELETE methods 
function verwijderen(deid){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4){
		}
	}
	xhr.open("DELETE", db+"/verwijderkookgerei/"+deid, true);
	xhr.send();
	console.log("item verwijderd");
}

//POST methods 
function toevoegen(){
	var dekookgerei = {}; //maakt hier een lege JSON variable  
	//JSON vullen met informatie met waarde van input field in forms 
	dekookgerei.naam = document.getElementById("naamkookgerei").value;
	dekookgerei.type = document.getElementById("typekookgerei").value;
	dekookgerei.materiaal = document.getElementById("matkookgerei").value;
	dekookgerei.prijs = document.getElementById("prijskookgerei").value;
	dekookgerei.webshopLink = document.getElementById("webshopkookgerei").value;

	if(!dekookgerei.naam || !dekookgerei.prijs){
		alert("Naam en prijs verplicht.")
	}else{
	var deJSON = JSON.stringify(dekookgerei);
	var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(this.readyState == 4){
				console.log(deJSON);
			}
		}
	xhr.open("POST","http://20.8.203.9:8082/voegkookgereitoe",true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(deJSON);
	console.log("item toegevoegd.");
	}
}

//Overige functions 
function clearFields(){
	document.getElementById("naamkookgerei").value ="";
	document.getElementById("typekookgerei").value ="";
	document.getElementById("matkookgerei").value ="";
	document.getElementById("prijskookgerei").value ="";
	document.getElementById("webshopkookgerei").value ="";
}

function clearTable(){
	document.getElementById("alleKookgereiTabel").innerHTML = "";
}
