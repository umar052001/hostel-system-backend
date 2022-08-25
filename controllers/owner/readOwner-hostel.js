const handleOwnerHostels = (req, res, db) => {
  const { email } = req.params;
  db.select()
    .from("hostels")
    .where("owneremail", "=", email)
    .then((hostels) => {
      res.json(hostels);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleOwnerHostels: handleOwnerHostels,
};
