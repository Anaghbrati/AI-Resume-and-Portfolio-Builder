function TemplateSelector({ template, setTemplate }) {
  const templates = [
    {
      id: "professional",
      name: "Professional",
      description: "ATS-friendly and recruiter focused",
    },
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and compact",
    },
  ];

  return (
    <div className="template-selector">
      <h2>Choose Template</h2>

      <div className="template-options">
        {templates.map((item) => (
          <button
            key={item.id}
            className={`template-card ${
              template === item.id ? "selected" : ""
            }`}
            onClick={() => setTemplate(item.id)}
          >
            <div className={`template-preview ${item.id}`}>
              <div className="preview-line large"></div>
              <div className="preview-line"></div>
              <div className="preview-line"></div>

              <div className="preview-section"></div>

              <div className="preview-line"></div>
              <div className="preview-line"></div>
              <div className="preview-line short"></div>

              <div className="preview-section"></div>

              <div className="preview-line"></div>
              <div className="preview-line short"></div>
            </div>

            <div className="template-info">
              <strong>{item.name}</strong>
              <span>{item.description}</span>
            </div>

            {template === item.id && (
              <div className="template-selected">
                ✓ Selected
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;