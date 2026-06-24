console.log("seedData started");
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Post from "./models/Post.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.deleteMany({});
await Post.deleteMany({});

const users = await User.insertMany([
    
{
username:"Pawan Kalyan",
handle:"pawankalyan",
bio:"Power Star • Deputy CM of Andhra Pradesh ❤️",
followersCount:38500000,
followingCount:120
},

{
username:"Mahesh Babu",
handle:"mahesh_babu",
bio:"Super Star ❤️",
followersCount:28200000,
followingCount:120
},

{
username:"Prabhas",
handle:"prabhas",
bio:"Pan India Rebel Star 🔥",
followersCount:30500000,
followingCount:130
},

{
username:"Virat Kohli",
handle:"virat.kohli",
bio:"Cricketer • Fitness ❤️",
followersCount:72000000,
followingCount:100
},

{
username:"Rohit Sharma",
handle:"rohitsharma45",
bio:"Hitman 💙",
followersCount:82000000,
followingCount:120
},

{
username:"Samantha Ruth Prabhu",
handle:"samantharuthprabhu",
bio:"Actor • Dreamer ❤️",
followersCount:32000000,
followingCount:120
},
{
username:"Rajinikanth",
handle:"rajinikanth",
bio:"Superstar 🌟",
followersCount:45000000,
followingCount:120
},

{
username:"Vijay",
handle:"actorvijay",
bio:"Thalapathy ❤️",
followersCount:40000000,
followingCount:130
},

{
username:"Ajith Kumar",
handle:"ajithkumar",
bio:"Thala 🏁",
followersCount:25000000,
followingCount:120
},

{
username:"Suriya",
handle:"actorsuriya",
bio:"Actor • Producer",
followersCount:19000000,
followingCount:120
},
{
username:"Nani",
handle:"nameisnani",
bio:"Natural Star ❤️",
followersCount:12000000,
followingCount:120
},

{
username:"Vijay Deverakonda",
handle:"thedeverakonda",
bio:"Rowdy 🔥",
followersCount:23000000,
followingCount:120
},

{
username:"Naga Chaitanya",
handle:"chayakkineni",
bio:"Actor ❤️",
followersCount:11000000,
followingCount:120
},

{
username:"Balakrishna",
handle:"balakrishna",
bio:"Natasimha 🔥",
followersCount:15000000,
followingCount:120
},
{
username:"Allu Arjun",
handle:"alluarjun",
bio:"Icon Star • Pushpa Raj 🔥",
followersCount:34000000,
followingCount:120
},

{
username:"Jr NTR",
handle:"tarak9999",
bio:"Man of Masses ❤️",
followersCount:24000000,
followingCount:150
},

{
username:"Ram Charan",
handle:"alwaysramcharan",
bio:"Global Star 🌎",
followersCount:25000000,
followingCount:110
},

{
username:"Rashmika Mandanna",
handle:"rashmika_mandanna",
bio:"National Crush ❤️",
followersCount:36000000,
followingCount:90
},

{
username:"Sai Pallavi",
handle:"saipallavi_senthamarai",
bio:"Actor • Doctor • Dancer ❤️",
followersCount:21000000,
followingCount:120
},

{
username:"Keerthy Suresh",
handle:"keerthysureshofficial",
bio:"National Award Winner ✨",
followersCount:22000000,
followingCount:120
},

{
username:"Deepika Padukone",
handle:"deepikapadukone",
bio:"Live • Love • Laugh ❤️",
followersCount:45000000,
followingCount:120
},

{
username:"Alia Bhatt",
handle:"aliaabhatt",
bio:"Actor • Producer ✨",
followersCount:42000000,
followingCount:100
},{
username:"MS Dhoni",
handle:"mahi7781",
bio:"Captain Cool 💛",
followersCount:48000000,
followingCount:120
},

{
username:"Jasprit Bumrah",
handle:"jaspritb1",
bio:"Fast Bowler 🇮🇳",
followersCount:22000000,
followingCount:120
},

{
username:"Hardik Pandya",
handle:"hardikpandya93",
bio:"All Rounder ❤️",
followersCount:28000000,
followingCount:120
},

{
username:"Shubman Gill",
handle:"shubmangill",
bio:"Dream Big 💙",
followersCount:18000000,
followingCount:120
},

{
username:"Shah Rukh Khan",
handle:"iamsrk",
bio:"King Khan ❤️",
followersCount:52000000,
followingCount:120
},

{
username:"Salman Khan",
handle:"beingsalmankhan",
bio:"Actor • Humanitarian ❤️",
followersCount:49000000,
followingCount:100
},

{
username:"Hrithik Roshan",
handle:"hrithikroshan",
bio:"Actor • Fitness Enthusiast 🔥",
followersCount:35000000,
followingCount:120
},
]);
console.log(users[0]);
console.log(User.schema.paths);
await Post.insertMany([
{
user: users[0]._id,
content: "OG shoot wrapped 🔥 Can't wait to see you all in theatres. #OG"
},
{
user: users[0]._id,
content: "As Promised I am eagerly waiting to do OG2 ❤️"
},

{
user: users[1]._id,
content: "#SSMB29 🌎 Excited for this journey with Rajamouli garu ❤️"
},
{
user: users[1]._id,
content: "Thank you for your endless love and support ❤️"
},

{
user: users[2]._id,
content: "#Spirit 🔥 Something exciting is coming."
},
{
user: users[2]._id,
content: "#Salaar 👑 See you all soon in theatres ❤️"
},

{
user: users[3]._id,
content: "Always grateful for your support ❤️🇮🇳"
},
{
user: users[3]._id,
content: "Keep working hard and stay humble 💪"
},

{
user: users[4]._id,
content: "One team, one dream 💙🏏"
},
{
user: users[4]._id,
content: "Proud to represent India 🇮🇳"
},

{
user: users[5]._id,
content: "New beginnings ❤️"
},
{
user: users[5]._id,
content: "Stay healthy and spread positivity ✨"
},

{
user: users[6]._id,
content: "#Coolie ,#Jailer,🔥 KH*RK See you soon."
},
{
user: users[6]._id,
content: "Vanakkam 🙏 Love you all ❤️"
},

{
user: users[7]._id,
content: "Thank you for your support ❤️"
},
{
user: users[7]._id,
content: "See you all very soon 🔥"
},

{
user: users[8]._id,
content: "Life is beautiful ❤️"
},
{
user: users[8]._id,
content: "Love and respect to everyone 🙏"
},

{
user: users[9]._id,
content: "#Rolex 🔥"
},
{
user: users[9]._id,
content: "Thank you for your endless support ❤️"
},

{
user: users[10]._id,
content: "#TheParadise ❤️ Excited for this journey."
},
{
user: users[10]._id,
content: "Love you all ❤️"
},

{
user: users[11]._id,
content: "#Rowdy #Virosh 🔥#Rowdy Janardhana Coming soon."
},
{
user: users[11]._id,
content: "Love u All ❤️"
},

{
user: users[12]._id,
content: "Grateful for everything ❤️"
},
{
user: users[12]._id,
content: "New beginnings ✨"
},

{
user: users[13]._id,
content: "#Akhanda2 🔥 Jai Balayya!"
},
{
user: users[13]._id,
content: "Love you all ❤️"
},

{
user: users[14]._id,
content: "Thank you for making Pushpa unforgettable."
},
{
user: users[14]._id,
content: "Raaka Title Poster 🔥 #Raaka."
},

{
user: users[15]._id,
content: "#Dragon 💥 A powerful journey awaits."
},
{
user: users[15]._id,
content: "Love you all ❤️"
},

{
user: users[16]._id,
content: "Pudatama enti malla ❤️ #Peddi"
},
{
user: users[16]._id,
content: "Forever grateful ❤️"
},

{
user: users[17]._id,
content: "#Thama ❤️ Can't wait."
},
{
user: users[17]._id,
content: "Sending lots of love ❤️"
},

{
user: users[18]._id,
content: "Thankful for all your support ❤️"
},
{
user: users[18]._id,
content: "Stay happy and healthy ✨"
},

{
user: users[19]._id,
content: "Excited for upcoming projects ❤️"
},
{
user: users[19]._id,
content: "Love and gratitude ❤️"
},

{
user: users[20]._id,
content: "Smile and shine ✨"
},
{
user: users[20]._id,
content: "Love you all ❤️"
},

{
user: users[21]._id,
content: "Grateful every day ❤️"
},
{
user: users[21]._id,
content: "Another beautiful journey begins ✨"
},

{
user: users[22]._id,
content: "Keep calm and enjoy the game 💛"
},
{
user: users[22]._id,
content: "Thanks for all the love ❤️"
},

{
user: users[23]._id,
content: "Back to doing what I love ❤️🏏"
},
{
user: users[23]._id,
content: "One match at a time 🇮🇳"
},

{
user: users[24]._id,
content: "Never stop believing 🔥"
},
{
user: users[24]._id,
content: "Hard work pays off ❤️"
},

{
user: users[25]._id,
content: "Dream big 💙"
},
{
user: users[25]._id,
content: "Keep improving every day ❤️"
},

{
user: users[26]._id,
content: "Love you all ❤️ Keep smiling."
},
{
user: users[26]._id,
content: "See you soon in theatres 🔥"
},

{
user: users[27]._id,
content: "Work hard, stay humble ❤️"
},
{
user: users[27]._id,
content: "See you all soon 🔥"
},

{
user: users[28]._id,
content: "#War2"
},
{
user: users[28]._id,
content: "Fitness is a lifestyle ❤️"
}
]);
console.log("Seed data inserted successfully");

await mongoose.connection.close();

process.exit();