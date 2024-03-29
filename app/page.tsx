"use client"

import { useState } from "react";

export default function Home() {
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

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

    setAge({ years, months, days });
  };
  return (
    <main className="bg-lgrey h-screen w-screen flex justify-center items-center">
      <div className="bg-white w-2/4 h-3/5 rounded-ee-[10rem] rounded-xl p-10">
      <div className="flex justify-right gap-6 px-4">
      <div className="flex flex-col">
        <label>DAY</label>
        <input 
        className="border rounded-md h-12 w-32 outline-purple-300 cursor-pointer text-center"
        placeholder="DD" 
        type="number" 
        value={day} 
        onChange={(e) => setDay(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label>MONTH</label>
        <input 
        className="border rounded-md h-12 w-32 outline-purple-400 cursor-pointer text-center" 
        type="number" 
        placeholder="MM"
        value={month} 
        onChange={(e) => setMonth(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label>YEAR</label>
        <input 
        className="border rounded-md h-12 w-32 outline-purple-400 cursor-pointer text-center" 
        type="number" 
        placeholder="YYYY"
        value={year} 
        onChange={(e) => setYear(e.target.value)} />
      </div>
      </div>
      <div className="flex justify-right items-center">
      <hr className="border w-[32rem] " />
      <button className="bg-purple-600 rounded-full p-3 cursor-pointer" onClick={calculateAge}><svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" stroke-width="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g></svg></button>
      </div>
      
        <div>
          <h1><span>{age ? `${age.years}` : '--'}</span> Years</h1>
          <h1><span>{age ? `${age.months}` : '--'}</span> Months</h1>
          <h1><span>{age ? `${age.days}` : '--'}</span> Days</h1>
        </div>
    </div>
    </main>
  );
}
