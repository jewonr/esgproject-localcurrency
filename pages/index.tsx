import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Body from "../src/components/body/Body";
import Header from "../src/components/header/Header";
import Search from "../src/components/search/Search";
import styles from "../styles/Home.module.css";
import { region } from "../src/region";

export interface Data {
  affiliateNm: string,  
  crtrYmd: string,
  ctpvNm: string,
  insttCode: string,
  lctnLotnoAddr: string,
  lctnRoadNmAddr: string,
  localBill: string,
  mainPrd: string,
  sectorNm: string,
  sggNm: string,
  telno: string,
  distance?: number
}

export default function Home() {
  const [active, setActive] = useState(false);
  const [data, setData] = useState<Data[][]>([]);
  const [curLon, setCurLon] = useState<number>(0);
  const [curLat, setCurLat] = useState<number>(0);
  const [secTitleText, setSecTitleText] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [queryKey, setQueryKey] = useState("");
  const [queryValue, setQueryValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
        await getUserLocation()
      if (curLat && curLon) {
        await findNearestCity(await getRangeFromCoordinates()).then(data => {
          setSecTitleText(data);
          getStores(data, false);
        });
      }
    };
    fetchData();
  }, [curLat, curLon]);

  const getStores = (region: string, repeat: boolean, key?: string, value?: string) => {
    axios
    .get(
      value ? 
      `http://api.data.go.kr/openapi/tn_pubr_public_local_bill_api?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&SGG_NM=${region}&${key}=${value}&pageNo=${pageCount}&numOfRows=20&type=json` :
      `http://api.data.go.kr/openapi/tn_pubr_public_local_bill_api?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&SGG_NM=${region}&pageNo=${pageCount}&numOfRows=20&type=json`
    )
    .then(async (res) => {
      setPageCount(prev => prev + 1);
      console.log(res.data);
      let stores: Data[] = res.data.response.body.items;
      for (const [i, val] of res.data.response.body.items.entries()) {
        if (val.lctnRoadNmAddr !== "") {
          const storeLocation = await getAddressFromCoordinates(val.lctnRoadNmAddr);
          if(storeLocation) {
            console.log(curLon, curLat, storeLocation.x, storeLocation.y);
            console.log(calculateDistance(curLon, curLat, storeLocation.x, storeLocation.y));
            stores = stores.map((item, idx) => ({
              ...item,
              distance: idx === i ? Number(calculateDistance(curLon, curLat, storeLocation.x, storeLocation.y).toFixed(2)) : item.distance
            }))
          }
        }
      }
      console.log(pageCount);
      if(data.length) {
        if(repeat) setData([...data, stores])
        else setData([stores]);
      } else {
        setData([stores]);
      } 
      return;
    })
    .catch(e => {
      console.log(e);
      setData(data);
      setPageCount(1);
      setSecTitleText(data[0][0].sggNm);
      return;
    })
  }

  const calculateDistance = (curLat: number, curLon: number, storeLat: number, storeLon: number): number => {
    const lat1Rad = curLat * (Math.PI / 180);
    const lon1Rad = curLon * (Math.PI / 180);
    const lat2Rad = storeLat * (Math.PI / 180);
    const lon2Rad = storeLon * (Math.PI / 180);

    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = 6371 * c;
    return distance;
  }

  const getAddressFromCoordinates = async (address: string) => {
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`
        }
      });

      const { documents } = response.data;
      return documents[0]; 
    } catch (e) {
      console.error('API 요청 중 오류 발생 :', e);
      return;
    }
  }

  const getRangeFromCoordinates = async () => {
    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${curLon}&y=${curLat}`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`
        }
      });
  
      const { documents } = response.data;
      if (documents.length > 0) {
        const region = documents[0].region_1depth_name;
        console.log(region);
        if(region === "서울특별시") return "경기도";
        return region;
      }
    } catch (e) {
      console.error('API 요청 중 오류 발생 :', e);
      return;
    }
  };

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          setCurLat(position.coords.latitude);
          setCurLon(position.coords.longitude);
          console.log(curLat, curLon);
        },
        (error) => {
          console.error('위치 정보를 가져오는 중 오류가 발생했습니다:', error);
        }
      );
    } else {
      console.error('Geolocation을 지원하지 않는 브라우저입니다.');
    }
  }

  const findNearestCity = async (range: string) => {
    const regionList = region[range];
    let nearestDistance = Infinity;
    let nearestRegion = "";
    for (const region of regionList) {
      const regionLocation = await getAddressFromCoordinates(region);
      let distance = calculateDistance(curLon, curLat, regionLocation.x, regionLocation.y);
      console.log(distance, region);
      if (distance < nearestDistance) { 
        nearestDistance = distance;
        nearestRegion = region;
      }
    }
    console.log(nearestRegion);
    setSecTitleText(nearestRegion);
    return nearestRegion;
  }

  const onClickSearchBox = () => {
    setActive(true);
    console.log(active);
  }

  const onClickSearchButton = (region: string, idx?: number, input?: string) => {
    let option = "";
    if(idx === 0) {
      option = "AFFILIATE_NM";
    } else if(idx === 1) {
      option = "SECTOR_NM";
    } 

    console.log(region, option, input);
    
    setQueryKey(option);
    setQueryValue(input ? input : "");
    setSecTitleText(region);
    setPageCount(1);
    setData([]);

    if (input && idx) {
      getStores(region, false, option, input);
    } else {
      getStores(region, false);
    }
  } 

  const SortByDistance = () => {
    let stores = data.reduce((prev, next) => {
      return prev.concat(next);
    });

    stores = stores.filter(val => val.distance).sort((a, b) => {
      if (a.distance! > b.distance!) return 1;
      if (a.distance! < b.distance!) return -1;
      return 0;
    });

    setData([stores]);
  }

  const onclickCurrentLocationButton = async (region: string) => {
    setPageCount(1);
    await findNearestCity(await getRangeFromCoordinates()).then(data => {
      console.log(data, region);
      if (data === region) {
        SortByDistance();
      } else {
        setData([]);
        getStores(data, false);
      }
    })
  }

  return (
    <>
     <Head>
        <title>지역화폐 가맹점 찾기</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className={styles.container}>
      <Header onClick={onClickSearchBox} />
      <Body 
        data={data} 
        secTitle={secTitleText} 
        getStores={getStores} 
        queryKey={queryKey} 
        queryValue={queryValue} 
        onclickCurrentLocationButton={onclickCurrentLocationButton}
      />
      <Search onClickSearchButton={onClickSearchButton} isActive={active} setIsActive={setActive} />
    </div>
    </>
  )
}
