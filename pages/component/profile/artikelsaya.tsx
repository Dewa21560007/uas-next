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

const koneksiTampilArtikel = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/materiprofile" 
});

export default function Beranda() {
  const [stateid, setId] = useState("");
  const [statenama, setNama] = useState("");
  const [statecover, setCover] = useState("");
  const [statedatamateri, setDataMateri] = useState("");
  const [statejudul, setJudul] = useState("");
  const [statedeskripsi, setDeskripsi] = useState("");
  const [statesuka, setSuka] = useState("");

  const [materi, setMateri] =  useState(null);
  
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
      setDataMateri(dataMateri[0].materi);
      setCover(dataMateri[0].cover);
      setJudul(dataMateri[0].judul);
      setDeskripsi(dataMateri[0].deskripsi);
      setSuka(dataMateri[0].suka);
    }
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

    window.location.href = "/component/profile/view?id="+router.query.id+"&kode="+id;
  }

  const btnDelete = (event) => {
    event.preventDefault();
    var id = event.target.value;
    koneksiMateri.delete(`/${id}`)
      .then(response => {
        console.log('Data berhasil dihapus:', response.data);
        window.location.reload();
        setMateri(
          materi.filter((materi) => {
            return materi.id !== id;
          })
        )
      })
      
      .catch(error => {
        console.error('Gagal menghapus data:', error);
      })
  }

  const tampilkanArtikelSaya = (event) => {
    const idAkun = router.query.id;
    const address = "/"+router.query.id;
    const formData = {
      idAkun: router.query.id
    }

    koneksiTampilArtikel
      .put( address,formData)
      .then((res) => {
        const cekAtikel = materi.filter((materi) => {
          return materi.idAkun == idAkun;
        });

        if(cekAtikel!=idAkun) {
          setMateri(cekAtikel);
          document.getElementById("halaman").style.height = "max-content";
        }
      })
      .catch((err) => {
        alert("Tidak ada artikel yang di posting...");
      });
  }

  const btnEdit = (event) => {
    document.getElementById("layout-edit").style.display = "inline";
    window.location.href = "#layout-edit";

    event.preventDefault();
    var id = event.target.value;

    const dataMateri =  materi.filter((materi) => {
      return materi.id == id;
    });
    
    if(dataMateri!=null){
      setId(dataMateri[0].id);
      setNama(dataMateri[0].nama);
      setJudul(dataMateri[0].judul);
      setDataMateri(dataMateri[0].materi);
      setDeskripsi(dataMateri[0].deskripsi);
    }
  }

  const ubahNow = (event) => {
    event.preventDefault();

    var judul = event.target.judul.value;
    var nama = event.target.nama.value;
    var deskripsi = event.target.deskripsi.value;
    var materi = event.target.materi.value;

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
            event.preventDefault();
            const address = "/"+stateid;
          
            const formData = {
              id: stateid,
              nama: event.target.nama.value,
              judul: event.target.judul.value,
              materi: event.target.materi.value,
              deskripsi: event.target.deskripsi.value
            }

            koneksiMateri
              .put( address,formData)
              .then((res) => {
                console.log(res);
                alert("Arikel berhasil diubah...");
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      }
    }
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

  const sembunyikanArtikelSaya = (event) => {
    document.getElementById("halaman").style.height = "0";
    document.getElementById("layout-edit").style.display = "none";
  }

  const router = useRouter()

if(materi==null){
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
        <div className="menukiri" style={{width: "90%"}}>
          <h1 className="namawebsite" style={{marginTop: "1%", marginLeft: "15%"}}>View Artikel</h1>
        </div>
        <div className="menukanan" style={{width: "5%", marginTop: "1.3%"}}>
          <ul>
            <li><Link href={"/component/profile?id="+router.query.id} className="menuUtama">Kembali</Link></li>
          </ul>
        </div>
      </nav>
      <center>
        <button id="btn-tampilkan-profile" value={router.query.id} onClick={tampilkanArtikelSaya}>Tampilkan Artikel Saya</button>
        <button id="btn-tampilkan-profile" style={{marginLeft: "2%"}} onClick={sembunyikanArtikelSaya}>Sembunyikan Artikel Saya</button>
      </center>
      <div className="halaman-artikel" id="halaman" style={{overflowX: "auto", height: "0", marginLeft: "1%", marginRight: "1%", opacity: "75%"}}>
        <div className="isi-artikel" id="isi">
            {materi.map((dta) => 
              <ul style={{display: "inline-block"}}>
                <li style={{color: "#000", opacity: "50%", fontWeight: "bold", fontSize: "18px", marginBottom: "5%"}}>{dta.judul}</li>
                <li style={{float: "left", marginRight: "5%"}}><img src={dta.cover} width={100} height={100} /></li>
                <li style={{fontSize: "17px", letterSpacing: "1px", width: "100%", height: "70%"}}>{dta.deskripsi}</li>
                <li style={{float: "left", marginTop: "4%", marginRight: "2%"}}>
                  <Image src={Logo} width={25} height={25} />
                  <div className="overlay-populer" id="gambarBesar-artikel-populer" style={{zIndex: "99"}}>
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
                <li style={{float: "right", marginRight: "3%", marginTop: "2%"}}><button className="tombolView" value={dta.id} onClick={btnDelete}>Hapus</button></li>
                <li style={{float: "right", marginRight: "3%", marginTop: "2%"}}><button className="tombolView" value={dta.id} onClick={btnEdit}>Edit</button></li>
                <li style={{float: "right", marginRight: "3%", marginTop: "2%"}}><button className="tombolView" value={dta.id} onClick={btnView}>View Artikel</button></li>
                <li style={{float: "right", marginRight: "3%", marginTop: "2%"}}><button value={dta.id} className="tombolView" onClick={klikSaya}>Lihat Foto</button></li>
              </ul>
            )}
        </div>
      </div>
      <div className="layout-edit" id="layout-edit" style={{display: "none"}}>
        <div className="isiEdit">
          <div className="inputan">
            <form id="forminput" onSubmit={ubahNow}>
              <input type="submit" value="Ubah Artikel" style={{width: "110px"}} />
              <ul>
                <li></li>
              </ul>
              <br />
              <ul>
                <li>Nama</li>
                <li style={{marginLeft: "7%"}}><input type="text" name="nama" placeholder="Masukkan Nama..."  value={statenama} onChange={(e) => setNama(e.target.value)} /></li>
              </ul>
              <br />
              <ul>
                <li>Judul</li>
                <li style={{marginLeft: "7.5%"}}><input type="text" name="judul" placeholder="Masukkan Judul..." value={statejudul} onChange={(e) => setJudul(e.target.value)} /></li>
              </ul>
              <br />
              <ul>
                <li>Deskripsi</li>
                <li style={{marginLeft: "4.5%"}}><input type="text" name="deskripsi" placeholder="Masukkan Deskripsi..." value={statedeskripsi} onChange={(e) => setDeskripsi(e.target.value)} /></li>
              </ul>
              <br />
              <p>Artikel</p>
              <br />
              <textarea className="textarea-artikel" name="materi" value={statedatamateri} onChange={(e) => setDataMateri(e.target.value)} ></textarea>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
}