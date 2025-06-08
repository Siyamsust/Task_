const mongoose = require('mongoose');
const Hotel = require('./models/Hotel');
const Restaurant = require('./models/Restaurant');

mongoose.connect('mongodb+srv://kaoser614:0096892156428@cluster0.2awol.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const hotels =[
    {
        "name": "Sayeman Beach Resort",
        "location": "Cox\u2019s Bazar",
        "exactLocation": "Marine Drive Road, Kolatoli, Cox\u2019s Bazar",
        "contact": "+880 341\u201151843",
        "image": "https://example.com/sayeman.jpg",
        "rating": 4.5,
        "description": "5\u2011star seaside resort"
    },
    {
        "name": "Angel Resort & Restaurant",
        "location": "Cox\u2019s Bazar",
        "exactLocation": "Near Himchori Waterfall Road, Cox\u2019s Bazar",
        "contact": "+8801510154179",
        "image": null,
        "rating": 4.8,
        "description": "Small resort with onsite restaurant, close to waterfall hill track"
    },
    {
        "name": "Kather Bari Resort and Restaurant",
        "location": "Saint Martin",
        "exactLocation": "J8H8+XGW, St. Martin\u2019s Island, Chittagong Division",
        "contact": "+880 1750\u2011197186",
        "image": null,
        "rating": 3.6,
        "description": "Resort restaurant set amid natural coastal beauty"
    },
    {
        "name": "Hotel Royal Beach & Restaurant",
        "location": "Saint Martin",
        "exactLocation": "Bayfront, St. Martin\u2019s Island",
        "contact": "+8801786993399",
        "image": null,
        "rating": 4.8,
        "description": "Bayfront hotel with restaurant serving local cuisine and breakfast"
    },
    {
        "name": "Coral Haze Beach Resort",
        "location": "Saint Martin",
        "exactLocation": "North Beach, Golachipa, Saint Martin\u2019s Island",
        "contact": "+8801694589652",
        "image": null,
        "rating": 4.6,
        "description": "Beach resort featuring pool and onsite restaurant"
    },
    {
        "name": "Blue Marine Resort",
        "location": "Saint Martin",
        "exactLocation": "Teknaf, Saint Martin\u2019s Island",
        "contact": "+8801870612496",
        "image": null,
        "rating": 3.5,
        "description": "Seaside resort offering rooms with restaurant facilities"
    },
    {
        "name": "Grand Sylhet Hotel & Resort",
        "location": "Sylhet",
        "exactLocation": "Near Osmani Int\u2019l Airport, Sylhet",
        "contact": "+88 01321\u2011201597",
        "image": null,
        "rating": 3.8,
        "description": "5\u2011star hotel with rooftop restaurants: Skyy Kabana & Smokey Grill"
    },
    {
        "name": "Hotel Noorjahan Grand",
        "location": "Sylhet",
        "exactLocation": "City centre, Sylhet",
        "contact": "+8801668264830",
        "image": null,
        "rating": 4.7,
        "description": "3.5\u2011star city hotel with pool & onsite dining"
    },
    {
        "name": "Rose View Hotel & Resort",
        "location": "Sylhet",
        "exactLocation": "On riverbank, Sylhet",
        "contact": "+8801687793411",
        "image": null,
        "rating": 3.8,
        "description": "Riverside resort with restaurant & scenic dining"
    },
    {
        "name": "Britannia Hotel",
        "location": "Sylhet",
        "exactLocation": "Sylhet city",
        "contact": "+8801737832785",
        "image": null,
        "rating": 4.1,
        "description": "City hotel featuring restaurant dining"
    },
    {
        "name": "Cloud Eye Restaurant (Paradise Inn)",
        "location": "Sylhet",
        "exactLocation": "Paradise Inn hotel, Sylhet",
        "contact": "+8801543519814",
        "image": null,
        "rating": 3.9,
        "description": "Rooftop restaurant serving Bangladeshi, Thai, Chinese & Indian cuisine"
    },
    {
        "name": "Ratargul Resort & Restaurant 1",
        "location": "Ratargul",
        "exactLocation": "Main Road, Ratargul",
        "contact": "+8801447706349",
        "image": null,
        "rating": 4.8,
        "description": "Scenic resort and dining in Ratargul"
    },
    {
        "name": "Ratargul Resort & Restaurant 2",
        "location": "Ratargul",
        "exactLocation": "Main Road, Ratargul",
        "contact": "+8801674191604",
        "image": null,
        "rating": 4.4,
        "description": "Scenic resort and dining in Ratargul"
    },
    {
        "name": "Ratargul Resort & Restaurant 3",
        "location": "Ratargul",
        "exactLocation": "Main Road, Ratargul",
        "contact": "+8801781960243",
        "image": null,
        "rating": 3.8,
        "description": "Scenic resort and dining in Ratargul"
    },
    {
        "name": "Ratargul Resort & Restaurant 4",
        "location": "Ratargul",
        "exactLocation": "Main Road, Ratargul",
        "contact": "+8801856214892",
        "image": null,
        "rating": 4.2,
        "description": "Scenic resort and dining in Ratargul"
    },
    {
        "name": "Ratargul Resort & Restaurant 5",
        "location": "Ratargul",
        "exactLocation": "Main Road, Ratargul",
        "contact": "+8801436383597",
        "image": null,
        "rating": 4.6,
        "description": "Scenic resort and dining in Ratargul"
    },
    {
        "name": "Ratargul Resort & Restaurant 6",
        "location": "Ratargul",
        "exactLocation": "Main Road, Ratargul",
        "contact": "+8801963292292",
        "image": null,
        "rating": 4.5,
        "description": "Scenic resort and dining in Ratargul"
    },
    {
        "name": "Ratargul Resort & Restaurant 7",
        "location": "Ratargul",
        "exactLocation": "Main Road, Ratargul",
        "contact": "+8801817321300",
        "image": null,
        "rating": 4.6,
        "description": "Scenic resort and dining in Ratargul"
    },
    {
        "name": "Ratargul Resort & Restaurant 8",
        "location": "Ratargul",
        "exactLocation": "Main Road, Ratargul",
        "contact": "+8801966699977",
        "image": null,
        "rating": 4.6,
        "description": "Scenic resort and dining in Ratargul"
    },
    {
        "name": "Ratargul Resort & Restaurant 9",
        "location": "Ratargul",
        "exactLocation": "Main Road, Ratargul",
        "contact": "+8801777789030",
        "image": null,
        "rating": 3.8,
        "description": "Scenic resort and dining in Ratargul"
    },
    {
        "name": "Sajek Resort & Restaurant 1",
        "location": "Sajek",
        "exactLocation": "Main Road, Sajek",
        "contact": "+8801475631309",
        "image": null,
        "rating": 4.2,
        "description": "Scenic resort and dining in Sajek"
    },
    {
        "name": "Sajek Resort & Restaurant 2",
        "location": "Sajek",
        "exactLocation": "Main Road, Sajek",
        "contact": "+8801834245157",
        "image": null,
        "rating": 4.0,
        "description": "Scenic resort and dining in Sajek"
    },
    {
        "name": "Sajek Resort & Restaurant 3",
        "location": "Sajek",
        "exactLocation": "Main Road, Sajek",
        "contact": "+8801527106692",
        "image": null,
        "rating": 3.8,
        "description": "Scenic resort and dining in Sajek"
    },
    {
        "name": "Sajek Resort & Restaurant 4",
        "location": "Sajek",
        "exactLocation": "Main Road, Sajek",
        "contact": "+8801671295715",
        "image": null,
        "rating": 3.8,
        "description": "Scenic resort and dining in Sajek"
    },
    {
        "name": "Sajek Resort & Restaurant 5",
        "location": "Sajek",
        "exactLocation": "Main Road, Sajek",
        "contact": "+8801476050979",
        "image": null,
        "rating": 4.4,
        "description": "Scenic resort and dining in Sajek"
    },
    {
        "name": "Sajek Resort & Restaurant 6",
        "location": "Sajek",
        "exactLocation": "Main Road, Sajek",
        "contact": "+8801735916094",
        "image": null,
        "rating": 4.5,
        "description": "Scenic resort and dining in Sajek"
    },
    {
        "name": "Sajek Resort & Restaurant 7",
        "location": "Sajek",
        "exactLocation": "Main Road, Sajek",
        "contact": "+8801879777210",
        "image": null,
        "rating": 4.3,
        "description": "Scenic resort and dining in Sajek"
    },
    {
        "name": "Sajek Resort & Restaurant 8",
        "location": "Sajek",
        "exactLocation": "Main Road, Sajek",
        "contact": "+8801865102355",
        "image": null,
        "rating": 4.2,
        "description": "Scenic resort and dining in Sajek"
    },
    {
        "name": "Sajek Resort & Restaurant 9",
        "location": "Sajek",
        "exactLocation": "Main Road, Sajek",
        "contact": "+8801961166306",
        "image": null,
        "rating": 5.0,
        "description": "Scenic resort and dining in Sajek"
    },
    {
        "name": "Bandarban Resort & Restaurant 1",
        "location": "Bandarban",
        "exactLocation": "Main Road, Bandarban",
        "contact": "+8801671510635",
        "image": null,
        "rating": 4.6,
        "description": "Scenic resort and dining in Bandarban"
    },
    {
        "name": "Bandarban Resort & Restaurant 2",
        "location": "Bandarban",
        "exactLocation": "Main Road, Bandarban",
        "contact": "+8801491309492",
        "image": null,
        "rating": 3.7,
        "description": "Scenic resort and dining in Bandarban"
    },
    {
        "name": "Bandarban Resort & Restaurant 3",
        "location": "Bandarban",
        "exactLocation": "Main Road, Bandarban",
        "contact": "+8801988223955",
        "image": null,
        "rating": 4.3,
        "description": "Scenic resort and dining in Bandarban"
    },
    {
        "name": "Bandarban Resort & Restaurant 4",
        "location": "Bandarban",
        "exactLocation": "Main Road, Bandarban",
        "contact": "+8801351998128",
        "image": null,
        "rating": 3.8,
        "description": "Scenic resort and dining in Bandarban"
    },
    {
        "name": "Bandarban Resort & Restaurant 5",
        "location": "Bandarban",
        "exactLocation": "Main Road, Bandarban",
        "contact": "+8801386715494",
        "image": null,
        "rating": 3.7,
        "description": "Scenic resort and dining in Bandarban"
    },
    {
        "name": "Bandarban Resort & Restaurant 6",
        "location": "Bandarban",
        "exactLocation": "Main Road, Bandarban",
        "contact": "+8801554637185",
        "image": null,
        "rating": 3.8,
        "description": "Scenic resort and dining in Bandarban"
    },
    {
        "name": "Bandarban Resort & Restaurant 7",
        "location": "Bandarban",
        "exactLocation": "Main Road, Bandarban",
        "contact": "+8801867994785",
        "image": null,
        "rating": 4.8,
        "description": "Scenic resort and dining in Bandarban"
    },
    {
        "name": "Bandarban Resort & Restaurant 8",
        "location": "Bandarban",
        "exactLocation": "Main Road, Bandarban",
        "contact": "+8801359146471",
        "image": null,
        "rating": 4.7,
        "description": "Scenic resort and dining in Bandarban"
    },
    {
        "name": "Bandarban Resort & Restaurant 9",
        "location": "Bandarban",
        "exactLocation": "Main Road, Bandarban",
        "contact": "+8801665964569",
        "image": null,
        "rating": 3.6,
        "description": "Scenic resort and dining in Bandarban"
    },
    {
        "name": "Sundarbans Resort & Restaurant 1",
        "location": "Sundarbans",
        "exactLocation": "Main Road, Sundarbans",
        "contact": "+8801664938358",
        "image": null,
        "rating": 4.0,
        "description": "Scenic resort and dining in Sundarbans"
    },
    {
        "name": "Sundarbans Resort & Restaurant 2",
        "location": "Sundarbans",
        "exactLocation": "Main Road, Sundarbans",
        "contact": "+8801889353545",
        "image": null,
        "rating": 3.5,
        "description": "Scenic resort and dining in Sundarbans"
    },
    {
        "name": "Sundarbans Resort & Restaurant 3",
        "location": "Sundarbans",
        "exactLocation": "Main Road, Sundarbans",
        "contact": "+8801611201231",
        "image": null,
        "rating": 4.1,
        "description": "Scenic resort and dining in Sundarbans"
    },
    {
        "name": "Sundarbans Resort & Restaurant 4",
        "location": "Sundarbans",
        "exactLocation": "Main Road, Sundarbans",
        "contact": "+8801499423593",
        "image": null,
        "rating": 3.7,
        "description": "Scenic resort and dining in Sundarbans"
    },
    {
        "name": "Sundarbans Resort & Restaurant 5",
        "location": "Sundarbans",
        "exactLocation": "Main Road, Sundarbans",
        "contact": "+8801662520446",
        "image": null,
        "rating": 3.9,
        "description": "Scenic resort and dining in Sundarbans"
    },
    {
        "name": "Sundarbans Resort & Restaurant 6",
        "location": "Sundarbans",
        "exactLocation": "Main Road, Sundarbans",
        "contact": "+8801594492463",
        "image": null,
        "rating": 4.1,
        "description": "Scenic resort and dining in Sundarbans"
    },
    {
        "name": "Sundarbans Resort & Restaurant 7",
        "location": "Sundarbans",
        "exactLocation": "Main Road, Sundarbans",
        "contact": "+8801920883979",
        "image": null,
        "rating": 3.6,
        "description": "Scenic resort and dining in Sundarbans"
    },
    {
        "name": "Sundarbans Resort & Restaurant 8",
        "location": "Sundarbans",
        "exactLocation": "Main Road, Sundarbans",
        "contact": "+8801834588319",
        "image": null,
        "rating": 4.0,
        "description": "Scenic resort and dining in Sundarbans"
    },
    {
        "name": "Sundarbans Resort & Restaurant 9",
        "location": "Sundarbans",
        "exactLocation": "Main Road, Sundarbans",
        "contact": "+8801728120901",
        "image": null,
        "rating": 4.9,
        "description": "Scenic resort and dining in Sundarbans"
    },
    {
        "name": "Rangamati Resort & Restaurant 1",
        "location": "Rangamati",
        "exactLocation": "Main Road, Rangamati",
        "contact": "+8801529427920",
        "image": null,
        "rating": 4.0,
        "description": "Scenic resort and dining in Rangamati"
    },
    {
        "name": "Rangamati Resort & Restaurant 2",
        "location": "Rangamati",
        "exactLocation": "Main Road, Rangamati",
        "contact": "+8801569756284",
        "image": null,
        "rating": 5.0,
        "description": "Scenic resort and dining in Rangamati"
    },
    {
        "name": "Rangamati Resort & Restaurant 3",
        "location": "Rangamati",
        "exactLocation": "Main Road, Rangamati",
        "contact": "+8801770244403",
        "image": null,
        "rating": 5.0,
        "description": "Scenic resort and dining in Rangamati"
    },
    {
        "name": "Rangamati Resort & Restaurant 4",
        "location": "Rangamati",
        "exactLocation": "Main Road, Rangamati",
        "contact": "+8801817981119",
        "image": null,
        "rating": 4.7,
        "description": "Scenic resort and dining in Rangamati"
    },
    {
        "name": "Rangamati Resort & Restaurant 5",
        "location": "Rangamati",
        "exactLocation": "Main Road, Rangamati",
        "contact": "+8801651274439",
        "image": null,
        "rating": 4.7,
        "description": "Scenic resort and dining in Rangamati"
    },
    {
        "name": "Rangamati Resort & Restaurant 6",
        "location": "Rangamati",
        "exactLocation": "Main Road, Rangamati",
        "contact": "+8801750786766",
        "image": null,
        "rating": 4.2,
        "description": "Scenic resort and dining in Rangamati"
    },
    {
        "name": "Rangamati Resort & Restaurant 7",
        "location": "Rangamati",
        "exactLocation": "Main Road, Rangamati",
        "contact": "+8801775966776",
        "image": null,
        "rating": 5.0,
        "description": "Scenic resort and dining in Rangamati"
    },
    {
        "name": "Rangamati Resort & Restaurant 8",
        "location": "Rangamati",
        "exactLocation": "Main Road, Rangamati",
        "contact": "+8801865569105",
        "image": null,
        "rating": 4.5,
        "description": "Scenic resort and dining in Rangamati"
    },
    {
        "name": "Rangamati Resort & Restaurant 9",
        "location": "Rangamati",
        "exactLocation": "Main Road, Rangamati",
        "contact": "+8801782130548",
        "image": null,
        "rating": 3.8,
        "description": "Scenic resort and dining in Rangamati"
    }
];

