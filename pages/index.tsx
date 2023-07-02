import { useState,useEffect } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '@/gambar/logo.png';
import Link from 'next/link';
import Head from 'next/head';

export default function Beranda() {
  const halaman = (event) => {  
    alert("Anda sudah berada di halaman Beranda");
  }

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

  return (
    <div className="container">
      <Head>
        <title>D'Blogger</title>
      </Head>
      <nav className="menu">
        <div className="menukiri">
          <h1 className="namawebsite">D'Blogger</h1>
        </div>
        <div className="menukanan">
          <ul>
            <li><Link href="#" className="menuUtama" onClick={ halaman }>Beranda</Link></li>
            <li><Link href={'/component/artikel?id='+router.query.id}>Artikel</Link></li>
            <li><Link href="#" onClick={halProfile}>Profile</Link></li>
            <li><Link href='#' onClick={cekLogin} className="menuUtama" id="text">Log In / Log Out</Link></li>
          </ul>
        </div>
      </nav>
      <div className="isiberanda">
        <div className="isikiri">
          <Image src={logo} width={250} height={250} className="logo" />
        </div>
        <div className="isikanan">
          <h2 className="animationTyping">Welcome To Website D'Blogger</h2>
          <br/>
          <p className="katakatamutiara">
            D'Blogger adalah website yang dibuat agar mempermudah kita dalam mencari sebuah artikel dengan
            mudah, aman, dan juga dengan tampilan yang menarik.
          </p>
          <br/>
        </div>
      </div>
    </div>
  )
}