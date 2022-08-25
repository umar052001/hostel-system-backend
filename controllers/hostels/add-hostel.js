const handleAdd = (req, res, db) => {
  const { email } = req.params;
  const { size, gas, airconditioner, location, price } = req.body;
  if (!size || !price || !location) {
    return res.status(400).json("incorrect form submission");
  }

  db.select("*")
    .from("owner")
    .where({ email })
    .returning("email")
    .then((ownerEmail) => {
      return db
        .insert({
          owneremail: ownerEmail[0].email,
          gas: gas,
          location: location,
          airconditioner: airconditioner,
          price: price,
          size: size,
        })
        .into("hostels");
    })
    .then((hostels) => {
      res.json(hostels[0]);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleAdd: handleAdd,
};
