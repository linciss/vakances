import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../../components/common/Spinner';
import PieChart from '../../../components/PieChart';

const Dashboard = () => {
  const [vacancyCount, setVacancyCount] = useState(null);
  const [applicationCount, setApplicationCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [pieChartData1, setPieChartData1] = useState([]);
  const [pieChartData2, setPieChartData2] = useState([]);

  const fetchApplicationData = async () => {
    await axios('/api/applications/get', { withCredentials: true })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
        }
      })
      .then((res) => {
        if (!res || res.status !== 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setApplications(data);
      });
  };

  useEffect(() => {
    if (applications.length > 0) {
      // Process the application data to get counts per vacancy
      const vacancyApplicationCounts = applications.reduce((acc, app) => {
        const vacancyId = app.vacancyId;
        const vacancyTitle = app.vacancyName; // Assuming each application includes the vacancy title
        if (!acc[vacancyId]) {
          acc[vacancyId] = { name: vacancyTitle, value: 0 };
        }
        acc[vacancyId].value += 1;
        return acc;
      }, {});

      // Convert the processed data into an array for the pie chart
      setPieChartData1(Object.values(vacancyApplicationCounts));
    }
  }, [applications]);

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return 'Iesniegts';
      case 1:
        return 'Apstiprināts';
      case 2:
        return 'Noraidīts';
      default:
        return 'Iesniegts';
    }
  };

  useEffect(() => {
    if (applications.length > 0) {
      const applicationStatusCounts = applications.reduce((acc, app) => {
        const status = app.status;
        if (!acc[status]) {
          acc[status] = { name: getStatus(status), value: 0 };
        }
        acc[status].value += 1;
        return acc;
      }, {});

      setPieChartData2(Object.values(applicationStatusCounts));
    }
  }, [applications]);

  const getVacancyCount = async () => {
    axios
      .get('/api/vacancies/count', { withCredentials: true })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
        }
      })
      .then((res) => {
        if (!res || res.status !== 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setVacancyCount(data);
      });
  };

  const getApplicationCount = async () => {
    await axios
      .get('/api/applications/count', { withCredentials: true })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
        }
      })
      .then((res) => {
        if (!res || res.status !== 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (data === undefined) {
          return;
        }
        setApplicationCount(data);
      });
  };

  const getUserCount = async () => {
    await axios
      .get('/api/users/count', { withCredentials: true })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
        }
      })
      .then((res) => {
        if (!res || res.status !== 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setUserCount(data);
      });
  };

  useEffect(() => {
    getVacancyCount();
    getApplicationCount();
    fetchApplicationData();
    getUserCount();
  }, []);

  const currDate = new Date().toDateString();

  return (
    <>
      <h1 className="text-6xl font-bold">Admina Panelis</h1>
      <div className="stats stats-vertical lg:stats-horizontal shadow mt-8">
        {/* STATS */}
        <div className="stat bg-white py-8 gap-2">
          <div className="stat-title text-xl">Vakances</div>
          {vacancyCount !== null && vacancyCount !== undefined ? (
            <div className="stat-value">{vacancyCount}</div>
          ) : (
            <div className="stat-value">
              <Spinner />
            </div>
          )}
          <div className="stat-desc text-lg"></div>
          {currDate.slice(4, 10)} {currDate.slice(11, 15)}
        </div>

        <div className="stat bg-white py-8 gap-2">
          <div className="stat-title text-xl">
            Cilvēki pieteikušies vakancēm
          </div>
          {applicationCount !== null && applicationCount !== undefined ? (
            <div className="stat-value">{applicationCount}</div>
          ) : (
            <div className="stat-value">
              <Spinner />
            </div>
          )}
          <div className="stat-desc text-lg">
            {currDate.slice(4, 10)} {currDate.slice(11, 15)}
          </div>
        </div>

        <div className="stat bg-white py-8 gap-2">
          <div className="stat-title text-xl">Darbinieki</div>
          {userCount !== null && userCount !== undefined ? (
            <div className="stat-value">{userCount}</div>
          ) : (
            <div className="stat-value">
              <Spinner />
            </div>
          )}

          <div className="stat-desc text-lg">
            {currDate.slice(4, 10)} {currDate.slice(11, 15)}
          </div>
        </div>
      </div>
      <div className="my-8 p-8 rounded-xl grid grid-cols-2 bg-white">
        <PieChart title={'Aplikācijas'} data={pieChartData1} />
        <PieChart title={'Statusi'} data={pieChartData2} />
      </div>
    </>
  );
};

export default Dashboard;
