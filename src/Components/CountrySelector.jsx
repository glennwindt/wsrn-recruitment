import React, { useState } from "react";
import CountrySelector from "../../components/CountrySelector";



// All Countries (No repeats)
const allCountries = [
  "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra",
  "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia",
  "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Cayman Islands", "Central African Republic", "Chad", "Chile",
  "China", "Colombia", "Comoros", "Congo", "Congo (Democratic Republic)",
  "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
  "Eswatini", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji",
  "Finland", "France", "French Guiana", "French Polynesia", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar",
  "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam",
  "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland",
  "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man",
  "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jersey", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Macau", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania",
  "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua",
  "Niger", "Nigeria", "Niue", "North Korea", "North Macedonia (formerly Macedonia)", "Northern Mariana Islands",
  "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico",
  "Qatar", "Romania", "Russia", "Rwanda", "Réunion", "Saint Barthélemy",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French)", "Saint Vincent and the Grenadines",
  "Samoa", "San Marino", "São Tomé and Príncipe", "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch)", "Slovakia",
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Svalbard and Jan Mayen", "Taiwan", "Tajikistan", "Tanzania",
  "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Wallis and Futuna",
  "Yemen", "Zambia", "Zimbabwe"
];

// Country codes (can be expanded as needed)
const countryCodeMap = {
  Portugal: "+351",
  Netherlands: "+31",
  Curaçao: "+599",
  USA: "+1",
  UK: "+44",
  Germany: "+49",
  France: "+33",
  Spain: "+34",
  Brazil: "+55",
  Philippines: "+63",
  Indonesia: "+62",
  India: "+91",
  China: "+86",
  Japan: "+81",
  SouthKorea: "+82",
  Australia: "+61",
  Canada: "+1",
  Mexico: "+52",
  Colombia: "+57",
  Nigeria: "+234",
  Ghana: "+233",
  Lebanon: "+961",
  Jordan: "+962",
  SaudiArabia: "+966",
  UAE: "+971",
  Russia: "+7",
  Sweden: "+46",
  Belgium: "+32",
  Ireland: "+353",
  Italy: "+39",
  Malta: "+356",
  Greece: "+30",
  Norway: "+47",
  Denmark: "+45",
  Finland: "+358",
  Austria: "+43",
  Switzerland: "+41",
  SouthAfrica: "+27",
  Kenya: "+254",
  Morocco: "+212",
  Algeria: "+213",
  Tunisia: "+216",
  Japan: "+81",
  Singapore: "+65",
  Malaysia: "+60",
  Thailand: "+66",
  Vietnam: "+84",
  Philippines: "+63",
  Indonesia: "+62"
};

export default function CountrySelector({ selectedCountry, onCountrySelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = allCountries.filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (country) => {
    onCountrySelect?.(country);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full">
      <label className="block mb-2 font-medium">Select Country</label>
      <input
        type="text"
        value={selectedCountry || ""}
        readOnly
        placeholder="Select a country"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-gray-700 rounded cursor-pointer text-white"
      />

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-gray-800 border border-gray-600 rounded shadow-lg">
          <input
            type="text"
            placeholder="Search country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-gray-700 border-b border-gray-600 focus:outline-none"
            autoFocus
          />
          <ul className="mt-2">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleSelect(country)}
                >
                  {country}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No country found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}