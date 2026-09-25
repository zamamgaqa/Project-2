import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "Nomvula Dlamini",
      time: "09:31 AM",
      text: "Good morning Doctor, I've been having headaches since yesterday.",
      doctor: false
    },
    {
      sender: "You",
      time: "09:32 AM",
      text: "Good morning Nomvula. I'm sorry to hear that. Let's discuss your symptoms.",
      doctor: true
    },
    {
      sender: "Nomvula Dlamini",
      time: "09:33 AM",
      text: "Thank you Doctor.",
      doctor: false
    }
  ]);

  const [notes, setNotes] = useState("");
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [seconds, setSeconds] = useState(765);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const sendMessage = () => {
    if (message.trim() === "") {
      alert("Please type a message.");
      return;
    }

    setMessages([
      ...messages,
      {
        sender: "You",
        time: "Now",
        text: message,
        doctor: true
      }
    ]);

    setMessage("");
  };

  const saveNotes = () => {
    if (notes.trim() === "") {
      alert("Please write some consultation notes.");
      return;
    }

    alert("Consultation notes saved successfully.");
  };

  const addPrescription = () => {
    alert("Prescription form will open here.");
  };

  const endCall = () => {
    setShowPopup(true);
  };

  const goBack = () => {
    alert("Returning to Doctor Dashboard...");
  };

  return (
    <div className="page">

      <div className="phone">

        {/* STATUS BAR */}
        <div className="status-bar">
          <span>9:41</span>
          <span>● ● 🔋</span>
        </div>

        {/* HEADER */}
        <div className="header">

          <button className="back" onClick={goBack}>
            ‹
          </button>

          <div className="title-area">
            <h2>Video Consultation</h2>
            <div className="timer">
              ● {formatTime()}
            </div>
          </div>

          <button className="end-top" onClick={endCall}>
            ☎ End
          </button>

        </div>

        {/* PATIENT CARD */}
        <div className="patient-card">

          <img
            className="patient-image"
            src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200"
            alt="Patient"
          />

          <div className="patient-info">
            <h3>Nomvula Dlamini</h3>
            <p>28 Years • Female</p>
            <p className="patient-id">ID: PT-100245</p>
          </div>

        </div>

        {/* VIDEO */}
        <div className="video-container">

          <img
            className="patient-video"
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800"
            alt="Patient Video"
          />

          <div className="online">
            ● Online
          </div>

          <div
            className={`doctor-video ${
              videoOff ? "video-disabled" : ""
            }`}
          >

            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300"
              alt="Doctor"
            />

            <div className="doctor-label">
              You (Doctor)
            </div>

          </div>

        </div>

        {/* TABS */}
        <div className="tabs">

          <button
            className={`tab ${activeTab === "chat" ? "active" : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            💬
            <br />
            Chat
          </button>

          <button
            className={`tab ${activeTab === "notes" ? "active" : ""}`}
            onClick={() => setActiveTab("notes")}
          >
            📋
            <br />
            Notes
          </button>

          <button
            className={`tab ${
              activeTab === "prescription" ? "active" : ""
            }`}
            onClick={() => setActiveTab("prescription")}
          >
            💊
            <br />
            Prescription
          </button>

          <button
            className={`tab ${
              activeTab === "patient" ? "active" : ""
            }`}
            onClick={() => setActiveTab("patient")}
          >
            👤
            <br />
            Patient Info
          </button>

        </div>

        {/* CHAT */}
        {activeTab === "chat" && (
          <div className="content">

            {messages.map((item, index) => (
              <div
                key={index}
                className={`message ${
                  item.doctor ? "doctor-message" : ""
                }`}
              >

                <span>
                  {item.sender} • {item.time}
                </span>

                <p>{item.text}</p>

              </div>
            ))}

            <div className="message-input">

              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />

              <button
                className="send"
                onClick={sendMessage}
              >
                ➤
              </button>

            </div>

          </div>
        )}

        {/* NOTES */}
        {activeTab === "notes" && (
          <div className="content">

            <h3 className="section-title">
              Consultation Notes
            </h3>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your notes here..."
            />

            <button
              className="save-notes"
              onClick={saveNotes}
            >
              Save Notes
            </button>

          </div>
        )}

        {/* PRESCRIPTION */}
        {activeTab === "prescription" && (
          <div className="content">

            <h3 className="section-title">
              Prescription
            </h3>

            <p className="prescription-text">
              No prescription added yet.
            </p>

            <button
              className="save-notes"
              onClick={addPrescription}
            >
              + Add Prescription
            </button>

          </div>
        )}

        {/* PATIENT INFORMATION */}
        {activeTab === "patient" && (
          <div className="content">

            <h3 className="section-title">
              Patient Information
            </h3>

            <p>
              <strong>Name:</strong> Nomvula Dlamini
            </p>

            <p>
              <strong>Age:</strong> 28
            </p>

            <p>
              <strong>Gender:</strong> Female
            </p>

            <p>
              <strong>Allergies:</strong> Penicillin
            </p>

            <p>
              <strong>Medical History:</strong> No chronic conditions
            </p>

          </div>
        )}

        {/* CALL CONTROLS */}
        <div className="controls">

          <div className="control">
            <button
              className={muted ? "active-control" : ""}
              onClick={() => setMuted(!muted)}
            >
              {muted ? "🔇" : "🎤"}
            </button>
            <br />
            Mute
          </div>

          <div className="control">
            <button
              className={videoOff ? "active-control" : ""}
              onClick={() => setVideoOff(!videoOff)}
            >
              {videoOff ? "📵" : "📹"}
            </button>
            <br />
            Video
          </div>

          <div className="control">
            <button
              className={speakerOn ? "active-control" : ""}
              onClick={() => setSpeakerOn(!speakerOn)}
            >
              {speakerOn ? "🔇" : "🔊"}
            </button>
            <br />
            Speaker
          </div>

          <div className="control">
            <button onClick={() => setActiveTab("chat")}>
              💬
            </button>
            <br />
            Chat
          </div>

          <div className="control">
            <button
              className="end-call"
              onClick={endCall}
            >
              ☎
            </button>
            <br />
            End Call
          </div>

        </div>

        {/* POPUP */}
        {showPopup && (
          <div className="popup">

            <h3>Consultation Ended</h3>

            <p>
              The video consultation has ended.
            </p>

            <button onClick={() => setShowPopup(false)}>
              Close
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;