import React, { useEffect, useMemo, useRef, useState } from 'react'
import './Invitation.css'

const EVENT_DATE = new Date('2026-10-28T16:00:00')
const CHURCH_MAP = 'https://yandex.com/maps/-/CXAKN2no'
const HALL_MAP = 'https://yandex.com/maps/-/CXAKJEZ-'

const COPY = {
    names: 'Լինա',
    namesUpper: 'ԼԻՆԱ',
    coverTitle: 'Լինայի Սուրբ Մկրտության\nհրավեր',
    openButton: 'ԲԱՑԵԼ',
    verse:
        'Թող այս օրը լցվի ջերմությամբ, ժպիտներով և հիշարժան պահերով,\nորոնք կմնան մեր սրտերում երկար տարիներ',
    inviteTitle: 'Ծնունդ և մկրտություն',
    inviteMessage:
        'Սիրով հրավիրում ենք Ձեզ\nմասնակցելու մեր փոքրիկ Լինայի\nծննդյան և մկրտության լուսավոր ու օրհնված տոնին',
    inviteNote:
        'Թող այս օրը լցվի ջերմությամբ, ժպիտներով և հիշարժան պահերով,\nորոնք կմնան մեր սրտերում երկար տարիներ',
    family: 'Սիրով հրավիրում են\nԹովմասյանների ընտանիքը',
    countdownTitle: 'Մնացել է',
    completedText: 'Տոնը սկսված է!',
    timelineTitle: 'Օրվա ծրագիր',
    mapButton: 'Դիտել քարտեզում',
    ceremony: {
        time: '16:00',
        title: 'Մկրտություն',
        location: 'Սուրբ Մարիամ Աստվածածին եկեղեցի',
        address: 'Նորք Մարաշ',
        map: CHURCH_MAP,
    },
    reception: {
        time: '17:00',
        title: 'Տոնական միջոցառում',
        location: 'Սաֆիսա ռեստորանային համալիր',
        address: 'Ջրվեժ 2-րդ թաղամաս',
        map: HALL_MAP,
    },
    closing: 'Սիրով սպասում ենք Ձեզ',
    days: 'Օր',
    hours: 'Ժամ',
    minutes: 'Րոպե',
    seconds: 'Վրկ',
}

function getTimeLeft(now) {
    const diff = Math.max(0, EVENT_DATE.getTime() - now.getTime())
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
    const [opened, setOpened] = useState(false)
    const [exiting, setExiting] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [now, setNow] = useState(() => new Date())
    const audioRef = useRef(null)
    const rootRef = useReveal(opened)
    const t = COPY
    const timeLeft = useMemo(() => getTimeLeft(now), [now])

    useEffect(() => {
        const id = window.setInterval(() => setNow(new Date()), 1000)
        return () => window.clearInterval(id)
    }, [])

    useEffect(() => {
        document.title = 'Լինա — Ծնունդ և մկրտություն'
    }, [])

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
        <div className="invite invite--hy" ref={rootRef}>
            <audio ref={audioRef} src="/invitation/music.mp3" loop preload="none" />

            <div className="controls">
                <div className="controls__group controls__group--end">
                    <button
                        type="button"
                        className="chip chip--icon"
                        onClick={toggleMusic}
                        aria-label={playing ? 'Դադար' : 'Երաժշտություն'}
                    >
                        {playing ? '❚❚' : '▶'}
                    </button>
                </div>
            </div>

            {!opened && (
                <div className={`cover${exiting ? ' is-exit' : ''}`}>
                    <div className="cover__stage">
                        <img
                            className="cover__bg"
                            src="/invitation/open-bg.png"
                            alt=""
                        />
                        <div className="cover__veil cover__veil--soft" />

                        <div className="cover__layout">
                            <div className="cover__date-block">
                                <div
                                    className="cover__date-stack"
                                    aria-label="28.10.2026"
                                >
                                    <span>28</span>
                                    <span>10</span>
                                    <span>26</span>
                                </div>
                                <span className="cover__date-rule" aria-hidden="true" />
                            </div>

                            <h1 className="cover__headline">{t.coverTitle}</h1>

                            <div className="cover__open-wrap">
                                <span className="cover__open-arrow" aria-hidden="true">
                                    →
                                </span>
                                <button
                                    type="button"
                                    className="cover__open-btn"
                                    onClick={openInvite}
                                >
                                    {t.openButton}
                                </button>
                            </div>
                        </div>
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
                            <div className="hero__date" aria-label="28.10.2026">
                                <span>28</span>
                                <span>10</span>
                                <span>26</span>
                            </div>
                            <h1 className="hero__names">{t.namesUpper}</h1>
                            <p className="hero__verse">{t.verse}</p>
                        </div>
                    </section>

                    <section className="section section--cream invitation">
                        <div className="invitation__crest-row reveal">
                            <span>28 / 10</span>
                            <div className="invitation__crest" aria-hidden="true">
                                <span>L</span>
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
                        {t.inviteNote ? (
                            <p className="body-copy invitation__note reveal">
                                {t.inviteNote}
                            </p>
                        ) : null}
                        {t.family ? (
                            <p className="invitation__family reveal">{t.family}</p>
                        ) : null}
                    </section>

                    <section className="gallery" aria-label="Gallery">
                        <div className="gallery__track">
                            {[
                                'gallery-1.jpg',
                                'gallery-2.jpg',
                                'gallery-3.jpg',
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

                    <section className="section section--cream countdown">
                        <h2 className="script-title reveal">
                            {timeLeft.done ? t.completedText : t.countdownTitle}
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
                            src="/invitation/church.png"
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
                            src="/invitation/hall.png"
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
                            {t.reception.map ? (
                                <a
                                    className="map-btn"
                                    href={t.reception.map}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {t.mapButton}
                                </a>
                            ) : null}
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
