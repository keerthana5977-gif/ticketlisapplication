import React,{useState} from "react";
import axios from 'axios';
import './TicketForm.css'


function TicketForm(){
    const[form,setForm]=useState({
        title:'',
        description:'',
        priority:'',
        createdby:''
    });
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
    try{
         await axios.post("http://localhost:5000/api/tickets",form);
         alert("Ticket Created");
         setForm({title:'',description:'',priority:'',createdby:''});
         window.dispatchEvent(new Event('ticketCreated'));
    }catch(error){
        alert("Error creating ticket.Please try again");
        console.error(error);
    }
};
return(
    <div className="ticket-form">
        <h2>Ticket Tracker</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title:</label><br></br>
                <input type="text" id="title" name="title" value={form.title} onChange={handleChange} required/><br></br>
                <label htmlFor="description">Description:</label><br></br>
                <textarea id="description" name="description" value={form.description} onChange={handleChange} required/><br></br>
                <label htmlFor="priority">Priority:</label><br></br>
                <select name="priority" id="priority" value={form.priority} onChange={(handleChange)} required>
                    <option value="">Select</option>
                    <option value="Low">LOW</option>
                    <option value="Medium">MEDIUM</option>
                    <option value="High">HIGH</option>
                </select><br></br>
                <label htmlFor="createdby">Your Name:</label><br></br>
                <input type="text" id="createdby" name="createdby" value={form.createdby}  onChange={handleChange} required/><br></br>
                <button type="submit" className="submit-btn" >Create Ticket</button>
            </div>
        </form>
    </div>
);
}
export default TicketForm;

