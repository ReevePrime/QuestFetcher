import React, {useEffect, useState} from 'react';

const RenderedDialogues = (showText, selectedTextDataLeft) => {
  const [dialogues, setDialogues] = useState([]);
  useEffect(() => {
    if (showText && selectedTextDataLeft) {
      setDialogues(selectedTextDataLeft.Dialogue);
    } else {
      setDialogues([]);
    }
  }, [showText, selectedTextDataLeft]);
  
  return (
    <div>
{dialogues.length > 0 ? (
        dialogues.map((text, index) => {
          return <p key={index}>{text.Text}</p>;
        })
      ) : (
        <div>No text to display</div>
      )}
    </div>
  );
};

export default RenderedDialogues;