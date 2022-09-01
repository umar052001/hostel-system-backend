const handleTenantSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db.select("email", "password")
    .from("tenant")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].password);
      if (isValid) {
        return db
          .select("*")
          .from("tenant")
          .where("email", "=", email)
          .then((owner) => {
            res.json(owner[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("unable to signin"));
};

module.exports = {
  handleTenantSignin: handleTenantSignin,
};
