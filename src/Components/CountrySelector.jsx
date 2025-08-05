import Select from 'react-select';
import countryData from '../utils/countryData';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'black',
    fontWeight: state.isSelected ? 'bold' : 'normal',
    backgroundColor: state.isFocused ? '#e6f7ff' : 'white',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
    fontWeight: 'bold',
  }),
};

const CountrySelector = ({ onChange }) => {
  const options = countryData.map((country) => ({
    label: country.name,
    value: country.dialCode,
  }));

  return (
    <Select
      options={options}
      styles={customStyles}
      onChange={onChange}
      placeholder="Select your country"
    />
  );
};

export default CountrySelector;

