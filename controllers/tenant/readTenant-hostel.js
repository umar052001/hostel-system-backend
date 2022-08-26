const handleTenantHostels = (req, res, db) => {
  const { email } = req.params;

  db.select()
    .from("hostels")
    .then((hostels) => {
      res.json(hostels);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleTenantHostels: handleTenantHostels,
};
