const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const seedDatabase = require('../seed-data/seed')

require("dotenv").config();

/* Connecting to the database before each test. */
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
/*  await seedDatabase()  */
});
afterAll(async () => {
  await mongoose.connection.close();
});

/* Closing database connection after each test. */

describe("/users", () => {
  test("GET - STATUS: 200 - respond with a list of users", () => {
    return request(app)
      .get("/users")
      .expect(200)
      .then((response) => {
        const users = response.body.allUsers;
        users.forEach(
          ({
            username,
            password,
            location,
            firstName,
            lastName,
            email,
            phoneNumber,
            img,
          }) => {
            expect(typeof username).toBe("string");
            expect(typeof password).toBe("string");
            expect(typeof location).toBe("object");
            expect(typeof firstName).toBe("string");
            expect(typeof lastName).toBe("string");
            expect(typeof email).toBe("string");
            expect(typeof phoneNumber).toBe("string");
            if (img) {
              expect(typeof img).toBe("string");
            }
          }
        );
      });
  });
  test("GET - status: 404 respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
});

describe("/users/:id", () => {
  test("GET - STATUS: 200 - respond with the specific user id", () => {
    return request(app)
      .get("/users/648733606b77da2cfea3e770")
      .expect(200)
      .then((response) => {
        const {
          location,
          username,
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          img,
        } = response.body;
        expect(location).toEqual({
          region: "barnsley",
          postcode: "s704qr",
        });
        expect(username).toBe("username1");
        expect(firstName).toBe("Ezekiel");
        expect(lastName).toBe("Hawkins");
        expect(email).toBe("magna.ut@outlook.org");
        expect(password).toBe("password1");
        expect(phoneNumber).toBe("07396650881");
        expect(img).toBe(
          "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
        );
      });
  });
  test("GET - status: 400 respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/users/nonsense")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });

  test("GET - status: 404 respond with correct error message if valid id but does not exist yet ", () => {
    return request(app)
      .get("/users/648847dd474b8491a2e59d55")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("request not found");
      });
  });
});

describe("/vans", () => {
  test("GET - STATUS: 200 - respond with a list of vans", () => {
    return request(app)
      .get("/vans")
      .expect(200)
      .then((response) => {
        const vans = response.body.allVans;
        vans.forEach(
          ({
            vanName,
            description,
            owner,
            make,
            model,
            year,
            location,
            amenities,
            availabilityDates,
            pricePerNight,
            sleeps,
            images,
          }) => {
            expect(typeof vanName).toBe("string");
            expect(typeof description).toBe("string");
            expect(typeof owner).toBe("string");
            expect(typeof make).toBe("string");
            expect(typeof model).toBe("string");
            expect(typeof year).toBe("number");
            expect(typeof location).toBe("object");
            expect(Array.isArray(amenities)).toBe(true);
            expect(typeof availabilityDates).toBe("object");
            expect(typeof pricePerNight).toBe("number");
            expect(typeof sleeps).toBe("number");
            expect(Array.isArray(images)).toBe(true);
          }
        );
      });
  });
  test("GET - status: 404 respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
});

describe("/vans/:id", () => {
  test("GET - STATUS: 200 - respond with a list of vans", () => {
    return request(app)
      .get("/vans/64873c83768e970eec9aa22a")
      .expect(200)
      .then((response) => {
        const {
          vanName,
          description,
          owner,
          make,
          model,
          year,
          location,
          amenities,
          availabilityDates,
          pricePerNight,
          sleeps,
          images,
        } = response.body;

        expect(vanName).toBe("The Voyager");
        expect(description).toBe(
          "The Volkswagen California is a versatile and comfortable campervan that offers a perfect blend of functionality and style. It is an ideal choice for your next adventure. "
        );
        expect(owner).toBe("648733606b77da2cfea3e770");
        expect(make).toBe("Volkswagen");
        expect(model).toBe("California");
        expect(year).toBe(2022);
        expect(location.region).toBe("barnsley");
        expect(amenities[1]).toBe("sun roof");
        expect(availabilityDates.startDate.slice(0, 10)).toBe("2023-07-01");
        expect(pricePerNight).toBe(50);
        expect(sleeps).toBe(2);
        expect(images).toEqual([
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wKy1lKY3Wx2cPvKVs1lUWVnltoy4V2YOsw&usqp=CAU",
          "https://media.gq-magazine.co.uk/photos/5e74910306bab00008958011/16:9/pass/20200320-VW-Electric-03.jpg",
          "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg",
        ]);
      });
  });
  test("GET - status: 400 respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/vans/nonsense")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("GET - status: 404 respond with correct error message if valid id but does not exist yet ", () => {
    return request(app)
      .get("/vans/648847dd474b8491a2e59d55")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("request not found");
      });
  });
});

