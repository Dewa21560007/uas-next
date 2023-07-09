import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { stat } from "fs";
import Link from 'next/link';
import Head from 'next/head';
import Logo from '@/gambar/icon2.png';
import Image from 'next/image';
 
const koneksiMateri = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/materi" 
});

const koneksiMateriPopuler = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/materipopuler" 
});

export default function Beranda() {
  const [stateid, setId] = useState("");
  const [statenama, setNama] = useState("");
  const [statecover, setCover] = useState("");
  const [stateemail, setEmail] = useState("");
  const [statedatamateri, setDataMateri] = useState("");
  const [statejudul, stateJudul] = useState("");
  const [statedeskripsi, stateDeskripsi] = useState("");
  const [statesuka, stateSuka] = useState("");

  const [materi, setMateri] =  useState(null);
  const [materipopuler, setMateriPopuler] = useState(null);

  const klikSaya = (event) => {
    event.preventDefault();
    var id = event.target.value;

    window.location.href = "#gambarBesar-artikel-populer";

    const dataMateri =  materi.filter((materi) => {
      return materi.id == id;
    });
    
    if(dataMateri!=null){
      setNama(dataMateri[0].nama);
      setId(dataMateri[0].id);
      setEmail(dataMateri[0].email);
      setDataMateri(dataMateri[0].materi);
      setCover(dataMateri[0].cover);
      stateJudul(dataMateri[0].judul);
      stateDeskripsi(dataMateri[0].deskripsi);
      stateSuka(dataMateri[0].suka);
    }
  }

  const klikSayaPopuler = (event) => {
    event.preventDefault();
    var id = event.target.value;

    window.location.href = "#gambarBesar-artikel-populer";

    const dataMateriPopuler =  materipopuler.filter((materipopuler) => {
      return materipopuler.id == id;
    });
    
    if(dataMateriPopuler!=null){
      setNama(dataMateriPopuler[0].nama);
      setId(dataMateriPopuler[0].id);
      setEmail(dataMateriPopuler[0].email);
      setDataMateri(dataMateriPopuler[0].materi);
      setCover(dataMateriPopuler[0].cover);
      stateJudul(dataMateriPopuler[0].judul);
      stateDeskripsi(dataMateriPopuler[0].deskripsi);
      stateSuka(dataMateriPopuler[0].suka);
    }
  }

  const halaman = (event) => {  
    alert("Anda sudah berada di halaman Artikel");
  }

  const btnView = (event) => {
    event.preventDefault();
    var id = event.target.value;

    const dataMateri =  materi.filter((materi) => {
      return materi.id == id;
    });
    
    if(dataMateri!=null){
      setId(dataMateri[0].id);
    }

    window.location.href = "/component/artikel/view?id="+router.query.id+"&kode="+id;
  }

  const btnViewPopuler = (event) => {
    event.preventDefault();
    var id = event.target.value;

    const dataMateriPopuler =  materipopuler.filter((materiPopuler) => {
      return materiPopuler.id == id;
    });
    
    if(dataMateriPopuler!=null){
      setId(dataMateriPopuler[0].id);
    }

    window.location.href = "/component/artikel/view?id="+router.query.id+"&kode="+id;
  }

  useEffect(() => {
    async function getMateri() {
      const response = await koneksiMateri.get("/").then(function (axiosResponse) {
        setMateri(axiosResponse.data.data);
      })
        
      .catch(function (error) {   
        alert('error from Artikel in api Artikel: '+error);
      });
    }
    
    getMateri();
  }, []);

  useEffect(() => {
    async function getMateriPopuler() {
      const response = await koneksiMateriPopuler.get("/").then(function (axiosResponse) {
        setMateriPopuler(axiosResponse.data.data);
      })
        
      .catch(function (error) {   
        alert('error from Artikel in api Artikel: '+error);
      });
    }
    
    getMateriPopuler();
  }, []);

  const router = useRouter()

  const cekLogin = (event) => {
    if(router.query.id=="undefined") {
      window.location.href = "/component/login";
    } else {
      const response = confirm("Apakah anda ingin Log Out ?");

      if(response) {
        window.location.href = "/?id=undefined";
      } else {
        console.log("Tidak jadi log out");
      }
    }
  }

  const addData = (event) => {
    if(router.query.id=="undefined") {
      const response = confirm("Membutuhkan akses Log In, apakah anda ingin Log In ?");

      if(response) {
        window.location.href = "/component/login";
      } else {
        console.log("Tidak");
      }
    } else {
      window.location.href = "/component/artikel/input?id="+router.query.id;
    }
  }

  const halProfile = (event) => {
    if(router.query.id=="undefined") {
      const response = confirm("Membutuhkan akses Log In, apakah anda ingin Log In ?");

      if(response) {
        window.location.href = "/component/login";
      } else {
        console.log("Tidak");
      }
    } else {
      window.location.href = "/component/profile?id="+router.query.id;
    }
  }

if(materipopuler==null){
  return(
    <div>
      waiting...
    </div>
  )
}else{
  return (
    <div className="container-profile">
      <Head>
        <title>Artikel</title>
      </Head>
      <nav className="menu">
        <div className="menukiri">
          <h1 className="namawebsite">Artikel</h1>
        </div>
        <div className="menukanan">
          <ul>
            <li><Link href={"/?id="+router.query.id}>Beranda</Link></li>
            <li><Link href="#" className="menuUtama" onClick={ halaman }>Artikel</Link></li>
            <li><Link href="#" onClick={halProfile} >Profile</Link></li>
            <li><Link href='#' onClick={cekLogin} className="menuUtama" id="text">Log In / Log Out</Link></li>
          </ul>
        </div>
      </nav>
      <button onClick={addData} className="btn-tambah-artikel">Buat Artikel</button>
      <h1 style={{color: "#fff", marginTop: "3%", marginLeft: "2%", fontWeight: "bold", opacity: "75%", fontSize: "18px", letterSpacing: "1px"}}>Semua Artikel</h1>
      <div className="halaman-artikel" id="halaman" style={{overflowX: "auto", marginLeft: "1%", marginRight: "1%", opacity: "75%"}}>
        <div className="isi-artikel" id="isi">
            {materi.map((dta) => 
              <ul style={{display: "inline-block"}}>
                <li style={{color: "#000", opacity: "50%", fontWeight: "bold", fontSize: "18px", marginBottom: "5%"}}>{dta.judul}</li>
                <li style={{float: "left", marginRight: "5%"}}><img src={dta.cover} width={100} height={100} /></li>
                <li style={{fontSize: "17px", letterSpacing: "1px", width: "100%", height: "70%"}}>{dta.deskripsi}</li>
                <li style={{float: "left", marginTop: "4%", marginRight: "2%"}}>
                  <Image src={Logo} width={25} height={25} />
                </li>
                <li style={{float: "left", marginTop: "5%"}}>{dta.suka}</li>
                <li style={{float: "right", marginRight: "3%", marginTop: "2%"}}><button className="tombolView" value={dta.id} onClick={btnView}>View Artikel</button></li>
                <li style={{float: "right", marginRight: "3%", marginTop: "2%"}}><button value={dta.id} className="tombolView" onClick={klikSaya}>Lihat Foto</button></li>
              </ul>
            )}
        </div>
      </div>
      <h1 style={{color: "#fff", marginTop: "9%", marginLeft: "2%", fontWeight: "bold", opacity: "75%", fontSize: "18px", letterSpacing: "1px"}}>Artikel Terpopuler</h1>
      <div className="halaman-artikel" id="halaman" style={{overflowX: "auto", marginLeft: "1%", marginRight: "1%", opacity: "75%", marginBottom: "5%"}}>
        <div className="isi-artikel" id="isi">
            {materipopuler.map((dta) => 
              <ul style={{display: "inline-block"}}>
                <li style={{color: "#000", opacity: "50%", fontWeight: "bold", fontSize: "18px", marginBottom: "5%"}}>{dta.judul}</li>
                <li style={{float: "left", marginRight: "5%"}}><img src={dta.cover} width={100} height={100} /></li>
                <li style={{fontSize: "17px", letterSpacing: "1px", width: "100%", height: "70%"}}>{dta.deskripsi}</li>
                <li style={{float: "left", marginTop: "4%", marginRight: "2%"}}>
                    <Image src={Logo} width={25} height={25} />
                    <div className="overlay-populer" id="gambarBesar-artikel-populer">
                        <br />
                        <br />
                        <a href="#isi-populer" className="back-overlay-artikel">Close</a>
                        <br />
                        <br />
                        <br />
                        <br />
                        <img className="gambar-overlay-artikel" src={statecover} width={400} height={400} />
                    </div>
                </li>
                <li style={{float: "left", marginTop: "5%"}}>{dta.suka}</li>
                <li style={{float: "right", marginRight: "3%", marginTop: "2%"}}><button className="tombolView" value={dta.id} onClick={btnViewPopuler}>View Artikel</button></li>
                <li style={{float: "right", marginRight: "3%", marginTop: "2%"}}><button value={dta.id} className="tombolView" id="tombolView" onClick={klikSayaPopuler}>Lihat Foto</button></li>
              </ul>
            )}
        </div>
      </div>
    </div>
  )
}
}