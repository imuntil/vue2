/**
 * Created by 斌 on 2017/3/5.
 */
// var greeter = require('./Greeter');
// document.getElementById('root').appendChild(greeter());

import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';
import './css/main.css'

render(<Greeter />, document.getElementById('root'));