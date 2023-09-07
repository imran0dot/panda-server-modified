const putMethods = {};

putMethods.updateUserRole = async (req, res) => {
    const email = req.query.email;
    const existData = req.body;
    const query = { email: email };
    const option = { upsert: true };
    const update = {
        $set: {
            image: existData.image,
            email: email,
            name: existData.name,
            address: existData.address,
            role: existData.role,
        }
    }
    const result = await userCollections.updateOne(query, update, option)
    console.log(result);
    res.send(result);
}

module.exports = putMethods;