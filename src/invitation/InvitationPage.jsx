import React, { useEffect, useMemo, useRef, useState } from 'react'
import './Invitation.css'

const WEDDING_DATE = new Date('2026-09-04T17:30:00')
const CHURCH_MAP =
    'https://yandex.com/maps/org/surb_mariam_astvatsatsin_yekeghetsi/15438436392/?ll=44.540385%2C40.180340&z=14'
const HALL_MAP =
    'https://yandex.com/maps/org/latsio_hol/215251153533/?ll=44.591922%2C40.193585&z=16'

const COPY = {
    en: {
        names: 'Narek & Anna',
        namesUpper: 'Narek & Anna',
        verse:
            '"In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."',
        inviteTitle: 'Wedding Invitation',
        inviteMessage:
            'Together with their families,\nNarek and Anna\njoyfully invite you to celebrate\nthe beginning of their new life together.\nYour presence on this special day\nwould mean the world to them.',
        family: '',
        quote: '“Therefore what God has joined together, let no one separate.”',
        quoteSource: 'Mark 10:9',
        countdownTitle: 'Counting Down',
        married: "We're Married!",
        timelineTitle: 'Wedding Timeline',
        mapButton: 'View on Map',
        ceremony: {
            time: '16:00',
            title: 'Ceremony',
            location: 'Surb Mariam Astvatsatsin Church',
            address: 'Nork-Marash, Yerevan',
            map: CHURCH_MAP,
        },
        reception: {
            time: '17:30',
            title: 'Reception',
            location: 'Lazio Hall',
            address: 'Kotayk Region, T-6-29, 31',
            map: HALL_MAP,
        },
        dressTitle: 'Dress Code',
        dressText:
            'We kindly invite you to dress in elegant, timeless attire — soft neutrals and muted tones that echo the grace of the day.',
        closing: 'With love, we await you',
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
    },
    am: {
        names: 'Նարեկ եվ Աննա',
        namesUpper: 'ՆԱՐԵԿ ԵՎ ԱՆՆԱ',
        verse:
            '«Ամբողջ աշխարհում ինձ համար ավելի հարազատ սիրտ չկա, քան քոնը։ Ամբողջ աշխարհում իմ սիրո նման սեր չկա։»',
        inviteTitle: 'Հարսանյաց հրավեր',
        inviteMessage:
            'Սիրով հրավիրում ենք Ձեզ\nմասնակցելու Նարեկի և Աննայի\nհարսանյաց տոնին։ Ձեր\nներկայությունը մեր տոնն առավել\nջերմ ու հիշարժան կդարձնի։',
        family: '',
        quote: '«Արդ, ինչ որ Աստված միավորեց, մարդը թող չբաժանի»',
        quoteSource: 'ՄԱՐԿՈՍ 10:9',
        countdownTitle: 'Մնացել է',
        married: 'Մենք ամուսնացանք!',
        timelineTitle: 'Օրվա ծրագիր',
        mapButton: 'Դիտել քարտեզում',
        ceremony: {
            time: '16:00',
            title: 'Պսակադրություն',
            location: 'Սուրբ Մարիամ Աստվածածին եկեղեցի',
            address: 'Նորք-Մարաշ, Երևան',
            map: CHURCH_MAP,
        },
        reception: {
            time: '17:30',
            title: 'Հարսանյաց Հանդես',
            location: 'Lazio Hall',
            address: 'Կոտայքի մարզ, T-6-29, 31',
            map: HALL_MAP,
        },
        dressTitle: 'Հագուստի ոճ',
        dressText:
            'Խնդրում ենք կրել էլեգանտ և դասական հագուստ՝ մեղմ և նուրբ երանգներով։',
        closing: 'Սիրով սպասում ենք Ձեզ',
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
    },
}

function getTimeLeft(now) {
    const diff = Math.max(0, WEDDING_DATE.getTime() - now.getTime())
    const total = Math.floor(diff / 1000)
    return {
        done: total <= 0,
        days: Math.floor(total / 86400),
        hours: Math.floor((total % 86400) / 3600),
        minutes: Math.floor((total % 3600) / 60),
        seconds: total % 60,
    }
}

