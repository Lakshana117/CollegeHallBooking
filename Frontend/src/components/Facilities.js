import React from 'react';
import './Facilities.css';

const facilitiesData = [
  { name: 'Vankatraman Hall', capacity: 500, ac: 'Yes', space: 'Available' },
  { name: 'ES Seminar Hall', capacity: 150, ac: 'No', space: 'Available' },
  { name: 'PG Seminar Hall', capacity: 200, ac: 'Yes', space: 'Occupied' },
  { name: 'Incubation Hall', capacity: 100, ac: 'Yes', space: 'Available' },
  { name: 'Open Theatre', capacity: 1000, ac: 'No', space: 'Available' },
  { name: 'CB1 101', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 102', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 103', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 104', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 105', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 201', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 202', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 203', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 204', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 205', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 301', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 302', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 303', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 304', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 305', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 306', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 307', capacity: 50, ac: 'No', space: 'Available' },
  { name: 'CB1 308', capacity: 50, ac: 'No', space: 'Available' },
];

function Facilities() {
  return (
    <div className="Facilities">
      <h2>Our Facilities</h2>
      <table className="facilities-table">
        <thead>
          <tr>
            <th>Hall Name</th>
            <th>Hall Capacity</th>
            <th>AC</th>
            <th>Available Space</th>
          </tr>
        </thead>
        <tbody>
          {facilitiesData.map((facility, index) => (
            <tr key={index}>
              <td>{facility.name}</td>
              <td>{facility.capacity}</td>
              <td>{facility.ac}</td>
              <td>{facility.space}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Facilities;
