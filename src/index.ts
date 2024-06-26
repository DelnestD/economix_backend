import { config } from "dotenv";
import { DatabaseConnection } from "./core/database/connection";
import { initApi } from "./api";
import { seeder } from "./core/database/seeder";

async function initApplication() {
    config({
        path: "dev.env",
    });

    await DatabaseConnection.init();
    const databaseInstance = DatabaseConnection.getConnection();

    if (process.env.DB_REFRESH === "true") {
        console.log("Refreshing de la DB ...");

        await databaseInstance.dropDatabase();
        await databaseInstance.synchronize();
        await seeder();
    } else {
        await databaseInstance.synchronize();
    }

    await initApi();
}

initApplication();
