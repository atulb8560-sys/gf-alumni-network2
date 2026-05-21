"use client"

import { useState } from "react"
import Modal from "react-modal"
import { supabase } from "@/lib/supabase"

const POWERBI_URL =
  "https://app.powerbi.com/view?r=eyJrIjoiNmVlZTQ4OTItOGE4Ni00N2ExLWE0MGMtYzNkMjAzMWE5N2FkIiwidCI6Ijk3MzgwNTFjLWFhNjMtNDJmOS1hNTJjLWI1N2ZlM2NjNzU3NSIsImMiOjEwfQ%3D%3D"

const navItems = [
  {
    key: "overview",
    label: "Overview",
    icon: "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Overview%20Icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvT3ZlcnZpZXcgSWNvbi5wbmciLCJpYXQiOjE3NzkyNzcyNzMsImV4cCI6MjA5NDYzNzI3M30.LgL5cnebJHFmwZsYjuRszVvmsAFxlaCoWDIWhoA3ZaE",
    locked: false,
  },

  {
    key: "directory",
    label: "Directory",
    icon: "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Directory%20Icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvRGlyZWN0b3J5IEljb24ucG5nIiwiaWF0IjoxNzc5Mjc3Mjk5LCJleHAiOjIwOTQ2MzcyOTl9.xJ9cq9-waB3dh8KDO3ehV5PzJBl9_UW_RSHN2vqczC4",
    locked: true,
  },

  {
    key: "batch",
    label: "By Batch",
    icon: "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/By%20Batch%20icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvQnkgQmF0Y2ggaWNvbi5wbmciLCJpYXQiOjE3NzkyNzczMjYsImV4cCI6MjA5NDYzNzMyNn0.B3TXK21uEu9GNsK0dlRyWcHpTcag59rWTFbY14RYksU",
    locked: true,
  },

  {
    key: "location",
    label: "By Location",
    icon: "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/By%20location%20icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvQnkgbG9jYXRpb24gaWNvbi5wbmciLCJpYXQiOjE3NzkyNzczNTIsImV4cCI6MjA5NDYzNzM1Mn0.YmbR-xj-RFy7FC05ilE60lmULYRpbNm9jug44-FEsqY",
    locked: true,
  },

  {
    key: "insights",
    label: "Insights",
    icon: "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Insights.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvSW5zaWdodHMucG5nIiwiaWF0IjoxNzc5Mjc3MzcxLCJleHAiOjIwOTQ2MzczNzF9.8EOgEXVdxAKc7Lhj2-ICaVGH1Gyrq5NA7AfeWhnyEZs",
    locked: true,
  },

  {
    key: "stories",
    label: "Alumni Stories",
    icon: "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Alumni%20stories.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvQWx1bW5pIHN0b3JpZXMucG5nIiwiaWF0IjoxNzc5Mjc3Mzk3LCJleHAiOjIwOTQ2MzczOTd9.TwUHvTai0ZOBS8NgJA7sLt4M2L_OeTJ5fZG545zW0_s",
    locked: true,
  },

  {
    key: "opportunities",
    label: "Opportunities",
    icon: "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Opportunities.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvT3Bwb3J0dW5pdGllcy5wbmciLCJpYXQiOjE3NzkyNzc0MTgsImV4cCI6MjA5NDYzNzQxOH0.z9e4gKaGX2ORZB6ThXWifRBTGplBViJqpd5RrIH_0fY",
    locked: true,
  },

  {
    key: "organizations",
    label: "Organizations",
    icon: "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Orgainization.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvT3JnYWluaXphdGlvbi5wbmciLCJpYXQiOjE3NzkyNzc0NzEsImV4cCI6MjA5NDYzNzQ3MX0.FQk4qayMrSaSpxvs2DbH43HHaxAzP2gJMew4sEaowkA",
    locked: true,
  },

]

export default function Home() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [activePage, setActivePage] = useState("overview")
  const [dashboardUrl, setDashboardUrl] = useState(
  "https://app.powerbi.com/view?r=eyJrIjoiNmVlZTQ4OTItOGE4Ni00N2ExLWE0MGMtYzNkMjAzMWE5N2FkIiwidCI6Ijk3MzgwNTFjLWFhNjMtNDJmOS1hNTJjLWI1N2ZlM2NjNzU3NSIsImMiOjEwfQ%3D%3D"
) 

  function handleNavClick(pageKey: string, locked: boolean) {
  setActivePage(pageKey)
  setMobileMenu(false)

  if (locked && !isVerified) {
    setOpen(true)
  }
}

