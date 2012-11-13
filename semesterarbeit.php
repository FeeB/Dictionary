// Fee Braun, 5298024, 18.03.2011, Proseminar HKI
<?php 
header ("content-type: text/xml");
echo '<?xml version="1.0" encoding="UTF-8"?>'
?>
<entries>
<?php
//echo "<pre>" . print_r($_GET, 1) . "</pre>"; // WICHTIGE ZEILE ZUM DEBUGGEN

//Prüft ob die XML überhaupt vorhanden ist
if ( file_exists('liste.xml') ) 
{
   $xml = simplexml_load_file('liste.xml');
	//echo "<pre>" . print_r($xml, 1) . "</pre>"; // WICHTIGE ZEILE ZUM DEBUGGEN
   
   // prüft ob die Variabel "initialLetter" leer ist
	if (isset($_GET['initialLetter'])) 
	{
		//füllt die Variable requestedInitialLetter mit dem geklickten Buchstaben
		$requestedInitialLetter = $_GET['initialLetter'];
		foreach($xml->entry as $entry) 
		{
			// nur der Erste Buchstabe soll verglichen werden
		   $initialLetter = substr($entry->term,0,1);
		 	//Vergleich initialLettern, Buchstaben werden beide als große Buchstaben verglichen
		   if (strtoupper($initialLetter) == strtoupper($requestedInitialLetter) )
		   {
		   	// definition und tags werden gelöscht, lediglich der Term wir als XML ausgegeben
				unset($entry->definition);
				unset($entry->tags);
		  		echo $entry->asXml();
		  	}
		}
	}
   // prüft ob die Variabel "searchTerm" leer ist
	else if (isset($_GET['searchTerm']))
	{
    	//füllt die Variable searchTerm mit dem eingegebenen Suchwort
		$searchTerm = $_GET['searchTerm'];
		foreach($xml->entry as $entry) 
		{
			//sucht nach dem searchTerm innerhalb von entry->term unabhängig von Groß- und Kleinschreibung. !== muss eingesetzt werden, da sonst die Rückgabe als Zahl falsch gewertet wird (0 als false oder 1 als true)
			if(stripos($entry->term, $searchTerm) !== false) 
			{
				// definition und tags werden gelöscht, lediglich der Term wir als XML ausgegeben
				unset($entry->definition);
				unset($entry->tags);
		  		echo $entry->asXml();
			}
		}
	}
	// Schlagworte
	// prüft ob die Variabel "tag" leer ist
	else if (isset($_GET['tag']))
	{
		//füllt die Variable requestedTag mit dem geklickten Tag
		$requestedTag = $_GET['tag'];
		foreach($xml->entry as $entry)
		{
			// prüft ob die Variabel "entry->tags->tag" leer ist
			if(isset( $entry->tags->tag ) )
			{
				foreach($entry->tags->tag as $tag)
				{
					//Vergleicht tag mit dem geklickten tag
					if($tag == $requestedTag)
					{
						// definition und tags werden gelöscht, lediglich der Term wir als XML ausgegeben
						unset($entry->definition);
						unset($entry->tags);
						echo $entry->asXml();
						break;
					}
				}
			}
		}
	}
	//Ausgabe kompletter Eintrag
	// prüft ob die Variabel "id" leer ist
	else if (isset($_GET['id']))
	{
		//füllt die Variable requestedId mit der übermittelten Id
		$requestedId = $_GET['id'];
		foreach($xml->entry as $entry)
		{
			//füllt die Variable Id mit der Id des Eintrags
			$id = $entry->attributes()->id;
			//vergleicht die übermittelte Id mit der Id des Eintrags
			if($id == $requestedId)
			{
				//kompletter Eintrag wird ausgegeben, break, da es nur einen entsprechenden Eintrag geben kann
				echo $entry->asXml();
				break;
			}
		}
	}		
}
?>
</entries>