const restaurants = [
    {
        "name": "Mermaid Café",
        "location": "Cox’s Bazar",
        "exactLocation": "Sugandha Beach, Kolatoli Road, Cox’s Bazar",
        "contact": "+8801841146461",
        "image": null,
        "rating": 4.2,
        "description": "Beachfront seafood café with live music and organic offerings"
    },
    {
        "name": "Shalik Restaurant & Biryani House",
        "location": "Cox’s Bazar",
        "exactLocation": "Kolatoli Road, near Sugandha Point, Cox’s Bazar",
        "contact": "+8801872538970",
        "image": null,
        "rating": 4.1,
        "description": "Local seafood & biryani in a spacious seaside setting"
    },
    {
        "name": "Salt Bistro & Café",
        "location": "Cox’s Bazar",
        "exactLocation": "Niribili Orchid, Kolatoli Road, Cox’s Bazar",
        "contact": "+8801836495092",
        "image": null,
        "rating": 4.2,
        "description": "Seafood, Indian & European dishes in an appealing ambiance"
    },
    {
        "name": "Coral View Restaurant",
        "location": "Cox’s Bazar",
        "exactLocation": "Laboni Beach, Cox’s Bazar",
        "contact": "+8801875223344",
        "image": null,
        "rating": 4.4,
        "description": "Beachside seafood dining with stunning ocean views"
    },
    {
        "name": "The Lighthouse Café",
        "location": "Cox’s Bazar",
        "exactLocation": "Marine Drive Road, Cox’s Bazar",
        "contact": "+8801556677788",
        "image": null,
        "rating": 4.3,
        "description": "Modern café with international menu and coffee"
    },
    {
        "name": "St. Martin Village Restaurant",
        "location": "Saint Martin",
        "exactLocation": "St. Martin’s Island (main village area)",
        "contact": "+8801677235198",
        "image": null,
        "rating": 4.3,
        "description": "Largest local restaurant, credit cards accepted"
    },
    {
        "name": "Blue Water Seafood",
        "location": "Saint Martin",
        "exactLocation": "West Beach, Saint Martin Island",
        "contact": "+8801623456789",
        "image": null,
        "rating": 4.5,
        "description": "Fresh grilled seafood with ocean views"
    },
    {
        "name": "Island Breeze Café",
        "location": "Saint Martin",
        "exactLocation": "North Beach, Saint Martin Island",
        "contact": "+8801744233344",
        "image": null,
        "rating": 4.2,
        "description": "Relaxed atmosphere with tropical drinks and snacks"
    },
    {
        "name": "Pearl Island Diner",
        "location": "Saint Martin",
        "exactLocation": "Near Jetty, Saint Martin Island",
        "contact": "+8801788776655",
        "image": null,
        "rating": 4.0,
        "description": "Family-friendly eatery with seafood and local dishes"
    },
    {
        "name": "Panshi Restaurant",
        "location": "Sylhet",
        "exactLocation": "Zindabazar, Sylhet",
        "contact": "+8801776543210",
        "image": null,
        "rating": 4.5,
        "description": "Iconic local restaurant famous for Bangladeshi dishes"
    },
    {
        "name": "Kutum Bari Restaurant",
        "location": "Sylhet",
        "exactLocation": "Zindabazar Road, Sylhet",
        "contact": "+8801623445566",
        "image": null,
        "rating": 4.4,
        "description": "Authentic Sylheti cuisine in a cozy setting"
    },
    {
        "name": "Woondaal King Kebab",
        "location": "Sylhet",
        "exactLocation": "VIP Road, Sylhet",
        "contact": "+8801553344556",
        "image": null,
        "rating": 4.6,
        "description": "Premium kebabs and Indian cuisine"
    },
    {
        "name": "Sylhet Café & Lounge",
        "location": "Sylhet",
        "exactLocation": "Kumarpara Road, Sylhet",
        "contact": "+8801988776655",
        "image": null,
        "rating": 4.3,
        "description": "Trendy café with desserts and coffee"
    },
    {
        "name": "Ratargul Riverside Diner",
        "location": "Ratargul",
        "exactLocation": "Ratargul Swamp Forest Gate area",
        "contact": "+8801933445566",
        "image": null,
        "rating": 4.4,
        "description": "Riverside restaurant serving fresh fish and local dishes"
    },
    {
        "name": "Swamp View Restaurant",
        "location": "Ratargul",
        "exactLocation": "Boat Jetty, Ratargul Swamp Forest",
        "contact": "+8801888332211",
        "image": null,
        "rating": 4.1,
        "description": "Rustic eatery with forest views and local flavors"
    },
    {
        "name": "Green Forest Café",
        "location": "Ratargul",
        "exactLocation": "Ratargul Village Road",
        "contact": "+8801773344552",
        "image": null,
        "rating": 4.2,
        "description": "Local snacks and tea by the swamp edge"
    },
    {
        "name": "Sajek Cloud Café",
        "location": "Sajek",
        "exactLocation": "Ruilui Para, Sajek",
        "contact": "+8801677889900",
        "image": null,
        "rating": 4.5,
        "description": "Popular mountaintop café with panoramic views"
    },
    {
        "name": "Sajek Valley Restaurant",
        "location": "Sajek",
        "exactLocation": "Helipad Road, Sajek",
        "contact": "+8801788776654",
        "image": null,
        "rating": 4.4,
        "description": "Buffet-style eatery with local and Asian dishes"
    },
    {
        "name": "Hilltop Grill",
        "location": "Sajek",
        "exactLocation": "Konglak Para, Sajek",
        "contact": "+8801933442211",
        "image": null,
        "rating": 4.3,
        "description": "Casual grill spot with BBQ and views"
    },
    {
        "name": "Bandarban Hill Café",
        "location": "Bandarban",
        "exactLocation": "Near Meghla Tourist Complex, Bandarban",
        "contact": "+8801622334455",
        "image": null,
        "rating": 4.4,
        "description": "Charming café with mountain views"
    },
    {
        "name": "Nafa-khum Restaurant",
        "location": "Bandarban",
        "exactLocation": "Thanchi Road, Bandarban",
        "contact": "+8801776655443",
        "image": null,
        "rating": 4.3,
        "description": "Fresh river fish and local tribal dishes"
    },
    {
        "name": "Ruma Bazaar Food Corner",
        "location": "Bandarban",
        "exactLocation": "Ruma Bazaar, Bandarban",
        "contact": "+8801888445566",
        "image": null,
        "rating": 4.2,
        "description": "Affordable local meals for trekkers"
    },
    {
        "name": "Sundarban Eco Café",
        "location": "Sundarbans",
        "exactLocation": "Khulna Launch Terminal area",
        "contact": "+8801556677789",
        "image": null,
        "rating": 4.3,
        "description": "Nature-inspired café with seafood and drinks"
    },
    {
        "name": "Tiger View Restaurant",
        "location": "Sundarbans",
        "exactLocation": "Mongla Port, near Sundarbans entry",
        "contact": "+8801888776654",
        "image": null,
        "rating": 4.4,
        "description": "Spacious restaurant with Sundarbans-inspired décor"
    },
    {
        "name": "Forest Breeze Restaurant",
        "location": "Sundarbans",
        "exactLocation": "Dhangmari, Sundarbans",
        "contact": "+8801677332211",
        "image": null,
        "rating": 4.2,
        "description": "Rustic eatery with local seafood specialties"
    },
    {
        "name": "Rangamati Lake View Restaurant",
        "location": "Rangamati",
        "exactLocation": "Reserve Bazaar, Rangamati",
        "contact": "+8801622113344",
        "image": null,
        "rating": 4.4,
        "description": "Lakeview dining with local and international cuisine"
    },
    {
        "name": "Tribal Taste Restaurant",
        "location": "Rangamati",
        "exactLocation": "Tabalchhari, Rangamati",
        "contact": "+8801888774433",
        "image": null,
        "rating": 4.5,
        "description": "Authentic tribal dishes with a cultural ambiance"
    },
    {
        "name": "Hill Lake Café",
        "location": "Rangamati",
        "exactLocation": "DC Bungalow Road, Rangamati",
        "contact": "+8801557788996",
        "image": null,
        "rating": 4.3,
        "description": "Peaceful lakeside café for snacks and coffee"
    }
];

async function seed() {
  try {
    await Hotel.deleteMany();
    await Restaurant.deleteMany();
    await Hotel.insertMany(hotels);
    await Restaurant.insertMany(restaurants);
    console.log('✅ Inserted 50+ hotels and restaurants across Bangladesh');
  } catch (error) {
    console.error('❌ Seeding error', error);
  } finally {
    mongoose.connection.close();
  }
}

seed();
