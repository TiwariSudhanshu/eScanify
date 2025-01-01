import { Profile } from "../models/profile.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import nodemailer from 'nodemailer'

export const sendMail = async (req, res) => {
    try {
      // Fetch data from Profile and populate certificates
      const profiles = await Profile.find().populate('certificate');
      if (!profiles || profiles.length === 0) {
        throw new ApiError(400, "No profiles found");
      }
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
  
      console.log("Controller");
  
      for (const profile of profiles) {
        const certificateFile = profile.certificate;
  
        if (!certificateFile || !certificateFile.data) {
          console.log(`No certificate found for ${profile.email}`);
          continue;
        }
  
        const certificateBuffer = Buffer.from(certificateFile.data);
  
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: profile.email,
          subject: "Certificate of participation in Ecell Event",
          text: `Dear ${profile.name},
  
  Greetings from the E-Cell team at RGPV!
  
  We hope this email finds you well. We are pleased to inform you that your active participation in our event, ${profile.eventName}, held on ${profile.eventDate}, has been duly recognized. Your enthusiasm and contributions have significantly enriched the experience of the event.
  
  Please find attached your Participation Certificate as a token of appreciation for your involvement.
  
  We hope to see you in our future events as well, contributing with the same zeal and enthusiasm. If you have any queries or suggestions, feel free to reach out to us.
  
  Thank you once again for being a part of our initiative.
  
  Best regards,
  Sudhanshu Tiwari
  E-Cell, RGPV`,
          attachments: [
            {
              filename: `${profile.name}_certificate.pdf`,
              content: certificateBuffer,
            },
          ],
        };
  
        console.log(`Sending email to ${profile.email}...`);
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${profile.email}`);
      }
  
      res.status(200).json(new ApiResponse(200, "Emails sent successfully!"));
    } catch (error) {
      console.log("Error in sending mail", error);
      throw new ApiError(500, "Email not sent");
    }
  };
  