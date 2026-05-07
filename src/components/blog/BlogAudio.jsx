import React from "react";

function BlogAudio({ src, title, caption, type, className = "" }) {
  return (
    <figure className={`blog-audio ${className}`.trim()}>
      {title && <p className="blog-audio-title mb-2">{title}</p>}
      <audio controls preload="none" className="blog-audio-player">
        <source src={src} type={type} />
        Your browser does not support the audio element.
      </audio>
      {caption && <figcaption className="blog-audio-caption">{caption}</figcaption>}
    </figure>
  );
}

export default BlogAudio;
