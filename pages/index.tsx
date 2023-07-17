import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Body from "../src/components/body/Body";
import Header from "../src/components/header/Header";
import Search from "../src/components/search/Search";
import styles from "../styles/Home.module.css";
import useGeolocation from "react-hook-geolocation";
import { region } from "../src/components/region";

export default function Home() {
  const [active, setActive] = useState(false);
  const [data, setData] = useState([]);

  const onGeolocationUpdate = (geolocation: any) => {
    console.log(geolocation);
  }

  const onClickSearchBox = () => {
    setActive(true);
    console.log(active);
  }

  const onClickSearchButton = async (idx: number, input: string, region: string) => {
    setData([]);
    let option = "";
    if(idx === 0) {
      option = "AFFILIATE_NM";
    } else if(idx === 1) {
      option = "SECTOR_NM";
    } else {
      return;
    }

    console.log(option, input, region);
    // await axios.get(`https://openapi.gg.go.kr/RegionMnyFacltStus?Key=${process.env.NEXT_PUBLIC_API_KEY}&Type=json&pIndex=1&pSize=10&${option}=${input}`)
    await axios.get(`http://api.data.go.kr/openapi/tn_pubr_public_local_bill_api?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&SGG_NM=${region}&${option}=${input}&pageNo=1&numOfRows=20&type=json`)
      .then(data => {
        console.log(data.data);
        setData(data.data.response.body.items);
      });
  }

  useEffect(() => {
    (async () => {
      await axios.get(`http://api.data.go.kr/openapi/tn_pubr_public_local_bill_api?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&pageNo=1&numOfRows=20&type=json`)
        .then(data => setData(data.data.response.body.items));
    })();
  }, []);
    
    // (async () => {
    //   await axios.get(`http://api.data.go.kr/openapi/tn_pubr_public_local_bill_api?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&SGG_NM=홍천군&type=json&numOfRows=100`)
    //     .then(data => async () => {
    //       await axios.post(`http://localhost:3001/region`, data.data)
    //         .catch(err => console.log(err));
    //     })
    // })();
  // }, []);

  return (
    <>
     <Head>
        <title>지역화폐 가맹점 찾기</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className={styles.container}>
      <Header onClick={onClickSearchBox} />
      {data.length ? <Body data={data} /> : <></>}
      <Search onClickSearchButton={onClickSearchButton} isActive={active} setIsActive={setActive} />
    </div>
    </>
  )
}
