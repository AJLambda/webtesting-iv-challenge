const db = require("../data/dbConfig.js");
const Hobbits = require("./hobbitsModel.js");

describe("hobbits", () => {
  afterEach(async () => {
    await db("hobbits").truncate();
  });

  describe("insert()", () => {
    it("should insert provided hobbit", async () => {
      await Hobbits.insert({ name: "bilbo" });

      const hobbits = await db("hobbits");

      expect(hobbits).toHaveLength(1);
    });

    it("should insert provided hobbit", async () => {
      let hobbit = await Hobbits.insert({ name: "bilbo" });
      expect(hobbit.name).toBe("bilbo");

      hobbit = await Hobbits.insert({ name: "samwise" });
      expect(hobbit.name).toBe("samwise");

      const hobbits = await db("hobbits");

      expect(hobbits).toHaveLength(2);
    });
  });
});
