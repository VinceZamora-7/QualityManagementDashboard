import React, { useState, useRef, useEffect } from "react";

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      // prevent background scroll when modal is open
      document.body.style.overflow = "hidden";
      // focus first field
      setTimeout(() => emailRef.current?.focus(), 0);
    } else {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };
    // Replace with real auth call
    console.log("Login attempt:", data);
    // Close modal after submit (or wait for auth result)
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        style={{
          padding: "8px 14px",
          borderRadius: 6,
          border: "1px solid #888",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onMouseDown={(e) => {
            // close when clicking backdrop
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
            }}
            aria-hidden="true"
          />

          <div
            style={{
              position: "relative",
              background: "#fff",
              padding: 24,
              width: 360,
              maxWidth: "90%",
              borderRadius: 8,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              zIndex: 1001,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <h2 id="login-title" style={{ margin: 0, fontSize: 18 }}>
                Sign in
              </h2>
              <button
                aria-label="Close login"
                onClick={() => setOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 18,
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label style={{ display: "block", marginBottom: 8 }}>
                <div style={{ fontSize: 13, marginBottom: 6 }}>Email</div>
                <input
                  name="email"
                  type="email"
                  ref={emailRef}
                  required
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 6,
                    border: "1px solid #bbb",
                    boxSizing: "border-box",
                  }}
                />
              </label>

              <label style={{ display: "block", marginBottom: 12 }}>
                <div style={{ fontSize: 13, marginBottom: 6 }}>Password</div>
                <input
                  name="password"
                  type="password"
                  required
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 6,
                    border: "1px solid #bbb",
                    boxSizing: "border-box",
                  }}
                />
              </label>

              <div
                style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    background: "#f4f4f4",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "none",
                    background: "#0366d6",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
