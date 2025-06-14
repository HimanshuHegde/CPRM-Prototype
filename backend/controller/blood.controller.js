import { request, response } from "express";
import initPrisma from "../dbinit.js";

const prisma = await initPrisma();

export const bloodGet = async (req = request, res = response) => {
    try {
        let role = ["admin","Doctor"]
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let filters = [];
        if (req.body) {
            let { blood_id, blood_type, status } = req.body;
            filters = [
                blood_id ? { blood_id } : undefined,
                blood_type ? { blood_type } : undefined,
                status ? { status } : undefined,
            ].filter(Boolean);
        }
        let data = await prisma.blood_bank.findMany(
            filters.length > 0 ? { where: { OR: filters } } : {}
        );
        res.status(200).json(data);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error" });
    }
};

export const bloodAdd = async (req = request, res = response) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let { blood_type, units_available, critical_level,status } = req.body;
        await prisma.blood_bank.create({
            data: {
                blood_type,
                units_available,
                critical_level,
                status,
            },
        });
        res.status(200).json({ message: "success" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error" });
    }
};

export const bloodUpdate = async (req = request, res = response) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let { blood_id, blood_type, units_available, critical_level,status } = req.body;
        let update = {};
        if (blood_type !== undefined) update.blood_type = blood_type;
        if (units_available !== undefined) update.units_available = units_available;
        if (critical_level !== undefined) update.critical_level = critical_level;
        if (status !== undefined) update.status = status;
        await prisma.blood_bank.update({
            where: {
                blood_id,
            },
            data: update
        });
        res.status(200).json({ message: "success" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error" });
    }
};

export const bloodDelete = async (req = request, res = response) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        let { blood_id, blood_type, status } = req.body;
        await prisma.blood_bank.deleteMany({
            where: {
                OR: [
                    blood_id ? { blood_id } : undefined,
                    blood_type ? { blood_type } : undefined,
                    status ? { status } : undefined,
                ].filter(Boolean),
            },
        });
        res.status(200).json({ message: "success" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error" });
    }
};