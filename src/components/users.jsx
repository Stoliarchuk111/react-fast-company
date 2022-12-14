import React, { useState } from "react";
import api from "../api/index ";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) =>
    setUsers(users.filter((user) => user._id !== userId));

  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return "Человек готовы";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "Человека готовы";
    if (lastOne === 1) return "Человек готов";
    return "Человек готовы";
  };

  return (
    <>
      <h2>
        <span
          className={"badge bg-" + (users.length > 0 ? "primary" : "danger")}
        >
          {users.length > 0
            ? `${users.length} ${renderPhrase(users.length)} к встрече с тобой`
            : "Нет желающих встретится"}
          .
        </span>
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <td scope="col">Имя</td>
              <td scope="col">Качество</td>
              <td scope="col">Профессия</td>
              <td scope="col">Количество встреч</td>
              <td scope="col">Оценка</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.profession.name}</td>
                <td>
                  {user.qualities.map((item) => (
                    <span
                      className={"badge m-2 bg-" + item.color}
                      key={item._id}
                    >
                      {item.name}
                    </span>
                  ))}
                </td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <button
                    className={"btn btn-danger"}
                    onClick={() => handleDelete(user._id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
