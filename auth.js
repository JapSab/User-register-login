// registering users using mongodb and hashing password

let user = await User.findOne({ email: req.body.email });
if (user) return res.status(400).send('User already registered');

user = new User({
     name: req.body.name + ' ' + req.body.lastname,
     email: req.body.email,
     password: req.body.password
 })

 const salt = await bcrypt.genSalt(10);
 user.password = await bcrypt.hash(user.password, salt);

await user.save();

// login users and using bcrypt for decrypting password

let user = await User.findOne({ email: req.body.email });
   if (!user) return res.status(400).send('Invalid email or password');

   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) return res.status(400).send('Invalid email or password')