async function checkEmail() {
    if (!email) return

    setLoading(true)
    setError(false)

    const { data } = await supabase
      .from("User")
      .select("email")
      .eq("email", email)
      .single()

      if (data) {
  setLoading(true)

  setTimeout(() => {
    setLoading(false)

    const successBox = document.createElement("div")

    successBox.innerHTML = `
      <div style="
        display:flex;
        align-items:center;
        gap:14px;
      ">
        
        <div style="
          width:48px;
          height:48px;
          min-width:48px;
          border-radius:50%;
          background:#22C55E;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:22px;
          color:white;
          font-weight:700;
          box-shadow:0 0 30px rgba(34, 197, 94, 0.22);
        ">
          ✓
        </div>

        <div style="
          display:flex;
          flex-direction:column;
        ">
          <div style="
            font-size:16px;
            font-weight:700;
            color:#0F172A;
            margin-bottom:3px;
          ">
            You’re all set!
          </div>

          <div style="
            font-size:13px;
            color:#667085;
            line-height:18px;
            max-width:240px;
          ">
            Dive in and explore the data.
          </div>
        </div>
      </div>
    `

    successBox.style.position = "fixed"
    successBox.style.top = "50%"
    successBox.style.left = "50%"
    successBox.style.transform = "translate(-50%, -50%)"
    successBox.style.padding = "18px 22px"
    successBox.style.background =
      "linear-gradient(135deg, #F4FFF7, #EEF7F1)"
    successBox.style.border = "1px solid #A7E3BC"
    successBox.style.borderRadius = "22px"
    successBox.style.zIndex = "999999"
    successBox.style.boxShadow = "0 10px 30px rgba(15, 23, 42, 0.12)"
    successBox.style.opacity = "0"
    successBox.style.transition = "all 0.45s ease"
    successBox.style.backdropFilter = "blur(10px)"

    document.body.appendChild(successBox)

    setOpen(false)

    setTimeout(() => {
      successBox.style.opacity = "1"
    }, 100)

    setTimeout(() => {
      successBox.style.opacity = "0"
    }, 1800)

    setTimeout(() => {
  document.body.removeChild(successBox)
  setIsVerified(true)

  setDashboardUrl(
    "https://app.powerbi.com/view?r=eyJrIjoiMDc2NzI3MDMtNjFjMS00NDQxLWI2OTMtYWRhZTU5NmI4ODRlIiwidCI6Ijk3MzgwNTFjLWFhNjMtNDJmOS1hNTJjLWI1N2ZlM2NjNzU3NSIsImMiOjEwfQ%3D%3D"
  )

}, 1200)

  }, 800)

} else {
  setLoading(false)
  setError(true)
}
}

  return (
    <div
      style={{
         width: "100vw",
    height: "610px",
    overflow: "hidden",
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "flex-start",
    paddingTop: "0px",
    background: "#fff",
    position: "relative",
    fontFamily: "DIN, Poppins, Inter, sans-serif",
    transition: "0.2s",
    borderRadius: "8px",
    touchAction: "pan-x pan-y",
      }}

      
    >
      <style>
        {`
        html, body {
    overflow: hidden;
    overscroll-behavior: none;
    touch-action: manipulation;  }
    .nav-button {
  background: transparent;
  border: 1px solid transparent;
}

.nav-button:hover {
  background: #12239E !important;
  border: 1px solid #ffffff !important;
}

.nav-button-active {
  background: #12239E !important;
  border: 1px solid #ffffff !important;
  cursor: pointer !important;
}

          @keyframes shake {
            0% { transform: translateX(0); }
            20% { transform: translateX(-5px); }
            40% { transform: translateX(5px); }
            60% { transform: translateX(-5px); }
            80% { transform: translateX(5px); }
            100% { transform: translateX(0); }
          }

          @media (max-width: 768px) {
  .desktop-sidebar {
    display: none !important;
  }

  .mobile-topbar {
    display: flex !important;
  }

  .report-area {
    width: 100vw !important;
    height: calc(100vh - 70px) !important;
    margin-top: 70px !important;
    overflow: hidden !important;
  }

  .report-frame {
    width: 100vw !important;
    height: calc(100vh - 70px) !important;
    transform: none !important;
  }
}

@media (min-width: 769px) {
  .mobile-topbar {
    display: none !important;
  }
}

        `}

        
      </style>

      {/* DESKTOP SIDEBAR */}
      <aside
        className="desktop-sidebar"
        style={{
          width: "130px",
          height: "610px",
          background: "#031A39",
          color: "#fff",
          flexShrink: 0,
          display: isVerified ? "none" : "flex",
          flexDirection: "column",
          marginLeft: "90px",
          marginTop: "0px",
          borderRadius: "0",
          overflow: "hidden",
          
        }}
      >
        {/* LOGO */}
<div
  style={{
    height: "105px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #e5e7eb",
    border:"1px solid #e6e6e6",
    padding: "0px",
  }}
>
  <img
    src="https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Logo%20alumni%20network.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvTG9nbyBhbHVtbmkgbmV0d29yay5wbmciLCJpYXQiOjE3NzkyNzUxNzEsImV4cCI6MjA5NDYzNTE3MX0.BglGBovW2mB32Miabn-pTwRRcHd2x0SYM6K57rzE26w"
    alt="GF Alumni Network"
    style={{
      width: "186%",
      height: "176%",
      objectFit: "contain",
      maxWidth: "none",
      transform: "translateY(8px)",
      
    }}
  />
</div>

        {/* NAVIGATION */}
        <nav style={{ paddingTop: "5px", flex: 1 }}>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key, item.locked)}
                onMouseEnter={(e) => {
  e.currentTarget.style.background = "#12239E"
  e.currentTarget.style.border = "0"
}}

