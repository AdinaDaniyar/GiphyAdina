const API = 'https://api.giphy.com/v1/gifs/search?api_key='
const KEY = 'sTdCJjIAUz2fNDMUob8nqHx6G50HnUzP'
const limit = '&limit='
const rest = '&q='

// https://api.giphy.com/v1/gifs/search?api_key=sTdCJjIAUz2fNDMUob8nqHx6G50HnUzP&limit=25&q=pokemon


const text = document.querySelector('#searchGiphy')
const count = document.querySelector('#countGiphy')
const btn = document.querySelector('#btn')
const output = document.querySelector('#output')
const allInputs = document.querySelectorAll('.input')

const search = async (city) => {
    try {
        const url = `${API}${KEY}${limit}${count.value}${rest}${text.value ? text.value : city}`
        const request = await fetch(url) //0.5 - 4 seconds
        const response = await request.json()
        render(response.data)
    } catch (e) {
        alert('error')
    }
}
search('bishkek')

const render = (array) => {
    console.log(array)
    output.innerHTML = ''
    array.forEach(el => {

        const iframe = document.createElement('iframe')
        const col = document.createElement('div')
        const box = document.createElement('div')
        const text = document.createElement('p')

        col.className='col-2'
        box.className='box'



        text.textContent=el.title
        iframe.src = el.embed_url

        box.append(iframe,text)
        col.append(box)
        output.append(col)
        
    })
}

const disableBtn = () => {
    document.querySelector('.error').textContent = 'Field is empty'
    btn.style.pointerEvents = 'none'
    btn.style.opacity = '0.5'
}

const enableBtn = () => {
    document.querySelector('.error').textContent = ''
    btn.style.pointerEvents = 'unset'
    btn.style.opacity = '1'
}

const validateInLoad = () =>{
    if(!text.value || !count.value){
        disableBtn()
    }
}
validateInLoad()

btn.addEventListener('click', () => {

    if (!text.value || !count.value) {
        disableBtn()
    } else {
        enableBtn()
        search()
    }

})

allInputs.forEach(el => {
    el.addEventListener('keyup',e=> {
        if (!e.target.value) {
            disableBtn()
        } else {
            enableBtn()
        }
    })
})


allInputs.forEach((el,index) => {
    el.addEventListener('keyup', e=> {
        if (e.key === 'Enter') {
            if (!text.value || !count.value) {
                disableBtn()
            } else {
                enableBtn()
                search()
            }
        }
    })
})