const { MongoClient, ServerApiVersion } = require('mongodb');

const connectToMongoDB = async() => {
    const uri = `mongodb+srv://detectiveseo1:ePmpg73pgyo5fRRU@cluster0.76wfrxb.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try{
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // database collections 
        const userCollections = client.db("USER").collection("users");
        const classesCollections = client.db("COURSE").collection("classes");
        const paymentHistoryCollections = client.db("PAYMENT").collection("CoursePayment");


        return { client, userCollections, classesCollections, paymentHistoryCollections }; 

    }catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
      }
}

module.exports = connectToMongoDB;