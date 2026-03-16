import React from "react";

export const Footer = () => {
  return (
    <div className="w-full h-70 bg-[#4338CA] flex gap-12 pt-10 pb-10 text-white justify-center">
      <div className="w-7xl h-50 max-w-7xl flex flex-row gap-30">
        <div className="w-61.75 h-50 flex flex-col gap-3">
          <img className="w-23" src="Logo.png" alt="" />
          <div className="w-61.75 h-5 font-normal text-3.5">
            © 2024 Movie Z. All Rights Reserved.
          </div>
        </div>
        <div className="w-228.25 h-50 flex flex-row-reverse gap-26 text-3.5 text-white">
          <div className="w-68.5 h-13 gap-3 flex flex-col">
            <div>Follow us </div>
            <div> Facebook Instaram Twitter Youtube</div>
          </div>
          <div className="w-43.5 h-50 flex flex-col gap-3 ">
            <div>Contact Information</div>
            <div className="flex flex-col w-fit h-auto gap-8">
              <div className="flex flex-col">
                <img className="w-4 h-4" src="message.png" alt="" />{" "}
                <div>Email:</div>
                <div>support@movieZ.com</div>
              </div>

              <div className="flex flex-col">
                <img className="w-4 h-4" src="call.png" alt="" />{" "}
                <div>Phone:</div>
                <div>+976 (11) 123-4567</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
