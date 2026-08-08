function PersonalInfo({ personal, setResume }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setResume((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [name]: value,
      },
    }));
  };

  return (
    <div className="section">
      <h2>Personal Information</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={personal.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={personal.email}
        onChange={handleChange}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={personal.phone}
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={personal.location}
        onChange={handleChange}
      />

      <input
        type="url"
        name="linkedin"
        placeholder="LinkedIn URL"
        value={personal.linkedin}
        onChange={handleChange}
      />

      <input
        type="url"
        name="github"
        placeholder="GitHub URL"
        value={personal.github}
        onChange={handleChange}
      />
    </div>
  );
}

export default PersonalInfo;