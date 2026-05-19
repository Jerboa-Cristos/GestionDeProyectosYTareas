import React from "react";
import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
        <main className='flex-1 flex flex-col items-center justify-center bg-blueBase rounded-xl shadow-lg p-6 md:p-10 overflow-hidden'>
             <div className="flex flex-col items-center justify-center grow py-12">
                <ScaleLoader   color="#34A0A4" height={50} radius={4} width={7} />
             </div>
        </main>
    </div>
  );
}