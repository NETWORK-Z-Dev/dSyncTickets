import dSyncSql from "@hackthedev/dsync-sql"
import Logger from "@hackthedev/terminal-logger"

export let db = new dSyncSql({
    host: "127.0.0.1",
    port: 3306, // optional, default 3306
    user: "root",
    password: "test",
    database: "tickets",
    waitForConnections: true, // optional
    connectionLimit: 10, // optional
    queueLimit: 0, // optional
});

const tables = [
    {
        name: "tickets",
        columns: [
            {name: "id", type: "varchar(255) NOT NULL PRIMARY KEY UNIQUE KEY"},
            {name: "subject", type: "varchar(500) NOT NULL"},
            {name: "status", type: "varchar(255) NOT NULL"},
            {name: "creatorId", type: "varchar(255) NOT NULL"},
            {name: "assigneeId", type: "varchar(255) DEFAULT NULL"},
            {name: "createdAt", type: "bigint NOT NULL DEFAULT (UNIX_TIMESTAMP() * 1000)"},
            {name: "lastMessageAt", type: "bigint NOT NULL DEFAULT (UNIX_TIMESTAMP() * 1000)"},
        ]
    },
    {
        name: "ticket_keys",
        columns: [
            {name: "id", type: "varchar(255) NOT NULL PRIMARY KEY UNIQUE KEY"},
            {name: "ticketId", type: "varchar(500) NOT NULL UNIQUE KEY"},
            {name: "publicKey", type: "text DEFAULT NULL"},
        ]
    },
    {
        name: "ticket_participants",
        columns: [
            {name: "id", type: "varchar(255) NOT NULL PRIMARY KEY UNIQUE KEY"},
            {name: "ticketId", type: "varchar(500) NOT NULL UNIQUE KEY"},
            {name: "participantId", type: "varchar(255) NOT NULL"},
        ]
    },
    {
        name: "ticket_messages",
        columns: [
            {name: "id", type: "varchar(255) NOT NULL PRIMARY KEY UNIQUE KEY"},
            {name: "ticketId", type: "varchar(500) NOT NULL UNIQUE KEY"},
            {name: "type", type: "varchar(255) NOT NULL"},
            {name: "accountId", type: "int NOT NULL"},
            {name: "message", type: "text NOT NULL"},
        ]
    },
    {
        name: "accounts",
        columns: [
            {name: "id", type: "varchar(255) NOT NULL PRIMARY KEY UNIQUE KEY"},
            //
            {name: "name", type: "varchar(500) NOT NULL"},
            {name: "surname", type: "varchar(500) NOT NULL"},
            {name: "gender", type: "varchar(500) NOT NULL"},
            {name: "icon", type: "text NULL DEFAULT NULL"},
            //
            {name: "email", type: "varchar(500) NOT NULL UNIQUE KEY"},
            {name: "password", type: "text NOT NULL"},
            //
            {name: "publicKey", type: "text DEFAULT NULL"},
            //
            {name: "createdAt", type: "bigint NOT NULL DEFAULT (UNIX_TIMESTAMP() * 1000)"},
            {name: "isActivated", type: "int NOT NULL DEFAULT 0"},
        ]
    }
]

export async function initDatabase(){

    Logger.info("Waiting for database connection...");
    await db.waitForConnection();
    Logger.info("Connection established...");

    for (const table of tables) {
        await db.checkAndCreateTable(table);
    }
}