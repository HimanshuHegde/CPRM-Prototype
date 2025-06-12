import { request, response } from "express";
import initPrisma from "../dbinit.js";

const prisma = await initPrisma();

export const scheduleGet = async(req = request, res = response) => {
    try{
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let filters = [];
        if(req.body){
            let {schedule_id,type,doctor_name,patient_name,date,start_time,end_time,status,departmentId} = req.body;
            filters = [
                schedule_id ? {schedule_id} : undefined,
                type ? {type} : undefined,
                doctor_name ? {doctor_name} : undefined,
                patient_name ? {patient_name} : undefined,
                date ? {date} : undefined,  
                start_time ? {start_time} : undefined,
                end_time ? {end_time} : undefined,
                status ? {status} : undefined,
                departmentId ? {departmentId} : undefined
            ].filter(Boolean);
        }
        let data = await prisma.schedule.findMany(
            filters.length > 0 ? {where:{OR:filters}} : {}
        );
        res.status(200).json(data)
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}

export const scheduleAdd = async(req = request, res = response) => {
    try{
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let {type,doctor_name,patient_name,date,start_time,end_time,status,departmentId} = req.body;
        await prisma.schedule.create({
            data: {
                type,
                doctor_name,
                patient_name,
                date,
                start_time,
                end_time,
                status,
                departmentId
            }
        });
        res.status(200).json({message:"success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}

export const scheduleUpdate = async(req = request, res = response) => {
    try{
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let {schedule_id,type,doctor_name,patient_name,date,start_time,end_time,status,departmentId} = req.body;
        await prisma.schedule.update({
            where: {
                schedule_id
            },
            data: {
                type,
                doctor_name,
                patient_name,
                date,
                start_time,
                end_time,
                status,
                departmentId
            }
        });
        res.status(200).json({message:"success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}

export const scheduleDelete = async(req = request, res = response) => {
    try{
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let {schedule_id} = req.body;
        await prisma.schedule.deleteMany({
            where: {
                schedule_id
            }
        });
        res.status(200).json({message:"success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}