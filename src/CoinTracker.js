import styles from "./CoinTracker.module.css";
import {} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState(["", "", ""]);
  const [price, setPrice] = useState(0);
  const [num, setNum] = useState(0);
  const getCoins = async () => {
    const json = await (
      await fetch(`https://api.coinpaprika.com/v1/tickers?limit=100`)
    ).json();
    setCoins(json);
    setLoading(false);
  };
  const onClickOption = (event) => {
    setPrice(event.target.value);
    setNum(0);
  };
  const onChangeNum = (event) => {
    setNum(event.target.value);
  };
  useEffect(() => {
    getCoins();
  }, []);
  return (
    <div className={styles.background}>
      <h1 className={styles.header}>Quantum Coin Tracker</h1>
      <h3 className={styles.sub_header}>show Top 100 coins</h3>
      <div className={styles.coin_UI}>
        <div className={styles.coin_UI_container}>
          {loading ? (
            <span className={styles.loading}>Now Loading...</span>
          ) : (
            <div className={styles.component}>
              <h3 className={styles.component_header}>Select Coins</h3>
              <select className={styles.coin_select} onChange={onClickOption}>
                <option value="">Select a Coin</option>
                {Array.isArray(coins)
                  ? coins.map((coin) => (
                      <option key={coin.id} value={coin.quotes.USD.price}>
                        {coin.name} ({coin.symbol})
                      </option>
                    ))
                  : null}
              </select>
              <br />
              <span className={styles.coin_price}>
                Price: ${price} USD (per coin)
              </span>
              <div className={styles.converter}>
                <h3 className={styles.component_header}>
                  Coin-Dollar Converter
                </h3>
                <input
                  className={styles.coin_number}
                  onChange={onChangeNum}
                  type="number"
                  placeholder="Enter a number"
                  value={num}
                  min="0"
                />
                <br />
                <span className={styles.coin_price}>≈ ${num * price} USD</span>
              </div>
            </div>
          )}
        </div>
        <div className={styles.center_line}></div>
        <div className={styles.coin_UI_container}>
          {loading ? (
            <span className={styles.loading}>Now Loading...</span>
          ) : (
            <div className={styles.component}>
              <h3 className={styles.component_header}>Top 100 Coins (USD)</h3>
              <ul className={styles.coin_ul}>
                {Array.isArray(coins)
                  ? coins.map((coin) =>
                      coin.quotes.hasOwnProperty("USD") ? (
                        <li className={styles.coin_list} key={coin.id}>
                          {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}{" "}
                        </li>
                      ) : (
                        <li className={styles.coin_list} key={coin.id}>
                          {coin.name} ({coin.symbol}): No Data
                        </li>
                      )
                    )
                  : null}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoinTracker;
