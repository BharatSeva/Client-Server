const db = require("../database/postgres")
const stats = db.stats


const stat = async (req, res) => {
    const { health_id } = req.user;
    try {
        let stat = await stats.findOne({ where: { health_id } });
        if (!stat) {
            const defaultStats = {
                account_status: "Trial",
                available_money: "5000",
                profile_viewed: 0,
                profile_updated: 0,
                records_viewed: 0,
                records_created: 0,
            };
            stat = await stats.create({ health_id, ...defaultStats });
        }
        res.status(200).json({ stats: stat });
    } catch (err) {
        console.error("Error fetching preferences:", err.message);
        res.status(500).json({ status: 'Could not process your request' });
    }
};


module.exports = {
    stat,
}