function useReveal(enabled) {
    const ref = useRef(null)

    useEffect(() => {
        if (!enabled) return undefined
        const root = ref.current
        if (!root) return undefined

        const nodes = root.querySelectorAll('.reveal')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
        )

        nodes.forEach((node) => observer.observe(node))
        return () => observer.disconnect()
    }, [enabled])

    return ref
}

export default function InvitationPage() {
    const [lang, setLang] = useState('am')
    const [opened, setOpened] = useState(false)
    const [exiting, setExiting] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [now, setNow] = useState(() => new Date())
    const audioRef = useRef(null)
    const rootRef = useReveal(opened)
    const t = COPY[lang]
    const timeLeft = useMemo(() => getTimeLeft(now), [now])

    useEffect(() => {
        const id = window.setInterval(() => setNow(new Date()), 1000)
        return () => window.clearInterval(id)
    }, [])

    useEffect(() => {
        document.title =
            lang === 'am'
                ? 'Նարեկ եվ Աննա — Հարսանյաց հրավեր'
                : 'Narek & Anna — Wedding Invitation'
    }, [lang])

    const openInvite = () => {
        if (opened || exiting) return
        setExiting(true)
        window.setTimeout(() => {
            setOpened(true)
            setExiting(false)
            const audio = audioRef.current
            if (audio) {
                audio
                    .play()
                    .then(() => setPlaying(true))
                    .catch(() => setPlaying(false))
            }
        }, 850)
    }

    const toggleMusic = () => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            audio
                .play()
                .then(() => setPlaying(true))
                .catch(() => {})
        } else {
            audio.pause()
            setPlaying(false)
        }
    }

    return (
        <div
            className={`invite${lang === 'am' ? ' invite--hy' : ''}`}
            ref={rootRef}
        >
            <audio ref={audioRef} src="/invitation/music.mp3" loop preload="none" />

            <div className="controls">
                <div className="controls__group">
                    <button
                        type="button"
                        className={`chip${lang === 'en' ? ' is-active' : ''}`}
                        onClick={() => setLang('en')}
                        aria-label="English"
                    >
                        EN
                    </button>
                    <button
                        type="button"
                        className={`chip${lang === 'am' ? ' is-active' : ''}`}
                        onClick={() => setLang('am')}
                        aria-label="Armenian"
                    >
                        AM
                    </button>
                </div>
                <div className="controls__group">
                    <button
                        type="button"
                        className="chip chip--icon"
                        onClick={toggleMusic}
                        aria-label={playing ? 'Pause music' : 'Play music'}
                    >
                        {playing ? '❚❚' : '▶'}
                    </button>
                </div>
            </div>

            {!opened && (
                <div className={`cover${exiting ? ' is-exit' : ''}`}>
                    <div
                        className="cover__stage"
                        onClick={openInvite}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                openInvite()
                            }
                        }}
                        aria-label="Open invitation"
                    >
                        <img
                            className="cover__bg"
                            src="/invitation/cover.jpg"
                            alt="Cover Background"
                        />
                        <div className="cover__veil" />
                        <div className="cover__lace-wrap" aria-hidden="true">
                            <img
                                className="cover__lace"
                                src="/invitation/lace.webp"
                                alt=""
                            />
                        </div>
                        <div className="cover__copy">
                            <h1 className="cover__title">
                                <span>Save the</span>
                                <span>Date</span>
                            </h1>
                            <p className="cover__date">04 . 09 . 2026</p>
                        </div>
                        <img
                            className="cover__wax"
                            src="/invitation/wax.webp"
                            alt="Open"
                            onClick={(event) => {
                                event.stopPropagation()
                                openInvite()
                            }}
                        />
                    </div>
                </div>
            )}

            {opened && (
                <>
                    <section className="hero">
                        <img
                            className="hero__bg"
                            src="/invitation/cover.jpg"
                            alt=""
                        />
                        <div className="hero__veil" />
                        <div className="hero__content">
                            <div className="hero__date" aria-label="04.09.2026">
                                <span>04</span>
                                <span>09</span>
                                <span>26</span>
                            </div>
                            <h1 className="hero__names">{t.namesUpper}</h1>
                            <p className="hero__verse">{t.verse}</p>
                        </div>
                    </section>

                    <section className="section section--cream invitation">
                        <div className="invitation__crest-row reveal">
                            <span>04 / 09</span>
                            <div className="invitation__crest" aria-hidden="true">
                                <span>N</span>
                                <em>&</em>
                                <span>A</span>
                            </div>
                            <span>2026</span>
                        </div>
                        <h2 className="script-title reveal">{t.inviteTitle}</h2>
                        <img
                            className="ornament reveal"
                            src="/invitation/leaf.webp"
                            alt=""
                        />
                        <p className="body-copy reveal">{t.inviteMessage}</p>
                        {t.family ? (
                            <p className="invitation__family reveal">{t.family}</p>
                        ) : null}
                    </section>

                    <section className="gallery" aria-label="Gallery">
                        <div className="gallery__track">
                            {[
                                'gallery-1.jpg',
                                'gallery-4.jpg',
                                'gallery-5.jpg',
                                'gallery-6.jpg',
                                'gallery-7.jpg',
                            ].map((file) => (
                                <div className="gallery__card" key={file}>
                                    <img src={`/invitation/${file}`} alt="" />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="section section--cream quote">
                        <p className="quote__text reveal">{t.quote}</p>
                        <p className="quote__source reveal">{t.quoteSource}</p>
                    </section>

                    <section className="section section--cream countdown">
                        <h2 className="script-title reveal">
                            {timeLeft.done ? t.married : t.countdownTitle}
                        </h2>
                        <img
                            className="ornament reveal"
                            src="/invitation/leaf.webp"
                            alt=""
                        />
                        {!timeLeft.done && (
                            <div className="countdown__grid reveal">
                                {[
                                    ['days', t.days],
                                    ['hours', t.hours],
                                    ['minutes', t.minutes],
                                    ['seconds', t.seconds],
                                ].map(([key, label], index) => (
                                    <React.Fragment key={key}>
                                        {index > 0 && (
                                            <span className="countdown__sep">
                                                :
                                            </span>
                                        )}
                                        <div className="countdown__unit">
                                            <div className="countdown__value">
                                                {String(timeLeft[key]).padStart(
                                                    2,
                                                    '0'
                                                )}
                                            </div>
                                            <div className="countdown__label">
                                                {label}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="timeline-block">
                        <img
                            className="timeline-block__bg"
                            src="/invitation/gallery-5.jpg"
                            alt=""
                        />
                        <div className="timeline-block__veil" />
                        <div className="timeline-block__content reveal">
                            <h2 className="timeline-block__heading">
                                {t.timelineTitle}
                            </h2>
                            <img
                                className="timeline-block__icon"
                                src="/invitation/rings.webp"
                                alt=""
                            />
                            <p className="timeline-block__time">
                                {t.ceremony.time}
                            </p>
                            <h3 className="timeline-block__title">
                                {t.ceremony.title}
                            </h3>
                            {t.ceremony.location ? (
                                <p className="timeline-block__place">
                                    {t.ceremony.location}
                                </p>
                            ) : null}
                            {t.ceremony.address ? (
                                <p className="timeline-block__address">
                                    {t.ceremony.address}
                                </p>
                            ) : null}
                            {t.ceremony.map ? (
                                <a
                                    className="map-btn"
                                    href={t.ceremony.map}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {t.mapButton}
                                </a>
                            ) : null}
                        </div>
                    </section>

                    <section className="timeline-block">
                        <img
                            className="timeline-block__bg timeline-block__bg--reception"
                            src="/invitation/hall.jpg"
                            alt=""
                        />
                        <div className="timeline-block__veil" />
                        <div className="timeline-block__content reveal">
                            <img
                                className="timeline-block__icon"
                                src="/invitation/glass.webp"
                                alt=""
                            />
                            <p className="timeline-block__time">
                                {t.reception.time}
                            </p>
                            <h3 className="timeline-block__title">
                                {t.reception.title}
                            </h3>
                            <p className="timeline-block__place">
                                {t.reception.location}
                            </p>
                            <p className="timeline-block__address">
                                {t.reception.address}
                            </p>
                            <a
                                className="map-btn"
                                href={t.reception.map}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {t.mapButton}
                            </a>
                        </div>
                    </section>

                    <section className="closing">
                       
                        <p className="closing__message reveal">{t.closing}</p>
                    </section>
                </>
            )}
        </div>
    )
}
