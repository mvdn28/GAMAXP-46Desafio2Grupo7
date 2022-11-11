const url = "https://xp41-soundgarden-api.herokuapp.com/events"

const eventForm = document.querySelector(`#novo-evento-form`)
const nome = document.querySelector(`#nome`)
const atracoes = document.querySelector(`#atracoes`)
const descricao = document.querySelector(`#descricao`)
const data = document.querySelector(`#data`)
const lotacao = document.querySelector(`#lotacao`)



//GET all elements
const postEvent = async(event) => {
    const response = await fetch(`${url}`,{
        method:"POST",
        body:event,
        headers:{
            "Content-type":"application/json"
        }
    })

    const data = await response.json()  
    console.log(data)  
}


eventForm.addEventListener(`submit`,async(e)=>{
    e.preventDefault()

    let date = data.value
    const dateValues = date.length>10?
        date.split(' ')[0]:
        date
    const timeValues = date.length>10?
        date.split(' ')[1]:
        '22:00'

    const [month, day, year] = dateValues.split('/');
    const [hours, minutes] = timeValues.split(':');
    const dateScheduled = new Date(year, month - 1, day, hours, minutes);
    let newEvent = {
        name:nome.value,
        attractions:[atracoes.value],
        description:descricao.value,
        scheduled: dateScheduled,
        number_tickets:lotacao.value,
        poster:"link da imagem"
    }

    newEvent = JSON.stringify(newEvent)

    await postEvent(newEvent)

    const main = document.getElementsByTagName("main")[0]
    const div = main.getElementsByTagName("div")[1]

    const newDiv = document.createElement("div")
    newDiv.classList.add("alert", "alert-success")
    newDiv.setAttribute("role","alert")
    newDiv.innerText=`Sucesso ao criar evento`

    div.insertBefore(newDiv,div.firstChild)
    nome.value=''
    atracoes.value=''
    descricao.value=''
    data.value='00/00/00 00:00'
    lotacao.value=''

    setTimeout(() => {
        newDiv.remove()
        
    },5000)
    
})

