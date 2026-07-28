import React, { useEffect, useRef, useState } from 'react'
import './Restaurant.css'

const MENU = [
    {
        name: 'Burrata & Fig',
        price: '4,800 ֏',
        desc: 'Whipped burrata, honeyed figs, toasted pistachio, aged balsamic.',
        image: '/restaurant/dish-1.jpg',
    },
    {
        name: 'Charred Tenderloin',
        price: '12,900 ֏',
        desc: 'Dry-aged beef, roasted bone marrow butter, smoked salt, seasonal greens.',
        image: '/restaurant/steak.jpg',
    },
    {
        name: 'Velvet Cocoa',
        price: '5,200 ֏',
        desc: 'Dark chocolate mousse, espresso caramel, sea-salted cocoa nib.',
        image: '/restaurant/dessert.jpg',
    },
]

const HOURS = [
    { day: 'Monday – Thursday', time: '12:00 – 23:00' },
    { day: 'Friday – Saturday', time: '12:00 – 01:00' },
    { day: 'Sunday', time: '13:00 – 22:00' },
]

function useReveal() {
    const ref = useRef(null)

    useEffect(() => {
        const node = ref.current
        if (!node) return undefined

        const targets = node.querySelectorAll('.reveal')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
        )

        targets.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return ref
}

export default function RestaurantPage() {
    const rootRef = useReveal()
    const [scrolled, setScrolled] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const onReserve = (event) => {
        event.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className="florence" ref={rootRef}>
            <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
                <a className="nav__brand" href="#top">
                    Florence
                </a>
                <ul className="nav__links">
                    <li>
                        <a href="#story">Story</a>
                    </li>
                    <li>
                        <a href="#menu">Menu</a>
                    </li>
                    <li>
                        <a href="#visit">Visit</a>
                    </li>
                </ul>
                <a className="nav__cta" href="#reserve">
                    Reserve
                </a>
            </header>

            <section className="hero" id="top">
                <div className="hero__media" aria-hidden="true">
                    <img src="/restaurant/hero.jpg" alt="" />
                </div>
                <div className="hero__veil" aria-hidden="true" />
                <div className="hero__content">
                    <p className="hero__script">Fine dining in Yerevan</p>
                    <h1 className="hero__brand">Florence</h1>
                    <p className="hero__line">
                        An intimate room of soft light, seasonal plates, and
                        evenings meant to linger.
                    </p>
                    <div className="hero__actions">
                        <a className="btn btn--solid" href="#reserve">
                            Book a table
                        </a>
                        <a className="btn btn--ghost" href="#menu">
                            View menu
                        </a>
                    </div>
                </div>
            </section>

            <section className="section section--ivory" id="story">
                <div className="section__inner story">
                    <div className="story__copy reveal">
                        <p className="section__eyebrow">Our story</p>
                        <h2 className="section__title">
                            Where evenings turn into memories
                        </h2>
                        <div className="story__ornament" aria-hidden="true" />
                        <p className="section__text">
                            Florence was imagined as a quiet celebration of
                            hospitality — candlelight on linen, Armenian produce
                            with Mediterranean restraint, and service that never
                            rushes the night.
                        </p>
                    </div>
                    <div className="story__media reveal reveal-delay-1">
                        <img
                            src="/restaurant/dining.jpg"
                            alt="Candlelit dining table at Florence"
                        />
                    </div>
                </div>
            </section>

            <section className="section" id="menu">
                <div className="section__inner section--center">
                    <p className="section__eyebrow reveal">Seasonal tasting</p>
                    <h2 className="section__title reveal reveal-delay-1">
                        A few favorites
                    </h2>
                    <p className="section__text reveal reveal-delay-2">
                        Plates change with the market. These are the signatures
                        guests ask for again.
                    </p>
                    <div className="menu-grid">
                        {MENU.map((item, index) => (
                            <article
                                className={`menu-item reveal reveal-delay-${
                                    (index % 3) + 1
                                }`}
                                key={item.name}
                            >
                                <div className="menu-item__img">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="menu-item__meta">
                                    <h3 className="menu-item__name">
                                        {item.name}
                                    </h3>
                                    <span className="menu-item__price">
                                        {item.price}
                                    </span>
                                </div>
                                <p className="menu-item__desc">{item.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="atmosphere" id="atmosphere">
                <div className="atmosphere__media" aria-hidden="true">
                    <img src="/restaurant/wine.jpg" alt="" />
                </div>
                <div className="atmosphere__veil" aria-hidden="true" />
                <div className="atmosphere__content reveal">
                    <p className="atmosphere__script">Stay a little longer</p>
                    <h2 className="atmosphere__title">The room after dark</h2>
                    <p className="atmosphere__text">
                        Low music, crystal that catches candlelight, and a wine
                        list written for conversation.
                    </p>
                    <a className="btn btn--ghost" href="#reserve">
                        Reserve your evening
                    </a>
                </div>
            </section>

            <section className="section section--sand" id="visit">
                <div className="section__inner visit">
                    <div className="visit__panel reveal">
                        <p className="section__eyebrow">Visit us</p>
                        <h2 className="section__title">Hours &amp; place</h2>
                        <ul className="hours">
                            {HOURS.map((row) => (
                                <li key={row.day}>
                                    <span>{row.day}</span>
                                    <span>{row.time}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="visit__address">
                            <p>Barbusi St. 64/2</p>
                            <p>Yerevan, Armenia</p>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Florence%20Restaurant%2C%20Yerevan%2C%20Barbusi%20St.%2064%2F2"
                                target="_blank"
                                rel="noreferrer"
                            >
                                View on map
                            </a>
                        </div>
                    </div>
                    <div
                        className="visit__map reveal reveal-delay-1"
                        role="img"
                        aria-label="Florence restaurant neighborhood atmosphere"
                    >
                        <div className="visit__map-label">
                            <strong>Florence</strong>
                            <span>Barbusi 64/2, Yerevan</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section reserve" id="reserve">
                <div className="section__inner section--center">
                    <p className="section__eyebrow reveal">Reservations</p>
                    <h2 className="section__title reveal reveal-delay-1">
                        Save your place at the table
                    </h2>
                    <p className="section__text reveal reveal-delay-2">
                        Tell us when you would like to join us. We will confirm
                        by phone within a few hours.
                    </p>

                    {submitted ? (
                        <p className="reserve__success reveal is-visible">
                            Thank you — we look forward to hosting you.
                        </p>
                    ) : (
                        <form
                            className="reserve__form reveal reveal-delay-2"
                            onSubmit={onReserve}
                        >
                            <div className="reserve__row">
                                <div className="field">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        required
                                        autoComplete="name"
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        autoComplete="tel"
                                    />
                                </div>
                            </div>
                            <div className="reserve__row">
                                <div className="field">
                                    <label htmlFor="date">Date</label>
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        required
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="guests">Guests</label>
                                    <select id="guests" name="guests" required>
                                        <option value="2">2 guests</option>
                                        <option value="3">3 guests</option>
                                        <option value="4">4 guests</option>
                                        <option value="5">5 guests</option>
                                        <option value="6">6+ guests</option>
                                    </select>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="note">Note</label>
                                <textarea
                                    id="note"
                                    name="note"
                                    placeholder="Occasion, allergies, preferred time…"
                                />
                            </div>
                            <button className="btn btn--solid" type="submit">
                                Request reservation
                            </button>
                            <p className="reserve__note">
                                Or call +374 99 410 474
                            </p>
                        </form>
                    )}
                </div>
            </section>

            <footer className="footer">
                <p className="footer__brand">Florence</p>
                <p className="footer__meta">
                    Barbusi 64/2, Yerevan ·{' '}
                    <a href="mailto:hello@florence.am">hello@florence.am</a>
                </p>
            </footer>
        </div>
    )
}
