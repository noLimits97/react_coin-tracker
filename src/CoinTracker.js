import styles from "./CoinTracker.module.css";
import { useState, useEffect } from "react";

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const printH1 = (string) => {
    return (
      <h1>
        <i>{string}</i>
      </h1>
    );
  };
  const getCoins = async () => {
    const json = await (
      await fetch(`https://api.coinpaprika.com/v1/tickers?limit=100`)
    ).json();
    setCoins(json);
    setLoading(false);
  };
  useEffect(() => {
    getCoins();
  }, []);
  return (
    <div>
      {printH1("Coin Tracker!")}
      {loading ? (
        printH1("Loading...")
      ) : (
        <ul>
          {Array.isArray(coins)
            ? coins.map((coin) =>
                coin.quotes.hasOwnProperty("USD") ? (
                  <li className={styles.coin} key={coin.id}>
                    {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
                  </li>
                ) : (
                  <li key={coin.id}>
                    {coin.name} ({coin.symbol}): No Data
                  </li>
                )
              )
            : null}
        </ul>
      )}
    </div>
  );
}

export default CoinTracker;
