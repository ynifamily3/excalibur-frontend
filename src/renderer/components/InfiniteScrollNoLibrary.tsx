import React, { useCallback, useEffect, useState } from "react";
import UserRepo from "repos/userinfo";
import { Userinfo as UserinfoType } from "types/userinfo";

export default function InfiniteScrollNoLibrary(): JSX.Element {
  const [userList, setUserList] = useState<UserinfoType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!noData) {
        console.log(page);
        loadUserList(page);
      }
    }
  };

  const loadUserList = useCallback((page: number | undefined = 1) => {
    setLoading(true);
    setTimeout(() => {
      UserRepo.getList(page)
        .then((res) => {
          setUserList((userList) => [...userList, ...res.data]);
          setPage((page) => page + 1);
          if (res.data.length === 0) setNoData(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1500);
  }, []);

  useEffect(() => {
    loadUserList();
  }, [loadUserList]);

  return (
    <div>
      <hr />
      <div className="section">
        {userList.map((user, i) => (
          <div className="box m-3 user" key={i}>
            <img src={user.avatar} alt={user.first_name} />
            <div className="user-details">
              <strong>Email</strong>: {user.email}
              <br />
              <strong>First Name</strong>: {user.first_name}
              <br />
              <strong>Last Name</strong>: {user.last_name}
              <br />
            </div>
          </div>
        ))}
        {loading ? <div className="text-center">loading data ...</div> : ""}
        {noData ? <div className="text-center">no data anymore ...</div> : ""}
      </div>
    </div>
  );
}
