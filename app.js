const Arweave = require("arweave/node");
const fs = require("fs");
const utf8 = require("utf8");

var arweave;
var Queue = require("bull");
var rsaKey = "";
var config = require("./config");
var gplay = require("google-play-scraper").memoized();
var jobQueue = new Queue("jobqueue", {
  redis: {
    port: config.redis.port,
    host: config.redis.host,
    password: config.redis.pass
  }
});
const version = "0.7";
var counter = 0; // we have in total 120 types

// sleep time expects milliseconds
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// core of the app
jobQueue.process(function(job, done) {
  counter = counter + 1;
  console.log(
    "Working on -> %s %s (%d/120)",
    job.data.category,
    job.data.collection,
    counter
  );

  gplay
    .list({
      //category: gplay.category.APPLICATION,
      //collection: gplay.collection.TOP_PAID,
      category: job.data.category,
      collection: job.data.collection,
      num: 30
    })
    .then(resp => {
      // some items are not formatted ok, so quotes appear not escaped
      resp = resp.map(function(element) {
        element.summary = utf8.encode(element.summary);
        element.summary = Buffer.from(element.summary).toString("base64");
        return element;
      });

      var appList = {
        category: job.data.category,
        type: job.data.collection,
        items: resp
      };

      (async () => {
        await publishOnArweave(appList, job.data.category, job.data.collection);
      })();
    });

  // don't let google ban you
  sleep(15000).then(() => {
    done();
  });
});

// publishes the payload to arweave
async function publishOnArweave(payload, categoryType, collectionType) {
  console.log("publishing it to Arweave....................");

  let transaction = await arweave.createTransaction(
    {
      data: JSON.stringify(payload)
    },
    rsaKey
  );
  transaction.addTag("Feed-Name", "googleplay-history");
  transaction.addTag("Category", categoryType);
  transaction.addTag("Type", collectionType);
  transaction.addTag("Date", new Date().toISOString().slice(0, 10));
  await arweave.transactions.sign(transaction, rsaKey);
  const response = await arweave.transactions.post(transaction);
  return response;
}

// when there aren't any other queues to process
jobQueue.on("drained", function(job, result) {
  console.log("jobQueue finished...");
});

// -------------- MAIN -------------
console.log("Starting Google Play History Arweave version %s", version);

// payload for sending to storage
var payload = [];
jobQueue.empty();

// load the wallet
arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false // Enable network request logging
});
let rsaKeyText = fs.readFileSync(config.arweaveWalletPath);
rsaKey = JSON.parse(rsaKeyText);

arweave.wallets.jwkToAddress(rsaKey).then(address => {
  arweave.wallets.getBalance(address).then(balance => {
    let ar = arweave.ar.winstonToAr(balance);
    console.log("Loaded wallet %s with ballance %f AR", address, ar);
  });
});

// add jobs to the queue....
Object.keys(gplay.category).forEach(function(item) {
  jobQueue.add({
    category: item,
    collection: gplay.collection.TOP_FREE
  });
  jobQueue.add({
    category: item,
    collection: gplay.collection.TOP_PAID
  });
});
