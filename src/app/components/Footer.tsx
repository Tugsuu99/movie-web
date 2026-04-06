"use client";

import React from "react";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#4338CA] text-white pt-12 pb-8 px-6 md:px-12">
      {/* Container to match your Header and Content width */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
        {/* SECTION 1: LOGO & COPYRIGHT */}
        <div className="flex flex-col gap-4">
          <img className="w-24 h-auto" src="Logo.png" alt="Movie Z Logo" />
          <p className="text-sm opacity-80">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        {/* SECTION 2: CONTACT INFORMATION */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg">Contact Information</h3>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/10 rounded-full shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase opacity-60">Email:</p>
                <p className="text-sm">support@movieZ.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/10 rounded-full shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase opacity-60">Phone:</p>
                <p className="text-sm">+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: SOCIAL MEDIA */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg">Follow us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-300 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-pink-400 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              <Youtube size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom border/divider for extra polish */}
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 text-center text-xs opacity-50">
        Built with Movie DB API
      </div>
    </footer>
  );
};
