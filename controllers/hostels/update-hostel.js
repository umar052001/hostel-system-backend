const handleUpdate = (req, res, db) => {
  const { id } = req.params;
  const { size, gas, airconditioner, location, price } = req.body;
  if (!size || !price || !location) {
    return res.status(400).json("incorrect form submission");
  }
  db("hostels")
    .where({ id })
    .update({
      gas: gas,
      location: location,
      airconditioner: airconditioner,
      price: price,
      size: size,
    })
    .then((hostels) => {
      res.json(hostels[0]);
    })
    .catch((err) => res.status(400).json("unable to update data"));
};

module.exports = {
  handleUpdate: handleUpdate,
};
