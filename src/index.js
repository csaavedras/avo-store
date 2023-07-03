/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/


const url = 'https://platzi-avo.vercel.app'
const baseUrl = 'https://platzi-avo.vercel.app'

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price)

    return newPrice
}

// TODO 
// - [x] Conectarnos al server 
// - [x] Procesar respuesta y convertirla en JSON
// - [] JSON -> DATA -> Renderizar en navegador 

const fetchData = () => {
    return new Promise((resolve, reject) => {
        fetch(`${url}/api/avo`)
            .then(response => {
                if (response.ok) {
                    resolve(response.json())
                } else {
                    reject(new Error('No se pudieron obtener los datos de los usuarios'))
                }
            })
            .catch(error => reject(error))
    })
}

fetchData()
    .then(res => {
        const fetchData = res.data
        console.log('fetch data', fetchData)
        fetchData.map((item) => {
            const { name, image, price, sku } = item
            const imageUrl = `${url}${image}`
            // Imagen
            const imagen = document.createElement('img')
            imagen.className = "h-auto max-w-full rounded-lg"
            imagen.src = imageUrl
            // Titulo
            const titulo = document.createElement('h1')
            titulo.className = 'font-semibold text-lg px-5 bg-gray-100 pt-2'
            titulo.innerText = name
            // Precio
            const precio = document.createElement('p')
            precio.className = 'font-semibold text-3xl pb-4 px-5 bg-gray-100'
            precio.innerText = formatPrice(price)
            // Card
            const card = document.createElement('div')
            card.append(imagen, titulo, precio)
            card.className = 'bg-white bg-white border border-gray-200 rounded-lg shadow'
            card.style = 'margin: 0 auto'

            const wrap = document.querySelector('#wrap')
            wrap.append(card)
            document.body.appendChild(wrap)
            document.body.className = 'bg-slate-200'
            document.body.classList.add('w-full')

        })
    })
    .catch(error => console.error(error))