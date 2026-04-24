const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://sreekeshd7_db_user:Sreekesh2005@ecommerce.z18qfdm.mongodb.net/?appName=ecommerce').then(async () => {
    const User=require('./models/User');
    const badUsers = await User.find({$or: [{mobileNumber: {$exists: false}}, {address: {$exists: false}}]});
    console.log('Users missing required fields:', badUsers.length);
    if(badUsers.length > 0) console.log(badUsers.map(u => u.email));
    process.exit(0);
});
