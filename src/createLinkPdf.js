const { createClient } = require('@supabase/supabase-js');
var fs = require('fs');

const supabase = createClient(
    'https://wigwsxuobmtlhlcdigsa.supabase.co/',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpZ3dzeHVvYm10bGhsY2RpZ3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUwNjQ4MDMsImV4cCI6MTk2MDY0MDgwM30.2A-pJfCkdSL635OgYm__Dzl6f-567PSTOE1-AHiP_Vs'
);

async function criarLink(str, nomeArquivo) {
    //  fs.readFile('./template/cv.pdf', async function(err, dado) {
    // //     if (err) throw err; // Fail if the file can't be read.
    //     // console.log(typeof str);
    //     // console.log(data);
        const {data, error} = await supabase.storage.from('forms').upload(nomeArquivo, str, {contentType: 'application/pdf'});
        console.log(data);
        console.log(error);

        // const {data, error} = await supabase.storage.getBucket('companies');
        // console.log(data)
        // console.log(error)

        //   res.writeHead(200, {'Content-Type': 'application/pdf'});
        //   res.end(data); // Send the file data to the browser.
    //    });
}

module.exports = { criarLink };