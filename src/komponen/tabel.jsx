import React from 'react';

const Table = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>No</th>
          <th>NIM</th>
          <th>Nama</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.nim}</td>
            <td>{item.nama}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