describe("/vans/:id/reviews", () => {
  test("GET - STATUS: 200 - responds with a list of reviews for van id", () => {
    return request(app)
      .get("/vans/64873c83768e970eec9aa22a/reviews")
      .expect(200)
      .then((response) => {
        const reviews = response.body.reviews;
        reviews.forEach(({ userId, vanId, rating, comment, createdAt }) => {
          expect(typeof userId).toBe("string");
          expect(typeof vanId).toBe("string");
          expect(typeof rating).toBe("number");
          expect(typeof createdAt).toBe("string");
          if(comment){
            expect(typeof comment).toBe("string");
          }
        });
      });
  });
  test("GET - reviews sorted by newest first, responds with correct review", () => {
    return request(app)
      .get("/vans/64873c83768e970eec9aa22a/reviews")
      .expect(200)
      .then((response) => {
        const reviews = response.body.reviews;
        const oldestReview = reviews[reviews.length - 1];
        const { userId, vanId, rating, comment } = oldestReview;

        expect(userId).toBe("648733606b77da2cfea3e774");
        expect(vanId).toBe("64873c83768e970eec9aa22a");
        expect(rating).toBe(10);
        expect(comment).toBe(
          "Absolutely loved our experience with the Volkswagen California campervan! It was spacious, comfortable, and had all the amenities we needed for our road trip. The pop-up roof provided extra headroom, and the fully equipped kitchenette made cooking on the go a breeze. The campervan was in excellent condition, and the rental process was smooth. Highly recommend this campervan for anyone seeking adventure and comfort!"
        );
      });
  });
  test("GET - status: 400 respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/vans/nonsense/reviews")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("GET - status: 404 respond with correct error message if valid id but does not exist yet ", () => {
    return request(app)
      .get("/vans/648847dd474b8491a2e59d55/reviews")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("request not found");
      });
  });
  test("GET - STATUS: 200 - responds with an empty array ", () => {
    return request(app)
    .get("/vans/64873c83768e970eec9aa22c/reviews")
      .expect(200)
      .then((response) => {

        expect(response.body.reviews).toEqual([]);
      });})

});

describe("GET /bookings", () => {
  test("Should return STATUS - 200 responds with a list of bookings with required properties", () => {
    return request(app).get("/bookings").then( (response) => {
      const bookings = response.body.bookings;
     bookings.forEach(({userId, vanId, startDate, endDate, totalCost, paymentDetails }) => {
        expect(typeof userId).toBe("string");
        expect(typeof vanId).toBe("string");
        expect(typeof startDate).toBe("string");
        expect(typeof endDate).toBe("string");
        expect(typeof totalCost).toBe("number");
        expect(typeof paymentDetails).toBe("string");
      })
    })
  })
  
})

describe("GET /bookings/:booking_id", () => {
  test("STATUS - 200 and expect booking values to be as expected.", () => {
    return request(app).get("/bookings/648b2d2cbd34fabd752b0b05").expect(200).then(({body}) => {
      const { userId, vanId, startDate, endDate, totalCost, paymentDetails } = body.booking;

      expect(userId).toBe("648733606b77da2cfea3e774")
      expect(vanId).toBe("64873c83768e970eec9aa22a")
      expect(startDate.slice(0,10)).toBe("2023-08-01")
      expect(endDate.slice(0,10)).toBe("2023-08-03")
      expect(totalCost).toBe(100)
      expect(paymentDetails).toBe("unpaid")
    })
  })

  test("Should return 400 bad request if the id is not a valid string", () => {
    return request(app).get("/bookings/648b19").expect(400).then(({body}) => {
      expect(body.msg).toBe("bad request");
    })
  })

  test("Should return a 404 Not Found error if the id does not exist in the database", () => {
    return request(app).get("/bookings/648b19c7b62d2ba61de8a6f7").expect(404).then(({body}) => {
      expect(body.msg).toBe("request not found")
    })
  })

  test("GET - status: 404 respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });


})

//--detectOpenHandles
