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
                icon: null,
                company: {}
            },
            created: new Date().getTime(),
            status: "unassigned",
            unread: false,
        },
        {
            id: 67890,
            title: "Server startet nicht mehr",
            creator: {
                id: 123456789013,
                first_name: "Oompa",
                last_name: "Loompa",
                icon: null,
                company: {}
            },
            created: new Date().getTime(),
            status: "unassigned",
            unread: true,
        }
    ]

    for(let ticket of tickets){
        let creator = ticket.creator;


        let ticketElement = document.createElement("div");
        ticketElement.classList.add("ticket");

        // if unread mark it as such
        if(ticket.unread === true) ticketElement.classList.add("unread");

        ticketElement.setAttribute("data-id", ticket.id);
        ticketElement.innerHTML =
            `
            <div class="icon">${creator.icon ? "" : `${creator.first_name[0]}${creator.last_name[0]}`}</div>
            <div class="content">
                <p class="meta">
                    ${creator.first_name} ${creator.last_name} <span class="timestamp">${new Date(ticket.created).toLocaleTimeString()}</span>
                </p>
                
                <p>${ticket.title}</p>
                
                <p class="footer">
                    <span class="status">${ticket.status}</span>
                </p>
            </div>
            `;


        console.log(ticket)
        getTicketListElement().appendChild(ticketElement);
    }
}