const express = require("express");
const cors = require("cors");
const dotEnv = require('dotenv');
const connectToMongoDB = require('./MongodbConnection/connectToMongoDB')
const path = require('path');
const { signJwt, verifyJWT } = require("./JWT/jwtFunc");
const {getPaidCources, paymentIntentStipe, paymentStore} = require("./Stripe/Stripe");
const { getSingleUser, getInstructors, getAllUsers, getSingleClass, getAllCourses, getInstructorsByID, getCartItems, getInroledId, getMyClasses, getPaymentHistory } = require("./Methods/getMethods");
const { addCourse } = require("./Methods/postMethods");
const { updateUserRole } = require("./Methods/putMehods");
const { insertUserRole, updateSitNum } = require("./Methods/patchMethods");
const { deleteUser } = require("./Methods/deleteMethods");



const app = express();
app.use(express.json());
dotEnv.config();
app.use(cors());
app.use(async (req, res, next) => {
    try {
        const { client, userCollections, classesCollections, paymentHistoryCollections } = await connectToMongoDB();
        req.client = client;
        req.userCollections = userCollections;
        req.classesCollections = classesCollections;
        req.paymentHistoryCollections = paymentHistoryCollections;

        next();
    }catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        res.status(500).send("Internal Server Error");
      }
})



app.post("/jwt", signJwt)

const port = process.env.PORT || 3300;

const run = async () => {
    try {
        
        //============================//
        //*********GET METHODS********//
        //============================//

        //get paidCourses
        app.get("/paid-courses", verifyJWT, getPaidCources )
         //stripe payment method
         app.post("/payments", paymentIntentStipe)
         
         //get single user
        app.get("/users/:email", getSingleUser)
        
        //get instructors by userRols
        app.get("/users/role/instructor", getInstructors)
        
        //get all users for admin
        app.get("/users", verifyJWT, getAllUsers);

        //get instructor by id
        app.get("/instructor/:id", getInstructorsByID)

        // get all classes
        app.get("/all-course", getAllCourses)

        //get single class 
        app.get("/course/", getSingleClass)

        //get cartItems
        app.get("/cart-items", getCartItems);

        //get enroled user
        app.get("/enroled/:id", verifyJWT, getInroledId);

        // get my classes 
        app.get("/my-classes", verifyJWT, getMyClasses);

        // get payment history 
        app.get("/payment-history", verifyJWT, getPaymentHistory);

        


        //============================//
        //********POST METHODS********//
        //============================//

        // add new course
        app.post("/add-new-course", addCourse)

        //add payment db to db
        app.post("/add-payment", paymentStore)

        
        //============================//
        //********PUT METHODS********//
        //============================//
        //udate user role
        app.put("/user-role", updateUserRole);

        
        //============================//
        //********PATCH METHODS********//
        //============================//

        //insert user role on db
        app.patch("/role/:id", verifyJWT, insertUserRole)

        // update sit number of a class 
        app.patch("/course/:id", updateSitNum)

        //delete uesrs
        app.delete("/user/remove/:id", deleteUser)


    } finally {
        //   await client.close();
    }
}

run().catch(console.dir);

app.listen(`${port}`, () => {
    console.log(`this port in runing on this port http://localhost:${port}`)
})