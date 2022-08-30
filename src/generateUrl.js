function generateUrl(data, baseUrl){
  
    let url = baseUrl;
    const keys = Object.keys(data);

    keys.sort();

    keys.forEach((key, index) => {
      var value = data[key]
      if(value){
        url += encodeURI(`${key}=${value}`);
        if (index < key.length) {
          url += "&"
        }
      }
    });

    return url;
  }

const data = {
    width: 360,
    height: 300,
    locale: 'en',
    toolbar_bg: '',
    interval: '3h',
    pair: 'BTC_USD',
    }
  
let baseUrl = "http://testurl.bitfinx.com/?"
let formatedUrl = generateUrl(data, baseUrl);

console.log(formatedUrl);
  
    