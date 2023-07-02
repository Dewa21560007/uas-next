import React from "react";
import { useState,useEffect } from "react";
import Link from 'next/link';
import axios from "axios";
import { stat } from "fs";
import Head from 'next/head';

const koneksiAnggota = axios.create({ 
    baseURL: "http://127.0.0.1:5000/api/anggota" 
});

export default function BuatAkun() {
    const [anggota, setAnggota] =  useState(null);

    const tambahData =  (event) => {  
        event.preventDefault();
        const formData = new FormData(event.target);
        koneksiAnggota
          .post("/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
    
          .then((res) => {
            console.log(res);
            window.location.reload();
            alert("Selamat anda berhasil membuat akun, silahkan anda kembali ke halaman Log In untuk Log In menggunakan akun anda...");
          })
    
          .catch((err) => {
            console.log(err);
          });
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
    
  return (
    <div className="container-buat-akun">
      <Head>
        <title>Create Account</title>
      </Head>
        <h1>Buat Akun</h1>
        <br />
        <form className="FormData" id="form-buat-akun" onSubmit={ tambahData }>
            <center>
                <input type="text" name="nama" placeholder="Nama" />
                <br />
                <input type="text" name="email" placeholder="Email" />
                <br />
                <input type="password" name="password" placeholder="Password" />
                <br />
                <input type="text" name="nowa" placeholder="Nomor WhatsApp" />
                <br />
                <input type="file" name="foto"/>
                <br />
                <input type="submit" />
            </center>
        </form>
        <br />
        <center>
            <Link href="./login" className="back-login">Kembali</Link>
        </center>
    </div>
  )
}