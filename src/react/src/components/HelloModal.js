import React, { useState } from 'react';

export default function() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button onClick={() => setVisible(true)}>CLICK ME</button>
    </>
  );
}
