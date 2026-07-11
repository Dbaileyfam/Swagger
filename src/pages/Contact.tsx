import { useState } from 'react'
import type { FormEvent } from 'react'
import { band } from '../data/band'

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const subject = String(data.get('subject') || 'Swagger inquiry')
    const message = String(data.get('message') || '')
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )
    window.location.href = `mailto:${band.email}?subject=${encodeURIComponent(subject)}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <header className="page-hero">
        <p className="section-label">Get in Touch</p>
        <h1 className="section-title">Contact</h1>
        <hr className="gold-rule gold-rule--center" />
        <p className="section-lede" style={{ margin: '0 auto' }}>
          We love hearing from promoters, festival owners, club owners, and fans.
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner contact-layout">
          <aside className="contact-aside">
            <p>
              Booking inquiries, press requests, and general questions — reach Rick directly or
              send a note below.
            </p>
            <div className="contact-detail">
              <div className="contact-detail__label">Email</div>
              <a href={`mailto:${band.email}`}>{band.email}</a>
            </div>
            <div className="contact-detail">
              <div className="contact-detail__label">Phone</div>
              <a href={`tel:${band.phone.replace(/\D/g, '')}`}>{band.phone}</a>
            </div>
            <div className="contact-detail">
              <div className="contact-detail__label">Based in</div>
              <span>{band.location}</span>
            </div>
          </aside>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject" defaultValue="Booking inquiry">
                <option>Booking inquiry</option>
                <option>Press / media</option>
                <option>General question</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required />
            </div>
            {sent ? (
              <p className="form-success">Opening your email client…</p>
            ) : (
              <button type="submit" className="btn btn-solid">
                Send Message
              </button>
            )}
            <p className="form-note">
              Submits via your email app to {band.email}. A form backend can be wired later.
            </p>
          </form>
        </div>
      </section>
    </>
  )
}
