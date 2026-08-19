import ExpressStarter from "@hackthedev/express-starter"
import FrontendLibs from "@hackthedev/frontend-libs";
import * as path from "node:path";
import {initDatabase} from "./db.mjs";
import * as fs from "node:fs";

let libDir = path.join(path.resolve(), "public", "js", "libs");

export let starter = new ExpressStarter()

export async function initSoftware(){
    await installFrontendLibs();
    await initDatabase();
    await setupWebServer()
}

export async function setupWebServer(){
    starter.registerErrorHandlers(); // avoid crashing and enable error logging
    starter.registerTemplateMiddleware({
        getPlaceholders: async (req) => {
            return [
                ["project.name", () => "Tickets"],
                ["page.title", async () => "some Title"]
            ]
        }
    });

    // important for a api!!
    starter.app.use((req, res, next) => {
        if (!req.path.startsWith("/api/")) return next();

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Vary", "Origin");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        res.header("Access-Control-Max-Age", "86400");
        res.set("Cache-Control", "no-store");

        if (req.method === "OPTIONS") {
            return res.sendStatus(204);
        }

        next();
    });

    // bug fix
    starter.app.get("/", (req, res) => {
        res.redirect("/index.html");
    });

    starter.app.use(starter.express.static(starter.dirname + "/public")); // serve static files
    starter.startHttpServer(5000) // begin listening on whatever port
}

export async function installFrontendLibs(){
    const results = await FrontendLibs.installMultiple([
        { package: '@hackthedev/icons@latest', path: libDir },
        { package: '@hackthedev/rich-editor@latest', path: libDir },
    ]);

    results.forEach((r) => {
        if(r?.success || r?.skipped){
            console.log(r?.message)
        }
        else{
            console.error(r?.message)
        }
    });
}