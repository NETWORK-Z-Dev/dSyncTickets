import ExpressStarter from "@hackthedev/express-starter"
import FrontendLibs from "@hackthedev/frontend-libs";
import * as path from "node:path";
import {initDatabase} from "./db.mjs";

let libDir = path.join(path.resolve(), "public", "js", "libs");

export let starter = new ExpressStarter()

export async function initSoftware(){
    await installFrontendLibs();
    await initDatabase();
    await setupWebServer()
}

export async function setupWebServer(){
    starter.registerErrorHandlers(); // avoid crashing and enable error logging
    starter.registerTemplateMiddleware(); // cool template engine
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