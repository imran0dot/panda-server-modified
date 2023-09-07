const pathMethods = {};

pathMethods.insertUserRole = async (req, res) => {
    const role = req.body.role;
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const option = { upsert: true };
    const update = {
        $set: {
            role: role,
        }
    }
    const result = await userCollections.updateOne(query, update, option);
    res.send(result);
}

//update sit number
pathMethods.updateSitNum = async (req, res) => {
    const { sitNumber } = req.body;
    const id = req.params.id;

    const query = { _id: new ObjectId(id) };
    const option = { upsert: true };
    const update = {
        $set: {
            sitNumber: parseInt(sitNumber) - 1,
        }
    }
    const result = await classesCollections.updateOne(query, update, option);
    res.send(result);
}


module.exports = pathMethods;