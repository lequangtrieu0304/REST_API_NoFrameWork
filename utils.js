const fs = require('fs')

const writeDataToFile = async(filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if(err) {
            console.log(err)
        }
    })
}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
          const body = []
            req.on('data', (chunk) => {
                body.push(chunk)
            })
            req.on('end', () => {
                let bodyPost = Buffer.concat(body).toString();
                console.log(bodyPost);
                resolve(bodyPost)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    writeDataToFile,
    getPostData
}
