import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Body from "../src/components/body/Body";
import Header from "../src/components/header/Header";
import Search from "../src/components/search/Search";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [active, setActive] = useState(false);
  const [data, setData] = useState([]);

  const onClickSearchBox = () => {
    setActive(true);
    console.log(active);
  }

  const onClickSearchButton = async (idx: number, input: string) => {
    setData([]);
    let option = "";
    if(idx === 0) {
      option = "SIGUN_NM";
    } else if(idx === 1) {
      option = "CMP_NM";
    } else if(idx === 2) {
      option = "REFINE_ROADNM_ADDR";
    } else {
      option = "REFINE_LOTNO_ADDR";
    }
    console.log(option, input);
    await axios.get(`https://openapi.gg.go.kr/RegionMnyFacltStus?Key=${process.env.NEXT_PUBLIC_API_KEY}&Type=json&pIndex=1&pSize=10&${option}=${input}`)
      .then(data => {setData(data.data.RegionMnyFacltStus[1].row)});
  }

  useEffect(() => {
    (async () => {
      await axios.get(`https://openapi.gg.go.kr/RegionMnyFacltStus?Key=${process.env.NEXT_PUBLIC_API_KEY}&Type=json&pIndex=1&pSize=10`)
        .then(data => setData(data.data.RegionMnyFacltStus[1].row));
    })();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data])

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
