import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [invited,setInvited] = useState([]);

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((data) => (data ? setUsers(data) : false))
      .finally(() => setLoading(true))
      .catch((error) => console.log(error));
  }, []);
  return (
    <main>
      <div className="main-top">
        <input value={searchText} type="text" placeholder="Search..." onChange={(e) => {
            setSearchText(e.target.value)
        }} />
      </div>
      <div className="main-bottom">
        {
            isLoading == false ? <Skeleton height={60} /> : ''
        }
        <ul>
          {isLoading &&
            users.data.filter(item => {
                let fullName = item.first_name + item.last_name;
                let bigSearch = searchText.toLowerCase()
                return fullName.toLowerCase().includes(bigSearch) || item.email.toLowerCase().includes(bigSearch)
            }).map((item) => (
              <li className="user" key={item.id}>
                <div className="avatar">
                  <img src={item.avatar} alt="" />
                </div>
                <div className="info">
                  <p>
                    {item.first_name} {item.last_name}
                  </p>
                  <p>{item.email}</p>
                </div>
                <div className="mark" onClick={() => {}}>
                  <p onClick={() =>{
                    if(invited.includes(item.id)){
                        setInvited((prev) => prev.filter((id) => id !== item.id))
                    }else{
                        setInvited((prev) => [...prev,item.id])
                    }
                  }}>{invited.includes(item.id) ? "-" : '+'}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
};
