import { useState } from 'react';
import DOMPurify from "dompurify";
// import { connect } from 'react-redux';

const getAccessToken = () => {
	const encodedToken = localStorage.getItem("accessToken");
	if (encodedToken) {
		const sanitizedToken = decodeURIComponent(encodedToken);
		return DOMPurify.sanitize(sanitizedToken);
	}
	return null;
};

const ApplyForProblemSetterButton = () => {
  const [showModal, setShowModal] = useState(false);
  // const [reasons, setReasons] = useState('');
  // const [codingLanguage, setCodingLanguage] = useState('');
  // const [occupation, setOccupation] = useState('');
  // const [experience, setExperience] = useState('');
  const [error, setError] = useState("");


  const [formData, setFormData] = useState({
		codingLanguage: "",
		occupation: "",
		experience: "0",
		reasons: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

  const sanitizedFormData = {
    codingLang: DOMPurify.sanitize(formData.codingLanguage),
    occupation: DOMPurify.sanitize(formData.occupation),
    experience: DOMPurify.sanitize(formData.experience),
    reason: DOMPurify.sanitize(formData.reasons),
  };

  const validateForm = () => {
		if (
			!sanitizedFormData.codingLang ||
      !sanitizedFormData.occupation ||
			!sanitizedFormData.experience ||
			!sanitizedFormData.reason
		) {
			setError("Please fill in all the fields.");
			return false;
		}
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (!validateForm()) {
    //   return;
    // }
    	const accessToken = getAccessToken();

	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest",
		},
		withCredentials: true,
	};

    fetch("http://localhost:5005/api/applyProblemSetter", {
      method: "POST",
			headers: config.headers,
			credentials: "include",
      body: JSON.stringify(sanitizedFormData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        else 
        {
          return response.json().then(error => {
            console.log(error);
            throw new Error(error.message);
          });
    
        }
      })
      .then((data) => {
        console.log(data); // Assuming the server returns some data
        // TODO: Handle success or navigate to a different page
      })
      .catch((error) => {
        // console.error("Signup failed:", error.message);
        // TODO: Handle error or show error message to the user
        setError(`${error.message}`);
      });


    setShowModal(false);
  };

  const codingLanguages = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'];
  const occupations = ['Software Engineer', 'Web Developer', 'Data Scientist', 'UI/UX Designer', 'Product Manager'];

  return (
    <>
      <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded">
        Apply for Problem Setter
      </button>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4 text-center">
            <div className="fixed inset-0 backdrop-filter backdrop-blur-sm bg-opacity-70 bg-gray-900">
              <div className="inline-block align-middle p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Application Form</h3>
                  <div className="mt-2">
                  {error && <p className="text-red-500 mb-2">{error}</p>}
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="language" className="block">
                          Language Used for Coding:
                        </label>
                        <select
                          id="language"
                          name="codingLanguage"
                          value={formData.codingLanguage}
                          onChange={handleChange}
                          className="border border-gray-300 rounded w-full p-2 mt-1"
                          required
                        >
                          <option value="">Select Language</option>
                          {codingLanguages.map((language) => (
                            <option key={language} value={language}>
                              {language}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="occupation" className="block">
                          Occupation:
                        </label>
                        <select
                          id="occupation"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          className="border border-gray-300 rounded w-full p-2 mt-1"
                          required
                        >
                          <option value="">Select Occupation</option>
                          {occupations.map((occupation) => (
                            <option key={occupation} value={occupation}>
                              {occupation}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="experience" className="block">
                          Years of Experience:
                        </label>
                        <input
                          id="experience"
                          type="number"
                          min="0"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="border border-gray-300 rounded w-full p-2 mt-1"
                          required
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="reasons" className="block">
                          Reasons for Application:
                        </label>
                        <textarea
                          id="reasons"
                          name="reasons"
                          value={formData.reasons}
                          onChange={handleChange}
                          rows={4}
                          className="border border-gray-300 rounded w-full p-2 mt-1"
                          required
                        />
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                          Submit Application
                        </button>
                        <button
                          onClick={handleCloseModal}
                          type="button"
                          className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default ApplyForProblemSetterButton;
