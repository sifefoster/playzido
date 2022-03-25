import React from 'react';

import {
  Wrapper
} from './style.js'

const Loader = () => {
  return (
    <Wrapper dark>
      <div className="lds-ring">
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </Wrapper>
  )
}

export default Loader;