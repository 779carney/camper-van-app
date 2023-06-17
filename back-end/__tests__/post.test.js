const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});
afterAll(async () => {
    await mongoose.connection.close();
});

// describe("/users", () => {
//     test("POST - STATUS: 201 - to post a new user object to the data base", () => {
//         return request(app)
//             .post("/users")
//             .send({
//                 username: "username61",
//                 password: "password6",
//                 location: {
//                     region: "york",
//                     postcode: "yo231ex",
//                 },
//                 firstName: "davide",
//                 lastName: "Holls",
//                 email: "davideholls61.ut@outlook.org",
//                 phoneNumber: "07396650001",
//                 img:
//                     "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
//             })
//             .expect(201)
//             .then((response) => {
//                 const { username, password, location, firstName, lastName, email, phoneNumber, img } = response.body.newUser;
//                 expect(username).toBe("username61")
//                 expect(password).toBe("password6")
//                 expect(location).toEqual({
//                     region: "york",
//                     postcode: "yo231ex",
//                 })
//                 expect(firstName).toBe("davide")
//                 expect(lastName).toBe("Holls")
//                 expect(email).toBe("davideholls61.ut@outlook.org")
//                 expect(phoneNumber).toBe("07396650001")
//                 expect(img).toBe("https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg")

//             })
//     })
//     test('to GET status 400 if try to post an empty user object', () => {
//         return request(app)
//             .post("/users")
//             .send({})
//             .expect(400)
//             .then((response) => {
//                 expect(response.body.msg).toEqual('invalid request')
//             })
//     })
//     test("GET - status: 404 respond with correct error message if end point is not valid", () => {
//         return request(app)
//             .post("/nonsense")
//             .expect(404)
//             .then((response) => {
//                 expect(response.body.msg).toBe("request not found");
//             });
//     });
// })

describe("/vans", () => {
    test("POST - STATUS: 201 - to post a new van object to the data base", () => {
        return request(app)
            .post("/vans")
            .send({
                vanName: "the traveller",
                owner: "648733606b77da2cfea3e770",
                description:
                    "The Volkswagen California is an ideal choice for your next adventure. ",
                make: "Volkswagen",
                model: "California",
                year: 2021,
                location: {
                    region: "leeds",
                    postcode: "ls118lu",
                },
                pricePerNight: 30,
                amenities: ["kitchen", "sun roof", "dining area"],
                availabilityDates: {
                    startDate: "2023-07-01",
                    endDate: "2024-07-01",
                },
                images: [
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wKy1lKY3Wx2cPvKVs1lUWVnltoy4V2YOsw&usqp=CAU",
                    "https://media.gq-magazine.co.uk/photos/5e74910306bab00008958011/16:9/pass/20200320-VW-Electric-03.jpg",
                    "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg",
                ],
                sleeps: 2,
            })
            .expect(201)
            .then((response) => {
                const { vanName, owner, description, make, model, year, location, pricePerNight, amenities, availabilityDates, images, sleeps } = response.body.newVan;
                expect(vanName).toBe("the traveller");
                expect(owner).toBe("648733606b77da2cfea3e770");
                expect(description).toBe("The Volkswagen California is an ideal choice for your next adventure. ");
                expect(make).toBe("Volkswagen");
                expect(model).toBe("California");
                expect(year).toBe(2021);
                expect(location).toEqual({
                    region: "leeds",
                    postcode: "ls118lu",
                });
                expect(pricePerNight).toBe(30);
                expect(amenities).toEqual(["kitchen", "sun roof", "dining area"]);
                expect(availabilityDates.startDate.slice(0, 10)).toEqual("2023-07-01"
                );
                expect(images).toEqual([
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wKy1lKY3Wx2cPvKVs1lUWVnltoy4V2YOsw&usqp=CAU",
                    "https://media.gq-magazine.co.uk/photos/5e74910306bab00008958011/16:9/pass/20200320-VW-Electric-03.jpg",
                    "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg",
                ]);
                expect(sleeps).toBe(2);

            })
    })
    test('to GET status 400 if try to post an empty van object', () => {
        return request(app)
            .post("/vans")
            .send({})
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('invalid request')
            })
    })
    test("GET - status: 404 respond with correct error message if end point is not valid", () => {
        return request(app)
            .post("/nonsense")
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("request not found");
            });
    });
})

