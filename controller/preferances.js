const { db } = require("../database/postgres")
const preferances = db.pref
const stats = db.stats

const get_pref = async (req, res) => {
    const { health_id } = req.user;
    try {
        let pref = await preferances.findOne({ where: { health_id } });
        if (!pref) {
            const defaultPreferences = {
                view_permission: true,
                locked_account: false,
                email: 'Every Event',
            };
            pref = await preferances.create({ health_id, ...defaultPreferences });
        }
        res.status(200).json({ preferences: pref });
    } catch (err) {
        console.error("Error fetching preferences:", err.message);
        res.status(500).json({ status: 'Could not process your request' });
    }
};

const update_pref = async (req, res) => {
    const { health_id } = req.user;
    const { view_permission, email, locked_account } = req.body;

    try {
        const pref = await preferances.findOne({ where: { health_id } });

        if (!pref) {
            res.status(404).json({ status: "Not found" });
            return;
        }

        // Update only if fields are provided in the request body
        if (view_permission !== undefined) pref.view_permission = view_permission;
        if (email !== undefined) pref.email = email;
        if (locked_account !== undefined) pref.locked_account = locked_account;

        await pref.save();

        res.status(200).json({ status: "Preferences updated successfully", preferences: pref });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: 'Could not process your request' });
    }
};

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
    get_pref,
    update_pref,

    stat,
}
