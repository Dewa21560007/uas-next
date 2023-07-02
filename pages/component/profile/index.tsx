import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { stat } from "fs";
import Link from 'next/link';
import Head from 'next/head';
 
const koneksiAnggota = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/anggota" 
});

const koneksiAnggotaUbah = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/anggotaUbah" 
});

export default function Beranda() {
  const [stateid, setId] = useState("");
  const [statenama, setNama] = useState("");
  const [statefoto, setFoto] = useState("");
  const [stateemail, setEmail] = useState("");
  const [statepassword, setPassword] = useState("");
  const [statenowa, setNowa] = useState("");
  const [anggota, setAnggota] =  useState(null);

  const show = (event) => {
    event.preventDefault();
    var id = event.target.value;

    document.getElementById("halaman").style.display = "inline";
    document.getElementById("halamanEdit").style.display = "none";

    const dataAkun =  anggota.filter((anggota) => {
      return anggota.id == id;
    });
    
    if(dataAkun!=null){
      setNama(dataAkun[0].nama);
      setId(dataAkun[0].id);
      setEmail(dataAkun[0].email);
      setPassword(dataAkun[0].password);
      setFoto(dataAkun[0].foto);
      setNowa(dataAkun[0].nowa);
    }
  }

  const halaman = (event) => {  
    alert("Anda sudah berada di halaman Profile");
  }

  const sembunyikanProfile = (event) => {
    document.getElementById("halaman").style.display = "none";
    document.getElementById("halamanEdit").style.display = "none";
  }

  useEffect(() => {
    async function getAnggota() {
      const response = await koneksiAnggota.get("/").then(function (axiosResponse) {
        setAnggota(axiosResponse.data.data);
      })
        
      .catch(function (error) {   
        alert('error from Anggota in api Anggota: '+error);
      });
    }
    
    getAnggota();
  }, []);

  const router = useRouter()

  const cekLogin = (event) => {
    if(router.query.id==undefined) {
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

  const ubahDataNow =  (event) => {
    event.preventDefault();
    const address = "/"+router.query.id;
  
    const formData = {
      id: router.query.id,
      nama: event.target.nama.value,
      password: event.target.password.value,
      email: event.target.email.value,
      nowa: event.target.nowa.value
    }

    koneksiAnggotaUbah
      .put( address,formData)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const hapusAkun = (event) => {
    event.preventDefault();
    var id = event.target.value;
    koneksiAnggota.delete(`/${id}`)
      .then(response => {
        console.log('Data berhasil dihapus:', response.data);
        alert("Akun anda berhasil di hapus...");
        window.location.href = "/?id=undefined";
        setAnggota(
          anggota.filter((anggota) => {
            return anggota.id !== id;
          })
        )
      })
      
      .catch(error => {
        console.error('Gagal menghapus data:', error);
      })
  }

  const halEdit = (event) => {
    document.getElementById("halamanEdit").style.display = "inline";
    document.getElementById("halaman").style.display = "none";
  }

  const batalEdit = (event) => {
    document.getElementById("halamanEdit").style.display = "none";
    document.getElementById("halaman").style.display = "inline";
  }

  const halArtikelSaya = (event) => {
    window.location.href = "/component/profile/artikelsaya?id="+router.query.id;
  }

if(anggota==null){
  return(
    <div>
      waiting...
    </div>
  )
}else{
  return (
    <div className="container-profile">
      <Head>
        <title>Profile</title>
      </Head>
      <nav className="menu">
        <div className="menukiri">
          <h1 className="namawebsite">My Profile</h1>
        </div>
        <div className="menukanan">
          <ul>
            <li><Link href={"/?id="+router.query.id}>Beranda</Link></li>
            <li><Link href={"/component/artikel?id="+router.query.id}>Artikel</Link></li>
            <li><Link href="#" className="menuUtama" onClick={ halaman }>Profile</Link></li>
            <li><Link href='#' onClick={cekLogin} className="menuUtama" id="text">Log In / Log Out</Link></li>
          </ul>
        </div>
      </nav>
      <center>
        <button id="btn-tampilkan-profile" onClick={show} value={router.query.id}>Tampilkan Profile</button>
        <button id="btn-tampilkan-profile" style={{marginLeft: "2%"}} onClick={sembunyikanProfile}>Sembunyikan Profile</button>
      </center>
      <div className="halaman-profile" id="halaman" style={{display: "none"}}>
        <div className="kiri">
          <h1>Nama : {statenama}</h1>
          <br />
          <h1>Email : {stateemail}</h1>
          <br />
          <h1>Password : {statepassword}</h1>
          <br />
          <h1>Nomor WhatsApp : {statenowa}</h1>
          <div className="kum-btn" style={{width: "60%", marginTop: "5%"}}>
            <center>
              <button onClick={halEdit}>Edit Akun</button>
              <button style={{marginLeft: "5%"}} onClick={hapusAkun} value={router.query.id} >Delete Akun</button><br/>
              <button style={{marginTop: "3%"}} onClick={halArtikelSaya} >Artikel Saya</button>
            </center>
          </div>
        </div>
        <div className="kanan">
          <img src={statefoto} width="250" />
        </div>
      </div>
      <div id="halamanEdit" style={{display: "none"}}>
        <form onSubmit={ubahDataNow}>
          <div className="kiri">
            <h1 style={{opacity: "75%"}}>Nama : <input type="text" name="nama" value={statenama} onChange={(e) => setNama(e.target.value)} /></h1>
            <br />
            <h1 style={{opacity: "75%"}}>Email : <input type="text" name="email" value={stateemail} onChange={(e) => setEmail(e.target.value)} /></h1>
            <br />
            <h1 style={{opacity: "75%"}}>Password : <input type="password" name="password" value={statepassword} onChange={(e) => setPassword(e.target.value)} /></h1>
            <br />
            <h1 style={{opacity: "75%"}}>Nomor WhatsApp : <input type="text" name="nowa" value={statenowa} onChange={(e) => setNowa(e.target.value)} /></h1>
            <div className="kum-btn" style={{marginTop: "15%"}}>
              <center>
                <input type="submit" value="Simpan Perubahan" />
                <button style={{marginLeft: "5%"}} onClick={batalEdit} >Batal Edit</button><br/>
              </center>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
}