describe("/:owner/vans", () => {
    test("POST - STATUS: 201 - to post a new van object to the data base", () => {
        return request(app)
            .post("/6489a266b97c6dfb06b758f1/vans")
            .send({
                vanName: "the bell bus",
                description:
                    "The bell bus is a great. ",
                make: "Volkswagen",
                model: "California",
                year: 2021,
                location: {
                    region: "york",
                    postcode: "yo231ex",
                },
                pricePerNight: 30,
                amenities: ["kitchen", "sun roof", "dining area"],
                availabilityDates: {
                    startDate: "2023-07-01",
                    endDate: "2024-07-01",
                },
                images: [
                    "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg",
                ],
                sleeps: 2,
            })
            .then((response) => {
                const { vanName, owner, description, make, model, year, location, pricePerNight, amenities, availabilityDates, images, sleeps } = response.body.newVan;
                expect(vanName).toBe("the bell bus");
                expect(owner).toBe("6489a266b97c6dfb06b758f1");
                expect(description).toBe("The bell bus is a great. ");
                expect(make).toBe("Volkswagen");
                expect(model).toBe("California");
                expect(year).toBe(2021);
                expect(location).toEqual({
                    region: "york",
                    postcode: "yo231ex",
                });
                expect(pricePerNight).toBe(30);
                expect(amenities).toEqual(["kitchen", "sun roof", "dining area"]);
                expect(availabilityDates.startDate.slice(0, 10)).toEqual("2023-07-01"
                );
                expect(images).toEqual([
                    "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg",
                ]);
                expect(sleeps).toBe(2);

            })
    })
    test('to GET status 400 if try to post an empty van object', () => {
        return request(app)
            .post("/6489a266b97c6dfb06b758f1/vans")
            .send({})
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('invalid request')
            })
    })
    test("GET - status: 400 respond with correct error message if the id is not valid", () => {
        return request(app)
            .post("/nonsense/vans")
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("invalid request");
            });
    });
    test("GET - status: 404 respond with correct error message if end point is not valid", () => {
        return request(app)
            .post("/nonsense")
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("request not found");
            });
    });
    test('to GET status 400 if try to post a object with incorrect data types', () => {
        return request(app)
            .post("/6489a266b97c6dfb06b758f1/vans")
            .send({
                vanName: 3000,
                description:
                    3000,
                make: 3000,
                model: 3000,
                year: 'string',
                location: {
                    region: "york",
                    postcode: "yo231ex",
                },
                pricePerNight: 'string',
                amenities: 3000,
                availabilityDates: {
                    startDate: "2023-07-01",
                    endDate: "2024-07-01",
                },
                images: 3000,
                sleeps: 'string',
            })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('invalid request')
            })
    })

})
describe("/bookings", () => {
    test("POST - STATUS: 201 - to post a new booking object to the data base", () => {
        return request(app)
            .post("/bookings")
            .send({
                userId: "648733606b77da2cfea3e774",
                vanId: "64873c83768e970eec9aa22a",
                startDate: "2023-09-01",
                endDate: "2023-09-03",
                totalCost: 100,
                paymentDetails: "unpaid",
            })
            .expect(201)
            .then((response) => {
                const { userId, vanId, startDate, endDate, totalCost, paymentDetails } = response.body.newBooking;
                expect(userId).toBe("648733606b77da2cfea3e774");
                expect(vanId).toBe("64873c83768e970eec9aa22a");
                expect(startDate.slice(0, 10)).toBe("2023-09-01");
                expect(endDate.slice(0, 10)).toBe("2023-09-03");
                expect(totalCost).toBe(100);
                expect(paymentDetails).toBe("unpaid");
            })
    })
    test('to GET status 400 if try to post an empty booking object', () => {
        return request(app)
            .post("/bookings")
            .send({})
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('invalid request')
            })
    })
    test('to GET status 400 if try to post an booking object with incorrect data types', () => {
        return request(app)
            .post("/bookings")
            .send({
                userId: "648733606b77da2cfea3e774",
                vanId: "64873c83768e970eec9aa22a",
                startDate: 3000,
                endDate: 3000,
                totalCost: 'one hundred',
                paymentDetails: 3000,
            })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('invalid request')
            })
    })
    test("GET - status: 404 respond with correct error message if end point is not valid", () => {
        return request(app)
            .post("/nonsense")
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("request not found");
            });
    });
})
describe("/vans/:id/reviews", () => {
    test("POST - STATUS: 201 - to post a new review object to the data base", () => {
        return request(app)
            .post("/vans/64873c83768e970eec9aa22a/reviews")
            .send({
                userId: "648733606b77da2cfea3e774",
                rating: 1,
                comment: 'rubbish'
            })
            .expect(201)
            .then((response) => {
                const { userId, vanId, rating, comment } = response.body.newReview;

                expect(userId).toBe("648733606b77da2cfea3e774");
                expect(vanId).toBe("64873c83768e970eec9aa22a");
                expect(rating).toBe(1);
                expect(comment).toBe("rubbish");
            })
    })
    test('to GET status 201 if try to post an review without a comment', () => {
        return request(app)
            .post("/vans/64873c83768e970eec9aa22a/reviews")
            .send({
                userId: "648733606b77da2cfea3e774",
                rating: 1,

            })
            .expect(201)
            .then((response) => {
                console.log(JSON.stringify(response.body.newReview));
                const { rating, userId } = response.body.newReview;
                expect(rating).toBe(1);
                expect(userId).toBe("648733606b77da2cfea3e774")

            })
    })
    test('to GET status 400 if try to post an empty review object', () => {
        return request(app)
            .post("/vans/64873c83768e970eec9aa22a/reviews")
            .send({})
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('invalid request')
            })
    })

    test("GET - status: 404 respond with correct error message if end point is not valid", () => {
        return request(app)
            .post("/vans/64873c83768e970eec9aa22a/nonsense")
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("request not found");
            });
    });
})
// need to move this below into the app.test 
////////////////////////////////////////

describe('/api', () => {
    test('to GET an json object containing a description of the end points, what queries can be made and an example response', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then((response) => {
                const epObject = response.body.endPoints["GET /users"];
                expect(typeof epObject).toEqual('object');
                expect(epObject.hasOwnProperty('description')).toBe(true);
                expect(epObject.hasOwnProperty('queries')).toBe(true);
                expect(epObject.hasOwnProperty('exampleResponse')).toBe(true);

            })
    })
})
