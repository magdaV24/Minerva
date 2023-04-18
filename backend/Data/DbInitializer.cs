// using API.Entities;
// using Microsoft.AspNetCore.Identity;

// namespace API.Data
// {
//     public class DbInitializer
//     {
//         public static async Task Initialize(MinervaContext context, UserManager<User> userManager)
//         {
//             if(!userManager.Users.Any())
//             {
//                 var user = new User{
//                     UserName = "Ada",
//                     Email = "ada@test.com"
//                 };

//                 await userManager.CreateAsync(user, "Pa$$w0rd");
//                 await userManager.AddToRoleAsync(user, "User");

//                 var admin = new User
//                 {
//                     UserName = "Magda",
//                     Email = "magda@test.com"
//                 };

//                 await userManager.CreateAsync(user, "Pa$$w0rd");
//                 await userManager.AddToRolesAsync(admin, new[] {"User", "Admin"});
//             };
//             // Checking if the same card already exists in the database;
//             if (context.MultiCards.Any()) return;
//             if (context.FlipCards.Any()) return;

//             var flipCards = new List<FlipCard>
//             {
//                 new FlipCard{
//                     Front= "Benjamin Franklin (1706-1790)",
//                     Back= "Invented bifocals for glassesinvented bifocals for glasses",
//                     Category= "Medicine",
//                     Public= 1
//                 },
//                 new FlipCard{
//                     Front= "Joseph Lister (1827-1912)",
//                     Back= "Began using disinfectants and antiseptics during surgery",
//                     Category= "Medicine",
//                     Public= 1
//                 },
//                 new FlipCard{
//                     Front= "Clara Barton (1821-1912)",
//                     Back= "Founded the american Red Cross in 1881",
//                     Category= "Medicine",
//                     Public= 1
//                 },
//                 new FlipCard{
//                     Front= "Florence Nightingale (1820-1910)",
//                     Back= "Founder of modern nursing",
//                     Category= "Medicine",
//                     Public= 1
//                 },
//                 new FlipCard{
//                     Front= "The school florence nightingale opened",
//                     Back= "Nightingale school and home for nurses at St. Thomas' hospital in London (1860)",
//                     Category= "Medicine",
//                     Public= 1
//                 }
//             };

//             var multiCards = new List<MultiCard>
//             {
//                 new MultiCard{
//                     Question= "How many blue stripes are there on the U.S. flag?",
//                     OptionOne = "12" ,
//                     OptionTwo = "6" ,
//                     OptionThree = "5" ,
//                     RightAns = "0" ,
//                     Category = "General" ,
//                     Public = 1 ,
//                 },
//                 new MultiCard{
//                     Question= "Which one of these characters is not friends with Harry Potter?",
//                     OptionOne = "Ron Weasley" ,
//                     OptionTwo = "Luna Lovegood" ,
//                     OptionThree = "Neville Longbottom" ,
//                     RightAns = "Draco Malfoy" ,
//                     Category = "General" ,
//                     Public = 1 ,
//                 },
//                 new MultiCard{
//                     Question= "What is the color of Donald Duck`s bowtie?",
//                     OptionOne = "Blue" ,
//                     OptionTwo = "Purple" ,
//                     OptionThree = "Green" ,
//                     RightAns = "Red" ,
//                     Category = "General" ,
//                     Public = 1 ,
//                 },
//                 new MultiCard{
//                     Question= "What is the name of the company that published the Mario Kart video game?",
//                     OptionOne = "Xbox" ,
//                     OptionTwo = "SEGA" ,
//                     OptionThree = "EA" ,
//                     RightAns = "Nintendo" ,
//                     Category = "General" ,
//                     Public = 1 ,
//                 },
//                 new MultiCard{
//                     Question= "Which water sport is the official sport for the state of Hawaii?",
//                     OptionOne = "Water Polo" ,
//                     OptionTwo = "Swimming" ,
//                     OptionThree = "Water Skiing" ,
//                     RightAns = "Surfing" ,
//                     Category = "General" ,
//                     Public = 1 ,
//                 }
//             };

//             foreach (var flipCard in flipCards)
//             {
//                 context.FlipCards.Add(flipCard);
//             }

//             foreach (var multiCard in multiCards)
//             {
//                 context.MultiCards.Add(multiCard);
//             }

//             context.SaveChanges();
//         }
//     }
// }