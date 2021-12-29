import React from "react";
import { Svg, SvgProps } from "uikit";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 32 32" width="20px" color="textSubtle" {...props}>
      <path d="M17.9218 16.4999C17.9218 21.1943 14.1337 25 9.46074 25C4.78778 25 1 21.1954 1 16.4999C1 11.8043 4.78807 8 9.46074 8C14.1334 8 17.9218 11.8055 17.9218 16.4999ZM27.2036 16.4999C27.2036 20.9191 25.3094 24.5012 22.9731 24.5012C20.6368 24.5012 18.7426 20.9179 18.7426 16.4999C18.7426 12.0818 20.6368 8.49851 22.9731 8.49851C25.3094 8.49851 27.2036 12.0818 27.2036 16.4999ZM31 16.4999C31 20.4593 30.3338 23.6687 29.5121 23.6687C28.6904 23.6687 28.0241 20.4581 28.0241 16.4999C28.0241 12.5416 28.6904 9.33098 29.5124 9.33098C30.3343 9.33098 31 12.5407 31 16.4999Z"></path>
    </Svg>
  );
};

export default Icon;
