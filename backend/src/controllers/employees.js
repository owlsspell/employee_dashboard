import prisma from "../../db.js"
import _ from "lodash"

export const getEmployees = async (req, res) => {
    const { numberOfNotes, page } = req.query
    const skip = Number((numberOfNotes * (page - 1)))
    const employees = await prisma.employees.findMany({
        take: +numberOfNotes,
        skip
    })
    const count = await prisma.employees.count()
    return res.json({ employees, count })
}

export const createEmployee = async (req, res) => {
    const employee = req.body;
    console.log('employee,', employee);
    try {
        await prisma.employees.create({ data: employee })

        return res.send("Successfully!");
    } catch (err) {
        return res.status(404).send(err.message);
    }
}

export const editEmployeeData = async (req, res) => {
    const employee = req.body;
    console.log('employee,', employee);
    try {
        await prisma.employees.update({ where: { id: employee.id }, data: employee })
        return res.send("Successfully!");
    } catch (err) {
        return res.status(404).send(err.message);
    }
}