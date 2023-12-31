import prisma from "../../db.js"
import _ from "lodash"
import dayjs from "dayjs";

export const getUniqueFields = async (req, res) => {
    try {
        const result = await prisma.employees.groupBy({
            by: [req.query.column],
            _count: true,
        })
        let maxValue = 0
        const resultData = result.map((item) => {
            if (item._count > maxValue) maxValue = item._count
            return { name: item[req.query.column], value: item._count }
        });
        return res.json({ data: resultData, maxValue });

    } catch (err) {
        return res.status(404).send(err.message);
    }
}

export const getColumnAndCount = async (req, res) => {
    try {
        const result = await prisma.employees.findMany({
            select: {
                date: true
            },
            orderBy: [
                {
                    date: 'asc',
                },
            ],
        })
        const rowArr = result.reduce((acc, item) => { acc.push(dayjs(Number(item.date)).format("YYYY-MM-DD")); return acc }, [])
        const counts = _.countBy(rowArr)
        const timeArr = Object.keys(counts).map(key => ([key, counts[key]]));

        return res.json({ timeArr });
    } catch (err) {
        return res.status(404).send(err.message);
    }
}
