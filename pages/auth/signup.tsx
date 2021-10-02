import AddressInput from 'components/AddressInput';
import AgeGroup from 'components/AgeGroup';
import { Logo } from 'components/icons';
import { useFormik } from 'formik';
import React, { ReactElement, useState } from 'react';
import validator from 'validator';

const user = {
  name: 'Debbie Lewis',
  handle: 'deblewis',
  email: 'debbielewis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80',
};

const SignUp = ({ invited_by_code }): ReactElement => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  return (
    <div className="min-h-screen bg-white">
      <div className=" flex-col h-screen py-12">
        <main className="mx-4 md:mx-24 lg:mx-72 ">
          <div className="mb-6">
            <Logo />
            <h2 className="mt-6 text-xl font-extrabold text-gray-900">
              Join us
            </h2>
          </div>
          {step == 1 && (
            <Step1
              setStep={setStep}
              setPhone={setPhone}
              inviteCode={invited_by_code}
            />
          )}
          {step == 2 && <Step2 phone={phone} setStep={setStep} />}
          {step == 3 && <Step3 phone={phone} setStep={setStep} />}
          {step == 4 && <Step4 phone={phone} setStep={setStep} />}
          {step == 5 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Thank you for applying!
                </label>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};
export default SignUp;

SignUp.getInitialProps = async ({ query }) => {
  const { invited_by_code } = query;

  return { invited_by_code };
};

const Step1 = ({ setStep, inviteCode, setPhone }) => {
  const [errors, setErrors] = useState('');
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      invited_by_code: inviteCode,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setErrors('');

        const isValidPhoneNumber = validator.isMobilePhone(values.phone);

        if (!isValidPhoneNumber) {
          throw new Error(`Invalid phone number`);
          return;
        }

        const response = await fetch('/api/waitlist/step1', {
          method: 'POST',
          body: JSON.stringify({ ...values }),
        });

        const x = await response.json();
        if (response.ok) {
          resetForm();
          setStep(2);
          setPhone(x.phone);
        } else {
          setErrors(x.error);
        }
      } catch (error) {
        setErrors(error.message);
      }
    },
  });

  return (
    <>
      <form
        key="step1"
        onSubmit={formik.handleSubmit}
        className="space-y-6 mt-6"
        autoComplete="new-password"
      >
        <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
          <p className="text-sm font-medium text-gray-700" aria-hidden="true">
            Photo
          </p>
          <div className="mt-1 lg:hidden">
            <div className="flex items-center">
              <div
                className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                aria-hidden="true"
              >
                <img
                  className="rounded-full h-full w-full"
                  src={user.imageUrl}
                  alt=""
                />
              </div>
              <div className="ml-5 rounded-md shadow-sm">
                <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                  <label
                    htmlFor="mobile-user-photo"
                    className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                  >
                    <span>Change</span>
                    <span className="sr-only"> user photo</span>
                  </label>
                  <input
                    id="mobile-user-photo"
                    name="user-photo"
                    type="file"
                    className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden relative rounded-full overflow-hidden w-40 h-40 lg:block">
            <img
              className="relative rounded-full w-40 h-40"
              src={user.imageUrl}
              alt=""
            />
            <label
              htmlFor="desktop-user-photo"
              className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
            >
              <span>Change</span>
              <span className="sr-only"> user photo</span>
              <input
                type="file"
                id="desktop-user-photo"
                name="user-photo"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
              />
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              required
              onChange={formik.handleChange}
              value={formik.values.name}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black  focus:border-black  sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="mt-1">
            <input
              id="phone"
              name="phone"
              type="text"
              autoComplete="off"
              required
              onChange={formik.handleChange}
              value={formik.values.phone}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black  focus:border-black  sm:text-sm"
            />
            {/* <p className="mt-2 text-sm text-gray-500">
            We need 1,000 people per city in order to launch there!
          </p> */}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Invite Code (optional)
          </label>
          <div className="mt-1">
            <input
              id="invited_by_code"
              name="invited_by_code"
              type="text"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.invited_by_code}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black  focus:border-black  sm:text-sm"
            />
          </div>
        </div>
        <div>
          {errors && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Joining' : 'Join the waitlist'}
          </button>
        </div>
      </form>
    </>
  );
};

const Step2 = ({ setStep, phone }) => {
  const [errors, setErrors] = useState('');
  const ageGroup = [
    'Under 12 years old',
    '12-17 years old',
    '18-24 years old',
    '25-34 years old',
    '35-44 years old',
    '45-54 years old',
    '55-64 years old',
    '65-74 years old',
    '75 years or older',
  ];

  const [address, setAddress] = useState({});
  const [selectedAge, setSelectedAge] = useState(ageGroup[2]);

  const submitUpdates = async () => {
    setErrors('');
    try {
      const response = await fetch('/api/waitlist/nextSteps', {
        method: 'PUT',
        body: JSON.stringify({
          address,
          ageGroup: selectedAge,
          phone,
        }),
      });

      setStep(3);
    } catch (error) {
      setErrors(errors);
    }
  };
  return (
    <>
      <div className="mt-5">
        <AddressInput
          setAddress={setAddress}
          title="Which city are you based out of?"
          placeholder="NYC, Denver, Miami, etc.."
        />
      </div>

      <AgeGroup
        selectedAge={selectedAge}
        setSelectedAge={setSelectedAge}
        ageGroup={ageGroup}
      />
      <div className="mt-4">
        {errors && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errors}
          </p>
        )}
      </div>
      <div className="mt-16">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black"
          onClick={() => submitUpdates()}
        >
          Next
        </button>
      </div>
    </>
  );
};

