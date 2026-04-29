function getTicketListContainerElement(){
    return document.querySelector('.layout.admin .list.admin') ?? null;
}

function getTicketListElement(){
    return getTicketListContainerElement()?.querySelector('.entries') ?? null;
}

function getTicketListTitleElement(){
    return getTicketListContainerElement()?.querySelector('.title') ?? null;
}

function getTicketListSubTitleElement(){
    return getTicketListContainerElement()?.querySelector('.subtitle') ?? null;
}

function setTicketListTitle(text){
    if(!text) throw new Error("no title supplied");
    if(!getTicketListTitleElement()) throw new Error("no title element found");

    getTicketListTitleElement().innerText = text;
}

function setTicketListSubTitle(text){
    if(!text) throw new Error("no title supplied");
    if(!getTicketListSubTitleElement()) throw new Error("no subtitle element found");

    getTicketListSubTitleElement().innerText = text;
}



async function displayTicketsInList(){
    if(!getTicketListElement()) throw new Error("Couldnt find ticket list element!");

    let tickets = [
        {
            id: 12334,
            title: "Outlook Password zurücksetzen",
            creator: {
                id: 123456789012,
                first_name: "Max",
                last_name: "Musterman",
                company: {

                }
            },
            created: new Date().getTime(),
            status: "unassigned",
        }
    ]

    for(let ticket of tickets){
        console.log(ticket)
    }
}