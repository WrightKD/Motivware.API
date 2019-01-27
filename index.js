var express = require('express');
var HummusRecipe = require('hummus-recipe');
var fs = require('fs');
var app = express();



app.get('/', function(req, res){
    // res.writeHead(200, {'Content-Type': 'application/pdf'});
        
    /** here we will place the pdf building code **/
    var hummus = require('hummus');
    // var pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(res));

    // var page = pdfWriter.createPage(0,0,595,842);

    // pdfWriter.startPageContentContext(page).writeText(
    //     req.query.id ,
    //      10,10,
    //      {
    //         font:pdfWriter.getFontForFile('assets/fonts/Butter Layer.ttf'),
    //         size:10,
    //         colorspace:'gray',
    //         color:0x00
    //      })

        
         var pdfWriter = hummus.createWriterToModify(__dirname + '/assets/template/demo-invoice.pdf',{
            modifiedFilePath: __dirname + '/assets/template/invoice-template-new.pdf'
         });

        

         var pageModifier = new hummus.PDFPageModifier(pdfWriter,0);
		// pageModifier.startContext().getContext().writeText(
		// 	'Test Text',
		// 	400, 400,
		// 	{font:pdfWriter.getFontForFile('assets/fonts/Butter Layer.ttf'),size:1000,colorspace:'gray',color:0x00}
		// );

        pageModifier.endContext().writePage();
        
		pdfWriter.end();
    
        var invoice = fs.readFileSync('assets/template/invoice-template-new.pdf')
        res.setHeader('Content-Type', 'application/pdf');
        res.send(invoice);
    // pdfWriter.writePage(page);
    // pdfWriter.end();
        
    res.end();
});

app.listen(3000);

console.log("Server listening >> localhost:3000")

console.log("API ready for requests.")