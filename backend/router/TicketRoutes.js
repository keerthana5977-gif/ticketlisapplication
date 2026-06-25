const express=require('express')
const router=express.Router();
const Ticket=require('../models/Ticket');

router.post('/',async(req,res)=>{
    try{
        const newTicket=new Ticket({
            title:req.body.title,
            description:req.body.description,
            priority:req.body.priority,
            createdby:req.body.createdby

        });
        const savedTicket=await newTicket.save();
        res.status(201).json(savedTicket);
    }catch(err){
        res.status(400).json({message:"Failed to save ticket",error:err.message});  
    }
});

router.get('/',async(req,res)=>{
    try{
        const tickets=await Ticket.find();
        res.json(tickets);
    }catch(err){
        res.status(500).json({message:"Failed to retrieve tickets",error:err.message});
    }
});

router.patch('/:id',async(req,res)=>{
    try{
        const updateTicket=await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,{new:true}
        );
        res.json(updateTicket);
    }catch(err){
        res.status(400).json({message:err});
    }
});

router.delete('/:id',async(req,res)=>{
    await Ticket.findByIdAndDelete(req.params.id);
    res.json(400).json({error:err,message});
});
module.exports=router;