'use client'

import { Award } from 'lucide-react'
import { useState } from 'react'
import Image from "next/image";

interface ResultCardProps {
    studentName: string
    score: string
    testType: string
    image?: string
    certificate?: string
    courseType?: string
    testimonial?: string
    date: Date
    featured?: boolean
    bandScores?: {
        listening?: number
        reading?: number
        writing?: number
        speaking?: number
    }
}

export default function ResultCard({
                                       studentName,
                                       score,
                                       testType,
                                       image,
                                       certificate,
                                       courseType,
                                       testimonial,
                                       date,
                                       featured = false,
                                       bandScores
                                   }: ResultCardProps) {
    const [certZoomed, setCertZoomed] = useState(false)

    const nameParts = studentName.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ')

    return (
        <>
            {/* ── LIGHTBOX OVERLAY ── */}
            {certZoomed && certificate && (
                <div
                    onClick={() => setCertZoomed(false)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        background: 'rgba(0,0,0,0.85)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'zoom-out',
                        padding: '24px',
                    }}
                >
                    {certificate.toLowerCase().endsWith('.pdf') ? (
                        <iframe
                            src={certificate}
                            style={{ width: '90vw', height: '90vh', borderRadius: '12px', border: 'none' }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    ) : (
                        <Image
                            src={certificate}
                            alt="Certificate"
                            fill
                            style={{
                                maxWidth: '90vw', maxHeight: '90vh',
                                borderRadius: '12px',
                                boxShadow: '0 20px 80px rgba(0,0,0,0.6)',
                                objectFit: 'contain',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    )}
                    <button
                        onClick={() => setCertZoomed(false)}
                        style={{
                            position: 'fixed', top: '20px', right: '24px',
                            background: 'white', border: 'none',
                            width: '36px', height: '36px', borderRadius: '50%',
                            fontSize: '1.2rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            color: '#333', fontWeight: '900',
                        }}
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* ── CARD ── */}
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '620px',
                background: '#eef2ee',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 16px 50px rgba(0,0,0,0.15)',
                fontFamily: "'Arial Black', Arial, sans-serif",
                display: 'flex',
                flexDirection: 'column',
            }}>

                {/* ══════════════════════════════
                    TOP SECTION — everything inside
                    ══════════════════════════════ */}
                <div style={{ position: 'relative', height: '520px' }}>

                    {/* Base bg */}
                    <div style={{ position: 'absolute', inset: 0, background: '#eef2ee' }} />

                    {/* Top-left dark diagonal wedge */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '60%', height: '48%',
                        background: 'linear-gradient(140deg, #595959 0%, #888 70%, transparent 100%)',
                        clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0 100%)',
                        zIndex: 1,
                    }} />

                    {/* Top-right dark diagonal wedge */}
                    <div style={{
                        position: 'absolute', top: 0, right: 0,
                        width: '50%', height: '38%',
                        background: 'linear-gradient(220deg, #595959 0%, #888 70%, transparent 100%)',
                        clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0 0)',
                        zIndex: 1,
                    }} />

                    {/* SA Logo – top right */}
                    <div style={{
                        position: 'absolute', top: '12px', right: '12px',
                        width: '58px', height: '58px',
                        borderRadius: '50%',
                        border: '3px solid #FF6B1A',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 10,
                    }}>
                        <svg viewBox="0 0 60 60" width="48" height="48" fill="none">
                            <text x="10" y="32" fill="#FF6B1A" fontSize="22" fontWeight="900"
                                  fontFamily="Arial Black, Arial" transform="rotate(-12,10,32)">S</text>
                            <text x="28" y="50" fill="#FF6B1A" fontSize="22" fontWeight="900"
                                  fontFamily="Arial Black, Arial" transform="rotate(-12,28,50)">A</text>
                        </svg>
                    </div>

                    {/* Top Achiever badge */}
                    {featured && (
                        <div style={{
                            position: 'absolute', top: '18px', left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 10,
                            display: 'flex', alignItems: 'center', gap: '5px',
                            background: '#fdf3d0', border: '1.5px solid #e8c84a',
                            color: '#7a5c00', padding: '5px 16px',
                            borderRadius: '30px', fontSize: '0.78rem', fontWeight: '700',
                            whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}>
                            <Award size={12} />
                            Top Achiever
                        </div>
                    )}

                    {/* ── STUDENT PHOTO — right side, large circle ── */}
                    {image && (
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '-100px',
                            width: '390px',
                            height: '520px',
                            zIndex: 3,
                        }}>
                            <div style={{
                                position: 'absolute', inset: '-6px',
                                borderRadius: '50%',
                                border: '5px solid #FF6B1A',
                                zIndex: 4,
                            }} />
                            <div style={{
                                width: '100%', height: '100%',
                                borderRadius: '50%', overflow: 'hidden',
                                background: '#d0c8c0',
                            }}>
                                <Image
                                    src={image}
                                    alt={studentName}
                                    width={100}
                                    height={100}
                                    style={{
                                        width: '100%', height: '100%',
                                        objectFit: 'cover', objectPosition: 'center top',
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── NAME — position absolute, TOP LEFT ── */}
                    <div style={{
                        position: 'absolute',
                        top: '80px',
                        left: '22px',
                        zIndex: 5,
                        maxWidth: '48%',
                    }}>
                        <div style={{
                            fontSize: '2.4rem', fontWeight: '900', color: '#1a1a1a',
                            letterSpacing: '-1px', lineHeight: 0.95,
                        }}>
                            {firstName}
                        </div>
                        {lastName && (
                            <div style={{
                                fontSize: '2.4rem', fontWeight: '900', color: '#1a1a1a',
                                letterSpacing: '-1px', lineHeight: 0.95,
                            }}>
                                {lastName}
                            </div>
                        )}
                        {courseType && (
                            <div style={{
                                fontSize: '0.75rem', fontWeight: '700',
                                color: '#333', marginTop: '6px',
                            }}>
                                {courseType}
                            </div>
                        )}

                        {/* OVERALL SCORE label */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center',
                            background: 'rgba(220,224,220,0.95)',
                            borderLeft: '4px solid #FF6B1A',
                            padding: '5px 13px',
                            borderRadius: '4px',
                            marginTop: '14px',
                        }}>
                            <span style={{
                                fontSize: '0.72rem', fontWeight: '900', color: '#1a1a1a',
                                letterSpacing: '2.5px', textTransform: 'uppercase',
                            }}>
                                OVERALL SCORE
                            </span>
                        </div>

                        {/* Score */}
                        <div style={{
                            fontSize: '4.8rem', fontWeight: '900', color: '#FF6B1A',
                            lineHeight: 0.9, textShadow: '2px 2px 10px rgba(255,107,26,0.2)',
                            marginTop: '4px',
                        }}>
                            {score}
                        </div>

                        {/* Test type */}
                        <div style={{
                            fontSize: '1rem', fontWeight: '900', color: '#1a1a1a',
                            letterSpacing: '0.5px', marginTop: '4px',
                        }}>
                            {testType}
                        </div>

                        {/* Band scores */}
                        {bandScores && (
                            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '8px' }}>
                                {Object.entries(bandScores).map(([key, val]) => (
                                    <div key={key} style={{
                                        background: 'rgba(255,255,255,0.85)',
                                        borderRadius: '7px', padding: '3px 9px',
                                        textAlign: 'center',
                                        border: '1px solid rgba(255,107,26,0.2)',
                                    }}>
                                        <div style={{ fontSize: '0.5rem', color: '#777', textTransform: 'capitalize', fontWeight: '700' }}>{key}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#FF6B1A', fontWeight: '900' }}>{val}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── CERTIFICATE — position absolute, BOTTOM LEFT ── */}
                    {certificate && (
                        <div style={{
                            position: 'absolute',
                            bottom: '24px',
                            left: '22px',
                            zIndex: 5,
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: '18px',
                        }}>
                            {/* Rotated certificate thumbnail */}
                            <div
                                onClick={() => setCertZoomed(true)}
                                style={{
                                    cursor: 'zoom-in',
                                    flexShrink: 0,
                                    width: '120px',
                                    transform: 'rotate(-6deg)',
                                    transformOrigin: 'bottom left',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
                                    border: '3px solid white',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                    ;(e.currentTarget as HTMLDivElement).style.transform = 'rotate(-6deg) scale(1.05)'
                                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 14px 36px rgba(0,0,0,0.35)'
                                }}
                                onMouseLeave={e => {
                                    ;(e.currentTarget as HTMLDivElement).style.transform = 'rotate(-6deg)'
                                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.25)'
                                }}
                            >
                                {certificate.toLowerCase().endsWith('.pdf') ? (
                                    <div style={{
                                        height: '105px', display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', justifyContent: 'center',
                                        background: '#fff8f8',
                                    }}>
                                        <svg width="36" height="36" fill="#cc0000" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                        </svg>
                                        <span style={{ fontSize: '0.65rem', color: '#555', marginTop: '6px', fontWeight: '600' }}>PDF</span>
                                    </div>
                                ) : (
                                    <Image
                                        src={certificate}
                                        alt="Certificate"
                                        fill
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                )}

                            </div>

                            {/* IELTS branding beside cert */}
                            <div style={{ paddingBottom: '6px', position: 'absolute' , left: '10px' , bottom: '20px',transform: 'rotate(-6deg)',
                                transformOrigin: 'bottom left', }}>
                                <div style={{
                                    fontSize: '1.6rem', fontWeight: '900', color: '#003087',
                                    letterSpacing: '-0.5px', lineHeight: 1,
                                }}>
                                    {testType}<span style={{ fontSize: '0.55rem', verticalAlign: 'super', marginLeft: '2px' }}>™</span>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
                {/* ══ END TOP SECTION ══ */}

                {/* Testimonial + Date */}
                <div style={{
                    display: 'flex', alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    padding: '14px 22px 14px 22px', gap: '12px',
                }}>
                    {testimonial ? (
                        <p style={{
                            fontSize: '0.82rem', color: '#333', fontStyle: 'italic',
                            lineHeight: 1.5, margin: 0, flex: 1, fontFamily: 'Arial, sans-serif',
                        }}>
                            &ldquo;{testimonial}&rdquo;
                        </p>
                    ) : <div />}
                    <div style={{
                        fontSize: '0.85rem', fontWeight: '700', color: '#333',
                        whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                        {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                </div>

                {/* ── BOTTOM ORANGE BAR ── */}

            </div>
        </>
    )
}