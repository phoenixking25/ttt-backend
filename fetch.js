var request = require('request'),
    url = 'http://terriblytinytales.com/test.txt'


const wordFrequency = (string) => {
    var words = string.replace(/[\s*\.*\,\;\+?\#\|:\-\/\\\[\]\(\)\{\}$%&0-9*]/, '').split(/\s/),
        data = {}
    words.forEach((wrd) => {
        if (!data[wrd]) {
            data[wrd] = 0
        }
        data[wrd] += 1
    })
    var array = []
    for (var word in data) {
        if(!word == ''){
            array.push([word, data[word]])
        }
    }

    array.sort((a, b) => {
        return b[1] - a[1]
    })
    return array
}

module.exports = {
    getFrequency: () => {
        return new Promise((resolve, reject) => {
            request.get(url, (err, response, body) => {
                if(err) {
                    console.log(err)
                    reject(err)
                } else {
                    try {
                        body = wordFrequency(body)
                        resolve(body)
                    } catch(err) {
                        console.log(err)
                        reject(err)
                    }
                }
            })
        })
    }
}

