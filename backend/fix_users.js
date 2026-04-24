const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://sreekeshd7_db_user:Sreekesh2005@ecommerce.z18qfdm.mongodb.net/?appName=ecommerce').then(async () => {
    const User=require('./models/User');
    const result = await User.updateMany(
        { $or: [{ mobileNumber: { $exists: false } }, { address: { $exists: false } }] },
        { 
            $set: { 
                mobileNumber: "0000000000", 
                address: "Please update your address in profile" 
            } 
        }
    );
    console.log('Fixed users:', result.modifiedCount);
    process.exit(0);
});
