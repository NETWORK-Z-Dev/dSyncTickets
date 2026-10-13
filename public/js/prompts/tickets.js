let prompt = null;

document.addEventListener("DOMContentLoaded", function (event) {
    prompt = new Prompt();
})

function getTicketHeaderHTML(){
    return ` 
        <div class="ticket-header">
             <div class="input-group">
                <div class="group-field">
                    <label>Creator</label>
                    <input type="text" list="options" placeholder="Suchen...">
                    <datalist id="options">
                        <option value="Apple">
                        <option value="Banana">
                        <option value="Orange">
                    </datalist>
                </div>
                
                <div class="group-field">
                    <label>Email</label>
                    <input type="text" placeholder="Suchen...">
                </div>
                
                <div class="group-field">
                    <label>Phone</label>
                    <input type="text" placeholder="Suchen...">
                </div>
             </div>
            
            ${getBusinessTicketHeaderGroup()}                    
            ${getTicketClaimHeaderGroup()}
            ${getTicketStats()}
        </div>`
}

function getTicketInfoHTML(){
    return `            
            <div class="ticket-details">            
               ${getTicketHeaderHTML()}
                <hr>
                
                <div class="ticket-body">       
                    <div class="input-group">     
                        <div class="group-field">
                            <label>Subject</label>
                            <input type="text" placeholder="Subject...">  
                        </div>              
                            
                        <div class="group-field">
                            <label>Description</label>
                            <textarea></textarea>
                        </div>
                    </div>
                </div>
            
            </div>
        `
}

function createTicketPrompt() {
    prompt.showPrompt("Create Ticket",
        getTicketInfoHTML()
    )
}

function getTicketClaimHeaderGroup(){
    return `
        <div class="input-group">
            <div class="group-field">
                <label>Assignee</label>
                <input type="text" list="options" placeholder="Suchen...">
                <datalist id="options">
                    <option value="Apple">
                    <option value="Banana">
                    <option value="Orange">
                </datalist>
            </div>
            
            <div class="group-field">
                <label>Priority</label>
                <select id="ticket-priority">
                    <option value="13" selected>Normal</option>
                    <option value="13">Urgent</option>
                    <option value="13">None</option>
                </select>
            </div>
            
            <div class="group-field">
                <label>Created at</label>
                <input type="text" value="${new Date().toLocaleDateString()}" disabled>
            </div>
            
            <div class="group-field">
                <label>Deadline</label>
                <input type="text" value="${new Date(new Date().getTime() * 1.005).toLocaleDateString()}" disabled>
            </div>
         </div>
    `
}

function getBusinessTicketHeaderGroup() {
    return `
        <div class="input-group">
            <div class="group-field">
                <label>Client</label>
                <input type="text" list="options" placeholder="Suchen...">
                <datalist id="options">
                    <option value="Apple">
                    <option value="Banana">
                    <option value="Orange">
                </datalist>
            </div>
            
            <div class="group-field">
                <label>Approver</label>
                <input type="text" list="options" placeholder="Suchen...">
                <datalist id="options">
                    <option value="Apple">
                    <option value="Banana">
                    <option value="Orange">
                </datalist>
            </div>
            
            <div class="group-field">
                <label>Email</label>
                <input type="text" placeholder="Suchen...">
            </div>
            
            <div class="group-field">
                <label>Phone</label>
                <input type="text" placeholder="Suchen...">
            </div>
        </div>
    `
}

function getTicketStats() {
    return `
        <div class="input-group">
            <div class="group-field">
                <table>
                    <tr>
                        <td>monthly CLA:</td>
                        <td>600€</td>
                    </tr>
                    <tr>
                        <td>Hourly Rate:</td>
                        <td>180€ / h</td>
                    </tr>
                    <tr>
                        <td>monthly average revenue:</td>
                        <td>800€</td>
                    </tr>
                    <tr>
                        <td>Billed this month:</td>
                        <td>354€</td>
                    </tr>
                    <tr>
                        <td>Total pending bills:</td>
                        <td>154€</td>
                    </tr>
                </table>
            </div>
        </div>
    `
}