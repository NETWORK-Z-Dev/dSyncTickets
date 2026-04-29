function getNavElement(){
    return document.querySelector('.layout.admin .navigation.admin');
}

function getNavAdminMenu(){
    return getNavElement()?.querySelector('.admin-menu') ?? null;
}

async function displayAdminMenu(){
    if(!getNavAdminMenu()) throw new Error('Admin menu element was not found');

    getNavAdminMenu().innerHTML = "";

    // fetch menu items here later. this is dummy text for now to build the ui.
    // also would be nice to add permission checks here on what items to show
    let menuItems = [
        {
            icon: "server",
            text: "Tickets",
            callback: async () => {
                console.log("load tickets here")
                displayTicketsInList();
            }
        },
        {
            icon: "server",
            text: "Meine Tickets",
            callback: async () => {
                console.log("load tickets here")
            }
        },
        {
            icon: "server",
            text: "Nicht-zugewiesene Tickets",
            callback: async () => {
                console.log("load tickets here")
            }
        },
        {
            icon: "server",
            text: "Dringende Tickets",
            callback: async () => {
                console.log("load tickets here")
            }
        },
        {
            icon: "server",
            text: "Statistik",
            callback: async () => {
                console.log("load tickets here")
            }
        }
    ]

    // create a HTML DOM element for each menu item and if a callback is referenced set it.
    // a callback is required - the idea is to add something like a lil scripting editor
    // so that the menu sidebar aka admin menu can be fully customized.
    for(let item of menuItems){
        let menuItemElement = document.createElement("a");
        menuItemElement.innerHTML = `${Icon.display(item.icon)} <span>${item.text}</span>`;

        // only sets the callback if its present - else its ignored for now
        if(item?.callback && typeof item.callback === "function"){
            menuItemElement.onclick = async () => {
                executeItemCallback(item);
            }
        }

        // actually add it to the website DOM
        getNavAdminMenu().appendChild(menuItemElement);
    }

    // auto-select and trigger first entry in nav
    let firstElement = getNavAdminMenu().firstElementChild;
    if(firstElement){
        firstElement.classList.add('active');
        let firstMenuItem = menuItems.find(item => item.text === firstElement.innerText);
        if(firstMenuItem) await executeItemCallback(firstMenuItem);
    }

    async function executeItemCallback(item){
        setTicketListTitle(item.text);
        await item.callback();
    }
}