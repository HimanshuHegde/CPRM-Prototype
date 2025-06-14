import { request, response } from 'express';
import initPrisma from '../dbinit.js';

const prisma = await initPrisma()
export const tokensAdd = async (req = request , res = response) => {
    try{
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let {departmentId,patient_name } = req.body
        console.log(req.body)
        
    await prisma.token_queue.create({
        data:{
            patient_name,
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
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let {token_id,departmentId,status } = req.body
        await prisma.token_queue.deleteMany({
            where: {
    ...(token_id && { token_id }),
    ...(departmentId && { departmentId }),
    ...(status && { status }),
  },
        });
        res.status(200).json({message:"success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}

export const tokensGet = async(req = request , res = response) => {
    try{
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
       let filters = []
        if(req.body){
            let { token_id, departmentId, status,departmentName } = req.body;
            filters = [
             token_id ? { token_id } : undefined,
             departmentName ? { department: { department_name: departmentName } } : undefined,
             departmentId ? { departmentId } : undefined,
             status ? { status } : undefined
           ].filter(Boolean);
        }
        let data = await prisma.token_queue.findMany(
            filters.length > 0
                ? { where: { OR: filters },include:{department:true} }
                : {include:{department:true}} 
                
        );

        res.status(200).json(data)
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}

export const tokensUpdate = async (req = request , res = response) => {
    try{
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let {token_id,departmentId, patient_name, status } = req.body

        const updateData = {};
        if (departmentId !== undefined) updateData.departmentId = departmentId;
        if (patient_name !== undefined) updateData.patient_name = patient_name;
        if (status !== undefined) updateData.status = status;
        await prisma.token_queue.update({
            where: {
                token_id 
            },
            data: updateData
        });
        res.status(200).json({message:"success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error"})
    }
}