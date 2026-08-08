function Hobbies({ hobbies, setResume }) {
  const handleChange = (e) => {
    setResume((prev) => ({
      ...prev,
      hobbies: e.target.value,
    }));
  };

  return (
    <section className="form-section">
      <h2>Hobbies & Interests</h2>

      <input
        type="text"
        placeholder="e.g. Photography, Traveling, Videography, Music"
        value={hobbies}
        onChange={handleChange}
      />

      <p className="input-hint">
        Separate multiple hobbies with commas.
      </p>
    </section>
  );
}

export default Hobbies;