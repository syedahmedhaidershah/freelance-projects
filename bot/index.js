var request = require('request');
// let it = 0;

const sendRequest = () => {
    // request
    //     .cookie('frontend=3psuvefrfmdf6qvgrs9qc9jqf2; _ga=GA1.2.871853671.1572402548; _gid=GA1.2.544254922.1572402548; _gat=1; frontend=3psuvefrfmdf6qvgrs9qc9jqf2; __utma=5934651.871853671.1572402548.1572402559.1572402559.1; __utmc=5934651; __utmz=5934651.1572402559.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmt=1; __utmb=5934651.1.10.1572402559; _fbp=fb.1.1572402560493.1506400625; _gcl_au=1.1.1483721918.1572402561; __asc=cd8d9a6b16e1a7f05d6447e90c9; __auc=cd8d9a6b16e1a7f05d6447e90c9; _gat_UA-26909282-1=1; inptime0_7113_pk=0; __zlcmid=v1ieImbRMz1rTo');
    request
        .get('http://yayvo.com/', function (error, response, body) {
            // console.log('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google homepage.
            sendRequest();
            // console.log(it++);
        });
}

sendRequest();