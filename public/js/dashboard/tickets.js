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

async function displayTicket(ticket){
    if(!ticket) throw new Error("no ticket supplied");
    if(!getDashboardContentElement()) throw new Error("no content element found");

    console.log(ticket)

    getDashboardContentElement().innerHTML =
        `
        <div class="ticket-container">
            
            <div class="header">
                <div class="meta">
                    <span class="status">${ticket.status}</span>
                    <span class="id">#${ticket.id}</span>
                    <span class="timestamp">
                    ${new Date(ticket.created).toLocaleString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                    })}
                    </span>
                </div>
                
                <h1 class="title">${ticket?.title ?? "No title"}</h1>
                <div class="info">
                    <p>Ticket created by <span class="owner">${ticket.creator.first_name} ${ticket.creator.last_name}</span> &lt;${ticket.creator.contact.email}&gt; </p>
                </div>
            </div>
            
            <div class="ticket-content">
            
            </div>
            
            <div class="ticket-footer">
                <div class="top-actions">
                
                </div>
                
                <div class="editor"></div>
                
                <div class="bottom-actions">
                
                </div>
            </div>
        </div>
        `
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
                last_name: "Mustermann",
                icon: null,
                company: {},
                contact: {
                    email: "max.mustermann@email.com"
                }
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
                company: {},
                contact: {
                    email: "oompa@willywonka.com"
                }
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
                    ${creator.first_name} ${creator.last_name} 
                    
                    <span class="timestamp">
                        ${new Date(ticket.created).toLocaleString(undefined, {
                            weekday: 'short',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}
                    </span>
                </p>
                
                <p>${ticket.title}</p>
                
                <p class="footer">
                    <span class="status">${ticket.status}</span>
                </p>
            </div>
            `;

        ticketElement.onclick = async () => {
            await displayTicket(ticket)

            // mark ticket or select it to be more specific
        }

        getTicketListElement().appendChild(ticketElement);
    }

    setTicketListSubTitle(`${tickets?.length ?? "0"} Tickets`);
}