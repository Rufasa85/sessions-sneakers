const sequelize = require("../config/connection");
const {User,Sneaker} = require("../models/");

const seed = async ()=> {
    await sequelize.sync({force:true});
    const users = await User.bulkCreate([
        {
            email:"joe@joe.joe",
            password:"password"
        },
        {
            email:"lindsay@joe.joe",
            password:"password1"
        },
        {
            email:"henry@joe.joe",
            password:"password1!"
        }
    ],{
        individualHooks:true
    })
    const sneakers = await Sneaker.bulkCreate([
        {
            name:"Chuck Taylor",
            brand:"Converse",
            color:"red",
            UserId:1
        },
        {
            name:"Jordan 1",
            brand:"Jordan",
            color:"white",
            UserId:2
        },
    ])

    console.log("seeded!")
    process.exit(0)
}

seed();