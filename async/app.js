console.log('debut');



// getMenber()
//     .then(() => getArticles())
//     .then((articles) => console.log(articles))
//     .catch(err => console.log(err.message))

(async () => {
    let menber = await getMenber()
    let article = await getArticles()
    console.log(article)
})()



function getMenber() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Menber 1')
            
        }, 2000)
    })
    
}

function getArticles() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([1, 2, 3]) 
        }, 2000)
    })
    
}


console.log('fin')

