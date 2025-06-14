import { request,response } from "express";
import initPrisma from "../dbinit.js";

const prisma = await initPrisma();

export const drugAdd = async (req = request , res = response) => {
    try{
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let {drug_name,stock_qty,reorder_level,status} = req.body
        await prisma.drug_inventory.create({
            data: {
                drug_name,
                stock_qty,
                reorder_level,
                status
            }
        })
        res.status(200).json({message:"success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}

export const drugGet = async (req = request , res = response) => {
    try{
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let filters = []
        if(req.body){
            let {drug_id,drug_name,stock_qty,reorder_level,status} = req.body
            filters = [
                drug_id ? {drug_id} : undefined,
                drug_name ? {drug_name} : undefined,
                stock_qty ? {stock_qty} : undefined,
                reorder_level ? {reorder_level} : undefined,
                status ? {status} : undefined
            ].filter(Boolean)
        }
        let data = await prisma.drug_inventory.findMany(
            filters.length > 0 ? {where:{OR:filters}} : {}
        );
        res.status(200).json(data)
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}

export const drugUpdate = async (req = request , res = response) => {
    try{
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let {drug_id,drug_name,stock_qty,reorder_level,status} = req.body
        let update = {}
        if(drug_name !== undefined) update.drug_name = drug_name;
        if(stock_qty !== undefined) update.stock_qty = stock_qty;
        if(reorder_level !== undefined) update.reorder_level = reorder_level;
        if(status !== undefined) update.status = status;
        await prisma.drug_inventory.update({
            where: {
                drug_id
            },
            data: update
        });
        res.status(200).json({message:"success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}

export const drugDelete = async (req = request , res = response) => {
    try{
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let {drug_id,drug_name,status} = req.body
        await prisma.drug_inventory.deleteMany({
            where: {
                OR: [
                    drug_id ? {drug_id} : undefined,
                    drug_name ? {drug_name} : undefined,
                    status ? {status} : undefined
                ].filter(Boolean)
            }
        });
        res.status(200).json({message:"success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}