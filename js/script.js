//GET methods
function toonKookgerei(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4){
			//console.log(this.responseText);
			var alleKookgerei = JSON.parse(this.responseText);
			var eindString = "<table border=1>";
			for(var x = 0;x<alleKookgerei.length;x++){
				eindString += 
					"<tr><td>" + alleKookgerei[x].naam+
					"</td><td>"+alleKookgerei[x].type+
					"</td><td>"+alleKookgerei[x].materiaal+
					"</td><td>"+alleKookgerei[x].prijs+
					"</td><td>"+alleKookgerei[x].webshopLink+
					"</td><td><button onclick=verwijderen("
					+alleKookgerei[x].kookgereiID+
					")>verwijder</button></td></tr>";
			}
			eindString += "</table>";
			document.getElementById("alleKookgereiTabel").innerHTML = eindString;
		}
	}
	xhr.open("GET","http://localhost:8082/allekookgerei",true);
	xhr.send();
}

//  comment
function zoeken(inputzoekkookgerei){
	if(inputzoekkookgerei!=""){
	var xhr = new XMLHttpRequest();
	var eindString = "<table border=1>";
	xhr.onreadystatechange = function(){
		if(this.readyState == 4){
			var gezocht = JSON.parse(this.responseText)

			for(var x = 0;x<gezocht.length;x++){
				eindString += 
					"<tr><td>" +gezocht[x].naam+
					"</td><td>"+gezocht[x].type+
					"</td><td>"+gezocht[x].materiaal+
					"</td><td>"+gezocht[x].prijs+
					"</td><td>"+gezocht[x].webshopLink+
					"</td></tr>";
			}
				eindString += "</table>";
				document.getElementById("gezochtTabel").innerHTML = eindString;
		}
	}
	console.log(parseInt(inputzoekkookgerei));
	if (isNaN(parseInt(inputzoekkookgerei))){  
			xhr.open("GET", "http://localhost:8082/zoeknaam/"+inputzoekkookgerei, true);
			xhr.send();
			console.log(inputzoekkookgerei);
			console.log(document.getElementById("inputzoekkookgerei").type);
	} else {
			xhr.open("GET", "http://localhost:8082/zoekprijs/"+inputzoekkookgerei, true);
			xhr.send();
			console.log(inputzoekkookgerei);
	}
}else{
	alert("Zoek veld leeg.");
 }
}


//DELETE methods 
function verwijderen(deid){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4){
		}
	}
	xhr.open("DELETE", "http://localhost:8082/verwijderkookgerei/"+deid, true);
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
	xhr.open("POST","http://localhost:8082/voegkookgereitoe",true);
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