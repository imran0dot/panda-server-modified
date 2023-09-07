const deleteMethods = {};

deleteMethods.deleteUser = async (req, res) => {
    const params = req.params.id;
    const query = { _id: new ObjectId(params) }
    const result = await userCollections.deleteOne(query);
    res.send(result);
}

module.exports = deleteMethods;