//----code-------

// function processLayers(layers, fileDescriptior, parent) {
// 	for (var i = 0; i < layers.length; i++) {
// 		var fontName, postScriptName, activeLayer = layers[i];
// 		if (activeLayer.kind == LayerKind.TEXT) {

// 			if (activeLayer.textItem.contents.length == 0) {
// 				// skip item as it has no text
// 				continue;
// 			}
// 			fontName = activeLayer.textItem.font;
// 			// postScriptName = app.fonts[activeLayer.textItem.font].postScriptName;
// 			postScriptName = "";
// 			fileDescriptior.write(parent + activeLayer.name + "," + fontName + "," + postScriptName + "\n");
// 		} else if (activeLayer.constructor == LayerSet && activeLayer.layers.length > 0) {
// 			processLayers(activeLayer.layers, fileDescriptior, parent + activeLayer.name + "/");
// 		} else {
// 			fontName= "";
// 			postScriptName = "";
// 		}
// 		// fileDescriptior.write(activeLayer.constructor.toString() + "," + activeLayer.kind + "," + parent + activeLayer.name + "," + fontName + "," + postScriptName + "\n");
// 	}
// }
function collectFonts(layers, fc) {
	for (var i = 0; i < layers.length; i++) {
		var fontName, activeLayer = layers[i];
		if (activeLayer.kind == LayerKind.TEXT) {
			if (activeLayer.textItem.contents.length == 0) {
				// skip item as it has no text
				continue;
			}
			fontName = activeLayer.textItem.font;
			// if (!fc.indexOf) {
			// 	alert(fc.constructor);
			// }
			fc.push(fontName);
			// if (fc.indexOf(fontName) == -1) {
			// }
		} else if (activeLayer.constructor == LayerSet && activeLayer.layers.length > 0) {
			collectFonts(activeLayer.layers, fc);
		}
	}
}

if (documents.length > 0) {
	// Tell Photoshop not to display any dialogs.
	//displayDialogs = DialogModes.NO;
	// Create a reference to the active document.
	var docRef = activeDocument;
	CurrentFolder = activeDocument.path;
	var fontsCollection = [];
	// alert(fontsCollection.constructor);
	collectFonts(docRef.layers, fontsCollection);
	fontsCollection.sort();
	var uniqueFonts = [];
	for (var i = 0; i < fontsCollection.length; i++) {
		if (i == 0) {
			uniqueFonts.push(fontsCollection[i]);
		}
		if (uniqueFonts[uniqueFonts.length - 1] != fontsCollection[i]) {
			uniqueFonts.push(fontsCollection[i]);
		}
	}
	alert("Fonts: \"" + (uniqueFonts.join("\", \"")) + "\"");
	// Loop through the layers one at a time. docRef.layers.length contains the number of
	// layers including the background.
	// Create the Excel comma delimited file in the current folder
	// var nufile = new File(CurrentFolder + "/" + activeDocument.name + " Fonts Used.csv" );
	// nufile.open("w");
	// nufile.write("Layer Name,Font Name,Font Post Script Name" + "\n");
	// processLayers(docRef.layers, nufile, "/");
	// nufile.write("\n");
	//Close the Excel comma delimited file
	// nufile.close();
	// alert("Finished");
} else {
	// Gives this message if you don't have a document open in Photoshop.
	alert("You must have at least one open document to run this script! ");
}
// Set the objects to nothing to release to the system.
docRef = null

//----code-------