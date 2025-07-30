
'use client';

import React from 'react';

type RegionData = {
  [key: string]: number;
};

type UgandaMapProps = {
  data: RegionData;
};

const getColor = (value: number, maxValue: number) => {
  const opacity = value / maxValue;
  // Using HSL values from globals.css for primary color
  // --primary: 45 100% 52%;
  return `hsla(45, 100%, 52%, ${opacity})`;
};

const UgandaMap = ({ data }: UgandaMapProps) => {
  const maxValue = Math.max(...Object.values(data));

  const regions = [
    { name: 'Northern', path: "M210,10 L350,10 L350,100 L250,100 Z" },
    { name: 'Eastern', path: "M350,10 L490,10 L490,150 L350,180 Z" },
    { name: 'Western', path: "M10,120 L250,100 L250,250 L10,250 Z" },
    { name: 'Central', path: "M250,100 L350,100 L350,180 L250,250 Z" },
  ];
  
  // A very simplified representation of Uganda's regions for demonstration
  // In a real app, you would use accurate GeoJSON paths
  const simplifiedRegions = {
    Northern: "M 150,10 L 400,10 L 400,120 L 150,120 Z",
    Eastern: "M 400,10 L 550,60 L 550,200 L 400,160 Z",
    Western: "M 10,120 L 150,120 L 150,300 L 10,300 Z",
    Central: "M 150,120 L 400,120 L 400,160 L 300,300 L 150,300 Z",
  };


  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-secondary/20 p-4 rounded-lg">
        <svg viewBox="0 0 560 320" className="w-full h-full">
        <g>
          {Object.entries(simplifiedRegions).map(([name, path]) => {
            const value = data[name as keyof RegionData] || 0;
            const color = getColor(value, maxValue);
            return (
              <path
                key={name}
                d={path}
                fill={color}
                stroke="#FAF9F0"
                strokeWidth="2"
                className="transition-all duration-300 hover:opacity-80"
              >
                <title>{`${name}: ${value}% activity`}</title>
              </path>
            );
          })}
        </g>
         {/* Adding labels - this is tricky without proper centroids */}
        <text x="275" y="75" className="text-sm font-semibold fill-current text-background" textAnchor="middle">Northern</text>
        <text x="475" y="125" className="text-sm font-semibold fill-current text-background" textAnchor="middle">Eastern</text>
        <text x="80" y="210" className="text-sm font-semibold fill-current text-background" textAnchor="middle">Western</text>
        <text x="275" y="210" className="text-sm font-semibold fill-current text-background" textAnchor="middle">Central</text>
      </svg>
       <div className="w-full flex justify-center items-center gap-4 mt-4 text-xs">
            <span className="text-muted-foreground">Less Active</span>
            <div className="flex h-4 w-32 rounded-full overflow-hidden border">
                <div className="h-full w-full" style={{background: 'linear-gradient(to right, hsla(45, 100%, 52%, 0.1), hsla(45, 100%, 52%, 1))'}}></div>
            </div>
            <span className="text-muted-foreground">More Active</span>
        </div>
    </div>
  );
};

export default UgandaMap;
