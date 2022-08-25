const handleDelete = (req, res, db) => {
  const { id } = req.params;

  db("hostels")
    .where({ id })
    .del()
    .then((hostels) => {
      res.json(hostels[0]);
    })
    .catch((err) => res.status(400).json("unable to delete data"));
};

module.exports = {
  handleDelete: handleDelete,
};
