import ExpressStarter from "@hackthedev/express-starter"
import FrontendLibs from "@hackthedev/frontend-libs";
import * as path from "node:path";

let libDir = path.join(path.resolve(), "public", "js", "libs");

export let starter = new ExpressStarter()

export async function initSoftware(){
    await installFrontendLibs();
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
        { package: '@hackthedev/icons@1.0.5', path: libDir },
        { package: '@hackthedev/rich-editor', path: libDir },
        { package: '@hackthedev/rich-editor', path: libDir },
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