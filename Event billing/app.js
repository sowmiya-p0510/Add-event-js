let eveID = 1
document.getElementById("eventId").value = eveID
const eventObj = {}

const addEventdata = (eventData) =>{
    let eventId = eventData.eventId 
    eventObj[eventId] = eventData
    console.log(eventObj)
} 

const deleteEventdata = (eventId) =>{
    delete eventObj[eventId]
    console.log(eventObj)
} 

function validateEventdata(){
    let eventId = document.getElementById("eventId").value
    let eventName = document.getElementById("eventName").value
    let cost = document.getElementById("cost").value
    let date = document.getElementById("date").value
    let isValidated = true , message = ""
    if(eventId == ''){
        isValidated = false
        message += "EventId is empty\n"
    }
    if(eventName == ''){
        isValidated = false
        message += "eventName is empty\n"
    }
    if(cost == ''){
        isValidated = false
        message += "cost is empty\n"
    }
    if(date == ''){
        isValidated = false
        message += "date is empty\n"
    }
    if(isValidated == false){
        alert(message)
        return
    }
    let eventData = {
        "eventId":eventId,
        "eventName":eventName,
        "cost":cost,
        "date":date,
    }
    addEventdata(eventData)
    addTableData(eventData)
    calculateEventCost(eventObj)
}

let addTableData = (eventData) => {
    let table = document.getElementById("eventdata")
    let tableRows = document.getElementsByTagName("tr")
    //create table header
    if(tableRows.length <= 0){
        table.style.display = "block"
        let rows = document.createElement("tr")
        for(let [key,value] of Object.entries(eventData)){
            let theader = document.createElement("th")
            theader.textContent = key
            rows.appendChild(theader)
        }
        let count = document.createElement("th")
        count.textContent = "count"
        rows.appendChild(count)
        let remove = document.createElement("th")
        remove.textContent = "remove"
        rows.appendChild(remove)
        table.appendChild(rows)
    }

    //table rows
    let rows = document.createElement("tr")
    rows.setAttribute("id",`${eventData.eventId}`)
    const eventValues = Object.values(eventData)
    for(let val of eventValues){
        let tdata = document.createElement("td")
        tdata.textContent = val
        rows.appendChild(tdata)
    }

    //input tag inside td tag
    let count = document.createElement("td")
    let inputTag = document.createElement("input")
    inputTag.setAttribute("type","number")
    inputTag.setAttribute("id", "count");
    inputTag.setAttribute("name", "count"+eventData.eventId);
    inputTag.setAttribute("value", Number(1));
    inputTag.setAttribute("min", Number(1));

    //while changing input tag need to change the data
    inputTag.addEventListener("input",()=>{
        addEventCount(eventData.eventId)
        calculateEventCost(eventObj)
    })
    count.appendChild(inputTag)
    rows.appendChild(count)
    eventData["count"] = inputTag.value 
    
    //a tag inside td
    let remove = document.createElement("td")
    let aTag = document.createElement("a")
    aTag.addEventListener("click", function() {
        removeTableData(eventData.eventId);
        deleteEventdata(eventData.eventId)
        calculateEventCost(eventObj)
    });
    aTag.textContent = "remove"
    remove.appendChild(aTag)
    rows.appendChild(remove)

    table.appendChild(rows)
    document.getElementById("eventId").value = ++eveID
}

 const removeTableData = (eventId) =>{
    let table = document.getElementById("eventdata")
    let tableRow = document.getElementById(eventId)
    table.removeChild(tableRow)
}

let addEventCount = (eventId) =>{
    let inputTag = document.getElementsByName("count"+eventId)
    console.log(Number(inputTag[0].value))
    eventObj[eventId]["count"] = Number(inputTag[0].value)
    console.log(eventObj)
    
}

let calculateEventCost = (eventObj) => {
    let total = 0
    for(let value of Object.values(eventObj)){
        if(value.count > 0) 
            total += value.count*value.cost
    }
    if(total > 0){
        let eventCost = document.getElementById("eventCost")
        eventCost.style.display = "block"
        eventCost.textContent = "The total cost for the event is "+total
    }
    console.log("hello",total)
}
