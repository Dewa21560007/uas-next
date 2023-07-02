import { useRouter } from 'next/router'
import { useState,useEffect } from "react";
import Head from 'next/head';
import Link from 'next/link';
import axios from "axios";
import Image from 'next/image';
import Logo from '@/gambar/icon3.png';
import { stat } from "fs";

const koneksiArtikel = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/materi"
});

const updateSuka = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/materiUbahSuka" 
});

export default function Beranda() {
  const [statenama, setNama] = useState("");
  const [stateid, setId] = useState("");
  const [statemateri, setMateri] = useState("");
  const [statecover, setCover] = useState("");
  const [statejudul, setJudul] = useState("");
  const [statedeskripsi, setDeskripsi] = useState("");
  const [statesuka, setSuka] = useState("");
  const [stateidakun, setIdAkun] = useState("");
  const [artikel, setArtikel] = useState(null);

  const vtampilData = (event) => {
    event.preventDefault();
    var id = event.target.value;

    document.getElementById("isi-view-artikel").style.display = "inline";

    const filart =  artikel.filter((artikel) => {
      return artikel.id == id;
    });
    
    if(filart!=null){
      setNama(filart[0].nama);
      setId(filart[0].id);
      setMateri(filart[0].materi);
      setCover(filart[0].cover);
      setDeskripsi(filart[0].deskripsi);
      setJudul(filart[0].judul);
      setSuka(filart[0].suka);
      setIdAkun(filart[0].idAkun);
    }
  }

  const vshiddenData = (event) => {
    document.getElementById("isi-view-artikel").style.display = "none";
  }

  useEffect(() => {
    async function getArtikel() {
      const response = await koneksiArtikel.get("/").then(function (axiosResponse) {
        setArtikel(axiosResponse.data.data);
      })
        
      .catch(function (error) {   
        alert('error from Artikel in api Artikel: '+error);
      });
    }
    
    getArtikel();
  }, []);

  const klikSuka =  (event) => {
    event.preventDefault();
    const address = "/"+router.query.kode;

    const idacc = router.query.id;

    if(idacc==stateidakun) {
      alert("Tidak berlaku untuk postingan artikel sendiri...");
    } else {
      let x = parseInt(statesuka);
      let y = 1;
      let hasil = x + y;
    
      const formData = {
        id: router.query.kode,
        suka: hasil
      }

      updateSuka
        .put( address,formData)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const router = useRouter()

  if(artikel==null){
    return(
      <div>
        waiting...
      </div>
    )
  }else{
  return (
    <div className="container-profile">
      <Head>
        <title>View Artikel</title>
      </Head>
      <nav className="menu">
        <div className="menukiri" style={{width: "90%"}}>
          <h1 className="namawebsite" style={{marginTop: "1%", marginLeft: "15%"}}>View Artikel</h1>
        </div>
        <div className="menukanan" style={{width: "5%", marginTop: "1.3%"}}>
          <ul>
            <li><Link href={"/component/artikel?id="+router.query.id} className="menuUtama">Kembali</Link></li>
          </ul>
        </div>
      </nav>
      <center>
        <button id="btn-tampilkan-profile" onClick={vtampilData} value={router.query.kode}>Tampilkan Artikel</button>
        <button id="btn-tampilkan-profile" onClick={vshiddenData} style={{marginLeft: "2%", marginBottom: "5%"}} >Sembunyikan Artikel</button>
        <div className="isi-view-artikel" id="isi-view-artikel">
          <h1 style={{color: "salmon", fontSize: "23px", fontWeight: "bold", textAlign: "center", marginLeft: "1.5%", marginRight: "1.5%"}}>{statejudul}</h1>
          <br />
          <img src={statecover} id="gambar" width={900} />
          <br />
          <p style={{marginLeft: "1.5%", marginRight: "1.5%", marginBottom: "5px", fontSize: "18px", marginTop: "5%", color: "salmon"}}>Deskripsi Artikel :</p>
          <p style={{marginLeft: "1.5%", marginRight: "1.5%", fontSize: "18px", opacity: "50%"}}>{statedeskripsi}</p>
          <br />
          <p style={{marginLeft: "1.5%", marginRight: "1.5%", fontSize: "18px", opacity: "50%", marginBottom: "5%"}}>{statemateri}</p>
          <div className="isi-kiri-view-artikel" style={{float: "left", width: "20%", marginLeft: "1.5%"}}>
            <p style={{marginLeft: "1.5%", marginRight: "1.5%", color: "salmon"}}>Diupload oleh : {statenama}</p>
          </div>
          <div className="isi-kanan-view-artikel" style={{width: "100px", height: "100px", float: "right"}}>
            <Image src={Logo} width={25} height={25} onClick={klikSuka} style={{cursor: "pointer", float: "left"}} />
            <p style={{color: "salmon", float: "left", marginTop: "5%", marginLeft: "10%"}}>{statesuka}</p>
          </div>
        </div>
      </center>
    </div>
  )
}
}