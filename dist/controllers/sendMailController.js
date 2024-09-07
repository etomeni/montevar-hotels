// import nodemailer from 'nodemailer';
// import axios from "axios";
import { getCurrentDateTime } from "./../util/resources.js";
import { sendAdminMailFunc, sendClientMailFunc } from "./../util/mails.js";
export const sendNewBookingMailCtrl = async (req, res, next) => {
    try {
        const surname = req.body.surname || "";
        const firstName = req.body.firstName || "";
        const email = req.body.email || "";
        const phoneNumber = req.body.phoneNumber || "";
        const checkIn = req.body.checkIn || "";
        const checkOut = req.body.checkOut || "";
        const guestPerRoom = req.body.guestPerRoom || "";
        const bookingDate = req.body.bookingDate || getCurrentDateTime();
        const year = req.body.year || new Date().getFullYear();
        const hotelName = req.body.hotelName || "Montevar Hotels";
        const hotelPhoneNumber = req.body.hotelPhoneNumber || "0706 099 6380";
        const hotelEmail = req.body.hotelEmail || "montevarhotelsuites@gmail.com";
        if (!surname || !firstName || !email || !phoneNumber || !checkIn || !checkOut || !guestPerRoom) {
            return res.status(400).json({
                status: false,
                statusCode: 400,
                message: "All fields are required.",
            });
        }
        const clientMailRes = sendClientMailFunc(surname, firstName, email, phoneNumber, checkIn, checkOut, guestPerRoom, bookingDate, year, hotelName, hotelPhoneNumber, hotelEmail);
        const adminMailRes = sendAdminMailFunc(surname, firstName, email, phoneNumber, checkIn, checkOut, guestPerRoom, bookingDate, year, hotelName, hotelPhoneNumber, hotelEmail);
        if (!clientMailRes.status) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                message: `client mail - ${clientMailRes.message}`,
                error: clientMailRes.error
            });
        }
        if (!adminMailRes.status) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                message: `admin mail - ${adminMailRes.message}`,
                error: adminMailRes.error
            });
        }
        return res.status(201).json({
            status: true,
            statusCode: 201,
            message: 'successful'
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
