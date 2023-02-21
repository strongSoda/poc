import React from "react";

export function ModelConfiguration({ openAiKey, setOpenAiKey }) {
  const [showModelConfig, setShowModelConfig] = React.useState(false);

  return (
    <div className="model-config">
      {!showModelConfig && (
        <div onClick={() => setShowModelConfig(true)}>⚙️</div>
      )}
      {showModelConfig && (
        <div className="model-config__content">
          <div className="model-config__header">
            <h3>Model Configuration</h3>
            <button onClick={() => setShowModelConfig(false)}>x</button>
          </div>
          <div className="model-config__input">
            <label>OpenAI API Token</label>
            <input
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}
