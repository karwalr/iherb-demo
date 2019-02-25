import React from 'react';

const Report = () => {
  const blackCount = localStorage.getItem('color_black')
    ? localStorage.getItem('color_black')
    : 0;

  const blueCount = localStorage.getItem('color_blue')
    ? localStorage.getItem('color_blue')
    : 0;

  const redCount = localStorage.getItem('color_red')
    ? localStorage.getItem('color_red')
    : 0;

  const greenCount = localStorage.getItem('color_green')
    ? localStorage.getItem('color_green')
    : 0;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>BLACK</td>
            <td>{blackCount}</td>
          </tr>
          <tr>
            <td>BLUE</td>
            <td>{blueCount}</td>
          </tr>
          <tr>
            <td>RED</td>
            <td>{redCount}</td>
          </tr>
          <tr>
            <td>GREEN</td>
            <td>{greenCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Report;
