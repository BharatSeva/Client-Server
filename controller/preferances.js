const { db } = require("../database/postgres")
const StatusCode = require("http-status-codes")
const preferances = db.pref
const stats = db.stats

const get_pref = async (req, res) => {
    const { health_id } = req.user;
    try {
        let pref = await preferances.findOne({ where: { health_id }, attributes: { exclude: ['__v', 'id', 'health_id'] } });
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
        console.error("Error fetching preferences:", err);
        res.status(500).json({ status: 'Could not process your request' });
    }
};

const update_pref = async (req, res) => {
    const { health_id } = req.user;
    const { view_permission, email, locked_account } = req.body;

    try {
        // validate email
        const validEmailPreferences = ["Every Event", "Weekly", "Opt Out", "Monthly"];
        if (email && !validEmailPreferences.includes(email)) {
            return res.status(406).json({
                status: "Invalid email preference",
                message: `Email preference must be one of ${JSON.stringify(validEmailPreferences)}`
            });
        }

        // check wheather this client exists or not
        const pref = await preferances.findOne({
            where: { health_id },
            attributes: { exclude: ['__v', 'id'] }
        });

        if (!pref) {
            return res.status(StatusCode.NOT_FOUND).json({
                status: "Not Found",
                message: "Preferences not found for the given health ID"
            });
        }

        const updatedFields = {};
        if (view_permission !== undefined) updatedFields.view_permission = view_permission;
        if (email !== undefined) updatedFields.email = email;
        if (locked_account !== undefined) updatedFields.locked_account = locked_account;

        if (Object.keys(updatedFields).length > 0) {
            await pref.update(updatedFields);
        }

        res.status(200).json({
            status: "Success",
            message: "Preferences updated successfully",
            preferences: pref
        });
    } catch (err) {
        console.error("Error updating preferences:", err);
        res.status(500).json({
            status: "Error",
            message: "Could not process your request"
        });
    }
};


const stat = async (req, res) => {
    const { health_id } = req.user;
    try {
        let stat = await stats.findOne({ where: { health_id } });
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
