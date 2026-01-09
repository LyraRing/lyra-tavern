const { getAllPosts, getAllDocs } = require("./src/lib/markdown");

async function test() {
  console.log("Testing getAllPosts...");
  try {
    const posts = await getAllPosts();
    console.log(`Success! Found ${posts.length} posts.`);
  } catch (e) {
    console.error("Error in getAllPosts:", e);
  }

  console.log("Testing getAllDocs...");
  try {
    const docs = await getAllDocs();
    console.log(`Success! Found ${docs.length} docs.`);
  } catch (e) {
    console.error("Error in getAllDocs:", e);
  }
}

test();