onMouseLeave={(e) => {
  if (item.key !== "overview") {
    e.currentTarget.style.background = item.key === "overview" ? "#12239E" : "transparent",
    e.currentTarget.style.border = "1px solid transparent"
  }
}}
              style={{
                width: "100%",
                height: "31px",
                marginBottom :"8px",
                border: "none",
                background: "transparent",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "0 10px",
                fontSize: "11px",
                fontWeight: 200,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "DIN, Poppins, Inter, sans-serif",
              }}
            >
              <img
               src={item.icon}
               alt={item.label}
              style={{
               width: "18px",
               height: "15px",
               objectFit: "contain",
               flexShrink: 0,
               }}
/>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* CLEAR FILTERS */}
        <button
          onClick={() => setActivePage("overview")}
          style={{
            margin: "0 12px 24px",
            height: "32px",
            marginBottom :"90px",
            borderRadius: "7px",
            border: "none",
            background: "#fff",
            color: "#06264A",
            fontSize: "12px",
            whiteSpace: "nowrap",
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "DIN, Poppins, Inter, sans-serif",
          }}
        >
          Clear filters
        </button>

        {/* SLOGAN */}
        <div
          style={{
            textAlign: "center",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "19px",
            marginBottom: "28px",
          }}
        >
          Once a Fellow,
          <br />
          Always a Fellow.
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
<div
  className="mobile-topbar"
  style={{
    display: "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "70px",
    background: "#ffffff",
    zIndex: 9999,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px",
    borderBottom: "1px solid #e5e7eb",
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <img
      src="https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Logo%20alumni%20network.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvTG9nbyBhbHVtbmkgbmV0d29yay5wbmciLCJpYXQiOjE3NzkyNzUxNzEsImV4cCI6MjA5NDYzNTE3MX0.BglGBovW2mB32Miabn-pTwRRcHd2x0SYM6K57rzE26w"
      alt="Logo"
      style={{
        width: "58px",
        height: "58px",
        objectFit: "contain",
      }}
    />

    <div>
      <div style={{ fontSize: "13px", fontWeight: 800, color: "#111827" }}>
        Gandhi Fellowship Alumni Network
      </div>
      <div style={{ fontSize: "10px", color: "#4b5563", marginTop: "2px" }}>
        Building Connection, Creating Impact.
      </div>
    </div>
  </div>

  <button
    onClick={() => setMobileMenu(true)}
    style={{
      width: "38px",
      height: "38px",
      border: "none",
      background: "#031A39",
      color: "#fff",
      borderRadius: "8px",
      fontSize: "24px",
      cursor: "pointer",
    }}
  >
    ☰
  </button>
</div>

{/* MOBILE DRAWER */}
{mobileMenu && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      zIndex: 10000,
    }}
    onClick={() => setMobileMenu(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "230px",
        height: "100vh",
        background: "#031A39",
        color: "#fff",
        paddingTop: "20px",
      }}
    >
      <div
        style={{
          padding: "0 18px 20px",
          fontSize: "16px",
          fontWeight: 800,
        }}
      >
        Menu
      </div>

      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => handleNavClick(item.key, item.locked)}
          style={{
            width: "100%",
            height: "44px",
            border: "none",
            background: "transparent",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0 16px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "DIN, Poppins, Inter, sans-serif",
          }}
        >
          <img
            src={item.icon}
            alt={item.label}
            style={{
              width: "18px",
              height: "18px",
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  </div>
)}

      {/* LOGIN MODAL */}
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        ariaHideApp={false}
        style={{
          overlay: {
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(10px)",
            zIndex: 3000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            border: "none",
            background: "transparent",
            inset: "unset",
            padding: 0,
            overflow: "visible",
          },
        }}
      >
        <div style={{ position: "relative", width: "320px", height: "370px" }}>
          <div
            style={{
              position: "absolute",
              width: "310px",
              height: "425px",
              background: "linear-gradient(135deg, #1DA1F2, #00C2FF)",
              borderRadius: "32px",
              transform: "rotate(-8deg)",
              top: "-15px",
              left: "-5px",
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "315px",
              height: "405px",
              background: "#FFFFFF",
              borderRadius: "15px",
              padding: "10px",
              zIndex: 2,
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                border: "none",
                background: "#F2F2F2",
                color: "#4A4A4A",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <div
              style={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: "19px",
                color: "#0B132B",
                marginTop: "25px",
                marginBottom: "8px",
              }}
            >
              Unlock the Alumni Network
            </div>

            <div style={{ marginBottom: "12px", textAlign: "center", padding: "0 18px" }}>
              {error ? (
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    lineHeight: "18px",
                    color: "#E63946",
                    animation: "shake 0.4s ease-in-out",
                  }}
                >
                  📋 Oops... seems you have not filled the form yet. Please complete
                  the registration form below.
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    color: "#5B6170",
                  }}
                >
                  Connect, collaborate, and grow with fellows across India.
                </div>
              )}
            </div>

            <div
              style={{
                width: "100%",
                height: "160px",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "-16px",
              }}
            >
              <img
                src={
                  error
                    ? "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Register%20Icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvUmVnaXN0ZXIgSWNvbi5wbmciLCJpYXQiOjE3NzkwOTAzNDMsImV4cCI6MjA5NDQ1MDM0M30.pDIEykkVn8JHKevec-mhUYr1JSPr8SS_gqrWYMnZuGo"
                    : "https://unsrekjwlfqdvqvvfukg.supabase.co/storage/v1/object/sign/Popup-Images/Login%20Icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOTQ3ZDQyNS1kYjg2LTQ1ZjItOGE3NC00OGZiOGIxODY0ZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3B1cC1JbWFnZXMvTG9naW4gSWNvbi5wbmciLCJpYXQiOjE3NzkwODk3OTYsImV4cCI6MjA5NDQ0OTc5Nn0.KpZMe1v-5VgJLu-LphB_VFxsaca_Eo_eRxMnp4hQ-Gg"
                }
                alt="popup illustration"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>

            <div
              style={{
                background: "#F8FBFF",
                borderRadius: "20px",
                padding: "14px",
                marginTop: "4px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
            >
              {error ? (
                <>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#666",
                      lineHeight: "14px",
                      textAlign: "center",
                      marginBottom: "8px",
                    }}
                  >
                    Filling this form takes less time than explaining fellowship to
                    relatives 😵‍💫
                  </div>

                  <button
                    onClick={() =>
                      window.open(
                        "https://docs.google.com/forms/d/e/1FAIpQLScrHlKhI4cdCKpem6lV0dtp28CyOltLyYrkY78C3apC2V8Shg/viewform?usp=header",
                        "_blank"
                      )
                    }
                    style={{
                      width: "100%",
                      height: "42px",
                      border: "none",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #005BFF, #2F8CFF)",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Register Here →
                  </button>

                  <button
                    onClick={() => setError(false)}
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "none",
                      background: "transparent",
                      color: "#5B6170",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Already registered? Login
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      height: "34px",
                      borderRadius: "10px",
                      border: "1px solid #DDE7F5",
                      padding: "0 10px",
                      fontSize: "11px",
                      marginBottom: "14px",
                      outline: "none",
                    }}
                  />

                  <button
                    onClick={checkEmail}
                    disabled={loading}
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "none",
                      borderRadius: "18px",
                      background: "linear-gradient(135deg, #005BFF, #2F8CFF)",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {loading ? "Processing..." : "View Report"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* POWER BI */}
      <main
        className="report-area"
        style={{
          width: isVerified ? "100vw" : "calc(100vw - 151px)",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: isVerified ? "flex-start" : "center",
          alignItems: "flex-start",
        }}
      >
        <iframe
          className="report-frame"
          title="GF_India_Dashboard"
          src= {dashboardUrl}
          style={{
  border: "none",
  width: isVerified ? "100vw" : "84vw",
  height: isVerified ? "100vh" : "84vh",
  transform: isVerified ? "none" : "scale(1.23)",
  transformOrigin: "top center",
}}
            
          allowFullScreen
        />
      </main>
    </div>
  )
}