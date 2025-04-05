"use client";

import { useEffect, useState } from "react";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

const formatPhoneNumber = (phoneNumber: number) => {
  const phoneNumberString = phoneNumber.toString();
  return `(${phoneNumberString.slice(0, 3)}) ${phoneNumberString.slice(3, 6)}-${phoneNumberString.slice(6)}`;
}

const AdvocateRow = ({ advocate, index }: { advocate: Advocate, index: number }) => {
  const { firstName, lastName, city, degree, specialties, yearsOfExperience, phoneNumber } = advocate;

  return (
    <tr key={`advocate-${index}`} className="even:bg-gray-200 odd:bg-white">
      <td>{firstName} {lastName}{degree && `, ${degree}`}</td>
      <td>{city}</td>
      <td>
        <div className="flex-wrap">
          {specialties.map((s, i) => (
            <div key={`specialty-${index}-${i}`}>{s}</div>
          ))}
        </div>
      </td>
      <td>{yearsOfExperience}</td>
      <td>{formatPhoneNumber(phoneNumber)}</td>
    </tr>
  );
}

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setTotal(jsonResponse.total);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
    });
  }, []);

  useEffect(() => {
    if (loading) return;
    const filteredAdvocates = advocates.filter((advocate) => {
      const { firstName, lastName, city, degree, specialties, yearsOfExperience, phoneNumber } = advocate;
      const searchLower = searchTerm.toLowerCase();
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      const fullNameLower = `${firstName} ${lastName}, ${degree}`.toLocaleLowerCase();

      return (
        firstName?.toLowerCase()?.includes(searchLower) ||
        lastName?.toLowerCase()?.includes(searchLower) ||
        city?.toLowerCase().includes(searchLower) ||
        degree?.toLowerCase().includes(searchLower) ||
        phoneNumber?.toString()?.includes(searchTerm) ||
        specialties?.some(s => s.toLowerCase().includes(searchLower)) ||
        (!isNaN(Number(searchTerm)) && yearsOfExperience >= Number(searchTerm)) ||
        formattedPhoneNumber?.includes(searchTerm) ||
        fullNameLower?.includes(searchLower)
      );
    });
    setFilteredAdvocates(filteredAdvocates);
    setTotal(filteredAdvocates.length);
  }, [searchTerm]);
  

  return (
    <main className="flex max-h-dvh">
      <div className="flex flex-col h-full max-h-dvh">
        <h1 className="mb-6 text-2xl">Advocates</h1>

          { loading && (
            <p> Loading...</p>
          )}
          { !loading && error && (
            <p className="text-red-500 font-bold">Error: {error}</p>
          ) }
          { !loading && !error && (
            <>
            <div className="flex flex-col">
              <div className="flex mb-4 items-end">
                <div className="flex flex-grow items-center">
                  <label htmlFor="search" className="mr-2 font-light">Search</label>
                  <input onChange={(e) => setSearchTerm(e.target.value)} placeholder="eg. name, specialty, city, ..." className="me-2 advocate-search" value={searchTerm} aria-label="Search" />
                  <button onClick={() => setSearchTerm("")} className="btn-secondary" aria-label="Reset Search">Reset Search</button>
                </div>
                <div className="whitespace-nowrap">
                  {total} results
                </div>
              </div>

              <table className="advocate-table">
                <thead>
                  <tr>
                    <th className="rounded-tl">Name</th>
                    <th>City</th>
                    <th>Specialties</th>
                    <th>Years of Experience</th>
                    <th className="rounded-tr">Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdvocates.map((advocate, index) => (
                    <AdvocateRow key={`advocate-${index}`} advocate={advocate} index={index} />
                  ))}
                  {filteredAdvocates.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center">No advocates found</td>
                    </tr>
                    )}
                </tbody>
              </table>
        </div>
        <div>
          Pagination
        </div>
        </>
          )}
      </div>
    </main>
  );
}
