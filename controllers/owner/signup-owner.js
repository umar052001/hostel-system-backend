const handleOwnerRegister = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json("incorrect form submission");
  }
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  db.transaction((trx) => {
    trx
      .insert({
        email: email,
        password: hash,
        name: name,
      })
      .into("owner")
      .then((owner) => {
        res.json(owner[0]);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json(err));
};

module.exports = {
  handleOwnerRegister,
};
