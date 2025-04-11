import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
    // put application routes here
    // prefix all routes with /api

    // use storage to perform CRUD operations on the storage interface
    // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

    app.get("/api/hello", (_req: Request, res: Response) => {
        res.json({ message: "Hello from the API" });
    });

    const httpServer = createServer(app);

    return httpServer;
}
