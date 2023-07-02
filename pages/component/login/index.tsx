import React from "react";
import { useState,useEffect } from "react";
import Link from 'next/link';
import axios from "axios";
import { stat } from "fs";
import Head from 'next/head';

const koneksiAnggota = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/anggota" 
});

export default function Login() {
  const [stateemail, stateEmail] = useState("");
  const [statepassword, statePassword] = useState("");
  const [stateid, stateId] = useState("");
  const [anggota, setAnggota] =  useState(null);

  const masukLogin = (event) => {
    event.preventDefault();
    
    var email = event.target.email.value;
    var password = event.target.password.value;

    if(email=="") {
      alert("Email tidak boleh kosong");
    } else {
      if(password=="") {
        alert("Password tidak boleh kosong");
      } else {
        const address = "/"+event.target.email.value;
        const formData = {
          email: event.target.email.value,
          password: event.target.password.value
        }

        koneksiAnggota
          .put( address,formData)
          .then((res) => {
            const cekLogin = anggota.filter((anggota) => {
              return anggota.email == email;
            });

            if(cekLogin!=email) {
              stateEmail(cekLogin[0].email);
              statePassword(cekLogin[0].password);
              stateId(cekLogin[0].id);
            }

            if(statepassword==password) {
              alert("Selamat anda berhasil Log In, tekan Ok untuk kembali ke halaman Beranda");
              window.location.href = "/?id="+(cekLogin[0].id);
            } else {
              alert("Password anda salah");
            }
          })
          .catch((err) => {
            alert("Email tidak ditemukan");
          });
      }
    }
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
    <div className="container-login">
      <Head>
        <title>Log In</title>
      </Head>
      <h1 className="h1-login">Log In</h1>
      <br/>
      <form className="formlogin-login" onSubmit={ masukLogin }>
        <center>
          <input type="text" placeholder="Email" id="email" name="email" />
          <br/>
          <input type="password" placeholder="Password" id="password" name="password" />
          <br /><br />
          <Link href="./createakun" className="btn-buat-akun">Create account</Link>
          <br />
          <input type="submit" value="Masuk" />
        </center>
      </form>
      <br />
      <center>
        <Link className="back-login" href="/">Kembali</Link>
      </center>
    </div>
  )
}