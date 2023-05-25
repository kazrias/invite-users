import User from "../User/User";
import Skeleton from "../Skeleton/Skeleton";
import Search from "../Search/Search";
import './Users.scss'
import { useState } from "react";
function Users({ items, isLoading, onClickInvite, invites, onClickSendInvites }) {
  const [searchValue, setSearchValue] = useState('');

  function onChangeValue(e) {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <Search onChangeValue={onChangeValue} searchValue={searchValue} />
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {
            items.filter(obj => {
              const fullname = (obj.first_name + ' ' + obj.last_name).toLowerCase();
              const email = obj.email.toLowerCase();
              const val = searchValue.toLowerCase();
              return (fullname.includes(val) || email.includes(val))
            })
              .map(obj => (
                <User isInvited={invites.includes(obj.id)} onClickInvite={onClickInvite} {...obj} key={obj.id} />
              ))
          }
        </ul>
      )}
      {
        invites.length > 0 && <button onClick={onClickSendInvites} className="send-invite-btn">Отправить приглашение</button>
      }

    </>
  );
};
export default Users