import React, { useContext } from 'react';
import { VacancyContext } from '../../../../context/VacancyContext';

const VacancyView = () => {
  const vacancies = useContext(VacancyContext);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Vakances nosaukums</th>
            <th>Atrašanās vieta</th>
            <th>Izveidošanas datums</th>
            <th>Pēdējā rediģēšana</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 2 */}
          {vacancies.map((vacancy, index) => (
            <tr key={index} className="hover">
              <th>{index + 1}</th>
              <td>{vacancy.title}</td>
              <td>{vacancy.address}</td>
              <td>{vacancy.timeCreated.slice(0, 10)}</td>
              <td>
                {vacancy.timeEdited.slice(0, 10)}{' '}
                {vacancy.timeEdited.slice(11, 19)}
              </td>
              <td>Rediģēt</td>
              <td>Dzēst</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VacancyView;
