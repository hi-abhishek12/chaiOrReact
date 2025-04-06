import {client , Account} from appwrite;

const client = new client().setEndpoint("https://cloud.appwrite.io/v1")
.setProjectId("67f21b4b002a14fb48ad");

const account = new account(client);
