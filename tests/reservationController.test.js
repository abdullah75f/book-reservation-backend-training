const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const {
  createReservation,
  updateReservationStatus,
} = require("../controllers/reservationController");
const Reservation = require("../models/Reservation");
const Book = require("../models/Book");
const User = require("../models/User");
const {
  createNotification,
  notifyAdmins,
} = require("../utils/notificationUtils");

const app = express();
app.use(express.json());

// Middleware to mock req.user
app.use((req, res, next) => {
  req.user = JSON.parse(req.headers.user);
  next();
});

// Define routes
const router = express.Router();
router.post("/", createReservation);
router.put("/:id", updateReservationStatus);

app.use("/reservations", router);

jest.mock("../models/Reservation");
jest.mock("../models/Book");
jest.mock("../models/User");
jest.mock("../utils/notificationUtils");

describe("Reservation Controller", () => {
  let user, book, reservation;

  beforeEach(() => {
    user = { _id: "userId", name: "Test User", isAdmin: false };
    book = { _id: "bookId", title: "Test Book" };
    reservation = {
      _id: "reservationId",
      user: { _id: user._id, name: user.name, toString: () => user._id }, // Populated user with toString
      book: { _id: book._id, title: book.title }, // Populated book
      startDate: new Date(),
      endDate: new Date(),
      status: "pending",
    };

    // Mock Book and User models
    Book.findById.mockResolvedValue(book);
    User.findById.mockResolvedValue(user);

    // Mock Reservation constructor for createReservation
    Reservation.mockImplementation(() => ({
      user: user._id, // Unpopulated user ID for creation
      book: book._id, // Unpopulated book ID for creation
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      status: "pending",
      save: jest.fn().mockResolvedValue(reservation),
    }));

    // Mock Reservation.findById for updateReservationStatus
    Reservation.findById.mockImplementation((id) => {
      if (id === reservation._id) {
        return {
          ...reservation,
          populate: jest.fn().mockReturnThis(), // Chainable populate
          exec: jest.fn().mockResolvedValue(reservation),
          save: jest.fn().mockImplementation(function () {
            return Promise.resolve({ ...this, status: this.status });
          }),
        };
      }
      return null;
    });

    // Mock notification utils
    notifyAdmins.mockResolvedValue();
    createNotification.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new reservation", async () => {
    const res = await request(app)
      .post("/reservations")
      .set("user", JSON.stringify(user))
      .send({ bookId: book._id, startDate: new Date(), endDate: new Date() });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", reservation._id);
    expect(notifyAdmins).toHaveBeenCalledWith(
      `New reservation request from ${user.name} for "${book.title}"`,
      "new_reservation"
    );
  });

  test("should update reservation status", async () => {
    const updatedReservation = { ...reservation, status: "approved" };
    Reservation.findById.mockImplementationOnce((id) => ({
      ...reservation,
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(reservation),
      save: jest.fn().mockResolvedValue(updatedReservation),
    }));

    const res = await request(app)
      .put(`/reservations/${reservation._id}`)
      .set("user", JSON.stringify(user))
      .send({ status: "approved" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "approved");
    expect(createNotification).toHaveBeenCalledWith(
      expect.objectContaining({ _id: user._id }), // Expect the populated user object
      `Your reservation for "${book.title}" has been approved`,
      "reservation_status"
    );
  });
});
