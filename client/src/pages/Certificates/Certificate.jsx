import React from "react";
import { QRCodeSVG } from "qrcode.react";
import certificate from "./ecellcertificate2.png";

function Certificate({ data }) {
  const name = data.name;
  const id = data._id;
  const link = `https://escanify-frsq.onrender.com/#/profile/${id}`;

  

  return (
    <>
      <header className="fixed top-0 left-0 z-40 w-full bg-shubhu py-2 text-center text-white font-bold text-2xl">
        eScanify
      </header>
      {/*certificate*/}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br pt-20 pb-12">
        <div
          // ref={componentRef}
          className="relative border-2 border-black rounded-lg w-2/3"
        >
          <img
            className="rounded-lg border-black"
            src={certificate}
            alt="Certificate"
          />

          <p
            className="name absolute font-bold text-3xl "
            style={{
              top: "40%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {name}
          </p>

          <p
            className="description absolute  px-2 text-center"
            style={{
              top: "50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
            }}
          >
            has actively participated in the event organized by E-Cell RGPV. We
            acknowledge your commitment and enthusiasm in advancing your
            entrepreneurship skills.
          </p>

          <div
            className="absolute p-1 border-2 border-gray-300 bg-white shadow-md rounded-lg"
            style={{
              bottom: "4%",
              left: "4%",
            }}
          >
            <QRCodeSVG
              value={link}
              className=" qr w-16 h-16 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
            />
          </div>
        </div>
        <style jsx>{`
                @media (max-width: 470px) {
                  .description{
                    top: 55%;
                    font-size:6px;
                    width: 80%;
                  }
    
                  .qr {
                    width: 30px !important;
                    height: 30px !important;
                    bottom: 8%;
                  }
    
                  .name{
                  top:3.4rem !important;
                  font-size: 14px; !important;
                  font-weight: bold;
                  }
                }
              `}</style>
      </div>

      {/* Action Buttons */}
      {/* <div className="flex justify-center">
            <button
              onClick={generatePDF}
              className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
            >
              Download Certificate
            </button>
          </div> */}
    </>
  );
}

export default Certificate;
