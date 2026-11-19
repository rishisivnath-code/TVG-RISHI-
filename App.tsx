import React, { useState } from "react";

type Mode = "home" | "video" | "photo" | "vfx" | "ai";

export default function App() {
  const [mode, setMode] = useState<Mode>("home");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [brightness, setBrightness] = useState(100);
  const [prompt, setPrompt] = useState("");

  function importMedia(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (url) URL.revokeObjectURL(url);
    setFile(selected);
    setUrl(URL.createObjectURL(selected));
    setBrightness(100);
  }

  function openMode(next: Mode) {
    setFile(null);
    setUrl("");
    setMode(next);
  }

  const buttonStyle: React.CSSProperties = {
    background: "#20283b",
    color: "white",
    border: "1px solid #45516c",
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    margin: 5
  };

  return (
    <div style={{
      background: "#080b14",
      color: "white",
      minHeight: "100vh",
      padding: 20,
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{color:"#a78bfa"}}>STUDIO PRO AI</h1>
      <p style={{color:"#a5acc0"}}>Your creative powerhouse</p>

      {mode === "home" && (
        <>
          <h2>Creative Studio</h2>
          {(["video","photo","vfx","ai"] as Mode[]).map(m => (
            <button
              key={m}
              style={buttonStyle}
              onClick={() => openMode(m)}
            >
              {m.toUpperCase()} STUDIO
            </button>
          ))}
          <h2 style={{marginTop:35}}>My Projects</h2>
          <p>Import media to start your first project.</p>
        </>
      )}

      {mode !== "home" && (
        <>
          <button style={buttonStyle} onClick={() => openMode("home")}>
            ← Home
          </button>

          <h2>{mode.toUpperCase()} STUDIO</h2>

          {mode === "ai" ? (
            <>
              <p>Describe the edit you want.</p>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Example: Make my video cinematic..."
                style={{
                  width:"100%", height:100,
                  background:"#151b2a", color:"white",
                  padding:12, borderRadius:10
                }}
              />
              <p style={{color:"#a5acc0"}}>
                AI processing requires an AI service connection.
                This prompt is not sent to an AI yet.
              </p>
            </>
          ) : (
            <>
              <label style={{
                ...buttonStyle,
                display:"block",
                textAlign:"center",
                cursor:"pointer"
              }}>
                + Import {mode === "video" ? "Video" : "Photo"}
                <input
                  type="file"
                  accept={mode === "video"
                    ? "video/*" : "image/*"}
                  onChange={importMedia}
                  style={{display:"none"}}
                />
              </label>

              {url && file && (
                <>
                  <div style={{
                    background:"#151b2a",
                    borderRadius:14,
                    padding:10,
                    marginTop:20
                  }}>
                    {mode === "video" ? (
                      <video
                        src={url}
                        controls
                        playsInline
                        style={{width:"100%",maxHeight:350}}
                      />
                    ) : (
                      <img
                        src={url}
                        alt="Your edit"
                        style={{
                          width:"100%",
                          maxHeight:400,
                          objectFit:"contain",
                          filter:`brightness(${brightness}%)`
                        }}
                      />
                    )}
                  </div>

                  <p>{file.name}</p>

                  {mode === "photo" && (
                    <>
                      <h3>Brightness</h3>
                      <input
                        type="range"
                        min="30"
                        max="200"
                        value={brightness}
                        onChange={e =>
                          setBrightness(Number(e.target.value))
                        }
                        style={{width:"100%"}}
                      />
                      <p>{brightness}%</p>
                      <button
                        style={buttonStyle}
                        onClick={() => setBrightness(100)}
                      >
                        Reset brightness
                      </button>
                    </>
                  )}

                  {mode === "video" && (
                    <p style={{color:"#a5acc0"}}>
                      Video preview is ready. Advanced timeline
                      editing and video export are coming next.
                    </p>
                  )}
                </>
              )}

              {mode === "vfx" && (
                <p>Import an image or video to prepare your VFX workspace.</p>
              )}
            </>
          )}
        </>
      )}

      <p style={{
        marginTop:50,
        color:"#818ba4",
        textAlign:"center"
      }}>
        STUDIO PRO AI · Made for creators
      </p>
    </div>
  );
}
