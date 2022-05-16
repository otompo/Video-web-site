import React, { useState } from 'react';
import { Button } from 'antd';

function ButtonComponent({ onClick, title }) {
  return (
    <div>
      <Button
        type="primary"
        shape="round"
        size="large"
        onClick={onClick}
        className="absolute"
      >
        {title}
      </Button>
    </div>
  );
}

export default ButtonComponent;
