const postMethods = {};

//add new course
postMethods.addCourse = async (req, res) => {
    const body = req.body;
    const result = await classesCollections.insertOne(body);
    res.send(result);
}


module.exports = postMethods;