import { request, response } from "express";
import initPrisma from "../dbinit.js";

const prisma = await initPrisma();

export const departmentAdd = async (req = request, res = response) => {
    try {
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let { department_name,location} = req.body;
        await prisma.department.create({
            data: {
                department_name,
                location,
            },
        });
        res.status(200).json({ message: "success" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error" });
    }
};

export const departmentGet = async (req = request, res = response) => {
    try {
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let filters = [];
        if (req.body) {
            let { dept_id, department_name, location } = req.body;
            filters = [
                dept_id ? { dept_id } : undefined,
                department_name ? { department_name } : undefined,
                location ? { location } : undefined,
            ].filter(Boolean);
        }
        let data = await prisma.department.findMany(
            filters.length > 0 ? { where: { OR: filters } } : {}
        );
        res.status(200).json(data);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error" });
    }
};

export const departmentDelete = async (req = request, res = response) => {
    try {
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let { dept_id, department_name, location } = req.body;
        await prisma.department.deleteMany({
            where: {
                OR: [
                    dept_id ? { dept_id } : undefined,
                    department_name ? { department_name } : undefined,
                    location ? { location } : undefined,
                ].filter(Boolean),
            },
        });
        res.status(200).json({ message: "success" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error" });
    }
};


export const departmentUpdate = async (req = request, res = response) => {
    try {
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let { dept_id, department_name, location } = req.body;
        let update = {}
        if(department_name !== undefined) update.department_name = department_name;
        if(location !== undefined) update.location = location;
        await prisma.department.update({
            where: {
                dept_id,
            },
            data: update
        });
        res.status(200).json({ message: "success" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error" });
    }
};