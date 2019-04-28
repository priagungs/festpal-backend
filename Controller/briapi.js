var client_id = "WvtkWznxhaV6LBMJVSZ0uzQVQN9viGUc";
var client_secret = "A6NQpA3tBX8GMJlH";
var access_token = "RzuxMeJf0g2XWdROQdhB31Jc5y8q";

let axios = require('axios');
var CryptoJS = require("crypto-js");


function getPath(url) {
    var pathRegex = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
    var result = url.match(pathRegex);
    return result && result.length > 1 ? result[1] : ''; 
}
 
function getQueryString(url) {
    var arrSplit = url.split('?');
    return arrSplit.length > 1 ? url.substring(url.indexOf('?')+1) : ''; 
}
 
function getAuthHeader(httpMethod, requestUrl, requestBody) {
    // return hmac signature
    var requestPath = getPath(requestUrl);
    var queryString = getQueryString(requestUrl);
    
    if (httpMethod == 'GET' || !requestBody) {
        requestBody = ''; 
    } else {
        requestBody = requestBody;
    }
    
    var timestamp = new Date().toISOString();
    // postman.setEnvironmentVariable('timestamp', timestamp);
    
    payload = 'path=' + requestPath + '&verb=' + httpMethod + '&token=Bearer ' + access_token + 
              '&timestamp=' + timestamp + '&body=' + requestBody;
    // postman.setEnvironmentVariable('signature_payload', payload);
    
              
    var hmacSignature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(payload, client_secret));
    return hmacSignature;
}

exports.createBRIVA = (req, res) => {
    let httpMethod = 'POST';
    let requestUrl = "https://partner.api.bri.co.id/sandbox/v1/briva/";
    let requestBody = {
        "institutionCode": "J104408",
        "brivaNo": "77777",
        "custCode": "123456789116",
        "nama": "Septri Nur",
        "amount": "1000000",
        "keterangan": "",
        "expiredDate": "2017-09-01 22:28:29"
      }
    let signature = getAuthHeader(httpMethod, requestUrl, requestBody);
    let timestamp = new Date().toISOString();

    var headers = {
        'Authorization': access_token,
        'BRI-Signature': signature,
        'BRI-Timestamp': timestamp
    }

    axios.post(requestUrl, requestBody, {headers: headers})

        .then((response) => {
            return res.json(response);
        })
        .catch((error) => {
            console.log(error);
            return res.json({
                status: 'error',
                message: 'failed to create BRIVA'
            })
        })
    

}

