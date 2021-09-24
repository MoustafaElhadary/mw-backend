import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { ReactElement } from 'react';

const AddressInput = ({ setAddress, title, placeholder }): ReactElement => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 500,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    async () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter as "false"
      setValue(description, false);
      clearSuggestions();

      const results = await getGeocode({ address: description });

      const result =
        results.find((r) => r.types.includes('locality')) || results[0];
      const { lat, lng } = await getLatLng(result);

      const city = result.address_components.find((r) =>
        r.types.includes('locality')
      )?.long_name;
      const state = result.address_components.find((r) =>
        r.types.includes('administrative_area_level_1')
      )?.long_name;
      const country = result.address_components.find((r) =>
        r.types.includes('country')
      )?.long_name;
      const zipCode = result.address_components.find((r) =>
        r.types.includes('postal_code')
      )?.long_name;

      setAddress({
        city,
        state,
        country,
        lng,
        lat,
        zipCode,
        formatted_address: result.formatted_address,
        result,
      });
    };
  function renderAddressSuggestions() {
    return (
      <ul className="py-1 z-10 shadow border-0">
        {data.map((suggestion) => {
          const {
            id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
          return (
            <li
              key={main_text}
              onClick={handleSelect(suggestion)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200 border-b"
            >
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
          );
        })}
        <img
          src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
          alt="Powered by Google"
        />
      </ul>
    );
  }

  return (
    <>
      <div ref={ref}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {title}
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={value}
              onChange={handleInput}
              disabled={!ready}
              placeholder={placeholder}
              className="shadow-sm focus:ring-black focus:border-black w-full sm:text-sm border-gray-300 rounded-md"
            />
            {status === 'OK' && <ul>{renderAddressSuggestions()}</ul>}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            We need 1,000 people per city in order to launch there!
          </p>
        </div>
      </div>
    </>
  );
};

export default AddressInput;
