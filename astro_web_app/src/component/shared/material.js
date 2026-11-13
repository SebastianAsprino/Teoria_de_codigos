// Envoltorios React para los Web Components de Material Web usados en el sitio.
import React from 'react';
import { createComponent } from '@lit/react';
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field.js';
import { MdSlider } from '@material/web/slider/slider.js';
import { MdSwitch } from '@material/web/switch/switch.js';
import { MdFilledButton } from '@material/web/button/filled-button.js';

export const OutlinedTextField = createComponent({
  tagName: 'md-outlined-text-field',
  elementClass: MdOutlinedTextField,
  react: React,
  events: {
    onChange: 'input',
  },
});

export const Slider = createComponent({
  tagName: 'md-slider',
  elementClass: MdSlider,
  react: React,
  events: {
    onChange: 'input',
  },
});

export const Switch = createComponent({
  tagName: 'md-switch',
  elementClass: MdSwitch,
  react: React,
});

export const FilledButton = createComponent({
  tagName: 'md-filled-button',
  elementClass: MdFilledButton,
  react: React,
});
