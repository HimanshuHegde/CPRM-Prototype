import { request, response } from 'express';
import {PrismaClient} from '../generated/prisma/index.js'
const prisma = new PrismaClient();
export const tokensAdd = async (req = request , res = response) => {
    try{
        let {departmentId,patient_name, status } = req.body
        console.log(req.body)
        
    await prisma.token_queue.create({
        data:{
            patient_name,
            status,
            department: {
                connect: {
                    dept_id: departmentId
                }
            }
        }
    })
    res.status(200).json({message:"success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
    
};

export const tokensDelete = async (req = request , res = response) => {
    try{
        let {token_id,departmentId,status } = req.body
        await prisma.token_queue.deleteMany({
            where: {
                OR: [
                token_id ? { token_id } : undefined,
                departmentId ? { departmentId } : undefined,
                status ? { status } : undefined
                ].filter(Boolean) 
            }
        });
        res.status(200).json({message:"success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}

export const tokensGet = async(req = request , res = response) => {
    try{
       let filters = []
        if(req.body){
            let { token_id, departmentId, status } = req.body;
            filters = [
             token_id ? { token_id } : undefined,
             departmentId ? { departmentId } : undefined,
             status ? { status } : undefined
           ].filter(Boolean);
        }


let data = await prisma.token_queue.findMany(
  filters.length > 0
    ? { where: { OR: filters } }
    : {} 
);

        res.status(200).json(data)
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}