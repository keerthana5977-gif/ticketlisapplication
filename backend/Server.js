const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ticketDB').then(()=>console.log("MongoDB connected..")).catch(err=>console.log(err));

//use route
const ticketroute=require('./router/TicketRoutes');
app.use('/api/tickets',ticketroute);

app.listen(5000,()=>console.log("server is running on port 5000"));
