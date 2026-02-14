import React, { useCallback, useState, useEffect, useRef } from "react";
import "./SocialShare.css";

/**
 * SocialShare – toggle share icon; click to show social buttons.
 * Use anywhere: <SocialShare /> for current page, or <SocialShare url={...} title={...} /> for a specific link.
 */
const SocialShare = ({ url, title, className = "" }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title ?? (typeof document !== "undefined" ? document.title : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  const copyToClipboard = useCallback(() => {
    if (!shareUrl) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl).then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
        () => fallbackCopy(shareUrl)
      );
    } else {
      fallbackCopy(shareUrl);
    }
  }, [shareUrl]);

  const fallbackCopy = (text) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
    document.body.removeChild(ta);
  };

  if (!shareUrl) return null;

  return (
    <aside
      ref={containerRef}
      id="social-share"
      className={`social-share ${open ? "social-share--open" : ""} ${className}`.trim()}
      aria-label="Share this page"
    >
      <button
        type="button"
        className="social-share__trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "Close share menu" : "Share this page"}
      >
        <ShareIcon className="social-share__trigger-icon" />
      </button>

      <div className="social-share__panel">
        <span className="social-share__label">Share</span>
        <ul className="social-share__list">
          <li>
            <a
              href={shareLinks.facebook}
              className="social-share__btn social-share__btn--facebook"
              aria-label="Share on Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="social-share__icon" />
            </a>
          </li>
          <li>
            <a
              href={shareLinks.x}
              className="social-share__btn social-share__btn--x"
              aria-label="Share on X (Twitter)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XIcon className="social-share__icon" />
            </a>
          </li>
          <li>
            <a
              href={shareLinks.linkedin}
              className="social-share__btn social-share__btn--linkedin"
              aria-label="Share on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className="social-share__icon" />
            </a>
          </li>
          <li>
            <button
              type="button"
              className={`social-share__btn social-share__btn--copy ${copied ? "copied" : ""}`}
              aria-label={copied ? "Link copied" : "Copy link"}
              onClick={copyToClipboard}
            >
              <CopyIcon className="social-share__icon" />
              <span className="social-share__copy-text">{copied ? "Copied!" : "Copy"}</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

function ShareIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"
      />
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function CopyIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
      />
    </svg>
  );
}

export default SocialShare;