const Step3 = ({ phone, setStep }) => {
  const masterList = {
    sports: ['🏂 snowboarding', '⚽️ soccer', '🎾 tennis', '🏔 hiking'],
    social: ['🍽 eating', '👩🏼‍🍳 cooking', '🍻 bar crawl', '🍾 party'],
    creative: [
      '🎨 painting',
      '📸 photography',
      '🎥 videography',
      '🎙 podcasts',
      '📙 reading',
    ],
  };
  const [selectedList, setList] = useState({
    sports: [],
    social: [],
    creative: [],
  });

  return (
    <>
      <form key="step 3" className="overflow-y-auto">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            What are you interested in?
          </label>
        </div>

        {Object.keys(masterList).map((key, index) => {
          // key: the name of the object key
          // index: the ordinal position of the key within the object
          return (
            <div key={key}>
              <div className=" mt-5">
                <label className="block text-lg  font-semibold text-gray-700">
                  {key}
                </label>
              </div>
              <ul className=" mt-3">
                {masterList[key]
                  .sort(function (a, b) {
                    return a.length - b.length; //ASC, For Descending order use: b - a
                  })
                  .map((l) => {
                    return (
                      <li
                        className="inline mr-2 cursor-pointer"
                        key={' ' + Math.random() * 100}
                        onClick={() => {
                          if (selectedList[key]?.includes(l)) {
                            var local = [...selectedList[key]].filter(
                              (category) => category != l
                            );
                            setList({
                              ...selectedList,
                              [key]: [...local],
                            });
                          } else {
                            var local = [...selectedList[key]];
                            setList({
                              ...selectedList,
                              [key]: [...local, l],
                            });
                          }
                        }}
                      >
                        {selectedList[key]?.includes(l) ? (
                          <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-2 mb-3 bg-black shadow-xl">
                            <div className=" text-sm font-medium text-white">
                              {l} ✓{' '}
                            </div>
                          </div>
                        ) : (
                          <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-2 mb-3">
                            <div className=" text-sm font-medium text-gray-900">
                              {l}
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}

        {/* <div className="mt-5">
          <label
            htmlFor="add_team_members"
            className="block text-sm font-medium text-gray-700"
          >
            We missed something?
          </label>

          <div className="flex">
            <div className="flex-grow">
              <input
                type="text"
                name="add_team_members"
                id="add_team_members"
                className="block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border-gray-300 rounded-md"
                placeholder="Add your own"
                aria-describedby="add_team_members_helper"
              />
            </div>
            <span className="ml-3">
              <button
                type="button"
                className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
              >
                
                <svg
                  className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Add</span>
              </button>
            </span>
          </div>
        </div> */}
      </form>
      <footer className="flex justify-center py-6 lg:py-2">
        <div>
          <div
            onClick={async () => {
              const response = await fetch('/api/waitlist/nextSteps', {
                method: 'PUT',
                body: JSON.stringify({
                  selectedList,
                  phone,
                }),
              });

              setStep(4);
            }}
            className="mt-5 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-black text-sm font-medium text-white cursor-pointer"
          >
            <span>Next</span>
          </div>
          <label
            htmlFor="add_team_members"
            className="block text-sm font-medium text-gray-400 text-center"
          >
            Do not worry you can come back and add more later.
          </label>
        </div>
      </footer>
    </>
  );
};

const Step4 = ({ phone, setStep }) => {
  const experiences = [
    {
      name: '🕹 ⚽️ Beat #6 FIFA Champion',
      description:
        'Think you are good in FIFA? We think our player will crush you. Prove us wrong',
    },
    {
      name: '🏎 Go Karting, Shawarma and Chill',
      description: `What's better than a day filled with Go Karting, Shawarma and exploring a new city?`,
    },
    {
      name: '🏓 Table Tennis with US Olympian',
      description: `well if you beat Tim, you probably should quit your day job and join the olympic team.`,
    },
    {
      name: '📸 Photography and developing the film',
      description:
        'Learn how to be an OG and take proper pictures. #DeleteFacebook',
    },
  ];

  const [selectedExperiences, setSelectedExperiences] = useState([]);

  const toggleExperiences = (experience) => {
    if (selectedExperiences.includes(experience)) {
      setSelectedExperiences(
        selectedExperiences.filter((x) => x === experience)
      );
    } else {
      setSelectedExperiences([...selectedExperiences, experience]);
    }
  };

  return (
    <>
      <fieldset>
        <legend className="text-base font-medium text-gray-900">
          Last question, we promise. What experiences would you like to attend?
        </legend>
        <div className="mt-4 space-y-4">
          {experiences.map((experience) => (
            <div key={experience.name} className="flex items-start">
              <div className="h-5 flex items-center">
                <input
                  id={experience.name}
                  name={experience.name}
                  type="checkbox"
                  className="focus:ring-black h-4 w-4 text-black border-gray-300 rounded"
                  onClick={() => toggleExperiences(experience.name)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={experience.name}
                  className="font-medium text-gray-700"
                >
                  {experience.name}
                </label>
                <p className="text-gray-500">{experience.description}</p>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
      <footer className="flex justify-center py-6 lg:py-2">
        <div>
          <div
            onClick={async () => {
              const response = await fetch('/api/waitlist/nextSteps', {
                method: 'PUT',
                body: JSON.stringify({
                  selectedExperiences,
                  phone,
                }),
              });

              setStep(5);
            }}
            className="mt-5 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-black text-sm font-medium text-white cursor-pointer"
          >
            <span>Submit</span>
          </div>
        </div>
      </footer>
    </>
  );
};
