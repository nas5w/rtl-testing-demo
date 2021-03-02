import { useState } from "react";

type AppType = "commercial" | "open" | undefined;

export const PricePlanner = () => {
  const [appType, setAppType] = useState<AppType>();
  const [users, setUsers] = useState(1);
  const [price, setPrice] = useState<number>();

  return (
    <div className="planner">
      <h1>Price Planner</h1>
      <p>Find out how much you'll pay for our service.</p>
      <AppTypeSelect appType={appType} setAppType={setAppType} />
      {appType === "commercial" && (
        <>
          <UserSelect users={users} setUsers={setUsers} />
          <button
            className="calculate"
            onClick={() => {
              fakeAsyncPricer(users).then((p) => {
                setPrice(p);
              });
            }}
          >
            Calculate
          </button>
          {price && <h2>Your estimated price is ${price}/mo.</h2>}
        </>
      )}
      {appType === "open" && <h2>Congrats, your access is free!</h2>}
    </div>
  );
};

type AppTypeSelectProps = {
  appType: AppType;
  setAppType: (appType: AppType) => void;
};

const AppTypeSelect = ({ appType, setAppType }: AppTypeSelectProps) => {
  return (
    <div>
      <legend className="question">What type of app are you developing?</legend>
      <br />
      <div>
        <label>
          <input
            id="commercial"
            type="radio"
            checked={appType === "commercial"}
            onChange={() => {
              setAppType("commercial");
            }}
          />
          Commercial
        </label>
        <br />
        <label>
          <input
            id="open"
            type="radio"
            checked={appType === "open"}
            onChange={() => {
              setAppType("open");
            }}
          />
          Nonprofit/open source
        </label>
      </div>
    </div>
  );
};

type UserSelectProps = {
  users: number;
  setUsers: (users: number) => void;
};

const UserSelect = ({ users, setUsers }: UserSelectProps) => {
  return (
    <>
      <label className="question" htmlFor="users">
        How many users will your app have?
      </label>
      <br />
      <input
        type="range"
        min="1"
        max="1000"
        value={users}
        id="users"
        onChange={(e) => {
          setUsers(parseInt(e.target.value));
        }}
      />
      <br />
      <span>
        {users === 1000 ? "1,000+" : users} {users === 1 ? "user" : "users"}
      </span>
    </>
  );
};

const fakeAsyncPricer = (users: number) => {
  const randomDelay = Math.floor(Math.random() * 300);
  return new Promise<number>((res) => {
    setTimeout(() => {
      let price: number;
      if (users < 100) {
        price = users * 5;
      } else if (users < 300) {
        price = users * 4;
      } else if (users < 700) {
        price = users * 3;
      } else {
        price = users * 2;
      }
      res(price);
    }, randomDelay);
  });
};
