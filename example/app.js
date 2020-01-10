const { or, equals, and } = require("arql-ops");
const Arweave = require("arweave/node");

var arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false
});

const myQuery = and(
  equals("from", "ZGt8zl7EJyMMEQ_j4kLaAYlEFOhrgYSEOw6eFPhIV0Y"),
  equals("Feed-Name", "googleplay-history"),
  or(
    equals("Date", "2020-01-10"),
    equals("Category", "PARENTING"),
    equals("Type", "topselling_free")
  )
);

(async () => {
  const results = await arweave.arql(myQuery);
  console.log("results :", results);
})();
