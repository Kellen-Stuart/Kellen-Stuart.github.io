import React from "react";

function BlogImage({ src, alt, caption, className = "" }) {
  return (
    <figure className={`blog-image ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        className="img-fluid blog-image-media"
        loading="lazy"
        decoding="async"
      />
      {caption && <figcaption className="blog-image-caption">{caption}</figcaption>}
    </figure>
  );
}

export default BlogImage;
