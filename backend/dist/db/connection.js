import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    try {
        await connect("mongodb+srv://nishanttiwari:vOspI70KMf1l8kb4@cluster0.g3ltv38.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0");
    }
    catch (error) {
        throw new Error("Cannot connect to database");
    }
}
async function disconnectFromDatabase() {
    try {
        await disconnect();
        console.log("Disconnected from database");
    }
    catch (error) {
        throw new Error("Cannot disconnect from database");
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map