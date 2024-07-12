import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://leonelroman:${
  import.meta.env.DB_PASS
}@cluster0.fo3dmlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDb() {
  try {
    await client.connect();
    const res = await client.db("ask").command({ ping: 1 });
    console.log("connected to db");
  } catch (e) {
    console.log(e);
    await client.close();
  }
}

export const usersModel = client.db("ask").collection("users");

export const postsModel = client.db("ask").collection("posts");
