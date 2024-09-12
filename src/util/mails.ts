import fs from "fs";
// import Jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';


export const sendClientMailFunc = (
    surname: string, firstName: string, email: string,
    phoneNumber: string, checkInDate: string, checkOutDate: string, 
    guestPerRoom: string, 

    bookingDate: string, year: string, hotelName: string, 
    hotelPhoneNumber: string, hotelEmail: string, 
    roomsCategory: string, roomsName: string
) => {
    try {
        // console.log(process.env.HOST_EMAIL);
        
        const mailTransporter = nodemailer.createTransport({
            // service: "gmail",
            host:  process.env.HOST_SENDER,
            port: 465,
            auth: {
                user: process.env.HOST_EMAIL,
                pass: process.env.HOST_PASSWORD
            }
        });

        // Read the file synchronously with utf8 encoding
        const data = fs.readFileSync("./src/emailTemplates/clientBooking.html", 'utf8');

        // Replace the placeholder with a dynamic value (e.g., "John")
        const Htmltemplate = data.replace(/{{firstName}}/g, firstName)
            .replace(/{{surname}}/g, surname)
            .replace(/{{phoneNumber}}/g, phoneNumber)
            // .replace(/{{email}}/g, email)
            .replace(/{{emailAddress}}/g, email)
            .replace(/{{checkInDate}}/g, checkInDate)
            .replace(/{{checkOutDate}}/g, checkOutDate)
            .replace(/{{guestPerRoom}}/g, guestPerRoom)
            .replace(/{{bookingDate}}/g, bookingDate)

            .replace(/{{roomsCategory}}/g, roomsCategory)
            .replace(/{{roomsName}}/g, roomsName)

            .replace(/{{hotelName}}/g, hotelName)
            .replace(/{{hotelPhoneNumber}}/g, hotelPhoneNumber)
            .replace(/{{hotelEmail}}/g, hotelEmail)
            // .replace(/{{code}}/g, code)
            .replace(/{{year}}/g, year);
        
        // console.log(Htmltemplate);
        

        const mailText = `
            Dear ${firstName} ${surname},

            Thank you for choosing ${hotelName}. We are pleased to confirm your reservation. Below are the details of your booking:

            Reservation Details:

            - Check-In Date: ${checkInDate}
            - Check-Out Date: ${checkOutDate}
            - Guests per Room: ${guestPerRoom}
            - Room: ${roomsCategory} - ${roomsName}

            - Booking Date: ${bookingDate}
            - Hotel Name: ${hotelName}
            - Hotel Phone Number: ${hotelPhoneNumber}

            If you have any questions or need further assistance, feel free to contact us at ${hotelEmail} or call us at ${hotelPhoneNumber}. We look forward to welcoming you to our hotel!


            N:B - All payments should be made to only ${hotelName} official Account

            Best Regards,
            ${hotelName}
        `;


        const details = {
            from: `${hotelName} <${ process.env.HOST_EMAIL }>`,
            to: `${email}`,
            replyTo: `${hotelEmail}`,
            subject: `Reservation Confirmation - ${hotelName}`, // "New Reservation Notification",
            text: mailText,
            html: Htmltemplate
        };

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                return {
                    status: false,
                    err,
                    message: 'an error occured while sending mail.',
                }
            }
        });
        
        return {
            status: true,
            message: 'Email sent successfully.',
        }
    } catch (error) {
        return {
            status: false,
            error,
            message: 'an error occured while sending email.',
        }
    }
}

export const sendAdminMailFunc = (
    surname: string, firstName: string, email: string,
    phoneNumber: string, checkInDate: string, checkOutDate: string, 
    guestPerRoom: string, 

    bookingDate: string, year: string, hotelName: string, 
    hotelPhoneNumber: string, hotelEmail: string, 
    roomsCategory: string, roomsName: string
) => {
    try {
        // console.log(process.env.HOST_EMAIL);
        
        const mailTransporter = nodemailer.createTransport({
            // service: "gmail",
            host:  process.env.HOST_SENDER,
            port: 465,
            auth: {
                user: process.env.HOST_EMAIL,
                pass: process.env.HOST_PASSWORD
            }
        });

        // Read the file synchronously with utf8 encoding
        const data = fs.readFileSync("./src/emailTemplates/adminBooking.html", 'utf8');

        // Replace the placeholder with a dynamic value (e.g., "John")
        const Htmltemplate = data.replace(/{{firstName}}/g, firstName)
            .replace(/{{surname}}/g, surname)
            .replace(/{{phoneNumber}}/g, phoneNumber)
            // .replace(/{{email}}/g, email)
            .replace(/{{emailAddress}}/g, email)
            .replace(/{{checkInDate}}/g, checkInDate)
            .replace(/{{checkOutDate}}/g, checkOutDate)
            .replace(/{{guestPerRoom}}/g, guestPerRoom)
            .replace(/{{bookingDate}}/g, bookingDate)

            .replace(/{{roomsCategory}}/g, roomsCategory)
            .replace(/{{roomsName}}/g, roomsName)

            .replace(/{{hotelName}}/g, hotelName)
            .replace(/{{hotelPhoneNumber}}/g, hotelPhoneNumber)
            .replace(/{{hotelEmail}}/g, hotelEmail)
            // .replace(/{{code}}/g, code)
            .replace(/{{year}}/g, year);
        
        // console.log(Htmltemplate);
        

        const mailText = `
            Hello Admin,

            A new reservation has been successfully made. Here are the details:

            Client Information:

            - Surname: ${surname}
            - First Name: ${firstName}
            - Email Address: ${email}
            - Phone Number: ${phoneNumber}

            Reservation Details:

            - Check-In Date: ${checkInDate}
            - Check-Out Date: ${checkOutDate}
            - Guests per Room: ${guestPerRoom}
            - Room Name: ${roomsCategory} - ${roomsName}
            - Booking Date: ${bookingDate}


            Please review the reservation details and prepare for the guest's arrival. If any issues arise, contact the client using the provided information.

            Best Regards,
            ${hotelName} IT System
        `;



        const details = {
            from: `${hotelName} <${ process.env.HOST_EMAIL }>`,
            to: `${hotelEmail}, montevarhotels@gmail.com`,
            // to: `montevarhotels@gmail.com`,
            cc: "sundaywht@gmail.com",
            replyTo: `${email}`,
            subject: `New Reservation Notification - ${hotelName}`,
            text: mailText,
            html: Htmltemplate
        };

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                return {
                    status: false,
                    err,
                    message: 'an error occured while sending mail.',
                }
            }
        });
        
        return {
            status: true,
            message: 'Email sent successfully.',
        }
    } catch (error) {
        return {
            status: false,
            error,
            message: 'an error occured while sending email.',
        }
    }
}
