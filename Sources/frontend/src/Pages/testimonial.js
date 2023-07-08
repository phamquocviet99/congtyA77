import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

function Testimonial({ placeholder }) {
  const [content, setContent] = useState("");
  const [text, settext]= useState("");

  return (
    <div>
    <div style={{height:"150px"}}></div>
      <JoditEditor
        value={content}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {setContent(newContent)}}
      />
      <div>{content}</div>
    </div>
  );
}

export default Testimonial;
