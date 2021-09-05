console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
// message1.textContent = 'From javascript'

const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    message1.textContent = ''
    message2.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            // console.log(data.error)
            message1.textContent = ""
            message2.textContent = data.error
        }
        else{
            // console.log(data.address)
            // console.log(data.forecast)
            message1.textContent = data.address
            message2.textContent = data.forecast
        }
    })
})
})