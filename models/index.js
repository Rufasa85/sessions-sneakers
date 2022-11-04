const User = require("./User");
const Sneaker  = require("./Sneaker")

User.hasMany(Sneaker,{
    onDelete:"CASCADE"
});
Sneaker.belongsTo(User)

module.exports = {
    User,
    Sneaker
}