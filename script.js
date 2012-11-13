// Fee Braun, 5298024, 18.03.2011, Proseminar HKI

// die function bekommt die parameter url und func in jeder Ajax Anwendung neu zugewiesen
function loadXMLDoc(url, func)
{
	// prüft welcher Browser genutzt wird und erstellt eine Request Funktion
	var xmlhttp;
	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
  	{
  		xmlhttp = new XMLHttpRequest();
  	}
	else // code for IE6, IE5
  	{
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
 	}
	
	//Wenn sich etwas ändert führe die Funktion aus, in der Funktion wird abgefragt ob der Server bereit ist und keine Fehlermeldung gekommen ist. Funktion Func ordnet der Variable xmlhttp responsexml zu
	xmlhttp.onreadystatechange = function()
  	{
  		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
   		{
   			func(xmlhttp.responseXML);
   		}
  	}
	// das xml wird durch GET geholt, die vergebene url wird geöffnet, das true sagt, dass das Ajax asynchron ist. Mit send wird die Antwort geschickt
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

// Funktion für die Suche searchTerm = vom User eingegebenes Wort, durch die URL kann das PHP die Antwort ausgeben. Anschließend wird die Function showHtmlForResponseXml ausgegeben.
function requestEntriesForSearchTerm(searchTerm) 
{
	loadXMLDoc("semesterarbeit.php?searchTerm=" + searchTerm, showHtmlForResponseXml);
}

// Funktion für die Anfangsbuchstabenliste, letter = geklickter letter, durch die URL kann das PHP die Antwort ausgeben. Anschließend wird die Function showHtmlForResponseXml ausgegeben.
function reguestEntriesForLetter(letter) 
{
	loadXMLDoc("semesterarbeit.php?initialLetter=" + letter, showHtmlForResponseXml);
}

// Funktion für die Suche über die Schlagwörter, tag = geklicktes Schlagwort. Anschließend wird die Function showHtmlForResponseXml ausgegeben.

function requestEntriesForTag(tag)
{
	loadXMLDoc("semesterarbeit.php?tag=" + tag, showHtmlForResponseXml);
}

// Funktion um den Eintrag über eine ID zu bekommen, diese Funktion verwenden wir um von der Linkliste auf die Einträge zu kommen. Mit der for Schleife werden die Schlagworte angehangen
function requestEntryForId(id)
{
	loadXMLDoc("semesterarbeit.php?id=" + id, function(responseXML) 
	{
		var output = '<h1>';
		output += responseXML.getElementsByTagName("term")[0].firstChild.nodeValue; 
		output += '</h1>';
		output += '<p>';
		output += responseXML.getElementsByTagName("definition")[0].firstChild.nodeValue;
		output += '</p>';
		output += '<ul>';
		var tags = responseXML.getElementsByTagName("tag");
		for (var i = 0; i < tags.length; i++)
		{
			var tag = tags[i].firstChild.nodeValue;
			output += '<li>';
			output += '<a href="#" onclick="requestEntriesForTag(\'' + tag + '\')">' + tag + '</a>';
			output += '</li>';
		}
		output += '</ul>';		
		document.getElementById("result").innerHTML = output;	
	});
}

// gibt das HTML für das empfangen XML aus
function showHtmlForResponseXml(responseXML)
{
	// dem responseXML (s.o.) wird der Tag entry zugewiesen, der output soll durch ein ul erfolgen, schleife: solange i kleiner als die entries-Länge, soll die Schleife wiederholt werden, alle gefundenen entries werden also in listenform angezeigt
	var entries = responseXML.getElementsByTagName("entry");
	var output = '<ul>';
	for (var i = 0; i < entries.length; i++) 
	{
		// kein link sonder onclick, da wir nicht auf eine neue Seite gelangen wollen. Id anehangen, indem die entsprechenden Knoten angesprungen werden.
		output += '<li>';
		output += '<a href="#" onclick="requestEntryForId(' + entries[i].attributes[0].nodeValue + ')">';
		output += entries[i].getElementsByTagName('term')[0].firstChild.nodeValue;
		output += '</a>';
		output += '</li>';
	}
	output += '</ul>';
	//holt den Div Container aus der html und schreibt den output hinein
	document.getElementById("result").innerHTML = output;
}
