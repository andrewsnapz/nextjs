import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(true);

  const { data, error } = useSWR(
    "https://nexjts-course-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (let key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //   useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://nexjts-course-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (let key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return fetch("https://nexjts-course-default-rtdb.firebaseio.com/sales.json")
    .then((response) => response.json())
    .then((data) => {
      const transformedSales = [];
      for (let key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      return { props: { sales: transformedSales } };
    });
}
