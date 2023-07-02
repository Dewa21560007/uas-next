import { useRouter } from 'next/router'
import { useState,useEffect } from "react";
import Head from 'next/head';
import Link from 'next/link';
import axios from "axios";
import { stat } from "fs";

const koneksiArtikel = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/materi" 
});

export default function Beranda() {
  const [artikel, setArtikel] = useState(null);

  const inputArtikel =  (event) => {
    event.preventDefault();

    var judul = event.target.judul.value;
    var nama = event.target.nama.value;
    var deskripsi = event.target.deskripsi.value;
    var materi = event.target.materi.value;
    var idAkun = event.target.idAkun.value;

    if(nama=="") {
      alert("Nama tidak boleh kosong");
    } else {
      if(judul=="") {
        alert("Judul tidak boleh kosong");
      } else {
        if(deskripsi=="") {
          alert("Deskripsi tidak boleh kosong");
        } else {
          if(materi=="") {
            alert("Artikel tidak boleh kosong");
          } else {
            const formData = new FormData(event.target);
            koneksiArtikel
              .post("/", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })

              .then((res) => {
                console.log(res);
                window.location.reload();
                alert("Artikel berhasil di posting.");
              })

              .catch((err) => {
                alert("Gagal memposting artikel, silahkan anda coba posting ulang lagi.");
                console.log(err);
              });
          }
        }
      }
    }
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

  const router = useRouter()

  return (
    <div className="container-profile">
      <Head>
        <title>Input Artikel</title>
      </Head>
      <nav className="menu">
        <div className="menukiri" style={{width: "90%"}}>
          <h1 className="namawebsite" style={{marginTop: "1%", marginLeft: "15%"}}>Input New Artikel</h1>
        </div>
        <div className="menukanan" style={{width: "5%", marginTop: "1.3%"}}>
          <ul>
            <li><Link href={"/component/artikel?id="+router.query.id} className="menuUtama">Kembali</Link></li>
          </ul>
        </div>
      </nav>
      <div className="isiInputan">
        <div className="inputan">
          <form id="forminput" onSubmit={ inputArtikel }>
            <input type="submit" value="Posting" />
            <input type="text" name="idAkun" value={router.query.id} style={{display: "none"}} />
            <ul>
              <li>Cover</li>
              <li style={{marginLeft: "7%"}}><input type="file" name="cover" /></li>
            </ul>
            <br />
            <ul>
              <li>Nama</li>
              <li style={{marginLeft: "7%"}}><input type="text" name="nama" placeholder="Masukkan Nama..." /></li>
            </ul>
            <br />
            <ul>
              <li>Judul</li>
              <li style={{marginLeft: "7.5%"}}><input type="text" name="judul" placeholder="Masukkan Judul..." /></li>
            </ul>
            <br />
            <ul>
              <li>Deskripsi</li>
              <li style={{marginLeft: "4.5%"}}><input type="text" name="deskripsi" placeholder="Masukkan Deskripsi..." /></li>
            </ul>
            <br />
            <p>Artikel</p>
            <br />
            <textarea className="textarea-artikel" name="materi"></textarea>
          </form>
        </div>
      </div>
    </div>
  )
}