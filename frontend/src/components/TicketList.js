import React,{useEffect,useState}from 'react';
import axios from 'axios';
import './TicketList.css'

function TicketList(){
    const [tickets,setTickets]=useState([]);
    const fetchTickets=async()=>{
        try{
            const res=await axios.get("http://localhost:5000/api/tickets");
            setTickets(res.data);
        }catch(error){
                     alert("Error fetching items:",error);
        }
    };
    const updateTicket = async(id,newStatus)=>{
        try{
            await axios.patch(`http://localhost:5000/api/tickets/${id}`,{status:newStatus});
            setTickets((prevTickets)=>
                prevTickets.map((ticket)=>
                    ticket._id===id?{...ticket,status:newStatus}:ticket));
        }catch(error){
            alert("Error while updating");
        }
    };
    const deleteTicket = async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/tickets/${id}`);
            setTickets(prevTickets=>prevTickets.filter(ticket=>ticket._id!==id));
        }catch(error){
            alert("error deleting ticket");
        }
    };
    useEffect(()=>{fetchTickets();
        window.addEventListener('ticketCreated',fetchTickets);
        return()=>window.removeEventListener('ticketCreated',fetchTickets)
    },[]);
    return(<div className='ticket-list'>
           <h2>Ticket List</h2>
           {tickets.length===0 && (<p>No Tickets Found in the database</p>)}

           <div className='ticket-grid'>
            {tickets.map((ticket)=>
            (<div key={ticket._id} className='ticket-card'>
                <h3>{ticket.title}</h3>
                <p><b>Priority:</b>{ticket.priority}</p>
                <p><b>Created By:</b>{ticket.createdby}</p>
                <p><b>Status:</b>{ticket.status}</p>
            <div className='ticket-buttons'>
                    <button onClick={()=>updateTicket(ticket._id,'In Progress')}>IN PROGRESS</button>
                    <button onClick={()=>updateTicket(ticket._id,'Resolved')}>RESOLVED</button>
                    <button className="delete-btn" onClick={()=>deleteTicket(ticket._id)}>DELETE</button>
                </div>
                </div>))}
            </div></div>);
}
export default TicketList;