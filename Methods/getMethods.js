const getMethodsFunc = {};
const { ObjectId } = require('mongodb');

getMethodsFunc.getSingleUser = async (req, res) => {
    const params = req.params.email;
    const query = { email: params };
    const result = await req.userCollections.findOne(query);
    res.send(result);
}

//get instruntors by role
getMethodsFunc.getInstructors = async (req, res) => {
    const query = { role: "instructor" };
    const result = await req.userCollections.find(query).toArray();
    res.send(result)
}

//get Instructors by id 
getMethodsFunc.getInstructorsByID = async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id), role: "instructor" };
    const result = await req.userCollections.find(query).toArray();
    res.send(result);
}

//get all users for admin
getMethodsFunc.getAllUsers = async (req, res) => {
    const useEmail = req.decoded.email;
    const findUser = { email: useEmail };
    const getAdmin = await req.userCollections.findOne(findUser);
    if (getAdmin?.role !== "admin") {
        res.status(401).send("unauthorize accesse")
    } else {
        const result = await req.userCollections.find().toArray();
        res.send(result)
    }
}

//getCourses funtion
getMethodsFunc.getAllCourses = async (req, res) => {
    const key = req.query.keys;
    let query = {};
    if (key) {
        query = { name: { $regex: key, $options: "i" } }
    }
    const result = await req.classesCollections.find(query).toArray();
    res.send(result);
}

//get single class funtion
getMethodsFunc.getSingleClass = async (req, res) => {
    const id = req.query.id;
    const query = { _id: new ObjectId(id) };
    const result = await req.classesCollections.findOne(query);
    res.send(result);
}


//get cart items 
getMethodsFunc.getCartItems = async (req, res) => {
    const items = req.query.items;
    let query = {};
    if (items) {
        const itemIds = items.map(itemId => new ObjectId(itemId));
        query = { _id: { $in: itemIds } }
        const result = await req.classesCollections.find(query).toArray();
        res.send(result);
    } else {
        res.send([])
    }
}

//get enroled user
// TODO
getMethodsFunc.getInroledId = async (req, res) => {
    const exactCoursId = req.params.id;
    const query = { courseId: exactCoursId }
    const getPaidUser = await req.paymentHistoryCollections.findOne(query);
    if (getPaidUser) {
        const paidUserEmail = getPaidUser.email;
        const userEmail = req.decoded.email;
        if (paidUserEmail === userEmail) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
    else {
        res.send(false);
    }
}

//get my classes 
getMethodsFunc.getMyClasses = async (req, res) => {
    const email = req.decoded?.email;
    const paidCourse = await paymentCollections.find({ email: email }, { projection: { courseId: 1, _id: 0 } }).toArray();
    const courseIds = paidCourse.map(item => item.courseId);
    const query = { _id: { $in: courseIds.map(id => new ObjectId(id)) } }
    const result = await classesCollections.find(query).toArray();
    res.send(result);
}

//get payment history 
getMethodsFunc.getPaymentHistory = async (req, res) => {
    const email = req.decoded?.email;
    const paidCourse = await paymentCollections.find({ email: email }).toArray();
    res.send(paidCourse)
}




module.exports = getMethodsFunc