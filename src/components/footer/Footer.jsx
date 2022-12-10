import { GrFacebookOption, GrYoutube } from 'react-icons/gr';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import dataLink from '../../data/footer-link-dummy-data.json';
import c from './Footer.module.css';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Footer() {
  return (
    <div className={c.footer}>
      <div className="container">
        <div className={c["footer-main"]}>
          <div className={c["footer-main-contact"]}>
            <div className={c["footer-main-contact-number"]}>
              <p>Саволингиз борми? Қўнғироқ қилинг</p>
              <h3>+998 71 209 99 44</h3>
            </div>
            <div className={c["footer-main-contact-networks"]}>
              <a href='https://www.facebook.com'>
                <GrFacebookOption className={c["footer-network-icon"]} />
              </a>
              <a href='https://www.telegram.com'>
                <FaTelegramPlane className={c["footer-network-icon"]} />
              </a>
              <a href='https://www.instagram.com'>
                <FaInstagram className={c["footer-network-icon"]} />
              </a>
              <a href='https://www.youtube.com'>
                <GrYoutube className={c["footer-network-icon"]} />
              </a>
            </div>
            <div>
              <img style={{ cursor: "pointer" }} src="https://texnomart.uz/_nuxt/img/playmarket-logo-kr.24580f9.svg" alt="" />
            </div>
            <Link className={c["footer-main-contact-bottom-link"]} to="/">Дўконлар манзиллари Тошкент вилояти</Link>
          </div>
          <div className={c["footer-links-wrapper"]}>
            <div className={c["footer-links"]}>
              {
                dataLink.map(({ title, links, button }) => {
                  return (
                    <div key={uuidv4()} className={c["footer-links-item"]}>
                      <h3>{title}</h3>
                      <ul>
                        {
                          links.map((link) => {
                            return (
                              <li key={uuidv4()}>{link}</li>
                            )
                          })
                        }
                      </ul>
                      {
                        button ?
                          <div className={c["footer-links-item-button"]}>
                            <FaTelegramPlane className={c["footer-links-item-button-icon"]} />
                            <span>{button}</span>
                          </div>
                          : null
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className={c["footer-bottom"]}>
          <div className={c["footer-bottom-desc"]}>
            2016-2022 © texnomart.uz. Барча ҳуқуқлар ҳимояланган. Товарларнинг кўрсатилган қиймати ва уларни сотиб олиш шартлари жорий санага амал қилади
          </div>
          <div className={c["footer-bottom-cashs"]}>
            <Link to="/"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAcCAYAAAA9UNxEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKXSURBVHgB7ZldSFNhGMf/5pxu6NiWS9FZXkSDUsqosQsF66JCYmAEFhFSSd0lBELdFV30cTm6qS5c3UTQbjJiRs1laR9i2lppa8XKbW3i3Kfbcl+9x2A0FtVFzxrbfvDCec77cOB/nvd5zvO+pyyVSjUDGGSjE4XNNBvdZUzwFLvYguLAyAlOoYhYhSKDB0K0unG8nrGn7TqZCKdP7MnwuXhVj5O9O4HhM0BiGTx5G/jKo6CCVLDh2SxGJ6xpWyatyRJ8z2BCp3IDWgIuxD8akfQ7SQXnxZK+wKLM67qE8tr1oCYvBHPLXn1Kh1fK60ipr4CSvClaFpsbvQNaHDs3BEpKVTrXHNi7HYFQNG3L6yWg5L8LFlTxEYsn07awkg9KiAWX/dFj8M4Y7C5f2lZtbsb+rq2ggjSHBVUVGfZyLJ7lE4nGMuxyXjkoIRXMNRo/4w9GYLY407bN7oHHt5Th01QvBSWkglsVjVn3zmqG8Nm5COe8H/3nb2fNb2tdB0pId0tc9W3vuZxRhX+HRCTEsLYfa1bXgArSCIuqq3BIrfxr/+MHO0jFcpDvh7nHa24YoLk5gkQi+UufSj4PfT3tGOjbBWpydgBgd3mh009hwmSDayGAeDyBtQ1StG1swuF9KtSKq5ELSice/xKrbR4O1lQsLIZw95EJSfZuX7AIc42GxxuCzeFBKPwND8dnWbeVwOOXH1bmRp6/BxWkgifffsGDsXcQs+obCEVW8tnyycVmUnhjceDarSfw+sO4bzTDHwgjwL7T+lEzdqgUoIJ0Sc999SLIIiivE+PppBW7OzbBNDOHRrZBCC5FUcG6KqGADzfLae7a4fahRdEAmYSuUpdyuNDhBBtRPExzgo/gx2+IQsfIRvd3aYsETCPHV5cAAAAASUVORK5CYII=" alt="" /></Link>
            <Link to="/"><img src="https://texnomart.uz/_nuxt/img/alif.6e1bcde.png" alt="" /></Link>
            <Link to="/"><img src="https://texnomart.uz/_nuxt/img/intend.81957d2.png" alt="" /></Link>
            <Link to="/"><img src="https://texnomart.uz/_nuxt/img/ofb.b3ef2cd.png" alt="" /></Link>
            <Link to="/"><img src="https://texnomart.uz/_nuxt/img/payme.677630d.png" alt="" /></Link>
          </div>
        </div>
      </div>
    </div >
  )
}
