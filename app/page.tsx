"use client"

import { useState } from "react";

export default function Home() {
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const [errorD, setErrorD] = useState<string>("");
  const [errorM, setErrorM] = useState<string>("");
  const [errorY, setErrorY] = useState<string>("");

  const calculateAge = () => {

    const today = new Date();
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    const birthDay = parseInt(day);
    const birthMonth = parseInt(month);
    const birthYear = parseInt(year);
    
    // inputs validity
    isNaN(birthDay) || birthDay <= 0 || birthDay > 31 ? setErrorD("Invalid day") : setErrorD("");
    isNaN(birthMonth) || birthMonth <= 0 || birthMonth > 12 ? setErrorM("Invalid Month") : setErrorM("");
    birthYear > today.getFullYear() || isNaN(birthYear) ? setErrorY("Invalid year") : setErrorY("");

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }

    if (days < 0) {
      months--;
      const tempDate = new Date(today.getFullYear(), today.getMonth(), 0);
      days += tempDate.getDate();
    }

    setAge({ years, months, days })
  };
  return (
    <main className="bg-lgrey h-screen w-screen flex justify-center items-center xs:max-sm:p-8">
      <div className="bg-white xs:max-2xl:w-fit xs:max-sm:mx-4 xs:max-sm:w-full w-2/4 h-4/6 rounded-ee-[10rem] rounded-xl p-10">
      <div className="flex justify-start gap-6 px-4 xs:max-sm:justify-center">
      <div className="flex flex-col">
        <label className="font-poppins text-xs text-gray-500 font-semibold opacity-80">DAY</label>
        <input 
        className={`border-2 rounded-md xs:max-sm:w-16 sm:max-2xl:w-28 h-12 w-32 ${errorD ? "border-red-400" : "border-2"}${errorD ? "outline-red-400" : "outline-purple-300"} cursor-pointer font-poppins text-black font-bold text-xl p-2`} 
        placeholder="DD" 
        type="number" 
        value={day} 
        onChange={(e) => setDay(e.target.value)} 
        />
        {
          errorD && <p className="text-red-400">{errorD}</p>
        }
      </div>
      <div className="flex flex-col">
        <label className="font-poppins text-xs text-gray-500 font-semibold opacity-80">MONTH</label>
        <input 
        className={`border-2 rounded-md xs:max-sm:w-16 sm:max-2xl:w-28 h-12 w-32 ${errorM ? "border-red-400" : "border-2"}${errorM ? "outline-red-400" : "outline-purple-300"} cursor-pointer font-poppins text-black font-bold text-xl p-2`} 
        type="number" 
        placeholder="MM"
        value={month} 
        onChange={(e) => setMonth(e.target.value)}
        />
        {
          errorM && <p className="text-red-400">{errorM}</p>
        }
      </div>
      <div className="flex flex-col">
        <label className="font-poppins text-xs text-gray-500 font-semibold opacity-80">YEAR</label>
        <input 
       className={`border-2 rounded-md xs:max-sm:w-16 sm:max-2xl:w-28 h-12 w-32 ${errorY ? "border-red-400" : "border-2"}${errorY ? "outline-red-400" : "outline-purple-300"} cursor-pointer font-poppins text-black font-bold text-xl p-2`}  
        type="number" 
        placeholder="YYYY"
        value={year} 
        onChange={(e) => setYear(e.target.value)} 
        />
        {
          errorY && <p className="text-red-400">{errorY}</p>
        }
      </div>
      </div>
      <div className="flex justify-start items-center xs:max-sm:my-8 xs:max-sm:flex xs:max-sm:justify-center xs:max-sm:items-center">
      <hr className="border w-[32rem] xs:max-sm:w-full" />
      <button className="bg-purple-600 rounded-full p-3 xs:max-sm:p-1 cursor-pointer hover:bg-black xs:max-sm:absolute xs:max-sm:top-1/3 xs:max-sm:mt-2" onClick={calculateAge}><svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" stroke-width="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g></svg></button>
      </div>
      
        <div>
          <h1 className="text-black font-extrabold font-poppins text-7xl xs:max-sm:text-4xl"><span className="text-purple-600 font-poppins font-extrabold text-7xl xs:max-sm:text-4xl">{age ? `${age.years}` : '--'}</span> years</h1>
          <h1 className="text-black font-extrabold font-poppins text-7xl xs:max-sm:text-4xl"><span className="text-purple-600 font-poppins font-extrabold text-7xl xs:max-sm:text-4xl">{age ? `${age.months}` : '--'}</span> months</h1>
          <h1 className="text-black font-extrabold font-poppins text-7xl xs:max-sm:text-4xl"><span className="font-poppins font-extrabold text-7xl text-purple-600 xs:max-sm:text-4xl">{age ? `${age.days}` : '--'}</span> days</h1>
        </div>
    </div>
    </main>
  );
}
