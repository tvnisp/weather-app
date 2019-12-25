const searchBtn = document.querySelector('.searchBtn')
const forecast = document.querySelector('.forecast')
const inputPath = document.querySelector('.location')





searchBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const input = inputPath.value
    
    fetch(`/weather?address=${input}`).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                forecast.textContent = data.error
            } else {
                forecast.textContent = `${data.forecastData} ${data.location}`
            }
        })
    })

    inputPath.value = '' 
    
})