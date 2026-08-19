function getTicketListContainerElement() {
    return document.querySelector('.layout.admin') ?? null;
}

function getTicketListElement() {
    return getTicketListContainerElement()?.querySelector('.entries') ?? null;
}

function getTicketListTitleElement() {
    return getTicketListContainerElement()?.querySelector('.title') ?? null;
}

function getTicketListSubTitleElement() {
    return getTicketListContainerElement()?.querySelector('.subtitle') ?? null;
}

function setTicketListTitle(text) {
    if (!text) throw new Error("no title supplied");
    if (!getTicketListTitleElement()) throw new Error("no title element found");

    getTicketListTitleElement().innerText = text;
}

function setTicketListSubTitle(text) {
    if (!text) throw new Error("no title supplied");
    if (!getTicketListSubTitleElement()) throw new Error("no subtitle element found");

    getTicketListSubTitleElement().innerText = text;
}

async function displayTicketTable({
                                      filter = null,
    containerElement = getDashboardContentElement()
                                  } = {}) {

    if(!containerElement) throw new Error("No container supplied");

    let tickets = [
        {
            id: 12334,
            title: "Reset Email Password",
            creator: {
                id: 123456789012,
                foa: "Herr",
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
            assignee: 32,
            unread: false,
        },
        {
            id: 67890,
            title: "Account Login not working",
            creator: {
                id: 123456789013,
                foa: "Herr",
                first_name: "Oompa",
                last_name: "Loompa",
                icon: null,
                company: {},
                contact: {
                    email: "oompa@willywonka.com"
                }
            },
            created: new Date().getTime(),
            assignee: 32,
            status: "unassigned",
            unread: true,
        }
    ]

    containerElement.innerHTML = `
        <h1>Tickets</h1>
        
         <div class="ticket-filters">                           
                <div>
                    <select id="status">
                        <option value="-1">None</option>
                        <option value="1">unassigned</option>
                        <option value="1">Assigned</option>
                        <option value="1">Closed</option>
                        <option value="1">Resolved</option>
                    </select>
                    <label for="status">Filter by status</label>
                </div>
                
                   <div>
                    <select id="assignee">
                        <option value="-1">None</option>
                        <option value="1">Martin</option>
                        <option value="2">Rick</option>
                        <option value="3">Willy</option>
                        <option value="4">Morty</option>
                    </select>
                    <label for="status">Filter by assignee</label>
                </div>
                
                <div>
                    <input type="checkbox" id="closed-tickets" name="closed-tickets">
                    <label for="closed-tickets">Show closed tickets</label>
                </div>
                
                <div>
                    <input type="text" id="subject" name="subject">
                    <label for="subject">Search by subject</label>
                </div>
            </div>
            
        <div class="ticket-wrapper">
            <table class="tickets">
                <tr>
                    <th>ID</th>
                    <th>Creator</th>
                    <th>Subject</th>
                    <th>Status</th>                    
                    <th>Assignee</th>
                    <th>Created</th>
                </th>
            </table>  
        </div>          
    `;

    let ticketLisElement = containerElement?.querySelector('.tickets') ?? null;
    if (!ticketLisElement) throw new Error("No ticket element found");

    for (let ticket of tickets) {
        console.log(ticket)

        let creator = ticket.creator;
        creator.fullname = `${creator.foa} ${creator.first_name} ${creator.last_name}`;

        let ticketElement = document.createElement("tr");
        ticketElement.classList.add("ticket");

        // if unread mark it as such
        if (ticket?.unread === true) ticketElement.classList.add("unread");

        ticketElement.setAttribute("data-id", ticket.id);
        ticketElement.innerHTML =
            `

                <td>${ticket.id}</td>
                
                <td>
                    ${creator.fullname}
                </td>
                
                <td>${ticket.title}</td>
                
                
                <td>${ticket.status}</td>
                
                
                <td>${ticket.assignee}</td>
                
                <td>
                    <span class="timestamp">
                        ${new Date(ticket.created).toLocaleString(undefined, {
                            weekday: 'short',
                            month: 'numeric',
                            year: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}
                    </span>
                </td>
            `;

        ticketElement.onclick = async () => {
            await displayTicket(ticket)

            // mark ticket or select it to be more specific
        }

        ticketLisElement.appendChild(ticketElement);
    }
}

async function renderTicketMessages(ticket, element){
    if(!ticket) throw new Error("No ticket found");
    if(!element) throw new Error("No element found");
    if(!ticket?.creator) throw new Error("No Creator found in ticket?");

    let messages = [
        {
            id: -1,
            creator: -1,
            message: "Ticket created",
            timestamp: 1777924310298,
        },
        {
            id: 1234,
            creator: {
                id: 123456789013,
                foa: "Herr",
                first_name: "Oompa",
                last_name: "Loompa",
                icon: null,
                company: {},
                contact: {
                    email: "oompa@willywonka.com"
                }
            },
            message: "Can you reset my password please?",
            timestamp: 1777924310299,
        },
        {
            id: -1,
            creator: -1,
            message: "Max Mustermann assigned the ticket to themselves",
            timestamp: 1777924310310,
        },
        {
            id: 5678,
            creator: {
                id: 123456789012,
                foa: "Herr",
                first_name: "Max",
                last_name: "Mustermann",
                icon: null,
                company: {},
                contact: {
                    email: "max.mustermann@email.com"
                }
            },
            message: "which email",
            timestamp: 1777924310399,
        },
        {
            id: 1234,
            message: "oompa@willywonka.com",
            creator: {
                id: 123456789013,
                foa: "Herr",
                first_name: "Oompa",
                last_name: "Loompa",
                icon: null,
                company: {},
                contact: {
                    email: "oompa@willywonka.com"
                }
            },
            timestamp: 1777924310499,
        },
    ]

    let sortedMessages = messages.sort((a, b) => a.timestamp - b.timestamp);

    for(let message of sortedMessages){
        let isSystem = message?.id === -1
        let isMine = message.creator.id === 123456789012;

        let creator = message.creator;
        let messageCode = null;

        // set some dummy data first or load config data
        if(isSystem){
            creator = {
                first_name: "System", // or display name setting
                second_name: "",
                contact: {
                    email: "system@domain.com" // also a setting soon
                }
            }
        }

        // lets set the full display name afterwards
        creator.fullname = `${creator.first_name} ${creator.last_name}`;
        let firstLetterName = creator?.first_name ? creator?.first_name[0] : null;
        let lastLetterName = creator?.last_name ? creator?.last_name[0] : null;
        let nameColor = letterColor(`${firstLetterName}${lastLetterName}`);

        // then create HTML lol
        if(isSystem){
            messageCode = `
                <div class="message-container system"><hr>
                    <p>${message.message}</p>
                </div>
            `
        }
        else if(!isSystem){
            messageCode = `            
                <div class="message-container ${isMine ? "mine" : ""}">
                    ${isMine === false ? `<div class="icon" style="${creator.icon ? "" : `background-color: ${nameColor}`}">${creator.icon ? "" : `${firstLetterName ?? "???"}${lastLetterName ?? ""}`}</div>` : ""}
                    <div class="content ${isMine ? "mine" : ""}">
                        <div class="meta">
                            ${creator?.fullname} &bull;
                            ${new Date(ticket.created).toLocaleString(undefined, {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            })}
                        </div>
                        <div class="message">
                            ${message.message}
                        </div>
                    </div>
                    ${isMine === true ? `<div class="icon" style="${creator.icon ? "" : `background-color: ${nameColor}`}">${creator.icon ? "" : `${firstLetterName ?? "???"}${lastLetterName ?? ""}`}</div>` : ""}
                </div>
            `
        }

        element.insertAdjacentHTML("beforeend", messageCode);
    }

}

async function displayTicket(ticket, renderElement = getDashboardContentElement()) {
    if (!ticket) throw new Error("no ticket supplied");
    if (!renderElement) throw new Error("no content element found");

    let creator = ticket.creator;
    creator.fullname = `${creator.foa} ${creator.first_name} ${creator.last_name}`;

    renderElement.innerHTML =
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
                    <p>Ticket created by <span class="owner">${creator.fullname}</span> &lt;${ticket.creator.contact.email ?? "??"}&gt; </p>
                </div>
            </div>
            
            <div class="ticket-content"></div>
            
            <div class="ticket-footer">
                <div class="top-actions">
                    <div class="action" data-action="public">
                        ${Icon.display("message")}
                        Public
                    </div>
                    <div class="action internal" data-action="internal">
                        ${Icon.display("message")}
                        Internal
                    </div>
                </div>
                
                <div class="editor"></div>
                
                <div class="bottom-actions">
                
                </div>
            </div>
        </div>
        `

    let messageContainer = renderElement.querySelector('.ticket-container > .ticket-content');
    renderTicketMessages(ticket, messageContainer);

    const editor = new RichEditor({
        selector: ".layout.admin > .page-content.admin > .ticket-container > .ticket-footer > .editor",
        toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["clean", "link", "image", "video"],
            ["code", "code-block", "blockquote"]
        ],
        onImg: async (src) => {

        },
        onSend: async (html) => {
            console.log("sending ", html)
        }
    });
}